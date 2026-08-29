/** ServiceRequest FHIR R4 Resource Builder */
import { CodeableConcept, Identifier, Quantity, Reference } from '../datatype/datatypes';

export class ServiceRequest {
  private data: Record<string, any> = { resourceType: 'ServiceRequest' };

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
  setRequisition(identifier: Identifier): this { this.data['requisition'] = identifier.toArray(); return this; }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setIntent(intent: string): this { this.data['intent'] = intent; return this; }
  addCategory(category: CodeableConcept): this {
    this.data['category'] = this.data['category'] || [];
    this.data['category'].push(category.toArray());
    return this;
  }
  setPriority(priority: string): this { this.data['priority'] = priority; return this; }
  setDoNotPerform(doNotPerform: boolean): this { this.data['doNotPerform'] = doNotPerform; return this; }
  setCode(code: CodeableConcept): this { this.data['code'] = code.toArray(); return this; }
  setQuantityQuantity(quantity: Quantity): this { this.data['quantityQuantity'] = quantity.toArray(); return this; }
  setSubject(subject: Reference): this { this.data['subject'] = subject.toArray(); return this; }
  setEncounter(encounter: Reference): this { this.data['encounter'] = encounter.toArray(); return this; }
  setOccurrenceDateTime(dateTime: string): this { this.data['occurrenceDateTime'] = dateTime; return this; }
  setAuthoredOn(dateTime: string): this { this.data['authoredOn'] = dateTime; return this; }
  setRequester(requester: Reference): this { this.data['requester'] = requester.toArray(); return this; }
  addPerformer(performer: Reference): this {
    this.data['performer'] = this.data['performer'] || [];
    this.data['performer'].push(performer.toArray());
    return this;
  }
  addReasonCode(reasonCode: CodeableConcept): this {
    this.data['reasonCode'] = this.data['reasonCode'] || [];
    this.data['reasonCode'].push(reasonCode.toArray());
    return this;
  }
  addSupportingInfo(supportingInfo: Reference): this {
    this.data['supportingInfo'] = this.data['supportingInfo'] || [];
    this.data['supportingInfo'].push(supportingInfo.toArray());
    return this;
  }
  addSpecimen(specimen: Reference): this {
    this.data['specimen'] = this.data['specimen'] || [];
    this.data['specimen'].push(specimen.toArray());
    return this;
  }
  addNote(text: string): this {
    this.data['note'] = this.data['note'] || [];
    this.data['note'].push({ text });
    return this;
  }
  setPatientInstruction(instruction: string): this { this.data['patientInstruction'] = instruction; return this; }
  addRelevantHistory(relevantHistory: Reference): this {
    this.data['relevantHistory'] = this.data['relevantHistory'] || [];
    this.data['relevantHistory'].push(relevantHistory.toArray());
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
