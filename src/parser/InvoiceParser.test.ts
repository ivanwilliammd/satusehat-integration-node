/**
 * InvoiceParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { InvoiceParser } from './InvoiceParser';

const data = JSON.parse(readFileSync(new URL('./testdata/Invoice.json', import.meta.url), 'utf8'));

describe('InvoiceParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('Invoice');
    const parser = new InvoiceParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getSubject()).toEqual(data['subject']);
    expect(parser.getDate()).toEqual(data['date']);
    expect(parser.getIssuer()).toEqual(data['issuer']);
    expect(parser.getAccount()).toEqual(data['account']);
    expect(parser.getLineItem()).toEqual(data['lineItem']);
    expect(parser.getTotalNet()).toEqual(data['totalNet']);
  });
});
