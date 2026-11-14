/**
 * ImmunizationParser — typed accessors over the official SATUSEHAT Immunization payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/Immunization.json, copied unchanged to
 * src/parser/testdata/Immunization.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class ImmunizationParser {
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

  getStatus(): any {
    return this.payload['status'] ?? null;
  }

  getVaccineCode(): any {
    return this.payload['vaccineCode'] ?? null;
  }

  getPatient(): any {
    return this.payload['patient'] ?? null;
  }

  getEncounter(): any {
    return this.payload['encounter'] ?? null;
  }

  getOccurrenceDateTime(): any {
    return this.payload['occurrenceDateTime'] ?? null;
  }

  getRecorded(): any {
    return this.payload['recorded'] ?? null;
  }

  getReaction(): any {
    return this.payload['reaction'] ?? null;
  }

  getPrimarySource(): any {
    return this.payload['primarySource'] ?? null;
  }

  getLocation(): any {
    return this.payload['location'] ?? null;
  }

  getLotNumber(): any {
    return this.payload['lotNumber'] ?? null;
  }

  getExpirationDate(): any {
    return this.payload['expirationDate'] ?? null;
  }

  getRoute(): any {
    return this.payload['route'] ?? null;
  }

  getDoseQuantity(): any {
    return this.payload['doseQuantity'] ?? null;
  }

  getPerformer(): any {
    return this.payload['performer'] ?? null;
  }

  getReasonCode(): any {
    return this.payload['reasonCode'] ?? null;
  }

  getProtocolApplied(): any {
    return this.payload['protocolApplied'] ?? null;
  }
}
