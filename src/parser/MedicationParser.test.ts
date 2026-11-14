/**
 * MedicationParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { MedicationParser } from './MedicationParser';

const data = JSON.parse(readFileSync(new URL('./testdata/Medication.json', import.meta.url), 'utf8'));

describe('MedicationParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('Medication');
    const parser = new MedicationParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getMeta()).toEqual(data['meta']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getCode()).toEqual(data['code']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getManufacturer()).toEqual(data['manufacturer']);
    expect(parser.getForm()).toEqual(data['form']);
    expect(parser.getIngredient()).toEqual(data['ingredient']);
    expect(parser.getBatch()).toEqual(data['batch']);
    expect(parser.getExtension()).toEqual(data['extension']);
  });
});
