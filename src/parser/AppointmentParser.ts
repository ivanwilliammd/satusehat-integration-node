/**
 * AppointmentParser — pembaca elemen tingkat atas resource FHIR R4 Appointment.
 *
 * Dihasilkan dari AppointmentBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class AppointmentParser {
  private payload: Record<string, any>;

  constructor(payload: Record<string, any> = {}) {
    this.payload = payload ?? {};
  }

  getRaw(): Record<string, any> {
    return this.payload;
  }

  getId(): any {
    return this.payload['id'] ?? null;
  }

  getStatus(): any {
    return this.payload['status'] ?? null;
  }

  getServiceType(): any {
    return this.payload['serviceType'] ?? null;
  }

  getAppointmentType(): any {
    return this.payload['appointmentType'] ?? null;
  }

  getReasonCode(): any {
    return this.payload['reasonCode'] ?? null;
  }

  getParticipant(): any {
    return this.payload['participant'] ?? null;
  }

  getStart(): any {
    return this.payload['start'] ?? null;
  }

  getEnd(): any {
    return this.payload['end'] ?? null;
  }

  getMinutesDuration(): any {
    return this.payload['minutesDuration'] ?? null;
  }

  getIdentifier(): any {
    return this.payload['identifier'] ?? null;
  }

  getCode(): any {
    return this.payload['code'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getEncounter(): any {
    return this.payload['encounter'] ?? null;
  }
}
