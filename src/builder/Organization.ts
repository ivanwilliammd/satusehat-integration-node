/**
 * Organization FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/organization.html
 */
import { SharedBuilder } from './SharedBuilder';
import { Address, CodeableConcept, ContactPoint, Identifier, Reference } from '../datatype/datatypes';

export class Organization extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'Organization'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setActive(active: boolean): this { this.set('active', active); return this; }
  setName(name: string): this { this.set('name', name); return this; }
  addAlias(alias: string): this { this.push('alias', alias); return this; }
  setType(type: CodeableConcept): this { this.set('type', this.nestedToArray(type)); return this; }
  addTelecom(telecom: ContactPoint): this { this.push('telecom', this.nestedToArray(telecom)); return this; }
  addAddress(address: Address): this { this.push('address', this.nestedToArray(address)); return this; }
  setPartOf(partOf: Reference): this { this.set('partOf', this.nestedToArray(partOf)); return this; }
  addContact(telecom: ContactPoint, purpose?: string, name?: string, address?: Address): this {
    const contact: Record<string, unknown> = { telecom: [this.nestedToArray(telecom)] };
    if (purpose !== undefined) contact['purpose'] = { text: purpose };
    if (name !== undefined) contact['name'] = { text: name };
    if (address !== undefined) contact['address'] = this.nestedToArray(address);
    this.push('contact', contact);
    return this;
  }
  addEndpoint(endpoint: Reference): this { this.push('endpoint', this.nestedToArray(endpoint)); return this; }
  addExtension(url: string, value: unknown, valueType?: string): this { super.addExtension(url, value, valueType); return this; }
}
