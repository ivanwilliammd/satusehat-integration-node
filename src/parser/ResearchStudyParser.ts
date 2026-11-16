/**
 * ResearchStudyParser — pembaca elemen tingkat atas resource FHIR R4 ResearchStudy.
 *
 * Dihasilkan dari ResearchStudyBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class ResearchStudyParser {
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

  getTitle(): any {
    return this.payload['title'] ?? null;
  }

  getProtocol(): any {
    return this.payload['protocol'] ?? null;
  }

  getSponsor(): any {
    return this.payload['sponsor'] ?? null;
  }

  getPhase(): any {
    return this.payload['phase'] ?? null;
  }
}
