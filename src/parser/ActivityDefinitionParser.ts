/**
 * ActivityDefinitionParser — pembaca elemen tingkat atas resource FHIR R4 ActivityDefinition.
 *
 * Dihasilkan dari ActivityDefinitionBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class ActivityDefinitionParser {
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

  getDescription(): any {
    return this.payload['description'] ?? null;
  }

  getKind(): any {
    return this.payload['kind'] ?? null;
  }

  getCode(): any {
    return this.payload['code'] ?? null;
  }

  getAuthor(): any {
    return this.payload['author'] ?? null;
  }

  getTiming(): any {
    return this.payload['timing'] ?? null;
  }
}
