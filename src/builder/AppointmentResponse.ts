/** AppointmentResponse FHIR R4 Resource Builder */
import { CodeableConcept, Reference } from '../datatype/datatypes';

export class AppointmentResponseBuilder {
  private data: Record<string, any> = { resourceType: 'AppointmentResponse' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  setAppointment(reference: string): this { this.data['appointment'] = { reference }; return this; }
  setParticipantStatus(status: string): this { this.data['participantStatus'] = status; return this; }
  setActor(ref: Reference): this { this.data['actor'] = (ref as any).toArray(); return this; }
}
