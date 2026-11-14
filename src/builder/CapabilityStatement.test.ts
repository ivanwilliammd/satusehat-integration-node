// Per-resource test, generated for parity with the PHP suite where every resource has its own
// test file. Asserts the builder exists and emits the correct resourceType; field-level coverage
// grows as golden payloads land in satusehat-conformance.
import { describe, it, expect } from 'vitest';
import { CapabilityStatement } from './CapabilityStatement';

describe('CapabilityStatement', () => {
  it('builds a CapabilityStatement payload', () => {
    const payload = new CapabilityStatement().build();
    expect(payload.resourceType).toBe('CapabilityStatement');
  });
});
