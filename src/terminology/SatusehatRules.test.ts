import { readFileSync } from 'node:fs';
import { join } from 'node:path';
// Uji aturan wajib SATUSEHAT. Sumbernya data/satusehat/required-rules.json, bukan ingatan: uji terakhir
// memastikan konstanta tidak menyimpang dari berkas dan setiap butir menyebut sumber dokumentasinya.
import { describe, expect, it } from 'vitest';

import {
  ACT_CODE,
  ENCOUNTER_STATUS,
  OBSERVATION_STATUS,
  PROCEDURE_STATUS,
  aturanWajib,
  violations,
} from './SatusehatRules';

const encounter = (system: string, status = 'finished') => ({
  resourceType: 'Encounter',
  status,
  class: { system, code: 'AMB' },
});

describe('SatusehatRules', () => {
  it('Encounter dengan sistem v3-ActCode lolos', () => {
    expect(violations(encounter(ACT_CODE))).toEqual([]);
  });

  it('Encounter dengan sistem lain ditolak', () => {
    const masalah = violations(encounter('http://contoh.local/class'));
    expect(masalah).toHaveLength(1);
    expect(masalah[0]).toContain('v3-ActCode');
  });

  it('status di luar daftar ditolak', () => {
    const masalah = violations(encounter(ACT_CODE, 'selesai'));
    expect(masalah[0]).toContain('bukan kode yang sah');
  });

  it('Observation tanpa encounter menyebut alasan R4', () => {
    const masalah = violations({
      resourceType: 'Observation',
      status: 'final',
      code: { coding: [{ system: 'http://loinc.org', code: '8867-4' }] },
      subject: { reference: 'Patient/1' },
    });
    expect(masalah).toHaveLength(1);
    expect(masalah[0]).toContain('opsional di R4');
  });

  it('subject bukan Patient ditolak', () => {
    const masalah = violations({
      resourceType: 'Condition',
      code: { coding: [{ system: 'http://hl7.org/fhir/sid/icd-10', code: 'E11.9' }] },
      subject: { reference: 'Group/1' },
      encounter: { reference: 'Encounter/2' },
    });
    expect(masalah).toHaveLength(1);
    expect(masalah[0]).toContain('Patient');
  });

  it('Patient wajib punya nama', () => {
    const masalah = violations({
      resourceType: 'Patient',
      identifier: [{ system: 'https://fhir.kemkes.go.id/id/nik', value: '3273010101900001' }],
    });
    expect(masalah).toHaveLength(1);
    expect(masalah[0]).toContain('name');
  });

  it('Immunization menerima occurrenceDateTime maupun occurrenceString', () => {
    const dasar = {
      resourceType: 'Immunization',
      status: 'completed',
      vaccineCode: { coding: [{ system: 'http://hl7.org/fhir/sid/cvx', code: '08' }] },
      patient: { reference: 'Patient/1' },
    };
    expect(violations({ ...dasar, occurrenceDateTime: '2026-11-16T09:00:00+07:00' })).toEqual([]);
    expect(violations({ ...dasar, occurrenceString: '2026-11-16' })).toEqual([]);
    expect(violations(dasar)[0]).toContain('occurrenceDateTime');
  });

  it('MedicationRequest wajib punya intent', () => {
    const masalah = violations({
      resourceType: 'MedicationRequest',
      status: 'active',
      subject: { reference: 'Patient/1' },
    });
    expect(masalah).toHaveLength(1);
    expect(masalah[0]).toContain('intent');
  });

  it('resource yang belum dipetakan tidak diperiksa', () => {
    expect(violations({ resourceType: 'AuditEvent' })).toEqual([]);
  });

  it('payload tanpa resourceType dilaporkan', () => {
    expect(violations({ status: 'finished' })).toEqual(['resourceType tidak ada']);
  });

  it('setiap butir menyebut sumber dan jenisnya dikenal', () => {
    const jenis = ['kode', 'isi', 'ada', 'referensi', 'sistem', 'salah_satu'];
    for (const [resource, butir] of Object.entries(aturanWajib())) {
      expect(butir.length, `${resource} tanpa aturan`).toBeGreaterThan(0);
      for (const satu of butir) {
        expect(satu.sumber, `${resource} tanpa sumber`).toBeTruthy();
        expect(jenis, `${resource} jenis tak dikenal`).toContain(satu.jenis);
      }
    }
  });

  it('konstanta sama dengan berkas aturan', () => {
    const kode = (resource: string) =>
      aturanWajib()[resource].find((b) => b.elemen === 'status' && b.jenis === 'kode')?.kode;

    expect(kode('Encounter')).toEqual([...ENCOUNTER_STATUS]);
    expect(kode('Observation')).toEqual([...OBSERVATION_STATUS]);
    expect(kode('Procedure')).toEqual([...PROCEDURE_STATUS]);
  });

  // Sidik jari berkas aturan. Kelima port memakai berkas yang sama; kalau berkas ini
  // bergeser tanpa uji ikut berubah, kelima port memvalidasi hal berbeda tanpa ada yang
  // tahu. Pengganti murah untuk pemeriksa lintas-repo (scripts/check-rules-drift.sh).
  it('sidik jari berkas aturan tidak bergeser', () => {
    const mentah = readFileSync(
      join(__dirname, '..', 'data', 'satusehat', 'required-rules.json'),
      'utf8',
    );
    // Checkout Windows memakai CRLF; hitung setelah normalisasi.
    const dinormalisasi = mentah.replace(/\r\n/g, '\n');
    expect(dinormalisasi.length, 'jumlah byte berkas aturan berubah').toBe(5849);

    const harap: Record<string, number> = {
      Condition: 3,
      DiagnosticReport: 4,
      Encounter: 2,
      Immunization: 4,
      MedicationRequest: 3,
      Observation: 4,
      Patient: 2,
      Procedure: 4,
    };
    for (const [resource, jumlah] of Object.entries(harap)) {
      expect(aturanWajib()[resource].length, `jumlah butir ${resource} berubah`).toBe(jumlah);
    }
  });
});
