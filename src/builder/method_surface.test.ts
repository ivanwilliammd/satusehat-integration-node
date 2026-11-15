/**
 * Permukaan method kanon PHP vs TypeScript — uji RATCHET.
 *
 * Uji golden menjaga perilaku resource yang sudah diporting. Uji ini menjaga
 * PERMUKAAN: berapa method kanon yang belum punya pasangan di kelas TypeScript.
 *
 * Angkanya harus TURUN, tidak boleh naik. Setiap kali satu resource dilengkapi,
 * turunkan BATAS. Kalau kanon menambah method tanpa diporting, uji ini gagal —
 * bukan hijau palsu seperti hitungan "141 resource punya berkas".
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const PHP_DIR = '/home/openclaw/projects/satusehat-integration/src/Builder';
const TS_DIR = join(__dirname);

/** Method kanon yang memang tidak diporting, beserta alasannya. */
const DIPERBOLEHKAN = new Set([
  'Bundle.json', // mengembalikan string JSON, bukan payload
]);

/** Batas atas method yang belum punya pasangan. WAJIB turun, tidak boleh naik. */
const BATAS = 58;

function berkasTs(resource: string): string {
  return join(TS_DIR, `${resource === 'List' ? 'ListResource' : resource}.ts`);
}

function kekurangan(): string[] {
  const hasil: string[] = [];
  for (const berkas of readdirSync(PHP_DIR).filter((f) => f.startsWith('PayloadBuilder') && f.endsWith('.php'))) {
    const teks = readFileSync(join(PHP_DIR, berkas), 'utf8');
    const resource = /resourceType\s*=\s*'([^']+)'/.exec(teks)![1];
    const target = berkasTs(resource);
    if (!existsSync(target)) {
      hasil.push(`${resource}: berkas TypeScript tidak ada`);
      continue;
    }
    const isi = readFileSync(target, 'utf8');
    for (const m of teks.matchAll(/public function (\w+)\(/g)) {
      const method = m[1];
      if (method === '__construct' || method === 'build') continue;
      if (DIPERBOLEHKAN.has(`${resource}.${method}`)) continue;
      if (!isi.includes(`${method}(`)) hasil.push(`${resource}.${method}`);
    }
  }
  return hasil;
}

describe('permukaan method kanon PHP vs TypeScript', () => {
  const kurang = kekurangan();

  it(`method kanon yang belum diporting tidak lebih dari ${BATAS}`, () => {
    if (kurang.length > 0) {
      console.log(
        `belum diporting (${kurang.length}): ${kurang.slice(0, 40).join(', ')}${kurang.length > 40 ? ', …' : ''}`
      );
    }
    expect(kurang.length).toBeLessThanOrEqual(BATAS);
  });

  it('setiap resource punya berkas builder', () => {
    expect(kurang.filter((k) => k.includes('berkas TypeScript tidak ada'))).toEqual([]);
  });
});
