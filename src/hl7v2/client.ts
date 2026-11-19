import * as net from 'node:net';
import { Ack } from './ack';
import { Message } from './message';
import { MllpReader, frame } from './mllp';

export interface SendResult {
  code: string;
  controlId: string;
  text: string;
  attempts: number;
  latencyMs: number;
  accepted: boolean;
}

type Connection = { socket: net.Socket; reader: MllpReader };

/**
 * MLLP client for analyzers and LIS endpoints.
 *
 * Two rules that matter operationally:
 *  - transport failures retry, application verdicts do not (retrying an AE turns one bad message
 *    into a thousand);
 *  - MSA-2 must echo MSH-10, otherwise the ACK is stale or misrouted and must not count as success.
 */
export class Client {
  private readonly host: string;
  private readonly port: number;

  constructor(
    address: string,
    private readonly timeoutMs = 10_000,
    private readonly retries = 2,
  ) {
    const [host, port] = address.split(':');
    this.host = host;
    this.port = Number(port);
  }

  async send(message: Message): Promise<SendResult> {
    const results = await this.session([message]);
    return results[0];
  }

  /** Sends several messages over one connection, one result per message, in order. */
  async session(messages: Message[]): Promise<SendResult[]> {
    let conn: Connection | null = null;
    const results: SendResult[] = [];

    try {
      for (const message of messages) {
        let lastError: Error | null = null;
        for (let attempt = 1; attempt <= this.retries + 1; attempt++) {
          try {
            if (!conn) conn = await this.connect();
            results.push(await this.exchange(conn, message));
            lastError = null;
            break;
          } catch (err) {
            lastError = err as Error;
            if (conn) {
              conn.socket.destroy();
              conn = null;
            }
            if (attempt > this.retries) break;
            await new Promise((r) => setTimeout(r, 200 * attempt));
          }
        }
        if (lastError) {
          throw new Error(
            `MLLP send failed at message ${results.length + 1} after ${this.retries} retries: ${lastError.message}`,
          );
        }
      }
    } finally {
      conn?.socket.destroy();
    }
    return results;
  }

  /** Parses an ACK received out-of-band; exposed so daemons that own their socket can reuse it. */
  interpret(sent: Message, ackRaw: string): SendResult {
    const ack = Message.parse(ackRaw);
    if (ack.messageType() !== 'ACK') {
      throw new Error(`reply is not an ACK but ${ack.messageType()}`);
    }
    const echo = ack.get('MSA.2');
    if (echo !== '' && echo !== sent.controlId()) {
      throw new Error(
        `MSA-2 (${echo}) does not match MSH-10 (${sent.controlId()}) — stale or misrouted ACK`,
      );
    }
    const code = (ack.get('MSA.1') || Ack.ERROR).toUpperCase();
    return {
      code,
      controlId: echo,
      text: ack.get('MSA.3'),
      attempts: 1,
      latencyMs: 0,
      accepted: code === Ack.ACCEPT,
    };
  }

  private async exchange(conn: Connection, message: Message): Promise<SendResult> {
    const started = Date.now();
    conn.socket.write(frame(message.toString()));
    const ackRaw = await this.readAck(conn);
    const result = this.interpret(message, ackRaw);
    result.latencyMs = Date.now() - started;
    return result;
  }

  private readAck(conn: Connection): Promise<string> {
    return new Promise((resolve, reject) => {
      const buffered = conn.reader.take();
      if (buffered) {
        resolve(buffered);
        return;
      }
      const timer = setTimeout(() => {
        cleanup();
        reject(new Error('no ACK within the timeout'));
      }, this.timeoutMs);

      const onData = (chunk: Buffer): void => {
        try {
          conn.reader.push(chunk.toString('latin1'));
        } catch (err) {
          cleanup();
          reject(err as Error);
          return;
        }
        const message = conn.reader.take();
        if (message) {
          cleanup();
          resolve(message);
        }
      };
      const onError = (err: Error): void => {
        cleanup();
        reject(err);
      };
      const cleanup = (): void => {
        clearTimeout(timer);
        conn.socket.off('data', onData);
        conn.socket.off('error', onError);
      };
      conn.socket.on('data', onData);
      conn.socket.on('error', onError);
    });
  }

  private connect(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      const socket = net.connect({ host: this.host, port: this.port });
      socket.setTimeout(this.timeoutMs);
      const onError = (err: Error): void => {
        socket.destroy();
        reject(err);
      };
      socket.once('error', onError);
      socket.once('connect', () => {
        socket.off('error', onError);
        // Keep a permanent error listener: an unhandled 'error' event crashes the process.
        socket.on('error', () => undefined);
        resolve({ socket, reader: new MllpReader() });
      });
    });
  }
}
