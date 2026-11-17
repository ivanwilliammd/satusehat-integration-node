// Penjaga elemen tingkat atas terhadap definisi FHIR R4 resmi.
//
// Sebagian builder bisa menulis elemen yang tidak ada di resource-nya (mis. `onsetDateTime` pada
// `Goal`). Payload seperti itu tetap sah secara JSON, hanya bukan R4 — dan server menolaknya tanpa
// pesan yang berguna. Daftar elemen sah berasal dari `src/data/r4_elements.json`, dihasilkan
// `scripts/generate_r4_elements.py` di repo PHP dari `profiles-resources.json` HL7 R4 resmi.
//
// Pemeriksaan opt-in (`SATUSEHAT_STRICT_R4=1`) karena menyalakannya bawaan akan menggagalkan
// pemanggil yang sudah memakai setter lama.
import mentah from '../data/r4_elements.json';

/** Nama resource yang berbeda antara kelas builder dan definisi FHIR. */
const ALIAS: Record<string, string> = { ListResource: 'List' };

const PETA = mentah as Record<string, string[]>;

/** Elemen tingkat atas yang tidak ada di R4 untuk resource payload ini. */
export function unknownElements(payload: Record<string, unknown>): string[] {
  const tipe = payload.resourceType;
  if (typeof tipe !== 'string' || tipe === '') return ['resourceType'];

  const sah = new Set(PETA[ALIAS[tipe] ?? tipe] ?? []);
  // Resource yang tidak ada di definisi R4: tidak ada dasar untuk memeriksa.
  if (sah.size === 0) return [];

  return Object.keys(payload)
    .filter((kunci) => kunci !== 'resourceType' && !sah.has(kunci))
    .sort();
}

/** @throws Error bila ada elemen asing */
export function assertR4Elements(payload: Record<string, unknown>): void {
  const asing = unknownElements(payload);
  if (asing.length === 0) return;
  const tipe = payload.resourceType;
  throw new Error(
    `${typeof tipe === 'string' ? tipe : '(tanpa resourceType)'} menulis elemen yang tidak ada di FHIR R4: ${asing.join(', ')}`,
  );
}

/** `SATUSEHAT_STRICT_R4=1` (atau true/on/yes) menyalakan pemeriksaan. */
export function strictR4Enabled(): boolean {
  const nilai = (process.env.SATUSEHAT_STRICT_R4 ?? '').toLowerCase();
  return !['', '0', 'false', 'off', 'no'].includes(nilai);
}
