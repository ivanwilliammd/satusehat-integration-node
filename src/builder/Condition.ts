/** Condition FHIR R4 Resource Builder */
import { Annotation, CodeableConcept, Identifier, Period, Range, Reference } from '../datatype/datatypes';
import { TerminologyResolver } from '../terminology/resolver';

export class Condition {
  private data: Record<string, any> = { resourceType: 'Condition' };

  private cc(value: CodeableConcept | string | Record<string, any>): Record<string, any> {
    return typeof value === 'string' ? (TerminologyResolver.resolve(value) as Record<string, any>) : value.toArray ? value.toArray() : value;
  }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  addIdentifier(identifier: Identifier): this {
    this.data['identifier'] = this.data['identifier'] || [];
    this.data['identifier'].push(identifier.toArray());
    return this;
  }
  setClinicalStatus(clinicalStatus: CodeableConcept | string): this { this.data['clinicalStatus'] = this.cc(clinicalStatus); return this; }
  setVerificationStatus(verificationStatus: CodeableConcept | string): this { this.data['verificationStatus'] = this.cc(verificationStatus); return this; }
  addCategory(category: CodeableConcept | string): this {
    this.data['category'] = this.data['category'] || [];
    this.data['category'].push(this.cc(category));
    return this;
  }
  setSeverity(severity: CodeableConcept | string): this { this.data['severity'] = this.cc(severity); return this; }
  setCode(code: CodeableConcept | string): this { this.data['code'] = this.cc(code); return this; }
  setSubject(subject: Reference): this { this.data['subject'] = subject.toArray(); return this; }
  setEncounter(encounter: Reference): this { this.data['encounter'] = encounter.toArray(); return this; }
  setOnsetDateTime(dateTime: string): this { this.data['onsetDateTime'] = dateTime; return this; }
  setOnsetAge(age: Range): this { this.data['onsetAge'] = age.toArray(); return this; }
  setOnsetPeriod(period: Period): this { this.data['onsetPeriod'] = period.toArray(); return this; }
  setOnsetRange(range: Range): this { this.data['onsetRange'] = range.toArray(); return this; }
  setOnsetString(onsetString: string): this { this.data['onsetString'] = onsetString; return this; }
  setAbatementDateTime(dateTime: string): this { this.data['abatementDateTime'] = dateTime; return this; }
  setAbatementAge(age: Range): this { this.data['abatementAge'] = age.toArray(); return this; }
  setAbatementPeriod(period: Period): this { this.data['abatementPeriod'] = period.toArray(); return this; }
  setAbatementRange(range: Range): this { this.data['abatementRange'] = range.toArray(); return this; }
  setAbatementString(abatementString: string): this { this.data['abatementString'] = abatementString; return this; }
  setRecordedDate(recordedDate: string): this { this.data['recordedDate'] = recordedDate; return this; }
  setRecorder(recorder: Reference): this { this.data['recorder'] = recorder.toArray(); return this; }
  setAsserter(asserter: Reference): this { this.data['asserter'] = asserter.toArray(); return this; }
  addStage(summary: CodeableConcept, assessment?: Reference): this {
    const stage: Record<string, any> = { summary: summary.toArray() };
    if (assessment !== undefined) stage['assessment'] = [assessment.toArray()];
    this.data['stage'] = this.data['stage'] || [];
    this.data['stage'].push(stage);
    return this;
  }
  addEvidence(code: CodeableConcept, detail?: Reference): this {
    const evidence: Record<string, any> = { code: [code.toArray()] };
    if (detail !== undefined) evidence['detail'] = [detail.toArray()];
    this.data['evidence'] = this.data['evidence'] || [];
    this.data['evidence'].push(evidence);
    return this;
  }
  addNote(note: Annotation): this {
    this.data['note'] = this.data['note'] || [];
    this.data['note'].push(note.toArray());
    return this;
  }
  addExtension(url: string, value: unknown, valueType?: string): this {
    const extension: Record<string, any> = { url };
    if (valueType !== undefined) {
      extension['value' + valueType.charAt(0).toUpperCase() + valueType.slice(1)] = value;
    } else {
      extension['valueString'] = typeof value === 'string' ? value : value;
    }
    this.data['extension'] = this.data['extension'] || [];
    this.data['extension'].push(extension);
    return this;
  }
}
