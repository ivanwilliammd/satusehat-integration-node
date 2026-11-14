/**
 * AccountParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { AccountParser } from './AccountParser';

const data = JSON.parse(readFileSync(new URL('./testdata/Account.json', import.meta.url), 'utf8'));

describe('AccountParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('Account');
    const parser = new AccountParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getType()).toEqual(data['type']);
    expect(parser.getName()).toEqual(data['name']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getServicePeriod()).toEqual(data['servicePeriod']);
    expect(parser.getOwner()).toEqual(data['owner']);
    expect(parser.getGuarantor()).toEqual(data['guarantor']);
    expect(parser.getDescription()).toEqual(data['description']);
  });
});
