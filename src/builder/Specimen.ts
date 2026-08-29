/**
 * Specimen FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/specimen.html
 */
import { SharedBuilder } from './SharedBuilder';
import { CodeableConcept, Identifier, Quantity, Reference } from '../datatype/datatypes';

export class Specimen extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'Specimen'; }

  setId(id: string): this { this.set('id', id); return this; }
  setStatus(status: string): this { this.set('status', status); return this; }
  setType(type: CodeableConcept): this { this.set('type', this.nestedToArray(type)); return this; }
  setSubject(subject: Reference): this { this.set('subject', this.nestedToArray(subject)); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setReceivedTime(dateTime: string): this { this.set('receivedTime', dateTime); return this; }
  setCollectedDateTime(dateTime: string): this { this.set('collection/collectedDateTime', dateTime); return this; }
  setCollector(collector: Reference): this { this.set('collection/collector', this.nestedToArray(collector)); return this; }
  setFastingStatusCodeableConcept(status: CodeableConcept): this { this.set('collection/fastingStatusCodeableConcept', this.nestedToArray(status)); return this; }
  setMethod(method: CodeableConcept): this { this.set('collection/method', this.nestedToArray(method)); return this; }
  setQuantity(quantity: Quantity): this { this.set('collection/quantity', this.nestedToArray(quantity)); return this; }
  setBodySite(bodySite: CodeableConcept): this { this.set('collection/bodySite', this.nestedToArray(bodySite)); return this; }
  addRequest(request: Reference): this { this.push('request', this.nestedToArray(request)); return this; }
  addCondition(text: string): this { this.push('condition', { text }); return this; }
  addProcessing(timeDateTime: string): this { this.push('processing', { timeDateTime }); return this; }
  addExtension(url: string, value: string): this { this.push('extension', { url, valueString: value }); return this; }
  addTransportedTime(dateTime: string): this { this.push('extension', { url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/TransportedTime', valueDateTime: dateTime }); return this; }
  addTransportedPerson(name: string, telecom: string[] = []): this { this.push('extension', { url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/TransportedPerson', valueContactDetail: { name, telecom } }); return this; }
  addReceivedPerson(person: Reference): this { this.push('extension', { url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/ReceivedPerson', valueReference: this.nestedToArray(person) }); return this; }
}
