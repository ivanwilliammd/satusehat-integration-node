/**
 * MedicinalProductAuthorizationParser — pembaca elemen tingkat atas resource FHIR R4 MedicinalProductAuthorization.
 *
 * Dihasilkan dari MedicinalProductAuthorizationBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class MedicinalProductAuthorizationParser {
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

  getCountry(): any {
    return this.payload['country'] ?? null;
  }

  getRegulator(): any {
    return this.payload['regulator'] ?? null;
  }

  getValidityPeriod(): any {
    return this.payload['validityPeriod'] ?? null;
  }
}
