/**
 * NutritionOrderParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { NutritionOrderParser } from './NutritionOrderParser';

const data = JSON.parse(readFileSync(new URL('./testdata/NutritionOrder.json', import.meta.url), 'utf8'));

describe('NutritionOrderParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('NutritionOrder');
    const parser = new NutritionOrderParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getIntent()).toEqual(data['intent']);
    expect(parser.getPatient()).toEqual(data['patient']);
    expect(parser.getEncounter()).toEqual(data['encounter']);
    expect(parser.getDateTime()).toEqual(data['dateTime']);
    expect(parser.getOralDiet()).toEqual(data['oralDiet']);
  });
});
