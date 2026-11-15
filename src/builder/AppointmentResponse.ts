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

  addIdentifier(system: string, value: string, use: string | null = null, typeCode: string | null = null, typeDisplay: string | null = null): this {
    const ident: Record<string, any> = { system, value };
    if (use !== null) ident['use'] = use;
    if (typeCode !== null) ident['type'] = { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v2-0203', code: typeCode, display: typeDisplay ?? '' }] };
    if (!Array.isArray(this.data['identifier'])) this.data['identifier'] = [];
    this.data['identifier'].push(ident);
    return this;
  }

  setStatus(status: string): this { this.data['status'] = status; return this; }

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

  setEncounter(reference: string): this {
    this.data['encounter'] = { reference };
    return this;
  }
}

/** Nama kanon: seragam dengan modul lain. `AppointmentResponseBuilder` dipertahankan untuk pemanggil lama. */
export { AppointmentResponseBuilder as AppointmentResponse };
