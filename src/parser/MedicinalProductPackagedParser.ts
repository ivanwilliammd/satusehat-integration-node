/**
 * MedicinalProductPackagedParser — pembaca elemen tingkat atas resource FHIR R4 MedicinalProductPackaged.
 *
 * Dihasilkan dari MedicinalProductPackagedBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class MedicinalProductPackagedParser {
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

  getPackageItem(): any {
    return this.payload['packageItem'] ?? null;
  }

  getDescription(): any {
    return this.payload['description'] ?? null;
  }

  getManufacturer(): any {
    return this.payload['manufacturer'] ?? null;
  }
}
