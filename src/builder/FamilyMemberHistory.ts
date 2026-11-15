/**
 * FamilyMemberHistory FHIR R4 Resource Builder.
 *
 * Setara PayloadBuilderFamilyMemberHistory.php. Versi sebelumnya lima method; kanon
 * punya 27. Tiga quirk kanon ditiru dan ditandai:
 * - setAgeAge / setDeceasedAge menulis angka dan satuan di dua elemen terpisah
 *   (`ageAge` + `ageUnit`), padahal R4 menuntut satu objek Age;
 * - setNote dinamai "set" tetapi MENUMPUK ke daftar note (R4 memang 0..*).
 */
import { CodeableConcept, Reference } from '../datatype/datatypes';

const VALID_STATUSES = ['partial', 'completed', 'entered-in-error', 'health-unknown'];

export class FamilyMemberHistory {
  private data: Record<string, any> = { resourceType: 'FamilyMemberHistory' };

  private arr(nilai: any): any {
    return typeof nilai?.toArray === 'function' ? nilai.toArray() : nilai;
  }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  private push(key: string, value: any): void {
    if (!Array.isArray(this.data[key])) this.data[key] = [];
    this.data[key].push(value);
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  addIdentifier(identifier: any): this { this.push('identifier', this.arr(identifier)); return this; }
  setInstantiatesCanonical(canonical: string): this { this.data['instantiatesCanonical'] = canonical; return this; }

  setStatus(status: string): this {
    if (!VALID_STATUSES.includes(status)) throw new Error(`Invalid status: ${status}`);
    this.data['status'] = status;
    return this;
  }

  setDataAbsentReason(cc: CodeableConcept): this { this.data['dataAbsentReason'] = this.arr(cc); return this; }
  setPatient(ref: Reference): this { this.data['patient'] = this.arr(ref); return this; }
  setDate(date: string): this { this.data['date'] = date; return this; }
  setName(name: string | null): this { if (name !== null) this.data['name'] = name; return this; }
  setRelationship(cc: CodeableConcept): this { this.data['relationship'] = this.arr(cc); return this; }
  setSex(cc: CodeableConcept): this { this.data['sex'] = this.arr(cc); return this; }

  setBornPeriod(cc: CodeableConcept): this { this.data['bornPeriod'] = this.arr(cc); return this; }
  setBornDate(date: string): this { this.data['bornDate'] = date; return this; }
  setBornString(text: string): this { this.data['bornString'] = text; return this; }

  /** Quirk kanon: dua elemen terpisah, bukan satu objek Age. */
  setAgeAge(value: number, unit: string): this {
    this.data['ageAge'] = value;
    this.data['ageUnit'] = unit;
    return this;
  }

  setAgeRange(value: number, low: string, high: string): this {
    this.data['ageRange'] = { value, low: { value: low }, high: { value: high } };
    return this;
  }

  setAgeString(text: string): this { this.data['ageString'] = text; return this; }

  setDeceasedBoolean(deceased: boolean): this { this.data['deceasedBoolean'] = deceased; return this; }

  /** Quirk kanon: dua elemen terpisah, bukan satu objek Age. */
  setDeceasedAge(value: number, unit: string): this {
    this.data['deceasedAge'] = value;
    this.data['deceasedAgeUnit'] = unit;
    return this;
  }

  setDeceasedRange(value: number, low: string, high: string): this {
    this.data['deceasedRange'] = { value, low: { value: low }, high: { value: high } };
    return this;
  }

  setDeceasedDate(date: string): this { this.data['deceasedDate'] = date; return this; }
  setDeceasedString(text: string): this { this.data['deceasedString'] = text; return this; }
  setDeceasedCodeableConcept(cc: CodeableConcept): this { this.data['deceasedCodeableConcept'] = this.arr(cc); return this; }

  setReasonCode(cc: CodeableConcept): this { this.data['reasonCode'] = this.arr(cc); return this; }
  addReasonCode(cc: CodeableConcept): this { this.push('reasonCode', this.arr(cc)); return this; }
  addReasonReference(ref: Reference): this { this.push('reasonReference', this.arr(ref)); return this; }

  /** Quirk kanon: dinamai "set", tetapi menumpuk. */
  setNote(text: string): this { this.push('note', { text }); return this; }

  addCondition(
    code: CodeableConcept,
    onsetString: string | null = null,
    outcome: CodeableConcept | null = null,
    contributedToDeath: boolean | null = null
  ): this {
    const condition: Record<string, any> = { code: this.arr(code) };
    if (onsetString !== null) condition['onsetString'] = onsetString;
    if (outcome !== null) condition['outcome'] = this.arr(outcome);
    if (contributedToDeath !== null) condition['contributedToDeath'] = contributedToDeath;
    this.push('condition', condition);
    return this;
  }
}
