/**
 * MedicationParser — typed accessors over the official SATUSEHAT Medication payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/Medication.json, copied unchanged to
 * src/parser/testdata/Medication.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class MedicationParser {
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

  getMeta(): any {
    return this.payload['meta'] ?? null;
  }

  getIdentifier(): any {
    return this.payload['identifier'] ?? null;
  }

  getCode(): any {
    return this.payload['code'] ?? null;
  }

  getStatus(): any {
    return this.payload['status'] ?? null;
  }

  getManufacturer(): any {
    return this.payload['manufacturer'] ?? null;
  }

  getForm(): any {
    return this.payload['form'] ?? null;
  }

  getIngredient(): any {
    return this.payload['ingredient'] ?? null;
  }

  getBatch(): any {
    return this.payload['batch'] ?? null;
  }

  getExtension(): any {
    return this.payload['extension'] ?? null;
  }
}
