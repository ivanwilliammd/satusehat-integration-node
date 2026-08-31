/**
 * Satusehat\Integration\Models\Icd9cm.
 * Ported from PHP: fhirvel-ss/src/Terminology/Icd9cm.php
 *
 * ICD-9-CM (International Classification of Diseases, 9th Revision, Clinical Modification)
 * procedure coding system used in SATUSEHAT.
 *
 * @property id            {number}
 * @property icd9cm_code   {string}
 * @property icd9cm_en     {string}  English description
 * @property icd9cm_id     {string}  Indonesian description (nullable)
 * @property active        {boolean}
 * @property created_at    {Date|null}
 * @property updated_at    {Date|null}
 */
import { TerminologyDB } from './index.js';

export interface Icd9cmRow {
  id: number;
  icd9cm_code: string;
  icd9cm_en: string;
  icd9cm_id: string | null;
  active: boolean;
  created_at: string | null;
  updated_at: string | null;
}

export class Icd9cm {
  private _row: Icd9cmRow | undefined;

  constructor(private db: TerminologyDB, row?: Partial<Icd9cmRow>) {
    this._row = row as Icd9cmRow | undefined;
  }

  static findByCode(db: TerminologyDB, code: string): Icd9cm | null {
    const row = db.findIcd9cm(code) as Icd9cmRow | undefined;
    return row ? new Icd9cm(db, row) : null;
  }

  static search(db: TerminologyDB, term: string, limit = 20): Icd9cm[] {
    const rows = db.searchIcd9cm(term, limit) as unknown as Icd9cmRow[];
    return rows.map(r => new Icd9cm(db, r));
  }

  toJSON(): Icd9cmRow {
    return this._row!;
  }

  get id(): number { return this._row!.id; }
  get icd9cm_code(): string { return this._row!.icd9cm_code; }
  get icd9cm_en(): string { return this._row!.icd9cm_en; }
  get icd9cm_id(): string | null { return this._row!.icd9cm_id; }
  get active(): boolean { return this._row!.active ?? true; }
  get created_at(): Date | null { return this._row!.created_at ? new Date(this._row!.created_at) : null; }
  get updated_at(): Date | null { return this._row!.updated_at ? new Date(this._row!.updated_at) : null; }
}
