/**
 * ChargeItemParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { ChargeItemParser } from './ChargeItemParser';

const data = JSON.parse(readFileSync(new URL('./testdata/ChargeItem.json', import.meta.url), 'utf8'));

describe('ChargeItemParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('ChargeItem');
    const parser = new ChargeItemParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getCode()).toEqual(data['code']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getContext()).toEqual(data['context']);
    expect(parser.getOccurrencePeriod()).toEqual(data['occurrencePeriod']);
    expect(parser.getPerformer()).toEqual(data['performer']);
    expect(parser.getQuantity()).toEqual(data['quantity']);
    expect(parser.getAccount()).toEqual(data['account']);
    expect(parser.getExtension()).toEqual(data['extension']);
  });
});
