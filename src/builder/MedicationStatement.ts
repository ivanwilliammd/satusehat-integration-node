/** MedicationStatement FHIR R4 Resource Builder */
import { CodeableConcept, Reference } from '../datatype/datatypes';

export class MedicationStatementBuilder {
  private data: Record<string, any> = { resourceType: 'MedicationStatement' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setStatus(status: string): this { this.data['status'] = status; return this; }
  setMedication(cc: CodeableConcept): this { this.data['medication'] = (cc as any).toArray(); return this; }
  setSubject(ref: Reference): this { this.data['subject'] = (ref as any).toArray(); return this; }
  setEffectiveDateTime(dt: string): this { this.data['effectiveDateTime'] = dt; return this; }
  setDateAsserted(dt: string): this { this.data['dateAsserted'] = dt; return this; }
  setInformationSource(ref: Reference): this { this.data['informationSource'] = (ref as any).toArray(); return this; }
}
