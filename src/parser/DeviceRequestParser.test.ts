/**
 * DeviceRequestParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { DeviceRequestParser } from './DeviceRequestParser';

const data = JSON.parse(readFileSync(new URL('./testdata/DeviceRequest.json', import.meta.url), 'utf8'));

describe('DeviceRequestParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('DeviceRequest');
    const parser = new DeviceRequestParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getIntent()).toEqual(data['intent']);
    expect(parser.getPriority()).toEqual(data['priority']);
    expect(parser.getCodeReference()).toEqual(data['codeReference']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getAuthoredOn()).toEqual(data['authoredOn']);
    expect(parser.getRequester()).toEqual(data['requester']);
    expect(parser.getPerformer()).toEqual(data['performer']);
    expect(parser.getReasonCode()).toEqual(data['reasonCode']);
  });
});
