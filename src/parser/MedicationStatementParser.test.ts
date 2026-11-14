/**
 * MedicationStatementParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { MedicationStatementParser } from './MedicationStatementParser';

const data = JSON.parse(readFileSync(new URL('./testdata/MedicationStatement.json', import.meta.url), 'utf8'));

describe('MedicationStatementParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('MedicationStatement');
    const parser = new MedicationStatementParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getContained()).toEqual(data['contained']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getCategory()).toEqual(data['category']);
    expect(parser.getMedicationReference()).toEqual(data['medicationReference']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getDosage()).toEqual(data['dosage']);
    expect(parser.getEffectiveDateTime()).toEqual(data['effectiveDateTime']);
    expect(parser.getDateAsserted()).toEqual(data['dateAsserted']);
    expect(parser.getInformationSource()).toEqual(data['informationSource']);
    expect(parser.getContext()).toEqual(data['context']);
  });
});
