/**
 * ImmunizationParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { ImmunizationParser } from './ImmunizationParser';

const data = JSON.parse(readFileSync(new URL('./testdata/Immunization.json', import.meta.url), 'utf8'));

describe('ImmunizationParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('Immunization');
    const parser = new ImmunizationParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getVaccineCode()).toEqual(data['vaccineCode']);
    expect(parser.getPatient()).toEqual(data['patient']);
    expect(parser.getEncounter()).toEqual(data['encounter']);
    expect(parser.getOccurrenceDateTime()).toEqual(data['occurrenceDateTime']);
    expect(parser.getRecorded()).toEqual(data['recorded']);
    expect(parser.getReaction()).toEqual(data['reaction']);
    expect(parser.getPrimarySource()).toEqual(data['primarySource']);
    expect(parser.getLocation()).toEqual(data['location']);
    expect(parser.getLotNumber()).toEqual(data['lotNumber']);
    expect(parser.getExpirationDate()).toEqual(data['expirationDate']);
    expect(parser.getRoute()).toEqual(data['route']);
    expect(parser.getDoseQuantity()).toEqual(data['doseQuantity']);
    expect(parser.getPerformer()).toEqual(data['performer']);
    expect(parser.getReasonCode()).toEqual(data['reasonCode']);
    expect(parser.getProtocolApplied()).toEqual(data['protocolApplied']);
  });
});
