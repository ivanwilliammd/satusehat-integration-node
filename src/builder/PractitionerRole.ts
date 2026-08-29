/**
 * PractitionerRole FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/practitionerrole.html
 */
import { SharedBuilder } from './SharedBuilder';
import { CodeableConcept, ContactPoint, Identifier, Period, Reference } from '../datatype/datatypes';

export class PractitionerRole extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'PractitionerRole'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setActive(active: boolean): this { this.set('active', active); return this; }
  setPractitioner(practitioner: Reference): this { this.set('practitioner', this.nestedToArray(practitioner)); return this; }
  setOrganization(organization: Reference): this { this.set('organization', this.nestedToArray(organization)); return this; }
  addCode(code: CodeableConcept): this { this.push('code', this.nestedToArray(code)); return this; }
  addSpecialty(specialty: CodeableConcept): this { this.push('specialty', this.nestedToArray(specialty)); return this; }
  addLocation(location: Reference): this { this.push('location', this.nestedToArray(location)); return this; }
  addHealthcareService(healthcareService: Reference): this { this.push('healthcareService', this.nestedToArray(healthcareService)); return this; }
  addTelecom(telecom: ContactPoint): this { this.push('telecom', this.nestedToArray(telecom)); return this; }
  addAvailableTime(daysOfWeek: string[], availableStartTime?: string, availableEndTime?: string, description?: string): this {
    const availableTime: Record<string, unknown> = {};
    if (daysOfWeek.length) availableTime['daysOfWeek'] = daysOfWeek;
    if (availableStartTime !== undefined) availableTime['availableStartTime'] = availableStartTime;
    if (availableEndTime !== undefined) availableTime['availableEndTime'] = availableEndTime;
    if (description !== undefined) availableTime['description'] = description;
    this.push('availableTime', availableTime);
    return this;
  }
  addNotAvailable(description: string, during?: Period): this {
    const notAvailable: Record<string, unknown> = { description };
    if (during !== undefined) notAvailable['during'] = this.nestedToArray(during);
    this.push('notAvailable', notAvailable);
    return this;
  }
  addEndpoint(endpoint: Reference): this { this.push('endpoint', this.nestedToArray(endpoint)); return this; }
  setAvailabilityExceptions(availabilityExceptions: string): this { this.set('availabilityExceptions', availabilityExceptions); return this; }
  addExtension(url: string, value: unknown, valueType?: string): this { super.addExtension(url, value, valueType); return this; }
}
