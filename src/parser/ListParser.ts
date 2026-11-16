/**
 * ListParser — pembaca elemen tingkat atas resource FHIR R4 List.
 *
 * Dihasilkan dari ListBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class ListParser {
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

  getMode(): any {
    return this.payload['mode'] ?? null;
  }

  getTitle(): any {
    return this.payload['title'] ?? null;
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

  getNote(): any {
    return this.payload['note'] ?? null;
  }

  getIdentifier(): any {
    return this.payload['identifier'] ?? null;
  }

  getDate(): any {
    return this.payload['date'] ?? null;
  }
}
