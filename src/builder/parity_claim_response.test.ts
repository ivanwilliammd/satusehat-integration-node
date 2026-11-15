/**
 * ClaimResponse: builder Node yang sebelumnya kosong, diisi dari
 * PayloadBuilderClaimResponse.php. Golden dibuat dari PHP lewat runner.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ClaimResponse } from './ClaimResponse';

const golden = (nama: string) =>
  JSON.parse(readFileSync(new URL(`./testdata/${nama}_scalar_php_golden.json`, import.meta.url), 'utf8'));

const ADJ = 'http://terminology.hl7.org/CodeSystem/adjudication';
const KFA = 'http://sys-ids.kemkes.go.id/kfa';

function isi(b: ClaimResponse): ClaimResponse {
  b.setId('cr-1');
  b.addIdentifier('http://sys.id/ni', 'NI-600');
  b.setStatus('active');
  b.setType('http://terminology.hl7.org/CodeSystem/claim-type', 'institutional', 'Institusi');
  b.setSubType('http://terminology.hl7.org/CodeSystem/ex-claimsubtype', 'subrogation', 'Subrogasi');
  b.setUse('claim');
  b.setPatient('Patient/1000000001');
  b.setCreated('2026-01-06T10:00:00+07:00');
  b.setInsurer('Organization/1000000003');
  b.setRequestor('Organization/1000000001');
  b.setRequest('Claim/clm-1');
  b.setOutcome('complete');
  b.setDisposition('Setuju sebagian');
  b.setPreAuthRef('PA-77');
  b.setPreAuthPeriod('2026-01-05', '2026-02-05');
  b.setPayeeType('http://terminology.hl7.org/CodeSystem/payeetype', 'provider', 'Provider');
  b.addItem(1);
  b.addItem(2, 1, 1);
  b.addItemAdjudication(1, ADJ, 'eligible', 300000.0);
  b.addItemAdjudication(1, ADJ, 'copay', 50000.0, 'http://terminology.hl7.org/CodeSystem/adjudication-reason', 'ar002');
  b.addAddItem(1, KFA, '93000515', 'Amoksisilin');
  b.addAddItemAdjudication(1, ADJ, 'eligible', 15000.0);
  b.addAddItem(2, KFA, '93000516', 'Parasetamol');
  b.addAddItemAdjudication(2, ADJ, 'eligible', 5000.0);
  b.addError(2, 'http://terminology.hl7.org/CodeSystem/adjudication-error', 'a001', 'Kode tidak dikenal');
  b.addCoverage(1, 'Coverage/cov-1', true);
  b.addCoverage(2, 'Coverage/cov-2', false, 'http://terminology.hl7.org/CodeSystem/coverage-priority', '2');
  b.setTotal(300000.0, ADJ, 'eligible');
  b.setTotal(50000.0, ADJ, 'copay');
  b.setPayment(250000.0, 'http://terminology.hl7.org/CodeSystem/payment-type', 'complete', '2026-01-07', 'Payment/pay-1');
  return b;
}

describe('ClaimResponse parity', () => {
  it('sama dengan golden PHP', () => {
    expect(isi(new ClaimResponse()).build()).toEqual(golden('claim_response'));
  });

  it('addItemAdjudication menumpuk ke item, bukan ke item[<i>]/adjudication — quirk PHP', () => {
    const hasil = isi(new ClaimResponse()).build();
    expect(hasil['item']).toHaveLength(4);
    expect(hasil['item'][2]['category']['coding'][0]['code']).toBe('eligible');
  });

  it('addAddItemAdjudication menempel ke addItem terakhir saja', () => {
    const hasil = isi(new ClaimResponse()).build();
    expect(hasil['addItem'][0]['adjudication']).toHaveLength(1);
    expect(hasil['addItem'][1]['adjudication'][0]['value']).toBe(5000);
  });

  it('setPayment menulis type, date, amount/value, dan reference', () => {
    const hasil = isi(new ClaimResponse()).build();
    expect(hasil['payment']['amount']).toEqual({ value: 250000 });
    expect(hasil['payment']['reference']).toBe('Payment/pay-1');
  });
});
