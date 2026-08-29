/**
 * RelatedPerson FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/relatedperson.html
 */
import { SharedBuilder } from './SharedBuilder';
import { Address, CodeableConcept, ContactPoint, HumanName, Identifier, Reference } from '../datatype/datatypes';

export class RelatedPerson extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'RelatedPerson'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setActive(active: boolean): this { this.set('active', active); return this; }
  setPatient(patient: Reference): this { this.set('patient', this.nestedToArray(patient)); return this; }
  addRelationship(relationship: CodeableConcept): this { this.push('relationship', this.nestedToArray(relationship)); return this; }
  addName(name: HumanName): this { this.push('name', this.nestedToArray(name)); return this; }
  addTelecom(telecom: ContactPoint): this { this.push('telecom', this.nestedToArray(telecom)); return this; }
  setGender(gender: string): this { this.set('gender', gender); return this; }
  setBirthDate(birthDate: string): this { this.set('birthDate', birthDate); return this; }
  addAddress(address: Address): this { this.push('address', this.nestedToArray(address)); return this; }
  addCommunication(language: CodeableConcept, preferred = true): this {
    this.push('communication', { language: this.nestedToArray(language), preferred });
    return this;
  }
  addExtension(url: string, value: unknown, valueType?: string): this { super.addExtension(url, value, valueType); return this; }
}
