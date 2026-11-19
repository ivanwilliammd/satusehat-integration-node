import { readFileSync } from 'node:fs';
import { createServer, type Server } from 'node:net';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { Ack } from './ack';
import { Client } from './client';
import { Encoding } from '.';
import { Message } from './message';
import * as Mllp from './mllp';
import { MllpReader } from './mllp';
import { Profiles } from './profiles';

const ADT =
  'MSH|^~\\&|SIMRS|RS-01|SATUSEHAT|KEMKES|20261118120000||ADT^A01^ADT_A01|MSG00001|P|2.5.1\r' +
  'EVN|A01|20261118115900\r' +
  'PID|1||0001234567890^^^NIK^NIK||ANGGRAENI^SITI^^^\r' +
  'PV1|1|I|WARD01^101^A\r' +
  'OBX|1|NM|8867-4^Heart rate^LN||78|/min|||||F\r';

describe('Message', () => {
  it('parses segments and paths', () => {
    const msg = Message.parse(ADT);
    expect(msg.all()).toHaveLength(5);
    expect(msg.messageType()).toBe('ADT');
    expect(msg.triggerEvent()).toBe('A01');
    expect(msg.controlId()).toBe('MSG00001');
    expect(msg.get('PID.5.1')).toBe('ANGGRAENI');
    expect(msg.get('OBX.5')).toBe('78');
  });

  it('round-trips byte for byte', () => {
    expect(Message.parse(ADT).toString()).toBe(ADT);
  });

  it('decodes and re-encodes escapes', () => {
    const msg = Message.parse(
      'MSH|^~\\&|A|B|C|D|20260101||ADT^A08|1|P|2.5.1\rPID|1||123||SMITH\\S\\JOHN\\F\\JR\\T\\II\r',
    );
    expect(msg.get('PID.5.1')).toBe('SMITH^JOHN|JR&II');
    msg.set('PID.5.2', "O'BRIEN&SONS");
    expect(Message.parse(msg.toString()).get('PID.5.2')).toBe("O'BRIEN&SONS");
  });

  it('rejects a message without MSH', () => {
    expect(() => Message.parse('PID|1||123\r')).toThrow(/MSH/);
  });

  it('reports charset without re-encoding', () => {
    expect(Message.parse(ADT).charset()).toBe('ASCII');
    expect(Encoding.charsetOf('UNICODE UTF-8')).toBe('UTF-8');
  });
});

describe('MLLP', () => {
  it('frames and unframes', () => {
    const framed = Mllp.frame(ADT);
    expect(Mllp.unframe(framed)).toContain('ADT^A01');
  });

  it('never emits a truncated message at a chunk boundary', () => {
    const stream = Mllp.frame(ADT) + Mllp.frame(ADT.replace('ADT^A01', 'ADT^A08'));
    for (let cut = 1; cut < stream.length; cut += 7) {
      const partial = Mllp.split(stream.slice(0, cut));
      expect(partial.length).toBeLessThanOrEqual(1);
      // A partial frame may yield nothing, but never a shortened message.
      const complete = new Set([ADT, ADT.replace('ADT^A01', 'ADT^A08')]);
      for (const m of partial) expect(complete.has(m)).toBe(true);
    }
    expect(Mllp.split(stream)).toHaveLength(2);
  });

  it('keeps the second frame that arrived in the same chunk', () => {
    const reader = new MllpReader();
    reader.push(Mllp.frame('MSG-A') + Mllp.frame('MSG-B'));
    expect(reader.take()).toBe('MSG-A');
    expect(reader.take()).toBe('MSG-B');
    expect(reader.take()).toBeNull();
  });
});

describe('Ack', () => {
  it('echoes the control id and the verdict', () => {
    const ack = Ack.build(Message.parse(ADT));
    expect(ack.messageType()).toBe('ACK');
    expect(ack.get('MSA.1')).toBe('AA');
    expect(ack.get('MSA.2')).toBe('MSG00001');
  });

  it('carries the reason on error', () => {
    const ack = Ack.error(Message.parse(ADT), 'PID missing');
    expect(ack.get('MSA.1')).toBe('AE');
    expect(ack.get('MSA.3')).toBe('PID missing');
  });
});

describe('corpus (shared with the PHP SDK)', () => {
  const dir = join(__dirname, '__fixtures__');
  const manifest = JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf8'));
  const profileFor = (name: string) =>
    name === 'oruR01' ? Profiles.oruR01() : name === 'adtA08' ? Profiles.adtA08() : Profiles.adtA01();

  it('accepts the ten messages a hospital sends', () => {
    for (const [name, spec] of Object.entries<{ profile: string }>(manifest.valid)) {
      const msg = Message.parse(readFileSync(join(dir, 'valid', `${name}.hl7`), 'utf8'));
      const errors = profileFor(spec.profile).validate(msg).filter((i) => i.severity === 'error');
      expect(errors, name).toEqual([]);
    }
  });

  it('refuses the ten that must not reach a database', () => {
    for (const [name, spec] of Object.entries<any>(manifest.invalid)) {
      const raw = readFileSync(join(dir, 'invalid', `${name}.hl7`), 'utf8');
      if (spec.exception) {
        expect(() => Message.parse(raw), name).toThrow();
        continue;
      }
      const paths = profileFor(spec.profile)
        .validate(Message.parse(raw))
        .map((i) => i.path);
      for (const expected of spec.issues as string[]) {
        expect(paths, name).toContain(expected);
      }
    }
  });
});

describe('Client', () => {
  let server: Server;
  let port = 0;

  beforeAll(async () => {
    server = createServer((socket) => {
      const reader = new MllpReader();
      socket.on('data', (chunk) => {
        reader.push(chunk.toString('latin1'));
        for (;;) {
          const raw = reader.take();
          if (!raw) break;
          socket.write(Mllp.frame(Ack.build(Message.parse(raw)).toString()));
        }
      });
    });
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    port = (server.address() as { port: number }).port;
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  it('sends over a real socket and reads the ACK', async () => {
    const result = await new Client(`127.0.0.1:${port}`).send(Message.parse(ADT));
    expect(result.code).toBe('AA');
    expect(result.controlId).toBe('MSG00001');
    expect(result.accepted).toBe(true);
  });

  it('sends three messages over one connection', async () => {
    const msgs = ['S1', 'S2', 'S3'].map((id) =>
      Message.parse(ADT.replace('MSG00001', id)),
    );
    const results = await new Client(`127.0.0.1:${port}`).session(msgs);
    expect(results.map((r) => r.controlId)).toEqual(['S1', 'S2', 'S3']);
  });

  it('rejects a stale ACK', () => {
    const msg = Message.parse(ADT);
    const stale = Ack.build(msg).set('MSA.2', 'OTHER123').toString();
    expect(() => new Client('127.0.0.1:1').interpret(msg, stale)).toThrow(/does not match/);
  });

  it('retries the transport and then fails with a clear message', async () => {
    await expect(new Client('127.0.0.1:1', 300, 1).send(Message.parse(ADT))).rejects.toThrow(
      /MLLP send failed/,
    );
  });
});
