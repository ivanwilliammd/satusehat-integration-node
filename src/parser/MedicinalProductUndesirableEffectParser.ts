/**
 * MedicinalProductUndesirableEffectParser — pembaca elemen tingkat atas resource FHIR R4 MedicinalProductUndesirableEffect.
 *
 * Dihasilkan dari MedicinalProductUndesirableEffectBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class MedicinalProductUndesirableEffectParser {
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

  getSymptomConditionEffect(): any {
    return this.payload['symptomConditionEffect'] ?? null;
  }

  getClassification(): any {
    return this.payload['classification'] ?? null;
  }
}
