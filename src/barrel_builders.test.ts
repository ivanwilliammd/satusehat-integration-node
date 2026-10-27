import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import * as barrel from './index';

/**
 * Penjaga BARREL untuk SELURUH builder (bukan sampel).
 *
 * Cacat yang dijaga: `scripts/generate_index.py` membaca nama kelas dari berkas dan menulis
 * `src/index.ts`. Kalau satu resource ditambahkan tanpa menjalankan ulang generator, kelasnya
 * HILANG dari barrel tanpa galat — konsumen paket menerima `undefined`. Sebelumnya hanya tiga
 * builder yang diuji dari akar paket, jadi kebocoran itu tidak terlihat.
 *
 * Dua pemeriksaan per berkas builder:
 *   1. kelas yang diekspor berkas itu benar-benar dapat diimpor dari `src/index.ts`;
 *   2. `build()` menghasilkan `resourceType` yang sama dengan nama berkas.
 *
 * `BillingStatus` dan `PurificationDecision` BUKAN resource FHIR R4 (dua-duanya tambahan
 * SATUSEHAT), jadi nilai harapannya dinyatakan eksplisit di sini — bukan dilonggarkan.
 */
const PENGECUALIAN_RESOURCE_TYPE: Record<string, string> = {
  BillingStatus: 'BillingStatus',
  PurificationDecision: 'PurificationDecision',
};

const AKAR_BUILDER = path.join(process.cwd(), 'src', 'builder');

const berkasBuilder = fs
  .readdirSync(AKAR_BUILDER)
  .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts') && f !== 'index.ts')
  .sort();

describe('barrel builder: setiap berkas terwakili di src/index.ts', () => {
  it('menemukan berkas builder untuk diperiksa (bukan daftar kosong)', () => {
    expect(berkasBuilder.length).toBeGreaterThan(100);
  });

  const namaKelas = (berkas: string): string => {
    const isi = fs.readFileSync(path.join(AKAR_BUILDER, berkas), 'utf8');
    const cocok = isi.match(/export\s+class\s+(\w+)/);
    expect(cocok, `${berkas} tidak mengekspor kelas`).not.toBeNull();
    return cocok![1];
  };

  for (const berkas of berkasBuilder) {
    it(`${berkas}: kelas dapat diimpor dari barrel`, () => {
      const kelas = namaKelas(berkas);
      expect(Object.hasOwn(barrel, kelas), `${kelas} tidak ada di src/index.ts — jalankan scripts/generate_index.py`).toBe(true);
    });
  }

  for (const berkas of berkasBuilder) {
    it(`${berkas}: build() memberi resourceType yang benar`, () => {
      const kelas = namaKelas(berkas);
      const Ctor = (barrel as unknown as Record<string, new () => { build(): Record<string, unknown> }>)[kelas];
      expect(typeof Ctor, `${kelas} bukan konstruktor di barrel`).toBe('function');
      const payload = new Ctor().build();
      const harap = PENGECUALIAN_RESOURCE_TYPE[kelas] ?? berkas.replace(/\.ts$/, '');
      expect(payload.resourceType).toBe(harap);
    });
  }
});
