/**
 * CarePlanParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { CarePlanParser } from './CarePlanParser';

const data = JSON.parse(readFileSync(new URL('./testdata/CarePlan.json', import.meta.url), 'utf8'));

describe('CarePlanParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('CarePlan');
    const parser = new CarePlanParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getTitle()).toEqual(data['title']);
    expect(parser.getDescription()).toEqual(data['description']);
    expect(parser.getCategory()).toEqual(data['category']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getIntent()).toEqual(data['intent']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getEncounter()).toEqual(data['encounter']);
    expect(parser.getPeriod()).toEqual(data['period']);
    expect(parser.getCreated()).toEqual(data['created']);
    expect(parser.getAuthor()).toEqual(data['author']);
    expect(parser.getActivity()).toEqual(data['activity']);
  });
});
