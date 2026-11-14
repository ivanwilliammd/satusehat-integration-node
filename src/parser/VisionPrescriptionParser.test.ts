/**
 * VisionPrescriptionParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { VisionPrescriptionParser } from './VisionPrescriptionParser';

const data = JSON.parse(readFileSync(new URL('./testdata/VisionPrescription.json', import.meta.url), 'utf8'));

describe('VisionPrescriptionParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('VisionPrescription');
    const parser = new VisionPrescriptionParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getCreated()).toEqual(data['created']);
    expect(parser.getPatient()).toEqual(data['patient']);
    expect(parser.getEncounter()).toEqual(data['encounter']);
    expect(parser.getDateWritten()).toEqual(data['dateWritten']);
    expect(parser.getPrescriber()).toEqual(data['prescriber']);
    expect(parser.getLensSpecification()).toEqual(data['lensSpecification']);
  });
});
