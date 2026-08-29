/** Device FHIR R4 Resource Builder */
import { Annotation, CodeableConcept, Identifier, Reference } from '../datatype/datatypes';

export class Device {
  private data: Record<string, any> = { resourceType: 'Device' };

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
  setManufacturer(manufacturer: string): this { this.data['manufacturer'] = manufacturer; return this; }
  addDeviceName(name: string, type = 'user-friendly-name'): this {
    this.data['deviceName'] = this.data['deviceName'] || [];
    this.data['deviceName'].push({ name, type });
    return this;
  }
  setType(type: CodeableConcept): this { this.data['type'] = type.toArray(); return this; }
  setPatient(patient: Reference): this { this.data['patient'] = patient.toArray(); return this; }
  setOwner(owner: Reference): this { this.data['owner'] = owner.toArray(); return this; }
  setLocation(location: Reference): this { this.data['location'] = location.toArray(); return this; }
  setSerialNumber(value: string): this { this.data['serialNumber'] = value; return this; }
  addNote(note: Annotation): this {
    this.data['note'] = this.data['note'] || [];
    this.data['note'].push(note.toArray());
    return this;
  }
}
