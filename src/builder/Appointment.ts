/** Appointment FHIR R4 Resource Builder */
import { CodeableConcept, Period, Reference } from '../datatype/datatypes';

export class AppointmentBuilder {
  private data: Record<string, any> = { resourceType: 'Appointment' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setServiceType(cc: CodeableConcept): this { this.data['serviceType'] = [(cc as any).toArray()]; return this; }
  setAppointmentType(cc: CodeableConcept): this { this.data['appointmentType'] = (cc as any).toArray(); return this; }
  setReasonCode(cc: CodeableConcept): this { this.data['reasonCode'] = [(cc as any).toArray()]; return this; }
  addParticipant(type: string, actor: Reference, status: string): this {
    if (!this.data['participant']) this.data['participant'] = [];
    (this.data['participant'] as any[]).push({ type: [{ coding: [{ code: type }] }], actor: (actor as any).toArray(), status });
    return this;
  }
  setStart(start: string): this { this.data['start'] = start; return this; }
  setEnd(end: string): this { this.data['end'] = end; return this; }
  setDurationMinutes(minutes: number): this { this.data['minutesDuration'] = minutes; return this; }
}
