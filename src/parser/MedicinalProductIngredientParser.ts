/**
 * MedicinalProductIngredientParser — pembaca elemen tingkat atas resource FHIR R4 MedicinalProductIngredient.
 *
 * Dihasilkan dari MedicinalProductIngredientBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class MedicinalProductIngredientParser {
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

  getRole(): any {
    return this.payload['role'] ?? null;
  }

  getSubstance(): any {
    return this.payload['substance'] ?? null;
  }

  getQuantity(): any {
    return this.payload['quantity'] ?? null;
  }
}
