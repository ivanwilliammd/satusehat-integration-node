/**
 * MedicationRequestParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { MedicationRequestParser } from './MedicationRequestParser';

const data = JSON.parse(readFileSync(new URL('./testdata/MedicationRequest.json', import.meta.url), 'utf8'));

describe('MedicationRequestParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('MedicationRequest');
    const parser = new MedicationRequestParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getContained()).toEqual(data['contained']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getIntent()).toEqual(data['intent']);
    expect(parser.getCategory()).toEqual(data['category']);
    expect(parser.getPriority()).toEqual(data['priority']);
    expect(parser.getMedicationReference()).toEqual(data['medicationReference']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getEncounter()).toEqual(data['encounter']);
    expect(parser.getAuthoredOn()).toEqual(data['authoredOn']);
    expect(parser.getRequester()).toEqual(data['requester']);
    expect(parser.getCourseOfTherapyType()).toEqual(data['courseOfTherapyType']);
    expect(parser.getDosageInstruction()).toEqual(data['dosageInstruction']);
    expect(parser.getDispenseRequest()).toEqual(data['dispenseRequest']);
  });
});
