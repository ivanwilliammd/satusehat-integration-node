/**
 * SupplyRequestParser — typed accessors over the official SATUSEHAT SupplyRequest payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/SupplyRequest.json, copied unchanged to
 * src/parser/testdata/SupplyRequest.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class SupplyRequestParser {
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

  getItemReference(): any {
    return this.payload['itemReference'] ?? null;
  }

  getQuantity(): any {
    return this.payload['quantity'] ?? null;
  }

  getAuthoredOn(): any {
    return this.payload['authoredOn'] ?? null;
  }

  getRequester(): any {
    return this.payload['requester'] ?? null;
  }

  getSupplier(): any {
    return this.payload['supplier'] ?? null;
  }

  getReasonCode(): any {
    return this.payload['reasonCode'] ?? null;
  }
}
