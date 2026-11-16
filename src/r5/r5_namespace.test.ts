/**
 * Uji kesiapan namespace R5 (TypeScript).
 *
 * Janji ke pemakai: mengganti `import ... from './builder/X'` menjadi
 * `import ... from './r5/builder/X'` tidak boleh mengubah apa pun selain baris itu.
 *
 * Yang diperiksa: kelas R5 ada, prototipenya mewarisi langsung kelas kanon, dan setiap method
 * publik kanon diwarisi apa adanya (bukan disalin, bukan ditimpa).
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const BUILDER = join(__dirname, '..', 'builder');
const R5 = join(__dirname, 'builder');

function kelasDari(teks: string): string | null {
  const m = /^export class (\w+)/m.exec(teks);
  return m ? m[1] : null;
}

const KASUS = readdirSync(BUILDER)
  .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts') && f !== 'index.ts')
  .map((f) => ({ berkas: f, nama: kelasDari(readFileSync(join(BUILDER, f), 'utf8')) }))
  .filter((k): k is { berkas: string; nama: string } => k.nama !== null);

describe('namespace R5', () => {
  it.each(KASUS)('$berkas punya padanan di r5/builder', ({ berkas }) => {
    expect(
      existsSync(join(R5, berkas)),
      `r5/builder/${berkas} belum ada — jalankan scripts/generate_r5_namespace.py`
    ).toBe(true);
  });

  it.each(KASUS)('$nama: R5 mewarisi kanon apa adanya', async ({ berkas, nama }) => {
    const r4 = await import(join(BUILDER, berkas));
    const r5 = await import(join(R5, berkas));
    const K4 = r4[nama] ?? r4[`${nama}Builder`];
    const K5 = r5[nama];

    expect(typeof K5, `R5 ${nama} tidak diekspor`).toBe('function');
    expect(Object.getPrototypeOf(K5.prototype), `${nama} bukan turunan langsung kanon`).toBe(K4.prototype);

    const hilang = Object.getOwnPropertyNames(K4.prototype).filter(
      (m) => m !== 'constructor' && K5.prototype[m] !== K4.prototype[m]
    );
    expect(hilang, `${nama}: method ini tidak diwarisi apa adanya: ${hilang.join(', ')}`).toEqual([]);
  });
});
