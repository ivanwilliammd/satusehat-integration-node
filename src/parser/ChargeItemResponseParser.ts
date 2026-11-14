/**
 * ChargeItemResponseParser — typed accessors over the official SATUSEHAT ChargeItemResponse payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/ChargeItemResponse.json, copied unchanged to
 * src/parser/testdata/ChargeItemResponse.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class ChargeItemResponseParser {
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

  getChargeItem(): any {
    return this.payload['chargeItem'] ?? null;
  }

  getCoverage(): any {
    return this.payload['coverage'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getEncounter(): any {
    return this.payload['encounter'] ?? null;
  }

  getPayor(): any {
    return this.payload['payor'] ?? null;
  }

  getQuantity(): any {
    return this.payload['quantity'] ?? null;
  }

  getUnitPriceOverride(): any {
    return this.payload['unitPriceOverride'] ?? null;
  }

  getFactorOverride(): any {
    return this.payload['factorOverride'] ?? null;
  }

  getOverrideReason(): any {
    return this.payload['overrideReason'] ?? null;
  }

  getTotal(): any {
    return this.payload['total'] ?? null;
  }

  getExcess(): any {
    return this.payload['excess'] ?? null;
  }
}
