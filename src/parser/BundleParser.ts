/**
 * BundleParser — pembaca elemen tingkat atas resource FHIR R4 Bundle.
 *
 * Dihasilkan dari BundleBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class BundleParser {
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

  getType(): any {
    return this.payload['type'] ?? null;
  }

  getTimestamp(): any {
    return this.payload['timestamp'] ?? null;
  }

  getTotal(): any {
    return this.payload['total'] ?? null;
  }

  getMeta(): any {
    return this.payload['meta'] ?? null;
  }

  getLink(): any {
    return this.payload['link'] ?? null;
  }

  getEntry(): any {
    return this.payload['entry'] ?? null;
  }

  getSignature(): any {
    return this.payload['signature'] ?? null;
  }
}
