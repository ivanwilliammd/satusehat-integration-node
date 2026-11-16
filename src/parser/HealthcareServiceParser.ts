/**
 * HealthcareServiceParser — pembaca elemen tingkat atas resource FHIR R4 HealthcareService.
 *
 * Dihasilkan dari HealthcareServiceBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class HealthcareServiceParser {
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

  getName(): any {
    return this.payload['name'] ?? null;
  }

  getType(): any {
    return this.payload['type'] ?? null;
  }

  getLocation(): any {
    return this.payload['location'] ?? null;
  }

  getProvidedBy(): any {
    return this.payload['providedBy'] ?? null;
  }
}
