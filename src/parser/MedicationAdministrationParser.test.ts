/**
 * MedicationAdministrationParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { MedicationAdministrationParser } from './MedicationAdministrationParser';

const data = JSON.parse(readFileSync(new URL('./testdata/MedicationAdministration.json', import.meta.url), 'utf8'));

describe('MedicationAdministrationParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('MedicationAdministration');
    const parser = new MedicationAdministrationParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getContained()).toEqual(data['contained']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getCategory()).toEqual(data['category']);
    expect(parser.getMedicationReference()).toEqual(data['medicationReference']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getContext()).toEqual(data['context']);
    expect(parser.getEffectivePeriod()).toEqual(data['effectivePeriod']);
    expect(parser.getPerformer()).toEqual(data['performer']);
    expect(parser.getReasonCode()).toEqual(data['reasonCode']);
    expect(parser.getRequest()).toEqual(data['request']);
    expect(parser.getDosage()).toEqual(data['dosage']);
  });
});
