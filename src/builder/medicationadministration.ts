/** MedicationAdministration FHIR R4 Resource Builder */
import { CodeableConcept, Reference } from '../datatype/datatypes';

export class MedicationAdministrationBuilder {
  private data: Record<string, any> = { resourceType: 'MedicationAdministration' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setStatus(status: string): this { this.data['status'] = status; return this; }
  setMedication(cc: CodeableConcept): this { this.data['medication'] = (cc as any).toArray(); return this; }
  setSubject(ref: Reference): this { this.data['subject'] = (ref as any).toArray(); return this; }
  setEncounter(ref: Reference): this { this.data['encounter'] = (ref as any).toArray(); return this; }
  setEffectiveDateTime(dt: string): this { this.data['effectiveDateTime'] = dt; return this; }
  setRequester(ref: Reference): this { this.data['requester'] = (ref as any).toArray(); return this; }
}
