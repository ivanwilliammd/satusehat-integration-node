/**
 * MedicinalProductInteractionParser — pembaca elemen tingkat atas resource FHIR R4 MedicinalProductInteraction.
 *
 * Dihasilkan dari MedicinalProductInteractionBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class MedicinalProductInteractionParser {
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

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getDescription(): any {
    return this.payload['description'] ?? null;
  }

  getInteractant(): any {
    return this.payload['interactant'] ?? null;
  }
}
