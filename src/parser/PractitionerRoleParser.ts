/**
 * PractitionerRoleParser — pembaca elemen tingkat atas resource FHIR R4 PractitionerRole.
 *
 * Dihasilkan dari PractitionerRoleBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class PractitionerRoleParser {
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

  getActive(): any {
    return this.payload['active'] ?? null;
  }

  getPractitioner(): any {
    return this.payload['practitioner'] ?? null;
  }

  getOrganization(): any {
    return this.payload['organization'] ?? null;
  }

  getCode(): any {
    return this.payload['code'] ?? null;
  }

  getSpecialty(): any {
    return this.payload['specialty'] ?? null;
  }

  getLocation(): any {
    return this.payload['location'] ?? null;
  }

  getHealthcareService(): any {
    return this.payload['healthcareService'] ?? null;
  }

  getTelecom(): any {
    return this.payload['telecom'] ?? null;
  }

  getAvailableTime(): any {
    return this.payload['availableTime'] ?? null;
  }

  getNotAvailable(): any {
    return this.payload['notAvailable'] ?? null;
  }

  getEndpoint(): any {
    return this.payload['endpoint'] ?? null;
  }

  getAvailabilityExceptions(): any {
    return this.payload['availabilityExceptions'] ?? null;
  }

  getExtension(): any {
    return this.payload['extension'] ?? null;
  }
}
