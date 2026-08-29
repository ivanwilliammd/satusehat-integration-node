/** Location FHIR R4 Resource Builder */
import { Address, CodeableConcept, ContactPoint, Identifier, Reference } from '../datatype/datatypes';

export class Location {
  private data: Record<string, any> = { resourceType: 'Location' };

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
  setOperationalStatus(operationalStatus: CodeableConcept): this { this.data['operationalStatus'] = operationalStatus.toArray(); return this; }
  setName(name: string): this { this.data['name'] = name; return this; }
  addAlias(alias: string): this {
    this.data['alias'] = this.data['alias'] || [];
    this.data['alias'].push(alias);
    return this;
  }
  setDescription(description: string): this { this.data['description'] = description; return this; }
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
  setPhysicalType(physicalType: CodeableConcept): this { this.data['physicalType'] = physicalType.toArray(); return this; }
  setPosition(latitude?: number, longitude?: number, altitude?: number): this {
    const position: Record<string, any> = {};
    if (latitude !== undefined) position['latitude'] = latitude;
    if (longitude !== undefined) position['longitude'] = longitude;
    if (altitude !== undefined) position['altitude'] = altitude;
    this.data['position'] = position;
    return this;
  }
  setManagingOrganization(managingOrganization: Reference): this { this.data['managingOrganization'] = managingOrganization.toArray(); return this; }
  setPartOf(partOf: Reference): this { this.data['partOf'] = partOf.toArray(); return this; }
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
