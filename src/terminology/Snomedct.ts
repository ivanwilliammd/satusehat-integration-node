/**
 * Satusehat\Integration\Models\Snomedct.
 * Ported from PHP: fhirvel-ss/src/Terminology/Snomedct.php
 *
 * SNOMED CT (Systematized Nomenclature of Medicine - Clinical Terms)
 * clinical terminology used in SATUSEHAT FHIR resources.
 *
 * @property id           {number}
 * @property code         {string}    SNOMED CT concept code
 * @property fsn          {string}    Fully Specified Name
 * @property preferred    {string}    Preferred term
 * @property acceptable   {string|null}
 * @property version      {string}
 * @property hierarchy    {string}
 * @property created_at   {Date|null}
 * @property updated_at   {Date|null}
 */
import { TerminologyDB } from './index.js';

export interface SnomedctRow {
  id: number;
  code: string;
  fsn: string;
  preferred: string;
  acceptable: string | null;
  version: string;
  hierarchy: string;
  created_at: string | null;
  updated_at: string | null;
}

export class Snomedct {
  private _row: SnomedctRow | undefined;

  constructor(private db: TerminologyDB, row?: Partial<SnomedctRow>) {
    this._row = row as SnomedctRow | undefined;
  }

  static findByCode(db: TerminologyDB, code: string): Snomedct | null {
    const row = db.findSnomedct(code) as SnomedctRow | undefined;
    return row ? new Snomedct(db, row) : null;
  }

  static search(db: TerminologyDB, term: string, limit = 20): Snomedct[] {
    const rows = db.searchSnomedct(term, limit) as unknown as SnomedctRow[];
    return rows.map(r => new Snomedct(db, r));
  }

  toJSON(): SnomedctRow {
    return this._row!;
  }

  get id(): number { return this._row!.id; }
  get code(): string { return this._row!.code; }
  get fsn(): string { return this._row!.fsn; }
  get preferred(): string { return this._row!.preferred; }
  get acceptable(): string | null { return this._row!.acceptable; }
  get version(): string { return this._row!.version; }
  get hierarchy(): string { return this._row!.hierarchy; }
  get created_at(): Date | null { return this._row!.created_at ? new Date(this._row!.created_at) : null; }
  get updated_at(): Date | null { return this._row!.updated_at ? new Date(this._row!.updated_at) : null; }
}
