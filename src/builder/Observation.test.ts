// Per-resource test, generated for parity with the PHP suite where every resource has its own
// test file. Asserts the builder exists and emits the correct resourceType; field-level coverage
// grows as golden payloads land in satusehat-conformance.
import { describe, it, expect } from 'vitest';
import { Observation } from './Observation';

describe('Observation', () => {
  it('builds a Observation payload', () => {
    const payload = new Observation().build();
    expect(payload.resourceType).toBe('Observation');
  });
});
