/**
 * Minimal Lower Layer Protocol framing: VT ... FS CR.
 *
 * The two string helpers are trivial; the stateful reader is not. MLLP arrives in arbitrary TCP
 * chunks and one read() routinely returns several frames, so a stateless reader would hand back the
 * first message and silently discard the rest.
 */
export const VT = '\x0b';
export const FS = '\x1c';
export const CR = '\x0d';

export function frame(message: string): string {
  return `${VT}${message}${FS}${CR}`;
}

export function unframe(frameText: string): string {
  return frameText.replace(VT, '').replace(`${FS}${CR}`, '').trim();
}

/** Extracts one frame: [message, remaining buffer]. */
export function shift(buffer: string): [string, string] {
  const start = buffer.indexOf(VT);
  if (start === -1) return ['', buffer];
  const end = buffer.indexOf(FS, start);
  if (end === -1) return ['', buffer];
  return [buffer.slice(start + 1, end), buffer.slice(end + 2)];
}

export function split(stream: string): string[] {
  const out: string[] = [];
  let buffer = stream;
  for (;;) {
    const [message, rest] = shift(buffer);
    if (!message) break;
    out.push(message);
    buffer = rest;
  }
  return out;
}

/** Keeps the bytes that arrived after the last complete frame. */
export class MllpReader {
  private buffer = '';

  constructor(private readonly maxBytes = 4 * 1024 * 1024) {}

  push(chunk: string): void {
    this.buffer += chunk;
    if (this.buffer.length > this.maxBytes) throw new Error('MLLP frame exceeds the 4 MB limit.');
  }

  /** Returns one complete message, or null when only a partial frame is buffered. */
  take(): string | null {
    const [message, rest] = shift(this.buffer);
    if (!message) return null;
    this.buffer = rest;
    return message;
  }
}
