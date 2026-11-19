/**
 * HL7 v2 escape sequences (chapter 2).
 *
 * A naive `split('|')` corrupts real messages: a pipe inside a patient name arrives as `\F\`, a caret
 * inside an address as `\S\`. Decoding happens on read and encoding on write, so what is stored is
 * exactly what went over the wire.
 */
const DECODE: Array<[string, string]> = [
  ['\\F\\', '|'],
  ['\\S\\', '^'],
  ['\\R\\', '~'],
  ['\\E\\', '\\'],
  ['\\T\\', '&'],
];

export function decode(value: string): string {
  if (!value.includes('\\')) return value;
  // \Xdd..\ carries raw bytes; \Z..\ (locally defined) and \.br\ (formatting) are left untouched,
  // because inventing a meaning for them would change clinical text.
  const withHex = value.replace(/\\X([0-9A-Fa-f]+)\\/g, (_m, hex: string) =>
    Buffer.from(hex, 'hex').toString('latin1'),
  );
  let out = withHex;
  for (const [seq, ch] of DECODE) out = out.split(seq).join(ch);
  return out;
}

export function encode(value: string): string {
  return value
    .replace(/\\/g, '\\E\\')
    .replace(/\|/g, '\\F\\')
    .replace(/\^/g, '\\S\\')
    .replace(/~/g, '\\R\\')
    .replace(/&/g, '\\T\\');
}

/** MSH-18 declares the charset; it is reported, never used to re-encode bytes. */
export function charsetOf(msh18: string | undefined): string {
  const v = (msh18 ?? '').trim().toUpperCase();
  if (v === '' || v === 'ASCII') return 'ASCII';
  if (['8859/1', 'ISO IR6', 'ISO IR100'].includes(v)) return 'ISO-8859-1';
  if (['UNICODE UTF-8', 'UNICODE UTF8', 'UTF-8'].includes(v)) return 'UTF-8';
  return v;
}
