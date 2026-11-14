/**
 * FamilyMemberHistoryParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { FamilyMemberHistoryParser } from './FamilyMemberHistoryParser';

const data = JSON.parse(readFileSync(new URL('./testdata/FamilyMemberHistory.json', import.meta.url), 'utf8'));

describe('FamilyMemberHistoryParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('FamilyMemberHistory');
    const parser = new FamilyMemberHistoryParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getRelationship()).toEqual(data['relationship']);
    expect(parser.getDeceasedBoolean()).toEqual(data['deceasedBoolean']);
    expect(parser.getPatient()).toEqual(data['patient']);
    expect(parser.getDate()).toEqual(data['date']);
    expect(parser.getCondition()).toEqual(data['condition']);
  });
});
