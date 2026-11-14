/**
 * PaymentReconciliationParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { PaymentReconciliationParser } from './PaymentReconciliationParser';

const data = JSON.parse(readFileSync(new URL('./testdata/PaymentReconciliation.json', import.meta.url), 'utf8'));

describe('PaymentReconciliationParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('PaymentReconciliation');
    const parser = new PaymentReconciliationParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getPeriod()).toEqual(data['period']);
    expect(parser.getCreated()).toEqual(data['created']);
    expect(parser.getPaymentIssuer()).toEqual(data['paymentIssuer']);
    expect(parser.getRequestor()).toEqual(data['requestor']);
    expect(parser.getOutcome()).toEqual(data['outcome']);
    expect(parser.getDisposition()).toEqual(data['disposition']);
    expect(parser.getPaymentDate()).toEqual(data['paymentDate']);
    expect(parser.getPaymentAmount()).toEqual(data['paymentAmount']);
    expect(parser.getDetail()).toEqual(data['detail']);
    expect(parser.getProcessNote()).toEqual(data['processNote']);
  });
});
