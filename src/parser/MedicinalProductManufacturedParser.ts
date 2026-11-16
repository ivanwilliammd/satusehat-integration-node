/**
 * MedicinalProductManufacturedParser — pembaca elemen tingkat atas resource FHIR R4 MedicinalProductManufactured.
 *
 * Dihasilkan dari MedicinalProductManufacturedBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class MedicinalProductManufacturedParser {
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

  getQuantity(): any {
    return this.payload['quantity'] ?? null;
  }

  getManufacturer(): any {
    return this.payload['manufacturer'] ?? null;
  }

  getIngredient(): any {
    return this.payload['ingredient'] ?? null;
  }
}
