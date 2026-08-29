/** MedicationDispense FHIR R4 Resource Builder */
import { CodeableConcept, Reference } from '../datatype/datatypes';

export class MedicationDispenseBuilder {
  private data: Record<string, any> = { resourceType: 'MedicationDispense' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setStatus(status: string): this { this.data['status'] = status; return this; }
  setMedication(cc: CodeableConcept): this { this.data['medication'] = (cc as any).toArray(); return this; }
  setSubject(ref: Reference): this { this.data['subject'] = (ref as any).toArray(); return this; }
  setEncounter(ref: Reference): this { this.data['encounter'] = (ref as any).toArray(); return this; }
  setWhenPrepared(dt: string): this { this.data['whenPrepared'] = dt; return this; }
  setWhenHandedOver(dt: string): this { this.data['whenHandedOver'] = dt; return this; }
  setDestination(ref: Reference): this { this.data['destination'] = (ref as any).toArray(); return this; }
}
