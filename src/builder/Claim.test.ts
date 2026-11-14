// Per-resource test, generated for parity with the PHP suite where every resource has its own
// test file. Asserts the builder exists and emits the correct resourceType; field-level coverage
// grows as golden payloads land in satusehat-conformance.
import { describe, it, expect } from 'vitest';
import { Claim } from './Claim';

describe('Claim', () => {
  it('builds a Claim payload', () => {
    const payload = new Claim().build();
    expect(payload.resourceType).toBe('Claim');
  });
});
