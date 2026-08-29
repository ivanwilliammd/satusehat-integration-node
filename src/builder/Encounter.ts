/** Encounter FHIR R4 Resource Builder */
import { CodeableConcept, Coding, Identifier, Period, Reference } from '../datatype/datatypes';

export class Encounter {
  private data: Record<string, any> = { resourceType: 'Encounter' };

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
  setClass(classRef: Coding): this { this.data['class'] = classRef.toArray(); return this; }
  addType(type: CodeableConcept): this {
    this.data['type'] = this.data['type'] || [];
    this.data['type'].push(type.toArray());
    return this;
  }
  setSubject(subject: Reference): this { this.data['subject'] = subject.toArray(); return this; }
  addParticipant(individual: Reference, type?: CodeableConcept, period?: Period): this {
    const participant: Record<string, any> = { individual: individual.toArray() };
    if (type !== undefined) participant['type'] = [type.toArray()];
    if (period !== undefined) participant['period'] = period.toArray();
    this.data['participant'] = this.data['participant'] || [];
    this.data['participant'].push(participant);
    return this;
  }
  addLocation(location: Reference, status?: string, physicalType?: CodeableConcept): this {
    const loc: Record<string, any> = { location: location.toArray() };
    if (status !== undefined) loc['status'] = status;
    if (physicalType !== undefined) loc['physicalType'] = physicalType.toArray();
    this.data['location'] = this.data['location'] || [];
    this.data['location'].push(loc);
    return this;
  }
  setPeriod(period: Period): this { this.data['period'] = period.toArray(); return this; }
  setServiceProvider(serviceProvider: Reference): this { this.data['serviceProvider'] = serviceProvider.toArray(); return this; }
  addDiagnosis(condition: Reference, rank?: number, use?: CodeableConcept, role?: CodeableConcept): this {
    const diagnosis: Record<string, any> = { condition: condition.toArray() };
    if (rank !== undefined) diagnosis['rank'] = rank;
    if (use !== undefined) diagnosis['use'] = use.toArray();
    if (role !== undefined) diagnosis['role'] = role.toArray();
    this.data['diagnosis'] = this.data['diagnosis'] || [];
    this.data['diagnosis'].push(diagnosis);
    return this;
  }
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
