/**
 * CoverageParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { CoverageParser } from './CoverageParser';

const data = JSON.parse(readFileSync(new URL('./testdata/Coverage.json', import.meta.url), 'utf8'));

describe('CoverageParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('Coverage');
    const parser = new CoverageParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getType()).toEqual(data['type']);
    expect(parser.getSubscriberId()).toEqual(data['subscriberId']);
    expect(parser.getBeneficiary()).toEqual(data['beneficiary']);
    expect(parser.getPayor()).toEqual(data['payor']);
    expect(parser.getClass()).toEqual(data['class']);
    expect(parser.getExtension()).toEqual(data['extension']);
  });
});
