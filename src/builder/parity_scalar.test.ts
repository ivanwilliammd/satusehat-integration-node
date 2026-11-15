/**
 * Builder yang di Node masih kosong dan diisi dari sumber PHP.
 *
 * Golden-nya dibuat langsung dari builder PHP (`php -r` lewat runner), bukan
 * diterjemahkan, supaya yang dibandingkan benar-benar keluaran kanon.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { Account } from './Account';
import { ChargeItem } from './ChargeItem';

const golden = (nama: string) =>
  JSON.parse(readFileSync(new URL(`./testdata/${nama}_scalar_php_golden.json`, import.meta.url), 'utf8'));

describe('Account parity', () => {
  it('sama dengan golden PHP, termasuk status yang dihuruf-kecilkan', () => {
    const b = new Account();
    b.setId('acc-1');
    b.setStatus('ACTIVE');
    b.setType(
      'http://terminology.hl7.org/CodeSystem/v3-AccountTypes',
      'PBILLACCT',
      'Patient billing account',
      'Akun pasien'
    );
    b.setName('Akun Rawat Jalan');
    b.addSubject('Patient/1000000001', 'Budi Santoso');
    b.setServicePeriod('2026-01-05', '2026-01-06');
    b.addCoverage('Coverage/cov-1', 1);
    b.setOwner('Organization/1000000001');
    b.setDescription('Akun penagihan rawat jalan');
    expect(b.build()).toEqual(golden('account'));
  });

  it('menolak status di luar lima nilai sah', () => {
    const b = new Account();
    expect(() => b.setStatus('selesai')).toThrow(/tidak valid/);
  });
});

describe('ChargeItem parity', () => {
  it('sama dengan golden PHP, termasuk dua identifier dan dua performer', () => {
    const b = new ChargeItem();
    b.setId('ci-1');
    b.addIdentifier('http://sys.id/ni', 'NI-200');
    b.addIdentifier('http://sys.id/rm', 'RM-9');
    b.setStatus('billable');
    b.setPartOf('Encounter/enc-1');
    b.setCode('http://terminology.kemkes.go.id/CodeSystem/procedure', 'PROC-1', 'Konsultasi');
    b.setSubject('Patient/1000000001');
    b.setFocus('Procedure/proc-1');
    b.setEncounter('Encounter/enc-1');
    b.setPerformedDate('2026-01-05T09:00:00+07:00');
    b.setPerformerActor(
      'Practitioner/1000000002',
      'http://terminology.hl7.org/CodeSystem/v3-ParticipationType',
      'PPRF'
    );
    b.setPerformerCostCenter('Organization/1000000001');
    b.setOrganization('Organization/1000000001');
    b.setRequestingOrganization('Organization/1000000002');
    b.setQuantity(3);
    b.setBodysite('http://snomed.info/sct', '123', 'Toraks');
    b.setProductCode('http://sys-ids.kemkes.go.id/kfa', '93000515', 'Amoksisilin');
    b.setPriceOverride(150000.0, 'IDR');
    b.setOverrideReason('Harga khusus peserta');
    b.setEnterer('Practitioner/1000000003');
    b.setEnteredDate('2026-01-05T10:00:00+07:00');
    b.setReason('http://snomed.info/sct', '456', 'Tindakan');
    b.setService('ServiceRequest/sr-1');
    b.setAccount('Account/acc-1');
    expect(b.build()).toEqual(golden('charge_item'));
  });
});
