/**
 * Satusehat\Integration\Models\Ucum.
 * Ported from PHP: fhirvel-ss/src/Terminology/Ucum.php
 *
 * UCUM (Unified Code for Units of Measure) terminology model.
 * Used to represent units of measure in SATUSEHAT FHIR Quantity resources.
 *
 * @property id              {number}
 * @property code            {string}
 * @property descriptive_name {string}
 * @property code_system     {string}
 * @property definition      {string}
 * @property date_created    {Date|null}
 * @property synonym         {string}
 * @property status          {string}
 * @property kind_of_quantity {string}
 * @property date_revised    {Date|null}
 * @property concept_id      {string}
 * @property dimension       {string}
 * @property created_at      {Date|null}
 * @property updated_at      {Date|null}
 */
import { TerminologyDB } from './index.js';

export interface UcumRow {
  id: number;
  code: string;
  descriptive_name: string;
  code_system: string;
  definition: string;
  date_created: string | null;
  synonym: string;
  status: string;
  kind_of_quantity: string;
  date_revised: string | null;
  concept_id: string;
  dimension: string;
  created_at: string | null;
  updated_at: string | null;
}

export class Ucum {
  private _row: UcumRow | undefined;

  constructor(private db: TerminologyDB, row?: Partial<UcumRow>) {
    this._row = row as UcumRow | undefined;
  }

  static findByCode(db: TerminologyDB, code: string): Ucum | null {
    const row = db.findUcum(code) as UcumRow | undefined;
    return row ? new Ucum(db, row) : null;
  }

  static search(db: TerminologyDB, term: string, limit = 20): Ucum[] {
    const rows = db.searchUcum(term, limit) as unknown as UcumRow[];
    return rows.map(r => new Ucum(db, r));
  }

  toJSON(): UcumRow {
    return this._row!;
  }

  get id(): number { return this._row!.id; }
  get code(): string { return this._row!.code; }
  get descriptive_name(): string { return this._row!.descriptive_name; }
  get code_system(): string { return this._row!.code_system; }
  get definition(): string { return this._row!.definition; }
  get date_created(): Date | null { return this._row!.date_created ? new Date(this._row!.date_created) : null; }
  get synonym(): string { return this._row!.synonym; }
  get status(): string { return this._row!.status; }
  get kind_of_quantity(): string { return this._row!.kind_of_quantity; }
  get date_revised(): Date | null { return this._row!.date_revised ? new Date(this._row!.date_revised) : null; }
  get concept_id(): string { return this._row!.concept_id; }
  get dimension(): string { return this._row!.dimension; }
  get created_at(): Date | null { return this._row!.created_at ? new Date(this._row!.created_at) : null; }
  get updated_at(): Date | null { return this._row!.updated_at ? new Date(this._row!.updated_at) : null; }
}
