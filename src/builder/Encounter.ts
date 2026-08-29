/**
 * Encounter FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/encounter.html
 */
import { SharedBuilder } from './SharedBuilder';
import { CodeableConcept, Coding, Identifier, Period, Reference } from '../datatype/datatypes';

export class Encounter extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'Encounter'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setStatus(status: string): this { this.set('status', status); return this; }
  setClass(class$: Coding): this { this.set('class', this.nestedToArray(class$)); return this; }
  addType(type: CodeableConcept): this { this.push('type', this.nestedToArray(type)); return this; }
  setSubject(subject: Reference): this { this.set('subject', this.nestedToArray(subject)); return this; }
  addParticipant(individual: Reference, type?: CodeableConcept, period?: Period): this {
    const participant: Record<string, unknown> = { individual: this.nestedToArray(individual) };
    if (type !== undefined) participant['type'] = [this.nestedToArray(type)];
    if (period !== undefined) participant['period'] = this.nestedToArray(period);
    this.push('participant', participant);
    return this;
  }
  addLocation(location: Reference, status?: string, physicalType?: CodeableConcept): this {
    const loc: Record<string, unknown> = { location: this.nestedToArray(location) };
    if (status !== undefined) loc['status'] = status;
    if (physicalType !== undefined) loc['physicalType'] = this.nestedToArray(physicalType);
    this.push('location', loc);
    return this;
  }
  setPeriod(period: Period): this { this.set('period', this.nestedToArray(period)); return this; }
  setServiceProvider(serviceProvider: Reference): this { this.set('serviceProvider', this.nestedToArray(serviceProvider)); return this; }
  addDiagnosis(condition: Reference, rank?: number, use?: CodeableConcept, role?: CodeableConcept): this {
    const diagnosis: Record<string, unknown> = { condition: this.nestedToArray(condition) };
    if (rank !== undefined) diagnosis['rank'] = rank;
    if (use !== undefined) diagnosis['use'] = this.nestedToArray(use);
    if (role !== undefined) diagnosis['role'] = this.nestedToArray(role);
    this.push('diagnosis', diagnosis);
    return this;
  }
  addReasonCode(reasonCode: CodeableConcept): this { this.push('reasonCode', this.nestedToArray(reasonCode)); return this; }
  addReasonReference(reasonReference: Reference): this { this.push('reasonReference', this.nestedToArray(reasonReference)); return this; }
  addExtension(url: string, value: unknown, valueType?: string): this { super.addExtension(url, value, valueType); return this; }
}
