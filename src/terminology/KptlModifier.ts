/**
 * Satusehat\Integration\Models\KptlModifier.
 * Ported from PHP: fhirvel-ss/src/Terminology/KptlModifier.php
 *
 * KPTL (Kode Prosedur Tindakan Layanan) modifier terminology model.
 * Represents modifier codes that refine INA-CBGs procedure codes.
 *
 * @property id               {number}
 * @property kategori_kelompok {string}
 * @property item            {string}
 * @property modifier_code   {string}
 * @property created_at      {Date|null}
 * @property updated_at      {Date|null}
 */
import { TerminologyDB } from './index.js';

export interface KptlModifierRow {
  id: number;
  kategori_kelompok: string;
  item: string;
  modifier_code: string;
  created_at: string | null;
  updated_at: string | null;
}

export class KptlModifier {
  private _row: KptlModifierRow | undefined;

  constructor(private db: TerminologyDB, row?: Partial<KptlModifierRow>) {
    this._row = row as KptlModifierRow | undefined;
  }

  static findByCode(db: TerminologyDB, modifierCode: string): KptlModifier | null {
    const row = db.findKptlModifier(modifierCode) as KptlModifierRow | undefined;
    return row ? new KptlModifier(db, row) : null;
  }

  toJSON(): KptlModifierRow {
    return this._row!;
  }

  get id(): number { return this._row!.id; }
  get kategori_kelompok(): string { return this._row!.kategori_kelompok; }
  get item(): string { return this._row!.item; }
  get modifier_code(): string { return this._row!.modifier_code; }
  get created_at(): Date | null { return this._row!.created_at ? new Date(this._row!.created_at) : null; }
  get updated_at(): Date | null { return this._row!.updated_at ? new Date(this._row!.updated_at) : null; }
}
