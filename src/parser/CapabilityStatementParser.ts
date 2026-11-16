/**
 * CapabilityStatementParser — pembaca elemen tingkat atas resource FHIR R4 CapabilityStatement.
 *
 * Dihasilkan dari CapabilityStatementBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class CapabilityStatementParser {
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

  getDate(): any {
    return this.payload['date'] ?? null;
  }

  getKind(): any {
    return this.payload['kind'] ?? null;
  }

  getFhirVersion(): any {
    return this.payload['fhirVersion'] ?? null;
  }

  getFormat(): any {
    return this.payload['format'] ?? null;
  }

  getRest(): any {
    return this.payload['rest'] ?? null;
  }
}
