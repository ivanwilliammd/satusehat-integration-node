/**
 * EnrollmentResponseParser — pembaca elemen tingkat atas resource FHIR R4 EnrollmentResponse.
 *
 * Dihasilkan dari EnrollmentResponseBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class EnrollmentResponseParser {
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

  getIdentifier(): any {
    return this.payload['identifier'] ?? null;
  }

  getStatus(): any {
    return this.payload['status'] ?? null;
  }

  getRequest(): any {
    return this.payload['request'] ?? null;
  }

  getOutcome(): any {
    return this.payload['outcome'] ?? null;
  }

  getDisposition(): any {
    return this.payload['disposition'] ?? null;
  }

  getCreated(): any {
    return this.payload['created'] ?? null;
  }
}
