/**
 * AccountParser — typed accessors over the official SATUSEHAT Account payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/Account.json, copied unchanged to
 * src/parser/testdata/Account.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class AccountParser {
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

  getType(): any {
    return this.payload['type'] ?? null;
  }

  getName(): any {
    return this.payload['name'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getServicePeriod(): any {
    return this.payload['servicePeriod'] ?? null;
  }

  getOwner(): any {
    return this.payload['owner'] ?? null;
  }

  getGuarantor(): any {
    return this.payload['guarantor'] ?? null;
  }

  getDescription(): any {
    return this.payload['description'] ?? null;
  }
}
