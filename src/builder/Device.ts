/**
 * Device FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/device.html
 */
import { SharedBuilder } from './SharedBuilder';
import { Annotation, CodeableConcept, Identifier, Reference } from '../datatype/datatypes';

export class Device extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'Device'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setStatus(status: string): this { this.set('status', status); return this; }
  setManufacturer(manufacturer: string): this { this.set('manufacturer', manufacturer); return this; }
  /** @param type DeviceName.type: "user-friendly-name" | "manufacturer-name" | "model-name" | "other" */
  addDeviceName(name: string, type = 'user-friendly-name'): this { this.push('deviceName', { name, type }); return this; }
  setType(type: CodeableConcept): this { this.set('type', this.nestedToArray(type)); return this; }
  setPatient(patient: Reference): this { this.set('patient', this.nestedToArray(patient)); return this; }
  setOwner(owner: Reference): this { this.set('owner', this.nestedToArray(owner)); return this; }
  setLocation(location: Reference): this { this.set('location', this.nestedToArray(location)); return this; }
  setSerialNumber(value: string): this { this.set('serialNumber', value); return this; }
  addNote(note: Annotation): this { this.push('note', this.nestedToArray(note)); return this; }
}
