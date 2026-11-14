/**
 * PaymentNoticeParser is checked against the official example payload, element by element: every accessor
 * must return exactly what the payload holds, so a renamed key fails here.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { PaymentNoticeParser } from './PaymentNoticeParser';

const data = JSON.parse(readFileSync(new URL('./testdata/PaymentNotice.json', import.meta.url), 'utf8'));

describe('PaymentNoticeParser', () => {
  it('matches the official example element by element', () => {
    expect(data.resourceType).toBe('PaymentNotice');
    const parser = new PaymentNoticeParser(data);
    expect(parser.getRaw()).toEqual(data);
    expect(parser.getResourceType()).toEqual(data['resourceType']);
    expect(parser.getStatus()).toEqual(data['status']);
    expect(parser.getRequest()).toEqual(data['request']);
    expect(parser.getResponse()).toEqual(data['response']);
    expect(parser.getCreated()).toEqual(data['created']);
    expect(parser.getPaymentDate()).toEqual(data['paymentDate']);
    expect(parser.getProvider()).toEqual(data['provider']);
    expect(parser.getPayee()).toEqual(data['payee']);
    expect(parser.getRecipient()).toEqual(data['recipient']);
    expect(parser.getAmount()).toEqual(data['amount']);
    expect(parser.getPayment()).toEqual(data['payment']);
    expect(parser.getPaymentStatus()).toEqual(data['paymentStatus']);
  });
});
