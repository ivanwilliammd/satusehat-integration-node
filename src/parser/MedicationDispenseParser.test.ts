/**
 * MedicationDispenseParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { MedicationDispenseParser } from './MedicationDispenseParser';

const data = JSON.parse(readFileSync(new URL('./testdata/MedicationDispense.json', import.meta.url), 'utf8'));

describe('MedicationDispenseParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('MedicationDispense');
    const parser = new MedicationDispenseParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getContained()).toEqual(data['contained']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getCategory()).toEqual(data['category']);
    expect(parser.getMedicationReference()).toEqual(data['medicationReference']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getContext()).toEqual(data['context']);
    expect(parser.getPerformer()).toEqual(data['performer']);
    expect(parser.getLocation()).toEqual(data['location']);
    expect(parser.getAuthorizingPrescription()).toEqual(data['authorizingPrescription']);
    expect(parser.getQuantity()).toEqual(data['quantity']);
    expect(parser.getDaysSupply()).toEqual(data['daysSupply']);
    expect(parser.getWhenPrepared()).toEqual(data['whenPrepared']);
    expect(parser.getWhenHandedOver()).toEqual(data['whenHandedOver']);
    expect(parser.getDosageInstruction()).toEqual(data['dosageInstruction']);
  });
});
