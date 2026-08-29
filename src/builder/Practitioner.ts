/**
 * Practitioner FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/practitioner.html
 */
import { SharedBuilder } from './SharedBuilder';
import { Address, CodeableConcept, ContactPoint, HumanName, Identifier, Reference } from '../datatype/datatypes';

export class Practitioner extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'Practitioner'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setActive(active: boolean): this { this.set('active', active); return this; }
  addName(name: HumanName): this { this.push('name', this.nestedToArray(name)); return this; }
  addTelecom(telecom: ContactPoint): this { this.push('telecom', this.nestedToArray(telecom)); return this; }
  addAddress(address: Address): this { this.push('address', this.nestedToArray(address)); return this; }
  setGender(gender: string): this { this.set('gender', gender); return this; }
  setBirthDate(birthDate: string): this { this.set('birthDate', birthDate); return this; }
  addPhoto(url: string, contentType?: string): this {
    const photo: Record<string, unknown> = { url };
    if (contentType !== undefined) photo['contentType'] = contentType;
    this.push('photo', photo);
    return this;
  }
  addQualification(identifier: Identifier, code: CodeableConcept, periodStart?: string, issuer?: Reference): this {
    const qualification: Record<string, unknown> = {
      identifier: [this.nestedToArray(identifier)],
      code: this.nestedToArray(code),
    };
    if (periodStart !== undefined) qualification['period'] = { start: periodStart };
    if (issuer !== undefined) qualification['issuer'] = this.nestedToArray(issuer);
    this.push('qualification', qualification);
    return this;
  }
  addCommunication(language: CodeableConcept, preferred?: boolean): this {
    const communication: Record<string, unknown> = { language: this.nestedToArray(language) };
    if (preferred !== undefined) communication['preferred'] = preferred;
    this.push('communication', communication);
    return this;
  }
  addExtension(url: string, value: unknown, valueType?: string): this { super.addExtension(url, value, valueType); return this; }
}
