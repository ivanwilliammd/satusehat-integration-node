/**
 * Patient FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/patient.html
 */
import { SharedBuilder } from './SharedBuilder';
import { Address, CodeableConcept, ContactPoint, HumanName, Identifier, Reference } from '../datatype/datatypes';

export class Patient extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'Patient'; }

  setMetaProfile(profile: string): this { this.push('meta/profile', profile); return this; }
  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setActive(active: boolean): this { this.set('active', active); return this; }
  addName(name: HumanName): this { this.push('name', this.nestedToArray(name)); return this; }
  setGender(gender: string): this { this.set('gender', gender); return this; }
  setBirthDate(birthDate: string): this { this.set('birthDate', birthDate); return this; }
  setDeceasedBoolean(deceased: boolean): this { this.set('deceasedBoolean', deceased); return this; }
  setDeceasedDateTime(dateTime: string): this { this.set('deceasedDateTime', dateTime); return this; }
  setMultipleBirthBoolean(multipleBirth: boolean): this { this.set('multipleBirthBoolean', multipleBirth); return this; }
  setMultipleBirthInteger(multipleBirth: number): this { this.set('multipleBirthInteger', multipleBirth); return this; }
  addAddress(address: Address): this { this.push('address', this.nestedToArray(address)); return this; }
  addTelecom(telecom: ContactPoint): this { this.push('telecom', this.nestedToArray(telecom)); return this; }
  setMaritalStatus(maritalStatus: CodeableConcept): this { this.set('maritalStatus', this.nestedToArray(maritalStatus)); return this; }
  addCommunication(language: CodeableConcept, preferred = true): this {
    this.push('communication', { language: this.nestedToArray(language), preferred });
    return this;
  }
  addContact(relationship: CodeableConcept, name: HumanName, telecom: ContactPoint, address?: Address, organization?: Reference): this {
    const contact: Record<string, unknown> = {
      relationship: [this.nestedToArray(relationship)],
      name: this.nestedToArray(name),
      telecom: [this.nestedToArray(telecom)],
    };
    if (address !== undefined) contact['address'] = this.nestedToArray(address);
    if (organization !== undefined) contact['organization'] = this.nestedToArray(organization);
    this.push('contact', contact);
    return this;
  }
  addExtension(url: string, value: unknown, valueType?: string): this { super.addExtension(url, value, valueType); return this; }
}
