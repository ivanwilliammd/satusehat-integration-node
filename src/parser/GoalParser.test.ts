/**
 * GoalParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { GoalParser } from './GoalParser';

const data = JSON.parse(readFileSync(new URL('./testdata/Goal.json', import.meta.url), 'utf8'));

describe('GoalParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('Goal');
    const parser = new GoalParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getId()).toEqual(data['id']);
    expect(parser.getLifecycleStatus()).toEqual(data['lifecycleStatus']);
    expect(parser.getAchievementStatus()).toEqual(data['achievementStatus']);
    expect(parser.getCategory()).toEqual(data['category']);
    expect(parser.getDescription()).toEqual(data['description']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getTarget()).toEqual(data['target']);
    expect(parser.getStatusDate()).toEqual(data['statusDate']);
    expect(parser.getExpressedBy()).toEqual(data['expressedBy']);
    expect(parser.getAddresses()).toEqual(data['addresses']);
    expect(parser.getOutcomeCode()).toEqual(data['outcomeCode']);
  });
});
