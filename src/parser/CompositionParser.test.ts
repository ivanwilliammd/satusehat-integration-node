/**
 * CompositionParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { CompositionParser } from './CompositionParser';

const data = JSON.parse(readFileSync(new URL('./testdata/Composition.json', import.meta.url), 'utf8'));

describe('CompositionParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('Composition');
    const parser = new CompositionParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getAttester()).toEqual(data['attester']);
    expect(parser.getType()).toEqual(data['type']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getEncounter()).toEqual(data['encounter']);
    expect(parser.getDate()).toEqual(data['date']);
    expect(parser.getAuthor()).toEqual(data['author']);
    expect(parser.getTitle()).toEqual(data['title']);
    expect(parser.getSection()).toEqual(data['section']);
  });
});
