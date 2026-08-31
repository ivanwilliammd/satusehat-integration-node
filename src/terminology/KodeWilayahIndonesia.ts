/**
 * Satusehat\Integration\Models\KodeWilayahIndonesia.
 * Ported from PHP: fhirvel-ss/src/Terminology/KodeWilayahIndonesia.php
 *
 * Indonesian administrative region (Kode Wilayah) terminology model.
 * Represents the hierarchical Indonesian geographic codes from province down to village level.
 *
 * @property id              {number}
 * @property kode_wilayah   {string}  e.g. "11", "1101", "110101"
 * @property nama_wilayah   {string}  e.g. "Aceh", "Kab. Aceh Selatan"
 * @property level          {number}  1=province, 2=regency, 3=district, 4=village
 * @property parent         {string|null}  parent kode_wilayah (e.g. "11" for "1101")
 * @property state          {string|null}  province name
 * @property created_at     {Date|null}
 * @property updated_at     {Date|null}
 */
import { TerminologyDB } from './index.js';

export interface KodeWilayahIndonesiaRow {
  id: number;
  kode_wilayah: string;
  nama_wilayah: string;
  level: number;
  parent: string | null;
  state: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export class KodeWilayahIndonesia {
  private _row: KodeWilayahIndonesiaRow | undefined;

  constructor(private db: TerminologyDB, row?: Partial<KodeWilayahIndonesiaRow>) {
    this._row = row as KodeWilayahIndonesiaRow | undefined;
  }

  static findByKode(db: TerminologyDB, kode: string): KodeWilayahIndonesia | null {
    const row = db.findWilayah(kode) as KodeWilayahIndonesiaRow | undefined;
    return row ? new KodeWilayahIndonesia(db, row) : null;
  }

  static getProvinces(db: TerminologyDB): KodeWilayahIndonesia[] {
    const rows = db.getProvinces() as unknown as KodeWilayahIndonesiaRow[];
    return rows.map(r => new KodeWilayahIndonesia(db, r));
  }

  static findChildren(db: TerminologyDB, parent: string): KodeWilayahIndonesia[] {
    const rows = db.findChildren(parent) as unknown as KodeWilayahIndonesiaRow[];
    return rows.map(r => new KodeWilayahIndonesia(db, r));
  }

  toJSON(): KodeWilayahIndonesiaRow {
    return this._row!;
  }

  get id(): number { return this._row!.id; }
  get kode_wilayah(): string { return this._row!.kode_wilayah; }
  get nama_wilayah(): string { return this._row!.nama_wilayah; }
  get level(): number { return this._row!.level; }
  get parent(): string | null { return this._row!.parent; }
  get state(): string | null { return this._row!.state; }
  get created_at(): Date | null { return this._row!.created_at ? new Date(this._row!.created_at) : null; }
  get updated_at(): Date | null { return this._row!.updated_at ? new Date(this._row!.updated_at) : null; }
}
