/**
 * CommunicationRequestParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { CommunicationRequestParser } from './CommunicationRequestParser';

const data = JSON.parse(readFileSync(new URL('./testdata/CommunicationRequest.json', import.meta.url), 'utf8'));

describe('CommunicationRequestParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('CommunicationRequest');
    const parser = new CommunicationRequestParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getCategory()).toEqual(data['category']);
    expect(parser.getPayload()).toEqual(data['payload']);
    expect(parser.getAbout()).toEqual(data['about']);
    expect(parser.getSender()).toEqual(data['sender']);
    expect(parser.getRecipient()).toEqual(data['recipient']);
  });
});
