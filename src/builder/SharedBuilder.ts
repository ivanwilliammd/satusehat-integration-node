import type { Identifier, HumanName, Address, ContactPoint, CodeableConcept,
  Reference, Period, Coding, Annotation, Quantity, Range, Ratio } from '../datatype/datatypes';

/** Shared builder utilities for all FHIR resource builders. */
export abstract class SharedBuilder<T extends Record<string, unknown> = Record<string, unknown>> {
  protected data: Record<string, unknown> = {};

  protected set(path: string, value: unknown): void {
    if (path.includes('/')) {
      const keys = path.split('/');
      const last = keys.pop()!;
      let ref: Record<string, unknown> = this.data;
      for (const k of keys) {
        if (ref[k] === undefined || ref[k] === null) ref[k] = {};
        ref = ref[k] as Record<string, unknown>;
      }
      ref[last] = value;
      return;
    }
    this.data[path] = value;
  }

  protected push(path: string, value: unknown): void {
    const existing = this.data[path];
    if (existing === undefined) {
      this.data[path] = [value];
    } else if (Array.isArray(existing)) {
      existing.push(value);
    }
  }

  protected nestedToArray(v: unknown): unknown {
    if (v === null || v === undefined) return v;
    if (typeof v === 'object' && 'toArray' in (v as Record<string, unknown>)) {
      return ((v as { toArray: () => unknown }).toArray)();
    }
    if (Array.isArray(v)) return (v as unknown[]).map(x => this.nestedToArray(x));
    return v;
  }

  protected addIdentifier(identifier: Identifier): void {
    this.push('identifier', this.nestedToArray(identifier));
  }

  protected addExtension(url: string, value: unknown, valueType?: string): void {
    const ext: Record<string, unknown> = { url };
    if (valueType !== undefined) {
      ext['value' + valueType.charAt(0).toUpperCase() + valueType.slice(1)] = value;
    } else {
      ext['valueString'] = typeof value === 'string' ? value : value;
    }
    this.push('extension', ext);
  }

  build(): T {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) =>
        v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0)
      )
    ) as T;
  }
}
