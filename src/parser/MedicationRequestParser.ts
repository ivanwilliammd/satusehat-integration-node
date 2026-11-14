/**
 * MedicationRequestParser — typed accessors over the official SATUSEHAT MedicationRequest payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/MedicationRequest.json, copied unchanged to
 * src/parser/testdata/MedicationRequest.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class MedicationRequestParser {
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

  getIntent(): any {
    return this.payload['intent'] ?? null;
  }

  getCategory(): any {
    return this.payload['category'] ?? null;
  }

  getPriority(): any {
    return this.payload['priority'] ?? null;
  }

  getMedicationReference(): any {
    return this.payload['medicationReference'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getEncounter(): any {
    return this.payload['encounter'] ?? null;
  }

  getAuthoredOn(): any {
    return this.payload['authoredOn'] ?? null;
  }

  getRequester(): any {
    return this.payload['requester'] ?? null;
  }

  getCourseOfTherapyType(): any {
    return this.payload['courseOfTherapyType'] ?? null;
  }

  getDosageInstruction(): any {
    return this.payload['dosageInstruction'] ?? null;
  }

  getDispenseRequest(): any {
    return this.payload['dispenseRequest'] ?? null;
  }
}
