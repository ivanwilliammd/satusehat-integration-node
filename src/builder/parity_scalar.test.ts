/**
 * Builder yang di Node masih kosong dan diisi dari sumber PHP.
 *
 * Golden-nya dibuat langsung dari builder PHP (`php -r` lewat runner), bukan
 * diterjemahkan, supaya yang dibandingkan benar-benar keluaran kanon.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { Account } from './Account';

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
