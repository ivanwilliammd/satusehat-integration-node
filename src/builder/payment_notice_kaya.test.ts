/**
 * PaymentNotice: 14 setter kanon + satu setter sah R4 (amount).
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { PaymentNotice } from './PaymentNotice';

const golden = () =>
  JSON.parse(readFileSync(new URL('./testdata/payment_notice_kaya_php_golden.json', import.meta.url), 'utf8'));

function isi(): PaymentNotice {
  return new PaymentNotice()
    .setId('pn-1')
    .addIdentifier('http://sys.id/ni', 'NI-2000')
    .setStatus('active')
    .setRequest('Claim/c-1')
    .setResponse('ClaimResponse/cr-1')
    .setStatusDate('2026-01-10')
    .setCreated('2026-01-09T10:00:00+07:00')
    .setProvider('Organization/1000000001')
    .setPayee('Organization/1000000002')
    .setPayment(250000, 'IDR')
    .setPaymentDate('2026-01-10')
    .setPaymentStatus('http://terminology.hl7.org/CodeSystem/paymentstatus', 'paid', 'Paid')
    .setInsurer('Organization/1000000003')
    .setPaymentReconciliation('PaymentReconciliation/pr-1');
}

describe('PaymentNotice setara PHP', () => {
  it('payload penuh sama dengan golden PHP', () => {
    expect(isi().build()).toEqual(golden());
  });

  it('quirk setPayment menulis payment.amount, bukan payment sebagai Reference', () => {
    const payment = isi().build().payment;
    expect(payment.amount).toEqual({ value: 250000, currency: 'IDR' });
    expect(payment.reference).toBeUndefined();
  });

  it('quirk insurer dan paymentReconciliation: nama elemen tidak sesuai R4', () => {
    const hasil = isi().build();
    expect(hasil.insurer.reference).toBe('Organization/1000000003');
    expect(hasil.paymentReconciliation.reference).toBe('PaymentReconciliation/pr-1');
  });

  it('setAmount tetap tersedia sebagai satu-satunya setter sah R4 di luar kanon', () => {
    const hasil = new PaymentNotice().setAmount({ value: 1000, currency: 'IDR' }).build();
    expect(hasil.amount).toEqual({ value: 1000, currency: 'IDR' });
  });
});
