/**
 * Satusehat\Integration\Models\Icd10.
 * Ported from PHP: fhirvel-ss/src/Terminology/Icd10.php
 *
 * ICD-10 (International Classification of Diseases, 10th Revision) terminology model.
 * Represents diagnosis codes used in SATUSEHAT FHIR R4 Condition/Procedure resources.
 *
 * @property id          {number}
 * @property icd10_code  {string}  e.g. "A00", "J18.9"
 * @property icd10_en    {string}  English description
 * @property icd10_id    {string}  Indonesian description (nullable)
 * @property active      {boolean}
 * @property created_at  {Date|null}
 * @property updated_at  {Date|null}
 */
import { TerminologyDB } from './index.js';

export interface Icd10Row {
  id: number;
  icd10_code: string;
  icd10_en: string;
  icd10_id: string | null;
  active: boolean;
  created_at: string | null;
  updated_at: string | null;
}

export class Icd10 {
  /** Raw row data from the database. */
  private _row: Icd10Row | undefined;

  constructor(private db: TerminologyDB, row?: Partial<Icd10Row>) {
    this._row = row as Icd10Row | undefined;
  }

  /** Instantiate from a database lookup by ICD-10 code. */
  static findByCode(db: TerminologyDB, code: string): Icd10 | null {
    const row = db.findIcd10(code) as Icd10Row | undefined;
    return row ? new Icd10(db, row) : null;
  }

  /** Search ICD-10 codes by term (code prefix, English, or Indonesian description). */
  static search(db: TerminologyDB, term: string, limit = 20): Icd10[] {
    const rows = db.searchIcd10(term, limit) as unknown as Icd10Row[];
    return rows.map(r => new Icd10(db, r));
  }

  /** Get all attributes as a plain object. */
  toJSON(): Icd10Row {
    return this._row!;
  }

  get id(): number { return this._row!.id; }
  get icd10_code(): string { return this._row!.icd10_code; }
  get icd10_en(): string { return this._row!.icd10_en; }
  get icd10_id(): string | null { return this._row!.icd10_id; }
  get active(): boolean { return this._row!.active ?? true; }
  get created_at(): Date | null { return this._row!.created_at ? new Date(this._row!.created_at) : null; }
  get updated_at(): Date | null { return this._row!.updated_at ? new Date(this._row!.updated_at) : null; }
}
