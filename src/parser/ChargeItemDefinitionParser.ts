/**
 * ChargeItemDefinitionParser — pembaca elemen tingkat atas resource FHIR R4 ChargeItemDefinition.
 *
 * Dihasilkan dari ChargeItemDefinitionBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class ChargeItemDefinitionParser {
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

  getUrl(): any {
    return this.payload['url'] ?? null;
  }

  getVersion(): any {
    return this.payload['version'] ?? null;
  }

  getName(): any {
    return this.payload['name'] ?? null;
  }

  getTitle(): any {
    return this.payload['title'] ?? null;
  }

  getStatus(): any {
    return this.payload['status'] ?? null;
  }

  getDate(): any {
    return this.payload['date'] ?? null;
  }

  getPublisher(): any {
    return this.payload['publisher'] ?? null;
  }

  getDescription(): any {
    return this.payload['description'] ?? null;
  }

  getCode(): any {
    return this.payload['code'] ?? null;
  }

  getIdentifier(): any {
    return this.payload['identifier'] ?? null;
  }

  getInstance(): any {
    return this.payload['instance'] ?? null;
  }

  getProperty(): any {
    return this.payload['property'] ?? null;
  }
}
