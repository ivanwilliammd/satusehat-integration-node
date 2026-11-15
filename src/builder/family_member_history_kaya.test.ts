/**
 * FamilyMemberHistory: 27 setter kanon, diuji terhadap payload PHP yang sama
 * dengan yang dipakai uji Python — supaya ketiga port membuktikan satu perilaku.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { FamilyMemberHistory } from './FamilyMemberHistory';
import { CodeableConcept, Coding, Reference } from '../datatype/datatypes';

const golden = () =>
  JSON.parse(
    readFileSync(new URL('./testdata/family_member_history_kaya_php_golden.json', import.meta.url), 'utf8')
  );

const cc = (system: string, code: string, display: string): any => ({ coding: [{ system, code, display }] });

function isi(): FamilyMemberHistory {
  const rel = cc('http://terminology.hl7.org/CodeSystem/v3-RoleCode', 'MTH', 'Mother');
  rel.text = 'Ibu';
  const sex = cc('http://hl7.org/fhir/administrative-gender', 'female', 'Female');
  sex.text = 'Perempuan';
  const hipertensi = cc('http://hl7.org/fhir/sid/icd-10', 'I10', 'Essential hypertension');
  hipertensi.text = 'Hipertensi';

  return new FamilyMemberHistory()
    .setId('fmh-1')
    .addIdentifier({ system: 'http://sys.id/ni', value: 'NI-1000' })
    .setInstantiatesCanonical('https://fhir.kemkes.go.id/r4/Questionnaire/family-history')
    .setStatus('completed')
    .setPatient({ reference: 'Patient/1000000001', display: 'Budi Santoso' } as any)
    .setDate('2026-01-05')
    .setName('Ibu Kandung')
    .setRelationship(rel)
    .setSex(sex)
    .setBornDate('1958-03-02')
    .setAgeAge(68, 'a')
    .setDeceasedBoolean(false)
    .addCondition(hipertensi, '2005', null, false)
    .addCondition({ text: 'Diabetes melitus tipe 2' } as any)
    .addReasonReference({ reference: 'Condition/cond-1' } as any)
    .setNote('Riwayat keluarga terverifikasi')
    .setNote('Data dari rekam medis ibu');
}

describe('FamilyMemberHistory setara PHP', () => {
  it('payload penuh sama byte demi byte dengan golden PHP', () => {
    expect(isi().build()).toEqual(golden());
  });

  it('setNote menumpuk meski dinamai set', () => {
    expect(isi().build().note).toHaveLength(2);
  });

  it('setStatus menolak nilai di luar empat yang sah', () => {
    expect(() => new FamilyMemberHistory().setStatus('active')).toThrow(/Invalid status/);
  });

  it('condition menumpuk dan onsetString hanya bila diberi', () => {
    const kondisi = isi().build().condition;
    expect(kondisi).toHaveLength(2);
    expect(kondisi[0].onsetString).toBe('2005');
    expect(kondisi[1].onsetString).toBeUndefined();
  });

  it('quirk ageAge: angka dan satuan di elemen terpisah', () => {
    const hasil = isi().build();
    expect(hasil.ageAge).toBe(68);
    expect(hasil.ageUnit).toBe('a');
  });
});
