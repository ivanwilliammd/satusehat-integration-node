/**
 * Permukaan method kanon PHP vs TypeScript — uji RATCHET.
 *
 * Daftar method kanon dibaca dari `contracts/php_method_surface.json` yang ikut ter-commit,
 * bukan dari checkout repo PHP. Alasannya konkret: uji sebelumnya membaca
 * /home/openclaw/... dan GAGAL di CI (berkas tidak ada), tetapi kegagalannya tertutup oleh
 * `|| echo "No test files found"` di workflow — CI hijau sementara satu berkas uji merah.
 *
 * Angka kekurangan hanya boleh TURUN. Setiap kali satu resource dilengkapi, turunkan BATAS.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const KONTRAK = join(__dirname, '..', '..', 'contracts', 'php_method_surface.json');
const TS_DIR = join(__dirname);

/** Method kanon yang memang tidak diporting, beserta alasannya. */
const DIPERBOLEHKAN = new Set([
  'Bundle.json', // mengembalikan string JSON, bukan payload; TS memakai getResourceType/toJSON
]);

/** Batas atas method yang belum punya pasangan. WAJIB turun, tidak boleh naik. */
const BATAS = 0;

function berkasTs(resource: string): string {
  return join(TS_DIR, `${resource === 'List' ? 'ListResource' : resource}.ts`);
}

function kekurangan(): string[] {
  const kontrak: Record<string, string[]> = JSON.parse(readFileSync(KONTRAK, 'utf8'));
  const hasil: string[] = [];
  for (const [resource, methods] of Object.entries(kontrak)) {
    const target = berkasTs(resource);
    if (!existsSync(target)) {
      hasil.push(`${resource}: berkas TypeScript tidak ada`);
      continue;
    }
    const isi = readFileSync(target, 'utf8');
    for (const method of methods) {
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
