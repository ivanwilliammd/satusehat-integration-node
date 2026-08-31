/**
 * Satusehat\Integration\Models\KptlBase.
 * Ported from PHP: fhirvel-ss/src/Terminology/KptlBase.php
 *
 * KPTL (Kode Prosedur Tindakan Layanan) base procedure terminology model.
 * Represents Indonesian procedure/tariff base codes used in INACBG/JKN billing.
 *
 * @property id           {number}
 * @property status      {string}
 * @property base_code   {string}
 * @property base_display {string}
 * @property modifier_1  {string}
 * @property modifier_2  {string}
 * @property modifier_3  {string}
 * @property modifier_4  {string}
 * @property modifier_5  {string}
 * @property created_at  {Date|null}
 * @property updated_at  {Date|null}
 */
import { TerminologyDB } from './index.js';

export interface KptlBaseRow {
  id: number;
  status: string;
  base_code: string;
  base_display: string;
  modifier_1: string;
  modifier_2: string;
  modifier_3: string;
  modifier_4: string;
  modifier_5: string;
  created_at: string | null;
  updated_at: string | null;
}

export class KptlBase {
  private _row: KptlBaseRow | undefined;

  constructor(private db: TerminologyDB, row?: Partial<KptlBaseRow>) {
    this._row = row as KptlBaseRow | undefined;
  }

  static findByCode(db: TerminologyDB, baseCode: string): KptlBase | null {
    const row = db.findKptlBase(baseCode) as KptlBaseRow | undefined;
    return row ? new KptlBase(db, row) : null;
  }

  toJSON(): KptlBaseRow {
    return this._row!;
  }

  get id(): number { return this._row!.id; }
  get status(): string { return this._row!.status; }
  get base_code(): string { return this._row!.base_code; }
  get base_display(): string { return this._row!.base_display; }
  get modifier_1(): string { return this._row!.modifier_1; }
  get modifier_2(): string { return this._row!.modifier_2; }
  get modifier_3(): string { return this._row!.modifier_3; }
  get modifier_4(): string { return this._row!.modifier_4; }
  get modifier_5(): string { return this._row!.modifier_5; }
  get created_at(): Date | null { return this._row!.created_at ? new Date(this._row!.created_at) : null; }
  get updated_at(): Date | null { return this._row!.updated_at ? new Date(this._row!.updated_at) : null; }
}
