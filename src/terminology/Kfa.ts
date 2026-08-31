/**
 * Satusehat\Integration\Models\Kfa.
 * Ported from PHP: fhirvel-ss/src/Terminology/Kfa.php
 *
 * KFA (Katalog Farmasi Alat Kesehatan) terminology model.
 * Contains medication and medical device product codes from LKPP/e-Catalogue.
 *
 * @property id                    {number}
 * @property kfa_code            {string}
 * @property product_template     {string}
 * @property display_name        {string}
 * @property brand               {string}
 * @property uom_drug_form       {string}
 * @property drug_form_hl7       {string}
 * @property medication_form     {string}
 * @property medication_form_code {string}
 * @property logistic_dose       {number}
 * @property drug_class         {string}
 * @property atc_class          {string}
 * @property fornas             {boolean}
 * @property lkpp_price         {number|null}
 * @property izin_edar          {string|null}
 * @property het                {number|null}
 * @property manufacturer       {string}
 * @property lkpp_show          {boolean}
 * @property tag                {string|null}
 * @property status             {string}
 * @property created_at         {Date|null}
 * @property updated_at         {Date|null}
 */
import { TerminologyDB } from './index.js';

export interface KfaRow {
  id: number;
  kfa_code: string;
  product_template: string;
  display_name: string;
  brand: string;
  uom_drug_form: string;
  drug_form_hl7: string;
  medication_form: string;
  medication_form_code: string;
  logistic_dose: number;
  drug_class: string;
  atc_class: string;
  fornas: boolean;
  lkpp_price: number | null;
  izin_edar: string | null;
  het: number | null;
  manufacturer: string;
  lkpp_show: boolean;
  tag: string | null;
  status: string;
  created_at: string | null;
  updated_at: string | null;
}

export class Kfa {
  private _row: KfaRow | undefined;

  constructor(private db: TerminologyDB, row?: Partial<KfaRow>) {
    this._row = row as KfaRow | undefined;
  }

  static findByCode(db: TerminologyDB, code: string): Kfa | null {
    const row = db.findKfa(code) as KfaRow | undefined;
    return row ? new Kfa(db, row) : null;
  }

  static search(db: TerminologyDB, term: string, limit = 20): Kfa[] {
    const rows = db.searchKfa(term, limit) as unknown as KfaRow[];
    return rows.map(r => new Kfa(db, r));
  }

  toJSON(): KfaRow {
    return this._row!;
  }

  get id(): number { return this._row!.id; }
  get kfa_code(): string { return this._row!.kfa_code; }
  get product_template(): string { return this._row!.product_template; }
  get display_name(): string { return this._row!.display_name; }
  get brand(): string { return this._row!.brand; }
  get uom_drug_form(): string { return this._row!.uom_drug_form; }
  get drug_form_hl7(): string { return this._row!.drug_form_hl7; }
  get medication_form(): string { return this._row!.medication_form; }
  get medication_form_code(): string { return this._row!.medication_form_code; }
  get logistic_dose(): number { return this._row!.logistic_dose; }
  get drug_class(): string { return this._row!.drug_class; }
  get atc_class(): string { return this._row!.atc_class; }
  get fornas(): boolean { return this._row!.fornas ?? false; }
  get lkpp_price(): number | null { return this._row!.lkpp_price; }
  get izin_edar(): string | null { return this._row!.izin_edar; }
  get het(): number | null { return this._row!.het; }
  get manufacturer(): string { return this._row!.manufacturer; }
  get lkpp_show(): boolean { return this._row!.lkpp_show ?? false; }
  get tag(): string | null { return this._row!.tag; }
  get status(): string { return this._row!.status; }
  get created_at(): Date | null { return this._row!.created_at ? new Date(this._row!.created_at) : null; }
  get updated_at(): Date | null { return this._row!.updated_at ? new Date(this._row!.updated_at) : null; }
}
