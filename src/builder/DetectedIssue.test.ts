// Per-resource test, generated for parity with the PHP suite where every resource has its own
// test file. Asserts the builder exists and emits the correct resourceType; field-level coverage
// grows as golden payloads land in satusehat-conformance.
import { describe, it, expect } from 'vitest';
import { DetectedIssueBuilder } from './DetectedIssue';

describe('DetectedIssue', () => {
  it('builds a DetectedIssue payload', () => {
    const payload = new DetectedIssueBuilder().build();
    expect(payload.resourceType).toBe('DetectedIssue');
  });
});
