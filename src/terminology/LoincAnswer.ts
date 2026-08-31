/**
 * Satusehat\Integration\Models\LoincAnswer.
 * Ported from PHP: fhirvel-ss/src/Terminology/LoincAnswer.php
 *
 * LOINC Answer List model.
 * Represents enumerated answer options for LOINC answer lists
 * (e.g., valid responses for a survey instrument LOINC code).
 *
 * @property id              {number}
 * @property LoincNumber    {string}
 * @property AnswerListId   {string}
 * @property AnswerListName {string}
 * @property AnswerStringId {string}
 * @property SequenceNumber {number}
 * @property DisplayText    {string}
 * @property ExtCodeId      {string}
 * @property ExtCodeDisplayName {string}
 * @property ExtCodeSystem  {string}
 * @property created_at     {Date|null}
 * @property updated_at     {Date|null}
 */
import { TerminologyDB } from './index.js';

export interface LoincAnswerRow {
  id: number;
  LoincNumber: string;
  AnswerListId: string;
  AnswerListName: string;
  AnswerStringId: string;
  SequenceNumber: number;
  DisplayText: string;
  ExtCodeId: string;
  ExtCodeDisplayName: string;
  ExtCodeSystem: string;
  created_at: string | null;
  updated_at: string | null;
}

export class LoincAnswer {
  private _row: LoincAnswerRow | undefined;

  constructor(private db: TerminologyDB, row?: Partial<LoincAnswerRow>) {
    this._row = row as LoincAnswerRow | undefined;
  }

  static findByLoincNumber(db: TerminologyDB, loincNumber: string): LoincAnswer[] {
    const rows = db.findLoincAnswer(loincNumber) as unknown as LoincAnswerRow[];
    return rows.map(r => new LoincAnswer(db, r));
  }

  toJSON(): LoincAnswerRow {
    return this._row!;
  }

  get id(): number { return this._row!.id; }
  get LoincNumber(): string { return this._row!.LoincNumber; }
  get AnswerListId(): string { return this._row!.AnswerListId; }
  get AnswerListName(): string { return this._row!.AnswerListName; }
  get AnswerStringId(): string { return this._row!.AnswerStringId; }
  get SequenceNumber(): number { return this._row!.SequenceNumber; }
  get DisplayText(): string { return this._row!.DisplayText; }
  get ExtCodeId(): string { return this._row!.ExtCodeId; }
  get ExtCodeDisplayName(): string { return this._row!.ExtCodeDisplayName; }
  get ExtCodeSystem(): string { return this._row!.ExtCodeSystem; }
  get created_at(): Date | null { return this._row!.created_at ? new Date(this._row!.created_at) : null; }
  get updated_at(): Date | null { return this._row!.updated_at ? new Date(this._row!.updated_at) : null; }
}
