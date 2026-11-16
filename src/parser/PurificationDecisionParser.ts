/**
 * PurificationDecisionParser — pembaca elemen tingkat atas resource FHIR R4 PurificationDecision.
 *
 * Dihasilkan dari PurificationDecisionBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class PurificationDecisionParser {
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

  getInsurer(): any {
    return this.payload['insurer'] ?? null;
  }

  getProvider(): any {
    return this.payload['provider'] ?? null;
  }

  getClaimResponse(): any {
    return this.payload['claimResponse'] ?? null;
  }

  getCreated(): any {
    return this.payload['created'] ?? null;
  }
}
