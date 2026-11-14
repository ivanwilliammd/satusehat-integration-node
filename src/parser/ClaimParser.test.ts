/**
 * ClaimParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { ClaimParser } from './ClaimParser';

const data = JSON.parse(readFileSync(new URL('./testdata/Claim.json', import.meta.url), 'utf8'));

describe('ClaimParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('Claim');
    const parser = new ClaimParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getType()).toEqual(data['type']);
    expect(parser.getUse()).toEqual(data['use']);
    expect(parser.getPatient()).toEqual(data['patient']);
    expect(parser.getBillablePeriod()).toEqual(data['billablePeriod']);
    expect(parser.getCreated()).toEqual(data['created']);
    expect(parser.getEnterer()).toEqual(data['enterer']);
    expect(parser.getInsurer()).toEqual(data['insurer']);
    expect(parser.getProvider()).toEqual(data['provider']);
    expect(parser.getPriority()).toEqual(data['priority']);
    expect(parser.getPayee()).toEqual(data['payee']);
    expect(parser.getFacility()).toEqual(data['facility']);
    expect(parser.getSupportingInfo()).toEqual(data['supportingInfo']);
    expect(parser.getDiagnosis()).toEqual(data['diagnosis']);
    expect(parser.getProcedure()).toEqual(data['procedure']);
    expect(parser.getInsurance()).toEqual(data['insurance']);
    expect(parser.getTotal()).toEqual(data['total']);
    expect(parser.getExtension()).toEqual(data['extension']);
  });
});
