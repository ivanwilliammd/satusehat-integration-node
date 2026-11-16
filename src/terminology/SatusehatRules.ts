// Aturan wajib SATUSEHAT yang bisa diputuskan dari payload saja.
//
// Audit R4 menjawab "apakah elemen ini ada di R4"; ia tidak menjawab "apakah isinya bentuk yang
// diterima SATUSEHAT". Aturannya TIDAK ditulis di sini: data/satusehat/required-rules.json memuat tiap
// butir bersama URL dokumentasi sumbernya, dan berkas ini hanya menjalankan butir itu. Menambah resource
// berarti menambah data, bukan kode.
//
// Yang tidak diklaim: aturan yang butuh data di luar payload (mis. identifier organisasi harus
// terdaftar di master sarana).
// JSON diimpor, bukan dibaca saat jalan: `tsc` menyalinnya ke dist sehingga paket terbit tidak
// bergantung pada path relatif terhadap __dirname.
import mentah from '../data/satusehat/required-rules.json';

export const ACT_CODE = 'http://terminology.hl7.org/CodeSystem/v3-ActCode';

export const ENCOUNTER_STATUS = [
  'planned', 'arrived', 'triaged', 'in-progress', 'onleave',
  'finished', 'cancelled', 'entered-in-error', 'unknown',
] as const;

export const OBSERVATION_STATUS = [
  'registered', 'preliminary', 'final', 'amended', 'corrected',
  'cancelled', 'entered-in-error', 'unknown',
] as const;

export const PROCEDURE_STATUS = [
  'preparation', 'in-progress', 'not-done', 'on-hold', 'stopped',
  'completed', 'entered-in-error', 'unknown',
] as const;

type Jenis = 'kode' | 'isi' | 'ada' | 'referensi' | 'sistem' | 'salah_satu';

interface Butir {
  elemen: string;
  jenis: Jenis;
  kode?: string[];
  awalan?: string;
  sistem?: string;
  pilihan?: string[];
  sumber: string;
}

type Aturan = Record<string, Butir[]>;

let cache: Aturan | null = null;

/** Berkas aturan, dibaca sekali. Diekspor supaya uji bisa membandingkan konstanta dengan isinya. */
export function aturanWajib(): Aturan {
  if (cache === null) {
    cache = Object.fromEntries(
      Object.entries(mentah as unknown as Record<string, unknown>).filter(([kunci]) => !kunci.startsWith('_')),
    ) as Aturan;
  }
  return cache;
}

type Payload = Record<string, unknown>;

function ambil(payload: Payload, jalur: string): unknown {
  let simpul: unknown = payload;
  for (const kunci of jalur.split('.')) {
    if (typeof simpul !== 'object' || simpul === null || !(kunci in simpul)) return undefined;
    simpul = (simpul as Payload)[kunci];
  }
  return simpul;
}

function periksa(payload: Payload, resourceType: string, butir: Butir): string | null {
  const elemen = butir.elemen;
  const nilai = ambil(payload, elemen.replace('[x]', ''));
  const sebut = `${resourceType}.${elemen}`;
  // SATUSEHAT mewajibkan encounter pada beberapa resource yang di R4 opsional. Alasannya ditulis di
  // pesan supaya tidak dikira pustaka ini salah membaca spesifikasi.
  const catatanR4 = elemen === 'encounter' ? ' (SATUSEHAT, meski opsional di R4)' : '';

  switch (butir.jenis) {
    case 'kode':
      return typeof nilai === 'string' && (butir.kode ?? []).includes(nilai)
        ? null
        : `${sebut} bukan kode yang sah: ${typeof nilai === 'string' ? nilai : '(kosong)'}`;
    case 'isi': {
      const kosong =
        nilai === undefined || nilai === null ||
        (Array.isArray(nilai) && nilai.length === 0) ||
        (typeof nilai === 'object' && !Array.isArray(nilai) && Object.keys(nilai).length === 0);
      return kosong ? `${sebut} wajib diisi` : null;
    }
    case 'ada':
      return nilai !== undefined && nilai !== null ? null : `${sebut} wajib ada${catatanR4}`;
    case 'referensi': {
      const ref = (nilai as { reference?: unknown } | undefined)?.reference;
      return typeof ref === 'string' && ref.startsWith(butir.awalan ?? '')
        ? null
        : `${sebut} wajib merujuk ${butir.awalan}`;
    }
    case 'sistem': {
      const langsung = (nilai as { system?: unknown } | undefined)?.system;
      const bersarang = (nilai as { coding?: { system?: unknown }[] } | undefined)?.coding?.[0]?.system;
      return (langsung ?? bersarang) === butir.sistem ? null : `${sebut} wajib system ${butir.sistem}`;
    }
    case 'salah_satu':
      return (butir.pilihan ?? []).some((pilihan) => payload[pilihan] !== undefined)
        ? null
        : `${sebut} wajib salah satu: ${(butir.pilihan ?? []).join(', ')}`;
    default: {
      const tak = butir.jenis as string;
      throw new Error(`Jenis aturan tidak dikenal: ${tak}`);
    }
  }
}

/** Daftar pelanggaran; kosong berarti lolos. */
export function violations(payload: Payload): string[] {
  const resourceType = payload.resourceType;
  if (typeof resourceType !== 'string' || resourceType === '') return ['resourceType tidak ada'];

  const masalah: string[] = [];
  for (const butir of aturanWajib()[resourceType] ?? []) {
    const pesan = periksa(payload, resourceType, butir);
    if (pesan !== null) masalah.push(pesan);
  }
  return masalah;
}
