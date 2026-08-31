/**
 * Satusehat\Integration\Models\Cvx.
 * Ported from PHP: fhirvel-ss/src/Terminology/Cvx.php
 *
 * CVX (Vaccines Administered) terminology model.
 * CVX codes represent vaccine products for immunization records
 * in SATUSEHAT FHIR Immunization resources.
 *
 * @property id                    {number}
 * @property cvx_code             {string}
 * @property cvx_short_description {string}
 * @property full_vaccine_name    {string}
 * @property note                 {string}
 * @property vaccine_status       {string}
 * @property internal_id          {number}
 * @property nonvaccine           {boolean}
 * @property update_date          {Date|null}
 * @property created_at           {Date|null}
 * @property updated_at           {Date|null}
 */
import { TerminologyDB } from './index.js';

export interface CvxRow {
  id: number;
  cvx_code: string;
  cvx_short_description: string;
  full_vaccine_name: string;
  note: string | null;
  vaccine_status: string;
  internal_id: number;
  nonvaccine: boolean;
  update_date: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export class Cvx {
  private _row: CvxRow | undefined;

  constructor(private db: TerminologyDB, row?: Partial<CvxRow>) {
    this._row = row as CvxRow | undefined;
  }

  static findByCode(db: TerminologyDB, code: string): Cvx | null {
    const row = db.findCvx(code) as CvxRow | undefined;
    return row ? new Cvx(db, row) : null;
  }

  toJSON(): CvxRow {
    return this._row!;
  }

  get id(): number { return this._row!.id; }
  get cvx_code(): string { return this._row!.cvx_code; }
  get cvx_short_description(): string { return this._row!.cvx_short_description; }
  get full_vaccine_name(): string { return this._row!.full_vaccine_name; }
  get note(): string | null { return this._row!.note; }
  get vaccine_status(): string { return this._row!.vaccine_status; }
  get internal_id(): number { return this._row!.internal_id; }
  get nonvaccine(): boolean { return this._row!.nonvaccine ?? false; }
  get update_date(): Date | null { return this._row!.update_date ? new Date(this._row!.update_date) : null; }
  get created_at(): Date | null { return this._row!.created_at ? new Date(this._row!.created_at) : null; }
  get updated_at(): Date | null { return this._row!.updated_at ? new Date(this._row!.updated_at) : null; }
}
