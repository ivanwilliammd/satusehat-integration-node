/**
 * MedicationRequest FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/medicationrequest.html
 */
import { SharedBuilder } from './SharedBuilder';
import { CodeableConcept, Dosage, Duration, Identifier, Period, Quantity, Reference } from '../datatype/datatypes';

export class MedicationRequest extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'MedicationRequest'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setStatus(status: string): this { this.set('status', status); return this; }
  setIntent(intent: string): this { this.set('intent', intent); return this; }
  addCategory(category: CodeableConcept): this { this.push('category', this.nestedToArray(category)); return this; }
  // medication[x] polymorphic setters
  setMedicationCodeableConcept(medication: CodeableConcept): this { this.set('medicationCodeableConcept', this.nestedToArray(medication)); return this; }
  setMedicationReference(medication: Reference): this { this.set('medicationReference', this.nestedToArray(medication)); return this; }
  setSubject(subject: Reference): this { this.set('subject', this.nestedToArray(subject)); return this; }
  setEncounter(encounter: Reference): this { this.set('encounter', this.nestedToArray(encounter)); return this; }
  setAuthoredOn(authoredOn: string): this { this.set('authoredOn', authoredOn); return this; }
  setRequester(requester: Reference): this { this.set('requester', this.nestedToArray(requester)); return this; }
  setRecorder(recorder: Reference): this { this.set('recorder', this.nestedToArray(recorder)); return this; }
  addReasonCode(reasonCode: CodeableConcept): this { this.push('reasonCode', this.nestedToArray(reasonCode)); return this; }
  addReasonReference(reasonReference: Reference): this { this.push('reasonReference', this.nestedToArray(reasonReference)); return this; }
  addDosageInstruction(dosage: Dosage): this { this.push('dosageInstruction', this.nestedToArray(dosage)); return this; }
  setDispenseRequest(validityPeriod?: Period, numberOfRepeatsAllowed?: number, quantity?: Quantity, expectedSupplyDuration?: Duration, performer?: CodeableConcept): this {
    const dispenseRequest: Record<string, unknown> = {};
    if (validityPeriod !== undefined) dispenseRequest['validityPeriod'] = this.nestedToArray(validityPeriod);
    if (numberOfRepeatsAllowed !== undefined) dispenseRequest['numberOfRepeatsAllowed'] = numberOfRepeatsAllowed;
    if (quantity !== undefined) dispenseRequest['quantity'] = this.nestedToArray(quantity);
    if (expectedSupplyDuration !== undefined) dispenseRequest['expectedSupplyDuration'] = this.nestedToArray(expectedSupplyDuration);
    if (performer !== undefined) dispenseRequest['performer'] = this.nestedToArray(performer);
    this.set('dispenseRequest', Object.fromEntries(Object.entries(dispenseRequest).filter(([, v]) => v !== undefined)));
    return this;
  }
  setDispenseInterval(dispenseInterval: Duration): this {
    const existing = (this.data['dispenseRequest'] as Record<string, unknown>) ?? {};
    existing['dispenseInterval'] = this.nestedToArray(dispenseInterval);
    this.set('dispenseRequest', existing);
    return this;
  }
  setInitialFill(initialFill: Quantity): this {
    const existing = (this.data['dispenseRequest'] as Record<string, unknown>) ?? {};
    existing['initialFill'] = this.nestedToArray(initialFill);
    this.set('dispenseRequest', existing);
    return this;
  }
  setSubstitution(code: CodeableConcept, allowed?: boolean): this {
    const substitutionData: Record<string, unknown> = { code: this.nestedToArray(code) };
    if (allowed !== undefined) substitutionData['allowedBoolean'] = allowed;
    this.set('substitution', substitutionData);
    return this;
  }
  addPriorPrescription(priorPrescription: Reference): this { this.push('priorPrescription', this.nestedToArray(priorPrescription)); return this; }
  addDetectedIssue(detectedIssue: Reference): this { this.push('detectedIssue', this.nestedToArray(detectedIssue)); return this; }
  addEventHistory(eventHistory: Reference): this { this.push('eventHistory', this.nestedToArray(eventHistory)); return this; }
  addExtension(url: string, value: unknown, valueType?: string): this { super.addExtension(url, value, valueType); return this; }
}
