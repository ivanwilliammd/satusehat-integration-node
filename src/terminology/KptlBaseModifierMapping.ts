/**
 * Satusehat\Integration\Models\KptlBaseModifierMapping.
 * Ported from PHP: fhirvel-ss/src/Terminology/KptlBaseModifierMapping.php
 *
 * KPTL base procedure to modifier mapping model.
 * Links KPTL base codes to valid modifier combinations.
 *
 * @property id                   {number}
 * @property display            {string}
 * @property modifier_1         {string}
 * @property modifier_2         {string}
 * @property modifier_3         {string}
 * @property modifier_4         {string}
 * @property modifier_5         {string}
 * @property base_code          {string}
 * @property modifier_code_1    {string}
 * @property modifier_code_2    {string}
 * @property modifier_code_3    {string}
 * @property modifier_code_4    {string}
 * @property modifier_code_5    {string}
 * @property created_at         {Date|null}
 * @property updated_at         {Date|null}
 */
import { TerminologyDB } from './index.js';

export interface KptlBaseModifierMappingRow {
  id: number;
  display: string;
  modifier_1: string;
  modifier_2: string;
  modifier_3: string;
  modifier_4: string;
  modifier_5: string;
  base_code: string;
  modifier_code_1: string;
  modifier_code_2: string;
  modifier_code_3: string;
  modifier_code_4: string;
  modifier_code_5: string;
  created_at: string | null;
  updated_at: string | null;
}

export class KptlBaseModifierMapping {
  private _row: KptlBaseModifierMappingRow | undefined;

  constructor(private db: TerminologyDB, row?: Partial<KptlBaseModifierMappingRow>) {
    this._row = row as KptlBaseModifierMappingRow | undefined;
  }

  static findByBaseCode(db: TerminologyDB, baseCode: string): KptlBaseModifierMapping[] {
    const rows = db.findKptlBaseModifierMapping(baseCode) as unknown as KptlBaseModifierMappingRow[];
    return rows.map(r => new KptlBaseModifierMapping(db, r));
  }

  toJSON(): KptlBaseModifierMappingRow {
    return this._row!;
  }

  get id(): number { return this._row!.id; }
  get display(): string { return this._row!.display; }
  get modifier_1(): string { return this._row!.modifier_1; }
  get modifier_2(): string { return this._row!.modifier_2; }
  get modifier_3(): string { return this._row!.modifier_3; }
  get modifier_4(): string { return this._row!.modifier_4; }
  get modifier_5(): string { return this._row!.modifier_5; }
  get base_code(): string { return this._row!.base_code; }
  get modifier_code_1(): string { return this._row!.modifier_code_1; }
  get modifier_code_2(): string { return this._row!.modifier_code_2; }
  get modifier_code_3(): string { return this._row!.modifier_code_3; }
  get modifier_code_4(): string { return this._row!.modifier_code_4; }
  get modifier_code_5(): string { return this._row!.modifier_code_5; }
  get created_at(): Date | null { return this._row!.created_at ? new Date(this._row!.created_at) : null; }
  get updated_at(): Date | null { return this._row!.updated_at ? new Date(this._row!.updated_at) : null; }
}
