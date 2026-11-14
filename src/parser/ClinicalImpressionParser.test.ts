/**
 * ClinicalImpressionParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { ClinicalImpressionParser } from './ClinicalImpressionParser';

const data = JSON.parse(readFileSync(new URL('./testdata/ClinicalImpression.json', import.meta.url), 'utf8'));

describe('ClinicalImpressionParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('ClinicalImpression');
    const parser = new ClinicalImpressionParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getCode()).toEqual(data['code']);
    expect(parser.getDescription()).toEqual(data['description']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getEncounter()).toEqual(data['encounter']);
    expect(parser.getEffectiveDateTime()).toEqual(data['effectiveDateTime']);
    expect(parser.getDate()).toEqual(data['date']);
    expect(parser.getAssessor()).toEqual(data['assessor']);
    expect(parser.getProblem()).toEqual(data['problem']);
    expect(parser.getInvestigation()).toEqual(data['investigation']);
    expect(parser.getSummary()).toEqual(data['summary']);
    expect(parser.getFinding()).toEqual(data['finding']);
    expect(parser.getPrognosisCodeableConcept()).toEqual(data['prognosisCodeableConcept']);
  });
});
