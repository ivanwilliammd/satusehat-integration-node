/**
 * BillingStatusParser — typed accessors over the official SATUSEHAT BillingStatus payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/BillingStatus.json, copied unchanged to
 * src/parser/testdata/BillingStatus.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class BillingStatusParser {
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

  getInsurer(): any {
    return this.payload['insurer'] ?? null;
  }

  getRecipient(): any {
    return this.payload['recipient'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getRequest(): any {
    return this.payload['request'] ?? null;
  }
}
