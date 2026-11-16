/**
 * Uji RATCHET permukaan parser: setiap builder harus punya parser, dan setiap elemen tingkat atas
 * yang bisa DITULIS builder harus bisa DIBACA kembali.
 *
 * Yang dijaga bukan perilaku (itu tugas golden), melainkan kesimetrian arah: SDK yang bisa
 * mengirim `Encounter.status` tetapi tidak bisa membacanya kembali kehilangan separuh gunanya.
 *
 * Daftar elemen dibaca dari BUILDER, bukan dari parser, supaya uji ini tidak bisa lulus hanya
 * karena parser dan uji sama-sama melewatkan elemen yang sama.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const BUILDER = join(__dirname, '..', 'builder');
const PARSER = __dirname;

function resourceDari(teks: string): string | null {
  const m = /resourceType:\s*'([^']+)'/.exec(teks);
  return m ? m[1] : null;
}

function elemenBuilder(teks: string): string[] {
  const kunci: string[] = [];
  for (const m of teks.matchAll(/this\.(?:set|push)\(\s*'([^']+)'/g)) {
    const k = m[1].split('/')[0];
    if (k !== 'resourceType' && /^[A-Za-z][A-Za-z0-9_]*$/.test(k) && !kunci.includes(k)) kunci.push(k);
  }
  return kunci;
}

function daftarBuilder(): { resource: string; elemen: string[] }[] {
  const hasil: { resource: string; elemen: string[] }[] = [];
  for (const berkas of readdirSync(BUILDER)) {
    if (!berkas.endsWith('.ts') || berkas.endsWith('.test.ts')) continue;
    const teks = readFileSync(join(BUILDER, berkas), 'utf8');
    const resource = resourceDari(teks);
    if (!resource) continue;
    hasil.push({ resource, elemen: elemenBuilder(teks) });
  }
  return hasil;
}

const KASUS = daftarBuilder();

describe('permukaan parser vs builder', () => {
  it.each(KASUS)('$resource punya parser', ({ resource }) => {
    expect(
      existsSync(join(PARSER, `${resource}Parser.ts`)),
      `parser untuk ${resource} belum ada — jalankan scripts/generate_parsers.py`
    ).toBe(true);
  });

  it.each(KASUS)('$resource: setiap elemen builder bisa dibaca', ({ resource, elemen }) => {
    const berkas = join(PARSER, `${resource}Parser.ts`);
    expect(existsSync(berkas), `parser untuk ${resource} belum ada`).toBe(true);
    const teks = readFileSync(berkas, 'utf8');
    const ada = new Set(Array.from(teks.matchAll(/^\s*(get\w+)\(\)/gm), (m) => m[1]));
    const hilang = elemen.filter((k) => !ada.has('get' + k[0].toUpperCase() + k.slice(1)));
    expect(hilang, `${resource}Parser tidak punya getter untuk: ${hilang.join(', ')}`).toEqual([]);
  });
});
