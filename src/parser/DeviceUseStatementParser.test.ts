/**
 * DeviceUseStatementParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { DeviceUseStatementParser } from './DeviceUseStatementParser';

const data = JSON.parse(readFileSync(new URL('./testdata/DeviceUseStatement.json', import.meta.url), 'utf8'));

describe('DeviceUseStatementParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('DeviceUseStatement');
    const parser = new DeviceUseStatementParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getDevice()).toEqual(data['device']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getTimingPeriod()).toEqual(data['timingPeriod']);
    expect(parser.getRecordedOn()).toEqual(data['recordedOn']);
    expect(parser.getSource()).toEqual(data['source']);
    expect(parser.getReasonCode()).toEqual(data['reasonCode']);
    expect(parser.getNote()).toEqual(data['note']);
  });
});
