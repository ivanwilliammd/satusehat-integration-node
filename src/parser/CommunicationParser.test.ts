/**
 * CommunicationParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { CommunicationParser } from './CommunicationParser';

const data = JSON.parse(readFileSync(new URL('./testdata/Communication.json', import.meta.url), 'utf8'));

describe('CommunicationParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('Communication');
    const parser = new CommunicationParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getBasedOn()).toEqual(data['basedOn']);
    expect(parser.getPayload()).toEqual(data['payload']);
    expect(parser.getAbout()).toEqual(data['about']);
    expect(parser.getInResponseTo()).toEqual(data['inResponseTo']);
    expect(parser.getSender()).toEqual(data['sender']);
    expect(parser.getRecipient()).toEqual(data['recipient']);
  });
});
