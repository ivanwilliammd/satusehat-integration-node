// Per-resource test, generated for parity with the PHP suite where every resource has its own
// test file. Asserts the builder exists and emits the correct resourceType; field-level coverage
// grows as golden payloads land in satusehat-conformance.
import { describe, it, expect } from 'vitest';
import { MedicinalProductIndication } from './MedicinalProductIndication';

describe('MedicinalProductIndication', () => {
  it('builds a MedicinalProductIndication payload', () => {
    const payload = new MedicinalProductIndication().build();
    expect(payload.resourceType).toBe('MedicinalProductIndication');
  });
});
