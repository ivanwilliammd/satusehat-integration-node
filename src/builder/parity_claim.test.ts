/**
 * Claim: builder Node yang sebelumnya kosong, diisi dari PayloadBuilderClaim.php.
 * Golden dibuat dari PHP lewat runner; uji membandingkan payload penuh.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { Claim } from './Claim';

const golden = (nama: string) =>
  JSON.parse(readFileSync(new URL(`./testdata/${nama}_scalar_php_golden.json`, import.meta.url), 'utf8'));

const SYS_ID = 'http://sys.id/ni';
const KFA = 'http://sys-ids.kemkes.go.id/kfa';
const ICD10 = 'http://hl7.org/fhir/sid/icd-10';
const PROC = 'http://terminology.kemkes.go.id/CodeSystem/procedure';

function isiClaim(b: Claim): Claim {
  b.setId('clm-1');
  b.addIdentifier(SYS_ID, 'NI-500');
  b.setStatus('active');
  b.setType('http://terminology.hl7.org/CodeSystem/claim-type', 'institutional', 'Institusi');
  b.setSubType('http://terminology.hl7.org/CodeSystem/ex-claimsubtype', 'subrogation', 'Subrogasi');
  b.setUse('claim');
  b.setPriority('http://terminology.hl7.org/CodeSystem/processpriority', 'normal', 'Normal');
  b.setPatient('Patient/1000000001', 'Budi Santoso');
  b.setBillablePeriod('2026-01-05', '2026-01-06');
  b.setCreated('2026-01-06T10:00:00+07:00');
  b.setEnterer('Practitioner/1000000002');
  b.setInsurer('Organization/1000000003');
  b.setProvider('Organization/1000000001');
  b.setPriorityPayor('Organization/1000000003');
  b.setPriorityPayor('Organization/1000000004');
  b.setPrescriber('Practitioner/1000000005');
  b.setFacility('Location/loc-1', 'Rawat Jalan');
  b.addRelated(
    'http://sys.id/claim-ref',
    'CLM-OLD',
    'Klaim lama',
    'http://terminology.hl7.org/CodeSystem/ex-relatedclaimrelationship',
    'prior'
  );
  b.addCoverage('Coverage/cov-1');
  b.addCoverage('Coverage/cov-2', false, 'http://terminology.hl7.org/CodeSystem/coverage-priority', '2');
  b.addItem(1, KFA, '93000515', 'Amoksisilin', 1, 1, 1);
  b.addItem(2, PROC, 'PROC-2', 'Visite');
  b.addItemServicedPeriod(0, '2026-01-05', '2026-01-06');
  b.addItemLocation(0, 'http://sys.id/loc', 'LOC-1', 'Rawat Jalan');
  b.addItemLocation(0, 'http://sys.id/loc', 'LOC-2', 'Rawat Inap');
  b.addItemQuantity(0, 10.0, 'IDR');
  b.addItemUnitPrice(0, 15000.0, 'IDR');
  b.addItemUnitPrice(1, 150000.0, 'IDR');
  b.addCareTeam(
    1,
    'Practitioner/1000000002',
    'http://terminology.hl7.org/CodeSystem/claimcareteamrole',
    'primary',
    'Dokter Utama'
  );
  b.addDiagnosis(1, ICD10, 'A09', 'http://terminology.hl7.org/CodeSystem/ex-diagnosistype', 'principal');
  b.addProcedure(1, PROC, 'PROC-2', '2026-01-05', 'http://terminology.hl7.org/CodeSystem/ex-procedure-type', 'primary');
  b.addInsuranceAccount('Account/acc-1');
  b.addInsuranceAccount('Account/acc-2');
  b.setTotal(315000.0, 'IDR');
  return b;
}

describe('Claim parity', () => {
  it('sama dengan golden PHP', () => {
    expect(isiClaim(new Claim()).build()).toEqual(golden('claim'));
  });

  it('item kedua tidak mendapat servicedPeriod milik item pertama', () => {
    const hasil = isiClaim(new Claim()).build();
    expect(hasil['item'][0]['servicedPeriod']).toEqual({ start: '2026-01-05', end: '2026-01-06' });
    expect(hasil['item'][1]['servicedPeriod']).toBeUndefined();
  });

  it('addItemLocation menumpuk, bukan menimpa', () => {
    const hasil = isiClaim(new Claim()).build();
    expect(hasil['item'][0]['location']).toHaveLength(2);
  });

  it('addInsuranceAccount menumpuk ke insurance.account tanpa membuat sequence', () => {
    const hasil = isiClaim(new Claim()).build();
    expect(hasil['insurance']).toEqual({
      account: [{ reference: 'Account/acc-1' }, { reference: 'Account/acc-2' }],
    });
  });
});
