/**
 * Location FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/location.html
 */
import { SharedBuilder } from './SharedBuilder';
import { Address, CodeableConcept, ContactPoint, Identifier, Reference } from '../datatype/datatypes';

export class Location extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'Location'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setStatus(status: string): this { this.set('status', status); return this; }
  setOperationalStatus(operationalStatus: CodeableConcept): this { this.set('operationalStatus', this.nestedToArray(operationalStatus)); return this; }
  setName(name: string): this { this.set('name', name); return this; }
  addAlias(alias: string): this { this.push('alias', alias); return this; }
  setDescription(description: string): this { this.set('description', description); return this; }
  setType(type: CodeableConcept): this { this.set('type', this.nestedToArray(type)); return this; }
  addTelecom(telecom: ContactPoint): this { this.push('telecom', this.nestedToArray(telecom)); return this; }
  addAddress(address: Address): this { this.push('address', this.nestedToArray(address)); return this; }
  setPhysicalType(physicalType: CodeableConcept): this { this.set('physicalType', this.nestedToArray(physicalType)); return this; }
  setPosition(latitude?: number, longitude?: number, altitude?: number): this {
    const position: Record<string, unknown> = {};
    if (latitude !== undefined) position['latitude'] = latitude;
    if (longitude !== undefined) position['longitude'] = longitude;
    if (altitude !== undefined) position['altitude'] = altitude;
    this.set('position', position);
    return this;
  }
  setManagingOrganization(managingOrganization: Reference): this { this.set('managingOrganization', this.nestedToArray(managingOrganization)); return this; }
  setPartOf(partOf: Reference): this { this.set('partOf', this.nestedToArray(partOf)); return this; }
  addEndpoint(endpoint: Reference): this { this.push('endpoint', this.nestedToArray(endpoint)); return this; }
  addExtension(url: string, value: unknown, valueType?: string): this { super.addExtension(url, value, valueType); return this; }
}
