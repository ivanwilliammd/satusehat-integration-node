/**
 * SubstanceReferenceInformationParser — pembaca elemen tingkat atas resource FHIR R4 SubstanceReferenceInformation.
 *
 * Dihasilkan dari SubstanceReferenceInformationBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class SubstanceReferenceInformationParser {
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

  getComment(): any {
    return this.payload['comment'] ?? null;
  }

  getGene(): any {
    return this.payload['gene'] ?? null;
  }

  getGeneElement(): any {
    return this.payload['geneElement'] ?? null;
  }
}
