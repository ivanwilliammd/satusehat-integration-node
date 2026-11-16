/**
 * MedicationAdministrationParser — typed accessors over the official SATUSEHAT MedicationAdministration payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/MedicationAdministration.json, copied unchanged to
 * src/parser/testdata/MedicationAdministration.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class MedicationAdministrationParser {
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

  getContext(): any {
    return this.payload['context'] ?? null;
  }

  getEffectivePeriod(): any {
    return this.payload['effectivePeriod'] ?? null;
  }

  getPerformer(): any {
    return this.payload['performer'] ?? null;
  }

  getReasonCode(): any {
    return this.payload['reasonCode'] ?? null;
  }

  getRequest(): any {
    return this.payload['request'] ?? null;
  }

  getDosage(): any {
    return this.payload['dosage'] ?? null;
  }

  getIdentifier(): any {
    return this.payload?.['identifier'] ?? null;
  }

  getReasonReference(): any {
    return this.payload?.['reasonReference'] ?? null;
  }

  getNote(): any {
    return this.payload?.['note'] ?? null;
  }

  getExtension(): any {
    return this.payload?.['extension'] ?? null;
  }

  getId(): any {
    return this.payload?.['id'] ?? null;
  }

  getMedicationCodeableConcept(): any {
    return this.payload?.['medicationCodeableConcept'] ?? null;
  }

  getEffectiveDateTime(): any {
    return this.payload?.['effectiveDateTime'] ?? null;
  }
}
