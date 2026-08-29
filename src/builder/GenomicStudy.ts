/** GenomicStudy FHIR R4 Resource Builder */
import { CodeableConcept, Reference } from '../datatype/datatypes';

export class GenomicStudy {
  private data: Record<string, any> = { resourceType: 'GenomicStudy' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setStatus(status: string): this { this.data['status'] = status; return this; }
  setType(cc: CodeableConcept): this { this.data['type'] = (cc as any).toArray(); return this; }
  setSubject(ref: Reference): this { this.data['subject'] = (ref as any).toArray(); return this; }
  setEncounter(ref: Reference): this { this.data['encounter'] = (ref as any).toArray(); return this; }
  setStarted(dt: string): this { this.data['started'] = dt; return this; }
  addBasedOn(ref: Reference): this {
    if (!this.data['basedOn']) this.data['basedOn'] = [];
    (this.data['basedOn'] as any[]).push((ref as any).toArray());
    return this;
  }
}
