/**
 * Person FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/person.html
 */
import { SharedBuilder } from './SharedBuilder';
import { Address, HumanName, Identifier, Reference } from '../datatype/datatypes';

export class Person extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'Person'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setActive(active: boolean): this { this.set('active', active); return this; }
  addName(name: HumanName): this { this.push('name', this.nestedToArray(name)); return this; }
  addTelecom(telecom: { system: string; value: string; use?: string }): this { this.push('telecom', telecom); return this; }
  setGender(gender: string): this { this.set('gender', gender); return this; }
  setBirthDate(birthDate: string): this { this.set('birthDate', birthDate); return this; }
  addAddress(address: Address): this { this.push('address', this.nestedToArray(address)); return this; }
  setLink(patient: Reference, assurance?: string): this {
    const link: Record<string, unknown> = { target: this.nestedToArray(patient) as Record<string, unknown> };
    if (assurance !== undefined) link['assurance'] = assurance;
    this.push('link', link);
    return this;
  }
  addExtension(url: string, value: unknown, valueType?: string): this { super.addExtension(url, value, valueType); return this; }
}
