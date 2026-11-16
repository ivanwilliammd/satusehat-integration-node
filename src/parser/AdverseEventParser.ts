/**
 * AdverseEventParser — pembaca elemen tingkat atas resource FHIR R4 AdverseEvent.
 *
 * Dihasilkan dari AdverseEventBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class AdverseEventParser {
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

  getEventParticipant(): any {
    return this.payload['eventParticipant'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getEncounter(): any {
    return this.payload['encounter'] ?? null;
  }

  getDate(): any {
    return this.payload['date'] ?? null;
  }

  getSeriousness(): any {
    return this.payload['seriousness'] ?? null;
  }

  getOutcome(): any {
    return this.payload['outcome'] ?? null;
  }

  getIdentifier(): any {
    return this.payload['identifier'] ?? null;
  }

  getCode(): any {
    return this.payload['code'] ?? null;
  }
}
