/**
 * ChargeItemResponseParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { ChargeItemResponseParser } from './ChargeItemResponseParser';

const data = JSON.parse(readFileSync(new URL('./testdata/ChargeItemResponse.json', import.meta.url), 'utf8'));

describe('ChargeItemResponseParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('ChargeItemResponse');
    const parser = new ChargeItemResponseParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getId()).toEqual(data['id']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getChargeItem()).toEqual(data['chargeItem']);
    expect(parser.getCoverage()).toEqual(data['coverage']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getEncounter()).toEqual(data['encounter']);
    expect(parser.getPayor()).toEqual(data['payor']);
    expect(parser.getQuantity()).toEqual(data['quantity']);
    expect(parser.getUnitPriceOverride()).toEqual(data['unitPriceOverride']);
    expect(parser.getFactorOverride()).toEqual(data['factorOverride']);
    expect(parser.getOverrideReason()).toEqual(data['overrideReason']);
    expect(parser.getTotal()).toEqual(data['total']);
    expect(parser.getExcess()).toEqual(data['excess']);
  });
});
