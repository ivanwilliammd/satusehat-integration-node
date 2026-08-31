/**
 * Satusehat\Integration\Models\KptlKamar.
 * Ported from PHP: fhirvel-ss/src/Terminology/KptlKamar.php
 *
 * KPTL (Kode Prosedur Tindakan Layanan) kamar (room/action) terminology model.
 * Represents INA-CBGs room and service action codes.
 *
 * @property id                    {number}
 * @property nama_tindakan_dan_layanan {string}
 * @property base_code            {string}
 * @property allowed_modifiers    {string}
 * @property kode_kptl           {string}
 * @property display             {string}
 * @property code_system        {string}
 * @property version            {string}
 * @property created_at          {Date|null}
 * @property updated_at          {Date|null}
 */
import { TerminologyDB } from './index.js';

export interface KptlKamarRow {
  id: number;
  nama_tindakan_dan_layanan: string;
  base_code: string;
  allowed_modifiers: string;
  kode_kptl: string;
  display: string;
  code_system: string;
  version: string;
  created_at: string | null;
  updated_at: string | null;
}

export class KptlKamar {
  private _row: KptlKamarRow | undefined;

  constructor(private db: TerminologyDB, row?: Partial<KptlKamarRow>) {
    this._row = row as KptlKamarRow | undefined;
  }

  static findByKode(db: TerminologyDB, kode: string): KptlKamar | null {
    const row = db.findKptlKamar(kode) as KptlKamarRow | undefined;
    return row ? new KptlKamar(db, row) : null;
  }

  toJSON(): KptlKamarRow {
    return this._row!;
  }

  get id(): number { return this._row!.id; }
  get nama_tindakan_dan_layanan(): string { return this._row!.nama_tindakan_dan_layanan; }
  get base_code(): string { return this._row!.base_code; }
  get allowed_modifiers(): string { return this._row!.allowed_modifiers; }
  get kode_kptl(): string { return this._row!.kode_kptl; }
  get display(): string { return this._row!.display; }
  get code_system(): string { return this._row!.code_system; }
  get version(): string { return this._row!.version; }
  get created_at(): Date | null { return this._row!.created_at ? new Date(this._row!.created_at) : null; }
  get updated_at(): Date | null { return this._row!.updated_at ? new Date(this._row!.updated_at) : null; }
}
