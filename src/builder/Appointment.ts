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

  addIdentifier(system: string, value: string, use: string | null = null, typeCode: string | null = null, typeDisplay: string | null = null): this {
    const ident: Record<string, any> = { system, value };
    if (use !== null) ident['use'] = use;
    if (typeCode !== null) ident['type'] = { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v2-0203', code: typeCode, display: typeDisplay ?? '' }] };
    if (!Array.isArray(this.data['identifier'])) this.data['identifier'] = [];
    this.data['identifier'].push(ident);
    return this;
  }

  setCode(system: string, code: string, display: string): this {
    this.data['code'] = { coding: [{ system, code, display }] };
    return this;
  }

  setSubject(reference: string, display: string | null = null): this {
    const subject: Record<string, any> = { reference };
    if (display !== null) subject['display'] = display;
    this.data['subject'] = subject;
    return this;
  }

  /** Kanon menulis `encounter`, meskipun Appointment R4 tidak punya elemen itu. */
  setEncounter(reference: string): this {
    this.data['encounter'] = { reference };
    return this;
  }
}

/** Nama kanon: seragam dengan modul lain. `AppointmentBuilder` dipertahankan untuk pemanggil lama. */
export { AppointmentBuilder as Appointment };
