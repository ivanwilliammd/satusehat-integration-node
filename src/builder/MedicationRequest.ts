/** MedicationRequest FHIR R4 Resource Builder */
import { CodeableConcept, Dosage, Duration, Identifier, Period, Quantity, Reference } from '../datatype/datatypes';

export class MedicationRequest {
  private data: Record<string, any> = { resourceType: 'MedicationRequest' };

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
  setIntent(intent: string): this { this.data['intent'] = intent; return this; }
  addCategory(category: CodeableConcept): this {
    this.data['category'] = this.data['category'] || [];
    this.data['category'].push(category.toArray());
    return this;
  }
  setMedicationCodeableConcept(medication: CodeableConcept): this { this.data['medicationCodeableConcept'] = medication.toArray(); return this; }
  setMedicationReference(medication: Reference): this { this.data['medicationReference'] = medication.toArray(); return this; }
  setSubject(subject: Reference): this { this.data['subject'] = subject.toArray(); return this; }
  setEncounter(encounter: Reference): this { this.data['encounter'] = encounter.toArray(); return this; }
  setAuthoredOn(authoredOn: string): this { this.data['authoredOn'] = authoredOn; return this; }
  setRequester(requester: Reference): this { this.data['requester'] = requester.toArray(); return this; }
  setRecorder(recorder: Reference): this { this.data['recorder'] = recorder.toArray(); return this; }
  addReasonCode(reasonCode: CodeableConcept): this {
    this.data['reasonCode'] = this.data['reasonCode'] || [];
    this.data['reasonCode'].push(reasonCode.toArray());
    return this;
  }
  addReasonReference(reasonReference: Reference): this {
    this.data['reasonReference'] = this.data['reasonReference'] || [];
    this.data['reasonReference'].push(reasonReference.toArray());
    return this;
  }
  addDosageInstruction(dosage: Dosage): this {
    this.data['dosageInstruction'] = this.data['dosageInstruction'] || [];
    this.data['dosageInstruction'].push(dosage.toArray());
    return this;
  }
  setDispenseRequest(validityPeriod?: Period, numberOfRepeatsAllowed?: number, quantity?: Quantity, expectedSupplyDuration?: Duration, performer?: CodeableConcept): this {
    const dispenseRequest: Record<string, any> = {};
    if (validityPeriod !== undefined) dispenseRequest['validityPeriod'] = validityPeriod.toArray();
    if (numberOfRepeatsAllowed !== undefined) dispenseRequest['numberOfRepeatsAllowed'] = numberOfRepeatsAllowed;
    if (quantity !== undefined) dispenseRequest['quantity'] = quantity.toArray();
    if (expectedSupplyDuration !== undefined) dispenseRequest['expectedSupplyDuration'] = expectedSupplyDuration.toArray();
    if (performer !== undefined) dispenseRequest['performer'] = performer.toArray();
    this.data['dispenseRequest'] = Object.fromEntries(Object.entries(dispenseRequest).filter(([, v]) => v !== undefined));
    return this;
  }
  setDispenseInterval(dispenseInterval: Duration): this {
    const existing = (this.data['dispenseRequest'] as Record<string, any>) ?? {};
    existing['dispenseInterval'] = dispenseInterval.toArray();
    this.data['dispenseRequest'] = existing;
    return this;
  }
  setInitialFill(initialFill: Quantity): this {
    const existing = (this.data['dispenseRequest'] as Record<string, any>) ?? {};
    existing['initialFill'] = initialFill.toArray();
    this.data['dispenseRequest'] = existing;
    return this;
  }
  setSubstitution(code: CodeableConcept, allowed?: boolean): this {
    const substitutionData: Record<string, any> = { code: code.toArray() };
    if (allowed !== undefined) substitutionData['allowedBoolean'] = allowed;
    this.data['substitution'] = substitutionData;
    return this;
  }
  addPriorPrescription(priorPrescription: Reference): this {
    this.data['priorPrescription'] = this.data['priorPrescription'] || [];
    this.data['priorPrescription'].push(priorPrescription.toArray());
    return this;
  }
  addDetectedIssue(detectedIssue: Reference): this {
    this.data['detectedIssue'] = this.data['detectedIssue'] || [];
    this.data['detectedIssue'].push(detectedIssue.toArray());
    return this;
  }
  addEventHistory(eventHistory: Reference): this {
    this.data['eventHistory'] = this.data['eventHistory'] || [];
    this.data['eventHistory'].push(eventHistory.toArray());
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
