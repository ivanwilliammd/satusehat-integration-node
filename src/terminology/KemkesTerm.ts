/**
 * Satusehat\Integration\Models\KemkesTerm.
 * Ported from PHP: fhirvel-ss/src/Terminology/KemkesTerm.php
 *
 * KemkesTerm terminology model.
 * Represents codes from the Indonesian Ministry of Health (Kemkes) terminology server.
 *
 * @property id            {number}
 * @property resource_type {string}  FHIR resource type this term belongs to
 * @property attribute_path {string} dot-notation path in the FHIR resource
 * @property code         {string}
 * @property parent_code   {string|null}
 * @property display      {string}
 * @property display_en   {string}
 * @property code_system   {string}
 * @property created_at   {Date|null}
 * @property updated_at   {Date|null}
 */
import { TerminologyDB } from './index.js';

export interface KemkesTermRow {
  id: number;
  resource_type: string;
  attribute_path: string;
  code: string;
  parent_code: string | null;
  display: string;
  display_en: string;
  code_system: string;
  created_at: string | null;
  updated_at: string | null;
}

export class KemkesTerm {
  private _row: KemkesTermRow | undefined;

  constructor(private db: TerminologyDB, row?: Partial<KemkesTermRow>) {
    this._row = row as KemkesTermRow | undefined;
  }

  static findByCode(db: TerminologyDB, code: string, resourceType?: string): KemkesTerm | null {
    const row = db.findKemkesTerm(code, resourceType) as KemkesTermRow | undefined;
    return row ? new KemkesTerm(db, row) : null;
  }

  static search(db: TerminologyDB, term: string, limit = 20): KemkesTerm[] {
    const rows = db.searchKemkesTerm(term, limit) as unknown as KemkesTermRow[];
    return rows.map(r => new KemkesTerm(db, r));
  }

  toJSON(): KemkesTermRow {
    return this._row!;
  }

  get id(): number { return this._row!.id; }
  get resource_type(): string { return this._row!.resource_type; }
  get attribute_path(): string { return this._row!.attribute_path; }
  get code(): string { return this._row!.code; }
  get parent_code(): string | null { return this._row!.parent_code; }
  get display(): string { return this._row!.display; }
  get display_en(): string { return this._row!.display_en; }
  get code_system(): string { return this._row!.code_system; }
  get created_at(): Date | null { return this._row!.created_at ? new Date(this._row!.created_at) : null; }
  get updated_at(): Date | null { return this._row!.updated_at ? new Date(this._row!.updated_at) : null; }
}
