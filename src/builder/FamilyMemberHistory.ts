/** FamilyMemberHistory FHIR R4 Resource Builder */
import { CodeableConcept, Reference } from '../datatype/datatypes';

export class FamilyMemberHistory {
  private data: Record<string, any> = { resourceType: 'FamilyMemberHistory' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setStatus(status: string): this { this.data['status'] = status; return this; }
  setPatient(ref: Reference): this { this.data['patient'] = (ref as any).toArray(); return this; }
  setRelationship(cc: CodeableConcept): this { this.data['relationship'] = (cc as any).toArray(); return this; }
  setCode(cc: CodeableConcept): this { this.data['code'] = (cc as any).toArray(); return this; }
  setDate(date: string): this { this.data['date'] = date; return this; }
}
