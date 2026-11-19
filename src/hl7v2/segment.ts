import { decode, encode } from './encoding';

/**
 * One HL7 v2 segment. Fields are kept as raw text and split on demand, so a message round-trips
 * byte-for-byte even when it contains repetitions or subcomponents this SDK does not model.
 */
export class Segment {
  /** 1-based field map; index 0 is unused because HL7 numbers fields from 1. */
  private fields: Record<number, string> = {};

  constructor(
    public readonly name: string,
    fields: Record<number, string> = {},
    private readonly fieldSeparator = '|',
  ) {
    this.fields = { ...fields };
  }

  /**
   * MSH is special: MSH-1 is the field separator itself and MSH-2 holds the encoding characters,
   * so its split starts one position later than every other segment.
   */
  static fromParts(parts: string[], separator = '|'): Segment {
    const [name = '', ...rest] = parts;
    const offset = name === 'MSH' ? 1 : 0;
    const fields: Record<number, string> = {};
    rest.forEach((value, i) => {
      fields[i + 1 + offset] = value;
    });
    if (name === 'MSH') fields[1] = separator;
    return new Segment(name, fields, separator);
  }

  field(n: number): string {
    return this.fields[n] ?? '';
  }

  /** Reads a path like "5.1" (field 5, component 1) or "3.1.2" (subcomponent). */
  get(path: string): string {
    const parts = path.split('.');
    const first = Number(parts.shift());
    const field = firstRepetition(this.field(first));
    if (parts.length === 0) return decode(field);

    const components = field.split('^');
    let value = components[Number(parts[0]) - 1] ?? '';
    if (parts.length > 1) {
      const subs = value.split('&');
      value = subs[Number(parts[1]) - 1] ?? '';
    }
    return decode(value);
  }

  /** All repetitions of a field, decoded — identifiers and phone numbers live here. */
  fieldAll(n: number): string[] {
    const raw = this.field(n);
    return raw === '' ? [] : raw.split('~').map(decode);
  }

  set(path: string, value: string): this {
    const parts = path.split('.');
    const n = Number(parts.shift());
    if (parts.length === 0) {
      this.fields[n] = encode(value);
      return this;
    }
    const reps = this.field(n) === '' ? [''] : this.field(n).split('~');
    const components = reps[0].split('^');
    components[Number(parts[0]) - 1] = encode(value);
    reps[0] = components.join('^');
    this.fields[n] = reps.join('~');
    return this;
  }

  toString(): string {
    const keys = Object.keys(this.fields).map(Number);
    const max = keys.length ? Math.max(...keys) : 0;
    // MSH keeps its separator in field 1; rendering from field 2 avoids "MSH|||".
    const first = this.name === 'MSH' ? 2 : 1;
    const out: string[] = [this.name];
    for (let i = first; i <= max; i++) out.push(this.fields[i] ?? '');
    while (out.length > 2 && out[out.length - 1] === '') out.pop();
    return out.join(this.fieldSeparator);
  }
}

function firstRepetition(value: string): string {
  const pos = value.indexOf('~');
  return pos === -1 ? value : value.slice(0, pos);
}
