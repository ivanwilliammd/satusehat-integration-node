/**
 * Condition FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/condition.html
 */
import { SharedBuilder } from './SharedBuilder';
import { Annotation, CodeableConcept, Identifier, Period, Range, Reference } from '../datatype/datatypes';

export class Condition extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'Condition'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setClinicalStatus(clinicalStatus: CodeableConcept): this { this.set('clinicalStatus', this.nestedToArray(clinicalStatus)); return this; }
  setVerificationStatus(verificationStatus: CodeableConcept): this { this.set('verificationStatus', this.nestedToArray(verificationStatus)); return this; }
  addCategory(category: CodeableConcept): this { this.push('category', this.nestedToArray(category)); return this; }
  setSeverity(severity: CodeableConcept): this { this.set('severity', this.nestedToArray(severity)); return this; }
  setCode(code: CodeableConcept): this { this.set('code', this.nestedToArray(code)); return this; }
  setSubject(subject: Reference): this { this.set('subject', this.nestedToArray(subject)); return this; }
  setEncounter(encounter: Reference): this { this.set('encounter', this.nestedToArray(encounter)); return this; }
  // onset[x] polymorphic setters
  setOnsetDateTime(dateTime: string): this { this.set('onsetDateTime', dateTime); return this; }
  setOnsetAge(age: Range): this { this.set('onsetAge', this.nestedToArray(age)); return this; }
  setOnsetPeriod(period: Period): this { this.set('onsetPeriod', this.nestedToArray(period)); return this; }
  setOnsetRange(range: Range): this { this.set('onsetRange', this.nestedToArray(range)); return this; }
  setOnsetString(onsetString: string): this { this.set('onsetString', onsetString); return this; }
  // abatement[x] polymorphic setters
  setAbatementDateTime(dateTime: string): this { this.set('abatementDateTime', dateTime); return this; }
  setAbatementAge(age: Range): this { this.set('abatementAge', this.nestedToArray(age)); return this; }
  setAbatementPeriod(period: Period): this { this.set('abatementPeriod', this.nestedToArray(period)); return this; }
  setAbatementRange(range: Range): this { this.set('abatementRange', this.nestedToArray(range)); return this; }
  setAbatementString(abatementString: string): this { this.set('abatementString', abatementString); return this; }
  setRecordedDate(recordedDate: string): this { this.set('recordedDate', recordedDate); return this; }
  setRecorder(recorder: Reference): this { this.set('recorder', this.nestedToArray(recorder)); return this; }
  setAsserter(asserter: Reference): this { this.set('asserter', this.nestedToArray(asserter)); return this; }
  addStage(summary: CodeableConcept, assessment?: Reference): this {
    const stage: Record<string, unknown> = { summary: this.nestedToArray(summary) };
    if (assessment !== undefined) stage['assessment'] = [this.nestedToArray(assessment)];
    this.push('stage', stage);
    return this;
  }
  addEvidence(code: CodeableConcept, detail?: Reference): this {
    const evidence: Record<string, unknown> = { code: [this.nestedToArray(code)] };
    if (detail !== undefined) evidence['detail'] = [this.nestedToArray(detail)];
    this.push('evidence', evidence);
    return this;
  }
  addNote(note: Annotation): this { this.push('note', this.nestedToArray(note)); return this; }
  addExtension(url: string, value: unknown, valueType?: string): this { super.addExtension(url, value, valueType); return this; }
}
