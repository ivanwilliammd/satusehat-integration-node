/**
 * AllergyIntolerance FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/allergyintolerance.html
 */
import { SharedBuilder } from './SharedBuilder';
import { CodeableConcept, Identifier, Reference } from '../datatype/datatypes';

export class AllergyIntolerance extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'AllergyIntolerance'; }

  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setClinicalStatus(status: string): this {
    this.set('clinicalStatus', { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical', code: status }] });
    return this;
  }
  setVerificationStatus(status: string): this {
    this.set('verificationStatus', { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/allergyintolerance-verification', code: status }] });
    return this;
  }
  setType(type: string): this { this.set('type', type); return this; }
  addCategory(category: string): this { this.push('category', category); return this; }
  setCriticality(criticality: string): this { this.set('criticality', criticality); return this; }
  setCode(code: CodeableConcept): this { this.set('code', this.nestedToArray(code)); return this; }
  setPatient(patient: Reference): this { this.set('patient', this.nestedToArray(patient)); return this; }
  setEncounter(encounter: Reference): this { this.set('encounter', this.nestedToArray(encounter)); return this; }
  setOnsetDateTime(dateTime: string): this { this.set('onsetDateTime', dateTime); return this; }
  setRecordedDate(dateTime: string): this { this.set('recordedDate', dateTime); return this; }
  setRecorder(recorder: Reference): this { this.set('recorder', this.nestedToArray(recorder)); return this; }
  setAsserter(asserter: Reference): this { this.set('asserter', this.nestedToArray(asserter)); return this; }
  setLastOccurrence(dateTime: string): this { this.set('lastOccurrence', dateTime); return this; }
  addNote(text: string): this { this.push('note', { text }); return this; }
  addReaction(substance: CodeableConcept, manifestation: CodeableConcept, description?: string, onset?: string, severity?: string, exposureRoute?: CodeableConcept, note?: string): this {
    const reaction: Record<string, unknown> = {
      substance: this.nestedToArray(substance),
      manifestation: [this.nestedToArray(manifestation)],
    };
    if (description !== undefined) reaction['description'] = description;
    if (onset !== undefined) reaction['onset'] = onset;
    if (severity !== undefined) reaction['severity'] = severity;
    if (exposureRoute !== undefined) reaction['exposureRoute'] = this.nestedToArray(exposureRoute);
    if (note !== undefined) reaction['note'] = [{ text: note }];
    this.push('reaction', reaction);
    return this;
  }
}
