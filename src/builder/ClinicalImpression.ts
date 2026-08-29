/** ClinicalImpression FHIR R4 Resource Builder */
import { Annotation, CodeableConcept, Identifier, Period, Reference } from '../datatype/datatypes';

export class ClinicalImpression {
  private data: Record<string, any> = { resourceType: 'ClinicalImpression' };

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
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setCode(code: CodeableConcept): this { this.data['code'] = code.toArray(); return this; }
  setSubject(subject: Reference): this { this.data['subject'] = subject.toArray(); return this; }
  setEncounter(encounter: Reference): this { this.data['encounter'] = encounter.toArray(); return this; }
  setEffectiveDateTime(effectiveDateTime: string): this { this.data['effectiveDateTime'] = effectiveDateTime; return this; }
  setEffectivePeriod(effectivePeriod: Period): this { this.data['effectivePeriod'] = effectivePeriod.toArray(); return this; }
  setDate(date: string): this { this.data['date'] = date; return this; }
  setAssessor(assessor: Reference): this { this.data['assessor'] = assessor.toArray(); return this; }
  setPreviousOpinion(previousOpinion: Reference): this { this.data['previousOpinion'] = previousOpinion.toArray(); return this; }
  addInvestigation(investigation: Record<string, any>): this {
    this.data['investigation'] = this.data['investigation'] || [];
    this.data['investigation'].push(investigation);
    return this;
  }
  addFindingCodeableConcept(finding: CodeableConcept): this {
    this.data['finding'] = this.data['finding'] || [];
    this.data['finding'].push({ itemCodeableConcept: finding.toArray() });
    return this;
  }
  addFindingReference(finding: Reference): this {
    this.data['finding'] = this.data['finding'] || [];
    this.data['finding'].push({ itemReference: finding.toArray() });
    return this;
  }
  addPrognosisCodeableConcept(prognosis: CodeableConcept): this {
    this.data['prognosisCodeableConcept'] = this.data['prognosisCodeableConcept'] || [];
    this.data['prognosisCodeableConcept'].push(prognosis.toArray());
    return this;
  }
  addPrognosisReference(prognosis: Reference): this {
    this.data['prognosisReference'] = this.data['prognosisReference'] || [];
    this.data['prognosisReference'].push(prognosis.toArray());
    return this;
  }
  addSupportingInfo(supportingInfo: Reference): this {
    this.data['supportingInfo'] = this.data['supportingInfo'] || [];
    this.data['supportingInfo'].push(supportingInfo.toArray());
    return this;
  }
  addNote(note: Annotation): this {
    this.data['note'] = this.data['note'] || [];
    this.data['note'].push(note.toArray());
    return this;
  }
}
