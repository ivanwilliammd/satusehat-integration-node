/** AdverseEvent FHIR R4 Resource Builder */
import { CodeableConcept, Reference } from '../datatype/datatypes';

export class AdverseEventBuilder {
  private data: Record<string, any> = { resourceType: 'AdverseEvent' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setEventParticipant(actor: Reference): this { this.data['eventParticipant'] = (actor as any).toArray(); return this; }
  setSubject(ref: Reference): this { this.data['subject'] = (ref as any).toArray(); return this; }
  setEncounter(ref: Reference): this { this.data['encounter'] = (ref as any).toArray(); return this; }
  setDate(dt: string): this { this.data['date'] = dt; return this; }
  setSeriousness(cc: CodeableConcept): this { this.data['seriousness'] = (cc as any).toArray(); return this; }
  setOutcome(cc: CodeableConcept): this { this.data['outcome'] = (cc as any).toArray(); return this; }
}
