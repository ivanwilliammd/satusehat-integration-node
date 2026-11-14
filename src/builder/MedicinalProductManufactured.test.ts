// Per-resource test, generated for parity with the PHP suite where every resource has its own
// test file. Asserts the builder exists and emits the correct resourceType; field-level coverage
// grows as golden payloads land in satusehat-conformance.
import { describe, it, expect } from 'vitest';
import { MedicinalProductManufactured } from './MedicinalProductManufactured';

describe('MedicinalProductManufactured', () => {
  it('builds a MedicinalProductManufactured payload', () => {
    const payload = new MedicinalProductManufactured().build();
    expect(payload.resourceType).toBe('MedicinalProductManufactured');
  });
});
