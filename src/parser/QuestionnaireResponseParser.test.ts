/**
 * QuestionnaireResponseParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { QuestionnaireResponseParser } from './QuestionnaireResponseParser';

const data = JSON.parse(readFileSync(new URL('./testdata/QuestionnaireResponse.json', import.meta.url), 'utf8'));

describe('QuestionnaireResponseParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('QuestionnaireResponse');
    const parser = new QuestionnaireResponseParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getQuestionnaire()).toEqual(data['questionnaire']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getEncounter()).toEqual(data['encounter']);
    expect(parser.getAuthored()).toEqual(data['authored']);
    expect(parser.getAuthor()).toEqual(data['author']);
    expect(parser.getSource()).toEqual(data['source']);
    expect(parser.getItem()).toEqual(data['item']);
  });
});
