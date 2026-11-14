/**
 * CoverageEligibilityResponseParser — typed accessors over the official SATUSEHAT CoverageEligibilityResponse payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/CoverageEligibilityResponse.json, copied unchanged to
 * src/parser/testdata/CoverageEligibilityResponse.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class CoverageEligibilityResponseParser {
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

  getPurpose(): any {
    return this.payload['purpose'] ?? null;
  }

  getPatient(): any {
    return this.payload['patient'] ?? null;
  }

  getCreated(): any {
    return this.payload['created'] ?? null;
  }

  getRequestor(): any {
    return this.payload['requestor'] ?? null;
  }

  getRequest(): any {
    return this.payload['request'] ?? null;
  }

  getOutcome(): any {
    return this.payload['outcome'] ?? null;
  }

  getDisposition(): any {
    return this.payload['disposition'] ?? null;
  }

  getInsurer(): any {
    return this.payload['insurer'] ?? null;
  }

  getInsurance(): any {
    return this.payload['insurance'] ?? null;
  }

  getExtension(): any {
    return this.payload['extension'] ?? null;
  }
}
