/**
 * ConditionParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { ConditionParser } from './ConditionParser';

const data = JSON.parse(readFileSync(new URL('./testdata/Condition.json', import.meta.url), 'utf8'));

describe('ConditionParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('Condition');
    const parser = new ConditionParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getClinicalStatus()).toEqual(data['clinicalStatus']);
    expect(parser.getVerificationStatus()).toEqual(data['verificationStatus']);
    expect(parser.getCategory()).toEqual(data['category']);
    expect(parser.getCode()).toEqual(data['code']);
    expect(parser.getStage()).toEqual(data['stage']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getEncounter()).toEqual(data['encounter']);
    expect(parser.getRecordedDate()).toEqual(data['recordedDate']);
  });
});
