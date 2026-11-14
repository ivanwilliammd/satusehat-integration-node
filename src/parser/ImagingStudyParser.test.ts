/**
 * ImagingStudyParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { ImagingStudyParser } from './ImagingStudyParser';

const data = JSON.parse(readFileSync(new URL('./testdata/ImagingStudy.json', import.meta.url), 'utf8'));

describe('ImagingStudyParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('ImagingStudy');
    const parser = new ImagingStudyParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getId()).toEqual(data['id']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getModality()).toEqual(data['modality']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getStarted()).toEqual(data['started']);
    expect(parser.getBasedOn()).toEqual(data['basedOn']);
    expect(parser.getNumberOfSeries()).toEqual(data['numberOfSeries']);
    expect(parser.getNumberOfInstances()).toEqual(data['numberOfInstances']);
    expect(parser.getDescription()).toEqual(data['description']);
    expect(parser.getSeries()).toEqual(data['series']);
  });
});
