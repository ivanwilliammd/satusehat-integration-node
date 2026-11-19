import { Segment } from './segment';
import { charsetOf } from './encoding';

export class HL7Error extends Error {}

/**
 * An HL7 v2 message: an ordered list of segments, addressed by name.
 *
 *   const msg = Message.parse(er7);
 *   msg.get('PID.5.1');     // family name, escapes decoded
 *   msg.set('PID.8', 'F');  // re-escaped on write
 *   msg.toString();         // ER7, CR-terminated
 */
export class Message {
  private constructor(
    private readonly segments: Segment[],
    private readonly separator = '|',
  ) {}

  static parse(er7: string): Message {
    const cleaned = er7.replace(/[\x0b\x1c]/g, '').trim();
    if (cleaned === '') throw new HL7Error('Empty HL7 message.');

    const lines = cleaned.split(/\r\n|\r|\n/).filter((l) => l.trim() !== '');
    const segments: Segment[] = [];
    let separator = '|';

    for (const line of lines) {
      const sep = line[3] ?? '|';
      const parts = line.split(sep);
      if (!parts[0]) continue;
      if (parts[0] === 'MSH') separator = sep;
      segments.push(Segment.fromParts(parts, sep));
    }

    if (!segments.length || segments[0].name !== 'MSH') {
      throw new HL7Error('HL7 message must start with an MSH segment.');
    }
    return new Message(segments, separator);
  }

  static fromSegments(segments: Segment[], separator = '|'): Message {
    return new Message(segments, separator);
  }

  all(): Segment[] {
    return this.segments;
  }

  segment(name: string, occurrence = 1): Segment | undefined {
    let seen = 0;
    for (const s of this.segments) {
      if (s.name === name && ++seen === occurrence) return s;
    }
    return undefined;
  }

  allOf(name: string): Segment[] {
    return this.segments.filter((s) => s.name === name);
  }

  get(path: string): string {
    const [name, rest] = splitPath(path);
    const seg = this.segment(name);
    return seg && rest ? seg.get(rest) : '';
  }

  set(path: string, value: string): this {
    const [name, rest] = splitPath(path);
    const seg = this.segment(name);
    if (seg && rest) seg.set(rest, value);
    return this;
  }

  messageType(): string {
    return this.get('MSH.9.1');
  }

  triggerEvent(): string {
    return this.get('MSH.9.2');
  }

  controlId(): string {
    return this.get('MSH.10');
  }

  version(): string {
    return this.get('MSH.12.1');
  }

  charset(): string {
    return charsetOf(this.segment('MSH')?.field(18));
  }

  toString(): string {
    const body = this.segments.map((s) => s.toString()).join('\r');
    return body === '' ? '' : `${body}\r`;
  }
}

function splitPath(path: string): [string, string] {
  const idx = path.indexOf('.');
  return idx === -1 ? [path, ''] : [path.slice(0, idx), path.slice(idx + 1)];
}
