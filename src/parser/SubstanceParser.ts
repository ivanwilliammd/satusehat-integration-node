/**
 * SubstanceParser — pembaca elemen tingkat atas resource FHIR R4 Substance.
 *
 * Dihasilkan dari SubstanceBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class SubstanceParser {
  private payload: Record<string, any>;

  constructor(payload: Record<string, any> = {}) {
    this.payload = payload ?? {};
  }

  getRaw(): Record<string, any> {
    return this.payload;
  }

  getIdentifier(): any {
    return this.payload['identifier'] ?? null;
  }

  getStatus(): any {
    return this.payload['status'] ?? null;
  }

  getCategory(): any {
    return this.payload['category'] ?? null;
  }

  getCode(): any {
    return this.payload['code'] ?? null;
  }

  getDescription(): any {
    return this.payload['description'] ?? null;
  }

  getId(): any {
    return this.payload['id'] ?? null;
  }

  getText(): any {
    return this.payload['text'] ?? null;
  }
}
