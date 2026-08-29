/** AllergyIntolerance FHIR R4 Resource Builder */
import { CodeableConcept, Reference, Identifier } from '../datatype/datatypes';

export class AllergyIntolerance {
  private data: Record<string, any> = { resourceType: 'AllergyIntolerance' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  addIdentifier(identifier: Identifier): this {
    this.data['identifier'] = this.data['identifier'] || [];
    this.data['identifier'].push(identifier.toArray());
    return this;
  }
  setClinicalStatus(status: string): this {
    this.data['clinicalStatus'] = { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical', code: status }] };
    return this;
  }
  setVerificationStatus(status: string): this {
    this.data['verificationStatus'] = { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/allergyintolerance-verification', code: status }] };
    return this;
  }
  setType(type: string): this { this.data['type'] = type; return this; }
  addCategory(category: string): this {
    this.data['category'] = this.data['category'] || [];
    this.data['category'].push(category);
    return this;
  }
  setCriticality(criticality: string): this { this.data['criticality'] = criticality; return this; }
  setCode(code: CodeableConcept): this { this.data['code'] = code.toArray(); return this; }
  setPatient(patient: Reference): this { this.data['patient'] = patient.toArray(); return this; }
  setEncounter(encounter: Reference): this { this.data['encounter'] = encounter.toArray(); return this; }
  setOnsetDateTime(dateTime: string): this { this.data['onsetDateTime'] = dateTime; return this; }
  setRecordedDate(dateTime: string): this { this.data['recordedDate'] = dateTime; return this; }
  setRecorder(recorder: Reference): this { this.data['recorder'] = recorder.toArray(); return this; }
  setAsserter(asserter: Reference): this { this.data['asserter'] = asserter.toArray(); return this; }
  setLastOccurrence(dateTime: string): this { this.data['lastOccurrence'] = dateTime; return this; }
  addNote(text: string): this {
    this.data['note'] = this.data['note'] || [];
    this.data['note'].push({ text });
    return this;
  }
  addReaction(substance: CodeableConcept, manifestation: CodeableConcept, description?: string, onset?: string, severity?: string, exposureRoute?: CodeableConcept, note?: string): this {
    const reaction: Record<string, any> = {
      substance: substance.toArray(),
      manifestation: [manifestation.toArray()],
    };
    if (description !== undefined) reaction['description'] = description;
    if (onset !== undefined) reaction['onset'] = onset;
    if (severity !== undefined) reaction['severity'] = severity;
    if (exposureRoute !== undefined) reaction['exposureRoute'] = exposureRoute.toArray();
    if (note !== undefined) reaction['note'] = [{ text: note }];
    this.data['reaction'] = this.data['reaction'] || [];
    this.data['reaction'].push(reaction);
    return this;
  }
}
