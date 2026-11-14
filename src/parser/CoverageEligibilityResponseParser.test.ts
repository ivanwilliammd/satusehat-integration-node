/**
 * CoverageEligibilityResponseParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { CoverageEligibilityResponseParser } from './CoverageEligibilityResponseParser';

const data = JSON.parse(readFileSync(new URL('./testdata/CoverageEligibilityResponse.json', import.meta.url), 'utf8'));

describe('CoverageEligibilityResponseParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('CoverageEligibilityResponse');
    const parser = new CoverageEligibilityResponseParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getPurpose()).toEqual(data['purpose']);
    expect(parser.getPatient()).toEqual(data['patient']);
    expect(parser.getCreated()).toEqual(data['created']);
    expect(parser.getRequestor()).toEqual(data['requestor']);
    expect(parser.getRequest()).toEqual(data['request']);
    expect(parser.getOutcome()).toEqual(data['outcome']);
    expect(parser.getDisposition()).toEqual(data['disposition']);
    expect(parser.getInsurer()).toEqual(data['insurer']);
    expect(parser.getInsurance()).toEqual(data['insurance']);
    expect(parser.getExtension()).toEqual(data['extension']);
  });
});
