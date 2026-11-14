/**
 * CoverageEligibilityRequestParser — typed accessors over the official SATUSEHAT CoverageEligibilityRequest payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/CoverageEligibilityRequest.json, copied unchanged to
 * src/parser/testdata/CoverageEligibilityRequest.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class CoverageEligibilityRequestParser {
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

  getIdentifier(): any {
    return this.payload['identifier'] ?? null;
  }

  getStatus(): any {
    return this.payload['status'] ?? null;
  }

  getPriority(): any {
    return this.payload['priority'] ?? null;
  }

  getPurpose(): any {
    return this.payload['purpose'] ?? null;
  }

  getPatient(): any {
    return this.payload['patient'] ?? null;
  }

  getServicedDate(): any {
    return this.payload['servicedDate'] ?? null;
  }

  getCreated(): any {
    return this.payload['created'] ?? null;
  }

  getEnterer(): any {
    return this.payload['enterer'] ?? null;
  }

  getProvider(): any {
    return this.payload['provider'] ?? null;
  }

  getInsurer(): any {
    return this.payload['insurer'] ?? null;
  }

  getFacility(): any {
    return this.payload['facility'] ?? null;
  }

  getInsurance(): any {
    return this.payload['insurance'] ?? null;
  }

  getSupportingInfo(): any {
    return this.payload['supportingInfo'] ?? null;
  }

  getContained(): any {
    return this.payload['contained'] ?? null;
  }
}
