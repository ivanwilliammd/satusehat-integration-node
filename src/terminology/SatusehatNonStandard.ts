// Objek non-standar SATUSEHAT — identifier dan extension di luar FHIR R4 inti.
//
// URL di bawah berasal dari dokumentasi resmi SATUSEHAT dan Implementation Guide, bukan karangan.
// Payload yang "sah secara R4" masih bisa ditolak karena NIK wajib memakai sistem identifier
// Kemkes; kesalahan seperti itu mahal ditemukan di produksi.
export const NIK_SYSTEM = 'https://fhir.kemkes.go.id/id/nik';
export const PASSPORT_SYSTEM = 'https://fhir.kemkes.go.id/id/paspor';
export const KK_SYSTEM = 'https://fhir.kemkes.go.id/id/kk';
export const IHS_SYSTEM = 'https://fhir.kemkes.go.id/id/patient-ihs-number';

export const EXT_ADMINISTRATIVE_CODE =
  'https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode';
export const EXT_BIRTH_PLACE = 'https://fhir.kemkes.go.id/r4/StructureDefinition/birthPlace';
export const EXT_CITIZENSHIP_STATUS =
  'https://fhir.kemkes.go.id/r4/StructureDefinition/citizenshipStatus';
export const EXT_PATIENT_RELIGION =
  'https://fhir.kemkes.go.id/r4/StructureDefinition/patient-religion';
export const EXT_PATIENT_DISABILITY =
  'https://fhir.kemkes.go.id/r4/StructureDefinition/patient-disability';
export const EXT_PATIENT_CITIZENSHIP =
  'https://fhir.kemkes.go.id/r4/StructureDefinition/patient-citizenship';
export const EXT_PATIENT_BIRTH_TIME =
  'https://fhir.kemkes.go.id/r4/StructureDefinition/patient-birthTime';

export const PROFILE_PATIENT = 'https://fhir.kemkes.go.id/r4/StructureDefinition/Patient';

/** Semua konstanta, untuk diperiksa uji dan dokumentasi. */
export const ALL: ReadonlyArray<readonly [string, string]> = [
  ['nik', NIK_SYSTEM],
  ['paspor', PASSPORT_SYSTEM],
  ['kk', KK_SYSTEM],
  ['ihs', IHS_SYSTEM],
  ['administrative_code', EXT_ADMINISTRATIVE_CODE],
  ['birth_place', EXT_BIRTH_PLACE],
  ['citizenship_status', EXT_CITIZENSHIP_STATUS],
  ['patient_religion', EXT_PATIENT_RELIGION],
  ['patient_disability', EXT_PATIENT_DISABILITY],
  ['patient_citizenship', EXT_PATIENT_CITIZENSHIP],
  ['patient_birth_time', EXT_PATIENT_BIRTH_TIME],
];

/** Identifier resmi SATUSEHAT. `use` selalu `official` — nilai lain ditolak IG. */
export function officialIdentifier(system: string, value: string) {
  return { use: 'official', system, value };
}

/**
 * Extension administrativeCode dengan irisan bertingkat.
 * SATUSEHAT memecah kode wilayah menjadi enam irisan; satu `valueCode` datar sah secara R4
 * tetapi tidak terbaca sebagai wilayah.
 */
export function administrativeCode(slices: ReadonlyArray<readonly [string, string]>) {
  return {
    url: EXT_ADMINISTRATIVE_CODE,
    extension: slices.map(([nama, kode]) => ({ url: nama, valueCode: kode })),
  };
}
