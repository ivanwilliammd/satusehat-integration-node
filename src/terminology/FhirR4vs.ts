/**
 * Satusehat\Integration\Models\FhirR4vs.
 * Ported from PHP: fhirvel-ss/src/Terminology/FhirR4vs.php
 *
 * FHIR R4 ValueSet terminology model.
 * Represents FHIR ValueSet resources loaded into a local database.
 *
 * @property id               {number}
 * @property url              {string}
 * @property version         {string}
 * @property name            {string}
 * @property title           {string}
 * @property status          {string}
 * @property experimental    {boolean}
 * @property description     {string}
 * @property date            {string}
 * @property publisher       {string}
 * @property content         {string}
 * @property concept_code_l1  {string}
 * @property concept_display_l1  {string}
 * @property concept_definition_l1 {string}
 * @property concept_code_l2  {string}
 * @property concept_display_l2  {string}
 * @property concept_definition_l2 {string}
 * @property created_at      {Date|null}
 * @property updated_at      {Date|null}
 */
import { TerminologyDB } from './index.js';

export interface FhirR4vsRow {
  id: number;
  url: string;
  version: string;
  name: string;
  title: string;
  status: string;
  experimental: boolean;
  description: string;
  date: string;
  publisher: string;
  content: string;
  concept_code_l1: string;
  concept_display_l1: string;
  concept_definition_l1: string;
  concept_code_l2: string;
  concept_display_l2: string;
  concept_definition_l2: string;
  created_at: string | null;
  updated_at: string | null;
}

export class FhirR4vs {
  private _row: FhirR4vsRow | undefined;

  constructor(private db: TerminologyDB, row?: Partial<FhirR4vsRow>) {
    this._row = row as FhirR4vsRow | undefined;
  }

  static findByIdentifier(db: TerminologyDB, identifier: string): FhirR4vs | null {
    const row = db.findFhirR4vs(identifier) as FhirR4vsRow | undefined;
    return row ? new FhirR4vs(db, row) : null;
  }

  toJSON(): FhirR4vsRow {
    return this._row!;
  }

  get id(): number { return this._row!.id; }
  get url(): string { return this._row!.url; }
  get version(): string { return this._row!.version; }
  get name(): string { return this._row!.name; }
  get title(): string { return this._row!.title; }
  get status(): string { return this._row!.status; }
  get experimental(): boolean { return this._row!.experimental ?? false; }
  get description(): string { return this._row!.description; }
  get date(): string { return this._row!.date; }
  get publisher(): string { return this._row!.publisher; }
  get content(): string { return this._row!.content; }
  get concept_code_l1(): string { return this._row!.concept_code_l1; }
  get concept_display_l1(): string { return this._row!.concept_display_l1; }
  get concept_definition_l1(): string { return this._row!.concept_definition_l1; }
  get concept_code_l2(): string { return this._row!.concept_code_l2; }
  get concept_display_l2(): string { return this._row!.concept_display_l2; }
  get concept_definition_l2(): string { return this._row!.concept_definition_l2; }
  get created_at(): Date | null { return this._row!.created_at ? new Date(this._row!.created_at) : null; }
  get updated_at(): Date | null { return this._row!.updated_at ? new Date(this._row!.updated_at) : null; }
}
