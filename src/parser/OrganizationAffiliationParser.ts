/**
 * OrganizationAffiliationParser — pembaca elemen tingkat atas resource FHIR R4 OrganizationAffiliation.
 *
 * Dihasilkan dari OrganizationAffiliationBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class OrganizationAffiliationParser {
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

  getOrganization(): any {
    return this.payload['organization'] ?? null;
  }

  getParticipatingOrganization(): any {
    return this.payload['participatingOrganization'] ?? null;
  }

  getNetwork(): any {
    return this.payload['network'] ?? null;
  }

  getCode(): any {
    return this.payload['code'] ?? null;
  }
}
