/**
 * SupplyDeliveryParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { SupplyDeliveryParser } from './SupplyDeliveryParser';

const data = JSON.parse(readFileSync(new URL('./testdata/SupplyDelivery.json', import.meta.url), 'utf8'));

describe('SupplyDeliveryParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('SupplyDelivery');
    const parser = new SupplyDeliveryParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getBasedOn()).toEqual(data['basedOn']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getPatient()).toEqual(data['patient']);
    expect(parser.getSuppliedItem()).toEqual(data['suppliedItem']);
    expect(parser.getOccurrenceDateTime()).toEqual(data['occurrenceDateTime']);
    expect(parser.getSupplier()).toEqual(data['supplier']);
    expect(parser.getDestination()).toEqual(data['destination']);
    expect(parser.getReceiver()).toEqual(data['receiver']);
  });
});
