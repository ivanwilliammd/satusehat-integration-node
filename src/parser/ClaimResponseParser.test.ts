/**
 * ClaimResponseParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { ClaimResponseParser } from './ClaimResponseParser';

const data = JSON.parse(readFileSync(new URL('./testdata/ClaimResponse.json', import.meta.url), 'utf8'));

describe('ClaimResponseParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('ClaimResponse');
    const parser = new ClaimResponseParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getType()).toEqual(data['type']);
    expect(parser.getUse()).toEqual(data['use']);
    expect(parser.getPatient()).toEqual(data['patient']);
    expect(parser.getCreated()).toEqual(data['created']);
    expect(parser.getInsurer()).toEqual(data['insurer']);
    expect(parser.getRequestor()).toEqual(data['requestor']);
    expect(parser.getRequest()).toEqual(data['request']);
    expect(parser.getOutcome()).toEqual(data['outcome']);
    expect(parser.getPayeeType()).toEqual(data['payeeType']);
    expect(parser.getAdjudication()).toEqual(data['adjudication']);
    expect(parser.getItem()).toEqual(data['item']);
    expect(parser.getTotal()).toEqual(data['total']);
    expect(parser.getPayment()).toEqual(data['payment']);
  });
});
