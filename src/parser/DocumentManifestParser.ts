/**
 * DocumentManifestParser — pembaca elemen tingkat atas resource FHIR R4 DocumentManifest.
 *
 * Dihasilkan dari DocumentManifestBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class DocumentManifestParser {
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

  getType(): any {
    return this.payload['type'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getCreated(): any {
    return this.payload['created'] ?? null;
  }

  getSource(): any {
    return this.payload['source'] ?? null;
  }
}
