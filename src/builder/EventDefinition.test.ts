// Per-resource test, generated for parity with the PHP suite where every resource has its own
// test file. Asserts the builder exists and emits the correct resourceType; field-level coverage
// grows as golden payloads land in satusehat-conformance.
import { describe, it, expect } from 'vitest';
import { EventDefinitionBuilder } from './EventDefinition';

describe('EventDefinition', () => {
  it('builds a EventDefinition payload', () => {
    const payload = new EventDefinitionBuilder().build();
    expect(payload.resourceType).toBe('EventDefinition');
  });
});
