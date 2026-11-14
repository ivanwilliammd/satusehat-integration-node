/**
 * EpisodeOfCareParser — typed accessors over the official SATUSEHAT EpisodeOfCare payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/EpisodeOfCare.json, copied unchanged to
 * src/parser/testdata/EpisodeOfCare.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class EpisodeOfCareParser {
  private payload: Record<string, any>;

  constructor(payload: Record<string, any> = {}) {
    this.payload = payload ?? {};
  }

  getRaw(): Record<string, any> {
    return this.payload;
  }

  getResourceType(): any {
    return this.payload['resourceType'] ?? null;
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

  getStatusHistory(): any {
    return this.payload['statusHistory'] ?? null;
  }

  getType(): any {
    return this.payload['type'] ?? null;
  }

  getDiagnosis(): any {
    return this.payload['diagnosis'] ?? null;
  }

  getPatient(): any {
    return this.payload['patient'] ?? null;
  }

  getManagingOrganization(): any {
    return this.payload['managingOrganization'] ?? null;
  }

  getPeriod(): any {
    return this.payload['period'] ?? null;
  }

  getCareManager(): any {
    return this.payload['careManager'] ?? null;
  }
}
