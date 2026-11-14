// Per-resource test, generated for parity with the PHP suite where every resource has its own
// test file. Asserts the builder exists and emits the correct resourceType; field-level coverage
// grows as golden payloads land in satusehat-conformance.
import { describe, it, expect } from 'vitest';
import { EvidenceBuilder } from './Evidence';

describe('Evidence', () => {
  it('builds a Evidence payload', () => {
    const payload = new EvidenceBuilder().build();
    expect(payload.resourceType).toBe('Evidence');
  });
});
