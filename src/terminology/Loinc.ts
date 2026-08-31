/**
 * Satusehat\Integration\Models\Loinc.
 * Ported from PHP: fhirvel-ss/src/Terminology/Loinc.php
 *
 * LOINC (Logical Observation Identifiers Names and Codes) terminology model.
 * Used for laboratory observations, clinical measurements, and survey instruments
 * in SATUSEHAT FHIR Observation resources.
 *
 * @property id                   {number}
 * @property LOINC_NUM            {string}
 * @property COMPONENT            {string}
 * @property PROPERTY             {string}
 * @property TIME_ASPCT           {string}
 * @property SYSTEM               {string}
 * @property SCALE_TYP            {string}
 * @property METHOD_TYP           {string}
 * @property CLASS                {string}
 * @property CLASSTYPE            {string}
 * @property LONG_COMMON_NAME     {string}
 * @property SHORTNAME            {string}
 * @property STATUS               {string}
 * @property VersionFirstReleased {string}
 * @property VersionLastChanged   {string}
 * @property created_at           {Date|null}
 * @property updated_at           {Date|null}
 */
import { TerminologyDB } from './index.js';

export interface LoincRow {
  id: number;
  LOINC_NUM: string;
  COMPONENT: string;
  PROPERTY: string;
  TIME_ASPCT: string;
  SYSTEM: string;
  SCALE_TYP: string;
  METHOD_TYP: string;
  CLASS: string;
  CLASSTYPE: string;
  LONG_COMMON_NAME: string;
  SHORTNAME: string;
  STATUS: string;
  VersionFirstReleased: string;
  VersionLastChanged: string;
  created_at: string | null;
  updated_at: string | null;
}

export class Loinc {
  private _row: LoincRow | undefined;

  constructor(private db: TerminologyDB, row?: Partial<LoincRow>) {
    this._row = row as LoincRow | undefined;
  }

  static findByNum(db: TerminologyDB, loincNum: string): Loinc | null {
    const row = db.findLoinc(loincNum) as LoincRow | undefined;
    return row ? new Loinc(db, row) : null;
  }

  static search(db: TerminologyDB, term: string, limit = 20): Loinc[] {
    const rows = db.searchLoinc(term, limit) as unknown as LoincRow[];
    return rows.map(r => new Loinc(db, r));
  }

  toJSON(): LoincRow {
    return this._row!;
  }

  get id(): number { return this._row!.id; }
  get LOINC_NUM(): string { return this._row!.LOINC_NUM; }
  get COMPONENT(): string { return this._row!.COMPONENT; }
  get PROPERTY(): string { return this._row!.PROPERTY; }
  get TIME_ASPCT(): string { return this._row!.TIME_ASPCT; }
  get SYSTEM(): string { return this._row!.SYSTEM; }
  get SCALE_TYP(): string { return this._row!.SCALE_TYP; }
  get METHOD_TYP(): string { return this._row!.METHOD_TYP; }
  get CLASS(): string { return this._row!.CLASS; }
  get CLASSTYPE(): string { return this._row!.CLASSTYPE; }
  get LONG_COMMON_NAME(): string { return this._row!.LONG_COMMON_NAME; }
  get SHORTNAME(): string { return this._row!.SHORTNAME; }
  get STATUS(): string { return this._row!.STATUS; }
  get VersionFirstReleased(): string { return this._row!.VersionFirstReleased; }
  get VersionLastChanged(): string { return this._row!.VersionLastChanged; }
  get created_at(): Date | null { return this._row!.created_at ? new Date(this._row!.created_at) : null; }
  get updated_at(): Date | null { return this._row!.updated_at ? new Date(this._row!.updated_at) : null; }
}
