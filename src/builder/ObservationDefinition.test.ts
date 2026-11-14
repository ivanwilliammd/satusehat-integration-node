// Per-resource test, generated for parity with the PHP suite where every resource has its own
// test file. Asserts the builder exists and emits the correct resourceType; field-level coverage
// grows as golden payloads land in satusehat-conformance.
import { describe, it, expect } from 'vitest';
import { ObservationDefinition } from './ObservationDefinition';

describe('ObservationDefinition', () => {
  it('builds a ObservationDefinition payload', () => {
    const payload = new ObservationDefinition().build();
    expect(payload.resourceType).toBe('ObservationDefinition');
  });
});
