/**
 * BillingStatusParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { BillingStatusParser } from './BillingStatusParser';

const data = JSON.parse(readFileSync(new URL('./testdata/BillingStatus.json', import.meta.url), 'utf8'));

describe('BillingStatusParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('BillingStatus');
    const parser = new BillingStatusParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getId()).toEqual(data['id']);
    expect(parser.getIdentifier()).toEqual(data['identifier']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getInsurer()).toEqual(data['insurer']);
    expect(parser.getRecipient()).toEqual(data['recipient']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getRequest()).toEqual(data['request']);
  });
});
