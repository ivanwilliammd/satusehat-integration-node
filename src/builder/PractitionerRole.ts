/** PractitionerRole FHIR R4 Resource Builder */
import { CodeableConcept, ContactPoint, Identifier, Period, Reference } from '../datatype/datatypes';

export class PractitionerRole {
  private data: Record<string, any> = { resourceType: 'PractitionerRole' };

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
  setPractitioner(practitioner: Reference): this { this.data['practitioner'] = practitioner.toArray(); return this; }
  setOrganization(organization: Reference): this { this.data['organization'] = organization.toArray(); return this; }
  addCode(code: CodeableConcept): this {
    this.data['code'] = this.data['code'] || [];
    this.data['code'].push(code.toArray());
    return this;
  }
  addSpecialty(specialty: CodeableConcept): this {
    this.data['specialty'] = this.data['specialty'] || [];
    this.data['specialty'].push(specialty.toArray());
    return this;
  }
  addLocation(location: Reference): this {
    this.data['location'] = this.data['location'] || [];
    this.data['location'].push(location.toArray());
    return this;
  }
  addHealthcareService(healthcareService: Reference): this {
    this.data['healthcareService'] = this.data['healthcareService'] || [];
    this.data['healthcareService'].push(healthcareService.toArray());
    return this;
  }
  addTelecom(telecom: ContactPoint): this {
    this.data['telecom'] = this.data['telecom'] || [];
    this.data['telecom'].push(telecom.toArray());
    return this;
  }
  addAvailableTime(daysOfWeek: string[], availableStartTime?: string, availableEndTime?: string, description?: string): this {
    const availableTime: Record<string, any> = {};
    if (daysOfWeek.length) availableTime['daysOfWeek'] = daysOfWeek;
    if (availableStartTime !== undefined) availableTime['availableStartTime'] = availableStartTime;
    if (availableEndTime !== undefined) availableTime['availableEndTime'] = availableEndTime;
    if (description !== undefined) availableTime['description'] = description;
    this.data['availableTime'] = this.data['availableTime'] || [];
    this.data['availableTime'].push(availableTime);
    return this;
  }
  addNotAvailable(description: string, during?: Period): this {
    const notAvailable: Record<string, any> = { description };
    if (during !== undefined) notAvailable['during'] = during.toArray();
    this.data['notAvailable'] = this.data['notAvailable'] || [];
    this.data['notAvailable'].push(notAvailable);
    return this;
  }
  addEndpoint(endpoint: Reference): this {
    this.data['endpoint'] = this.data['endpoint'] || [];
    this.data['endpoint'].push(endpoint.toArray());
    return this;
  }
  setAvailabilityExceptions(availabilityExceptions: string): this { this.data['availabilityExceptions'] = availabilityExceptions; return this; }
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
