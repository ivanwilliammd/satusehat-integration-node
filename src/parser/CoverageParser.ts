/**
 * CoverageParser — typed accessors over the official SATUSEHAT Coverage payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/Coverage.json, copied unchanged to
 * src/parser/testdata/Coverage.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class CoverageParser {
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

  getType(): any {
    return this.payload['type'] ?? null;
  }

  getSubscriberId(): any {
    return this.payload['subscriberId'] ?? null;
  }

  getBeneficiary(): any {
    return this.payload['beneficiary'] ?? null;
  }

  getPayor(): any {
    return this.payload['payor'] ?? null;
  }

  getClass(): any {
    return this.payload['class'] ?? null;
  }

  getExtension(): any {
    return this.payload['extension'] ?? null;
  }

  getId(): any {
    return this.payload?.['id'] ?? null;
  }

  getPolicyHolder(): any {
    return this.payload?.['policyHolder'] ?? null;
  }

  getSubscriber(): any {
    return this.payload?.['subscriber'] ?? null;
  }

  getDependent(): any {
    return this.payload?.['dependent'] ?? null;
  }

  getRelationship(): any {
    return this.payload?.['relationship'] ?? null;
  }

  getOrder(): any {
    return this.payload?.['order'] ?? null;
  }

  getNetwork(): any {
    return this.payload?.['network'] ?? null;
  }

  getCostToBeneficiary(): any {
    return this.payload?.['costToBeneficiary'] ?? null;
  }

  getPeriod(): any {
    return this.payload?.['period'] ?? null;
  }
}
