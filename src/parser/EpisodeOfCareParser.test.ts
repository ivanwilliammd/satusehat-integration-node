/**
 * EpisodeOfCareParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { EpisodeOfCareParser } from './EpisodeOfCareParser';

const data = JSON.parse(readFileSync(new URL('./testdata/EpisodeOfCare.json', import.meta.url), 'utf8'));

describe('EpisodeOfCareParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('EpisodeOfCare');
    const parser = new EpisodeOfCareParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getId()).toEqual(data['id']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getStatusHistory()).toEqual(data['statusHistory']);
    expect(parser.getType()).toEqual(data['type']);
    expect(parser.getDiagnosis()).toEqual(data['diagnosis']);
    expect(parser.getPatient()).toEqual(data['patient']);
    expect(parser.getManagingOrganization()).toEqual(data['managingOrganization']);
    expect(parser.getPeriod()).toEqual(data['period']);
    expect(parser.getCareManager()).toEqual(data['careManager']);
  });
});
