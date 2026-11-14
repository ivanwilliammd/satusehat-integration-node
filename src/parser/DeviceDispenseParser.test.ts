/**
 * DeviceDispenseParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { DeviceDispenseParser } from './DeviceDispenseParser';

const data = JSON.parse(readFileSync(new URL('./testdata/DeviceDispense.json', import.meta.url), 'utf8'));

describe('DeviceDispenseParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('DeviceDispense');
    const parser = new DeviceDispenseParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getBasedOn()).toEqual(data['basedOn']);
    expect(parser.getDevice()).toEqual(data['device']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getReceiver()).toEqual(data['receiver']);
    expect(parser.getPerformer()).toEqual(data['performer']);
    expect(parser.getWhenPrepared()).toEqual(data['whenPrepared']);
    expect(parser.getWhenHandedOver()).toEqual(data['whenHandedOver']);
    expect(parser.getDestination()).toEqual(data['destination']);
    expect(parser.getNote()).toEqual(data['note']);
  });
});
