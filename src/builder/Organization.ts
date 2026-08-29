/** Organization FHIR R4 Resource Builder */
import { Address, CodeableConcept, ContactPoint, Identifier, Reference } from '../datatype/datatypes';

export class Organization {
  private data: Record<string, any> = { resourceType: 'Organization' };

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
  setActive(active: boolean): this { this.data['active'] = active; return this; }
  setName(name: string): this { this.data['name'] = name; return this; }
  addAlias(alias: string): this {
    this.data['alias'] = this.data['alias'] || [];
    this.data['alias'].push(alias);
    return this;
  }
  setType(type: CodeableConcept): this { this.data['type'] = type.toArray(); return this; }
  addTelecom(telecom: ContactPoint): this {
    this.data['telecom'] = this.data['telecom'] || [];
    this.data['telecom'].push(telecom.toArray());
    return this;
  }
  addAddress(address: Address): this {
    this.data['address'] = this.data['address'] || [];
    this.data['address'].push(address.toArray());
    return this;
  }
  setPartOf(partOf: Reference): this { this.data['partOf'] = partOf.toArray(); return this; }
  addContact(telecom: ContactPoint, purpose?: string, name?: string, address?: Address): this {
    const contact: Record<string, any> = { telecom: [telecom.toArray()] };
    if (purpose !== undefined) contact['purpose'] = { text: purpose };
    if (name !== undefined) contact['name'] = { text: name };
    if (address !== undefined) contact['address'] = address.toArray();
    this.data['contact'] = this.data['contact'] || [];
    this.data['contact'].push(contact);
    return this;
  }
  addEndpoint(endpoint: Reference): this {
    this.data['endpoint'] = this.data['endpoint'] || [];
    this.data['endpoint'].push(endpoint.toArray());
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
