/**
 * MedicationStatementParser — typed accessors over the official SATUSEHAT MedicationStatement payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/MedicationStatement.json, copied unchanged to
 * src/parser/testdata/MedicationStatement.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class MedicationStatementParser {
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

  getContained(): any {
    return this.payload['contained'] ?? null;
  }

  getStatus(): any {
    return this.payload['status'] ?? null;
  }

  getCategory(): any {
    return this.payload['category'] ?? null;
  }

  getMedicationReference(): any {
    return this.payload['medicationReference'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getDosage(): any {
    return this.payload['dosage'] ?? null;
  }

  getEffectiveDateTime(): any {
    return this.payload['effectiveDateTime'] ?? null;
  }

  getDateAsserted(): any {
    return this.payload['dateAsserted'] ?? null;
  }

  getInformationSource(): any {
    return this.payload['informationSource'] ?? null;
  }

  getContext(): any {
    return this.payload['context'] ?? null;
  }
}
