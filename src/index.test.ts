import { describe, expect, it } from 'vitest';
import {
  HumanName,
  Identifier,
  Patient,
  PatientBuilder,
  ObservationBuilder,
  TerminologyResolver,
} from './index';

/**
 * Uji BARREL (src/index.ts). Tiga cacat yang pernah lolos ke npm dan baru ketahuan saat
 * dipasang dari registry:
 *   1. dist/index.js tidak pernah dihasilkan -> impor dari akar paket gagal total
 *   2. nama ekspor berbeda dari README (Patient vs PatientBuilder)
 *   3. HumanName(objek) membungkus ganda -> payload FHIR rusak
 * Uji ini menjaga ketiganya, karena semuanya "berhasil" di dalam repo.
 */
describe('barrel / impor dari akar paket', () => {
  it('mengekspor builder dengan nama yang dipakai README', () => {
    expect(PatientBuilder).toBeDefined();
    expect(ObservationBuilder).toBeDefined();
    expect(TerminologyResolver).toBeDefined();
  });

  it('PatientBuilder adalah kelas yang sama dengan Patient', () => {
    expect(PatientBuilder).toBe(Patient);
  });

  it('membangun Patient lengkap dari impor akar', () => {
    const payload = new PatientBuilder()
      .setId('1000000000000001')
      .addIdentifier(new Identifier('http://sys-ids.kemkes.go.id/nik', '3171010101900001'))
      .addName(new HumanName('Prameswari', ['Ayu'], 'official'))
      .setGender('female')
      .build();

    expect(payload.resourceType).toBe('Patient');
    expect(payload.identifier[0].system).toBe('http://sys-ids.kemkes.go.id/nik');
    expect(payload.name[0].family).toBe('Prameswari');
  });
});

describe('HumanName', () => {
  it('menerima bentuk objek tanpa membungkus ganda', () => {
    const nama = new HumanName({ family: 'Doe', given: ['John'], use: 'official' });

    expect(nama.toArray()).toEqual({ use: 'official', family: 'Doe', given: ['John'] });
    expect((nama.toArray() as any).family).toBe('Doe');
  });

  it('tetap menerima bentuk posisional (kode lama)', () => {
    expect(new HumanName('Doe', ['John'], 'official').toArray()).toEqual({
      use: 'official',
      family: 'Doe',
      given: ['John'],
    });
  });

  it('punya toJSON seperti yang ditulis README', () => {
    const nama = new HumanName('Doe', ['John']);

    expect(typeof nama.toJSON).toBe('function');
    expect(nama.toJSON()).toEqual(nama.toArray());
  });
});
