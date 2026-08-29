/**
 * ServiceRequest FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/servicerequest.html
 */
import { SharedBuilder } from './SharedBuilder';
import { CodeableConcept, Identifier, Quantity, Reference } from '../datatype/datatypes';

export class ServiceRequest extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'ServiceRequest'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setRequisition(identifier: Identifier): this { this.set('requisition', this.nestedToArray(identifier)); return this; }
  setStatus(status: string): this { this.set('status', status); return this; }
  setIntent(intent: string): this { this.set('intent', intent); return this; }
  addCategory(category: CodeableConcept): this { this.push('category', this.nestedToArray(category)); return this; }
  setPriority(priority: string): this { this.set('priority', priority); return this; }
  setDoNotPerform(doNotPerform: boolean): this { this.set('doNotPerform', doNotPerform); return this; }
  setCode(code: CodeableConcept): this { this.set('code', this.nestedToArray(code)); return this; }
  setQuantityQuantity(quantity: Quantity): this { this.set('quantityQuantity', this.nestedToArray(quantity)); return this; }
  setSubject(subject: Reference): this { this.set('subject', this.nestedToArray(subject)); return this; }
  setEncounter(encounter: Reference): this { this.set('encounter', this.nestedToArray(encounter)); return this; }
  setOccurrenceDateTime(dateTime: string): this { this.set('occurrenceDateTime', dateTime); return this; }
  setAuthoredOn(dateTime: string): this { this.set('authoredOn', dateTime); return this; }
  setRequester(requester: Reference): this { this.set('requester', this.nestedToArray(requester)); return this; }
  addPerformer(performer: Reference): this { this.push('performer', this.nestedToArray(performer)); return this; }
  addReasonCode(reasonCode: CodeableConcept): this { this.push('reasonCode', this.nestedToArray(reasonCode)); return this; }
  addSupportingInfo(supportingInfo: Reference): this { this.push('supportingInfo', this.nestedToArray(supportingInfo)); return this; }
  addSpecimen(specimen: Reference): this { this.push('specimen', this.nestedToArray(specimen)); return this; }
  addNote(text: string): this { this.push('note', { text }); return this; }
  setPatientInstruction(instruction: string): this { this.set('patientInstruction', instruction); return this; }
  addRelevantHistory(relevantHistory: Reference): this { this.push('relevantHistory', this.nestedToArray(relevantHistory)); return this; }
  addExtension(url: string, value: unknown, valueType?: string): this { super.addExtension(url, value, valueType); return this; }
}
