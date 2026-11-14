/**
 * MedicationDispenseParser — typed accessors over the official SATUSEHAT MedicationDispense payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/MedicationDispense.json, copied unchanged to
 * src/parser/testdata/MedicationDispense.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class MedicationDispenseParser {
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

  getIdentifier(): any {
    return this.payload['identifier'] ?? null;
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

  getPerformer(): any {
    return this.payload['performer'] ?? null;
  }

  getLocation(): any {
    return this.payload['location'] ?? null;
  }

  getAuthorizingPrescription(): any {
    return this.payload['authorizingPrescription'] ?? null;
  }

  getQuantity(): any {
    return this.payload['quantity'] ?? null;
  }

  getDaysSupply(): any {
    return this.payload['daysSupply'] ?? null;
  }

  getWhenPrepared(): any {
    return this.payload['whenPrepared'] ?? null;
  }

  getWhenHandedOver(): any {
    return this.payload['whenHandedOver'] ?? null;
  }

  getDosageInstruction(): any {
    return this.payload['dosageInstruction'] ?? null;
  }
}
