/**
 * Kontrak lintas-SDK: jalankan golden/builder/*.input.json terhadap builder TypeScript.
 *
 * Kasus dan hasil harapan tinggal di satusehat-conformance, bukan di sini — supaya lima SDK
 * diuji terhadap satu kontrak, bukan terhadap asumsinya masing-masing.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import * as barrel from '../index';

const DIR = process.env.CONFORMANCE_DIR ?? '/home/openclaw/projects/satusehat-conformance';
const BUILDER_DIR = join(DIR, 'golden', 'builder');
const berkasKasus = existsSync(BUILDER_DIR)
  ? readdirSync(BUILDER_DIR).filter((f) => f.endsWith('.input.json')).sort()
  : [];

/**
 * Materialiser datatype: builder TypeScript memanggil `arg.toArray()`, jadi objek dari spec
 * dibungkus dengan toArray() yang mengembalikan isinya sendiri (tanpa fungsi, tanpa $type).
 * Ini meniru kelas di src/datatype tanpa harus menebak konstruktornya satu per satu.
 */
function materialise(nilai: any): any {
  if (Array.isArray(nilai)) return nilai.map(materialise);
  if (nilai && typeof nilai === 'object') {
    const bersih = tanpaTipe(nilai);
    const isi: Record<string, any> = {};
    for (const [k, v] of Object.entries(bersih)) isi[k] = v;
    return { ...isi, toArray: () => isi };
  }
  return nilai;
}

/** Buang penanda $type; builder TypeScript menerima objek polos. */
function tanpaTipe(nilai: any): any {
  if (Array.isArray(nilai)) return nilai.map(tanpaTipe);
  if (nilai && typeof nilai === 'object') {
    return Object.fromEntries(Object.entries(nilai).filter(([k]) => k !== '$type').map(([k, v]) => [k, tanpaTipe(v)]));
  }
  return nilai;
}

function kelasBuilder(resource: string): any {
  const calon = [resource, `${resource}Builder`, `${resource}Resource`];
  for (const nama of calon) {
    const Ctor = (barrel as any)[nama];
    if (typeof Ctor === 'function') return Ctor;
  }
  throw new Error(`builder TypeScript untuk ${resource} tidak ada di barrel`);
}

describe.skipIf(berkasKasus.length === 0)('kontrak satusehat-conformance', () => {
  for (const berkas of berkasKasus) {
    it(berkas.replace('.input.json', ''), () => {
      const spec = JSON.parse(readFileSync(join(BUILDER_DIR, berkas), 'utf8'));
      const harapan = JSON.parse(readFileSync(join(BUILDER_DIR, berkas.replace('.input.json', '.json')), 'utf8'));

      const Ctor = kelasBuilder(spec.resource);
      const builder = new Ctor();
      for (const panggilan of spec.calls) {
        builder[panggilan.method](...(panggilan.args ?? []).map(materialise));
      }
      expect(builder.build()).toEqual(harapan);
    });
  }
});
