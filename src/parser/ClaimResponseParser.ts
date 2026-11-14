/**
 * ClaimResponseParser — typed accessors over the official SATUSEHAT ClaimResponse payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/ClaimResponse.json, copied unchanged to
 * src/parser/testdata/ClaimResponse.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class ClaimResponseParser {
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

  getIdentifier(): any {
    return this.payload['identifier'] ?? null;
  }

  getType(): any {
    return this.payload['type'] ?? null;
  }

  getUse(): any {
    return this.payload['use'] ?? null;
  }

  getPatient(): any {
    return this.payload['patient'] ?? null;
  }

  getCreated(): any {
    return this.payload['created'] ?? null;
  }

  getInsurer(): any {
    return this.payload['insurer'] ?? null;
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

  getPayeeType(): any {
    return this.payload['payeeType'] ?? null;
  }

  getAdjudication(): any {
    return this.payload['adjudication'] ?? null;
  }

  getItem(): any {
    return this.payload['item'] ?? null;
  }

  getTotal(): any {
    return this.payload['total'] ?? null;
  }

  getPayment(): any {
    return this.payload['payment'] ?? null;
  }
}
