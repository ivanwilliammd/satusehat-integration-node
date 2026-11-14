/**
 * CoverageEligibilityRequestParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { CoverageEligibilityRequestParser } from './CoverageEligibilityRequestParser';

const data = JSON.parse(readFileSync(new URL('./testdata/CoverageEligibilityRequest.json', import.meta.url), 'utf8'));

describe('CoverageEligibilityRequestParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('CoverageEligibilityRequest');
    const parser = new CoverageEligibilityRequestParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getPriority()).toEqual(data['priority']);
    expect(parser.getPurpose()).toEqual(data['purpose']);
    expect(parser.getPatient()).toEqual(data['patient']);
    expect(parser.getServicedDate()).toEqual(data['servicedDate']);
    expect(parser.getCreated()).toEqual(data['created']);
    expect(parser.getEnterer()).toEqual(data['enterer']);
    expect(parser.getProvider()).toEqual(data['provider']);
    expect(parser.getInsurer()).toEqual(data['insurer']);
    expect(parser.getFacility()).toEqual(data['facility']);
    expect(parser.getInsurance()).toEqual(data['insurance']);
    expect(parser.getSupportingInfo()).toEqual(data['supportingInfo']);
    expect(parser.getContained()).toEqual(data['contained']);
  });
});
