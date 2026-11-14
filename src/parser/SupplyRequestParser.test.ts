/**
 * SupplyRequestParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { SupplyRequestParser } from './SupplyRequestParser';

const data = JSON.parse(readFileSync(new URL('./testdata/SupplyRequest.json', import.meta.url), 'utf8'));

describe('SupplyRequestParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('SupplyRequest');
    const parser = new SupplyRequestParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getItemReference()).toEqual(data['itemReference']);
    expect(parser.getQuantity()).toEqual(data['quantity']);
    expect(parser.getAuthoredOn()).toEqual(data['authoredOn']);
    expect(parser.getRequester()).toEqual(data['requester']);
    expect(parser.getSupplier()).toEqual(data['supplier']);
    expect(parser.getReasonCode()).toEqual(data['reasonCode']);
  });
});
