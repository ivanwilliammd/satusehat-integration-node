/**
 * AllergyIntoleranceParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { AllergyIntoleranceParser } from './AllergyIntoleranceParser';

const data = JSON.parse(readFileSync(new URL('./testdata/AllergyIntolerance.json', import.meta.url), 'utf8'));

describe('AllergyIntoleranceParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('AllergyIntolerance');
    const parser = new AllergyIntoleranceParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getClinicalStatus()).toEqual(data['clinicalStatus']);
    expect(parser.getVerificationStatus()).toEqual(data['verificationStatus']);
    expect(parser.getCategory()).toEqual(data['category']);
    expect(parser.getCode()).toEqual(data['code']);
    expect(parser.getPatient()).toEqual(data['patient']);
    expect(parser.getEncounter()).toEqual(data['encounter']);
    expect(parser.getRecordedDate()).toEqual(data['recordedDate']);
    expect(parser.getRecorder()).toEqual(data['recorder']);
  });
});
