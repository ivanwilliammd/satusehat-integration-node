/**
 * SupplyDeliveryParser — typed accessors over the official SATUSEHAT SupplyDelivery payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/SupplyDelivery.json, copied unchanged to
 * src/parser/testdata/SupplyDelivery.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class SupplyDeliveryParser {
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

  getBasedOn(): any {
    return this.payload['basedOn'] ?? null;
  }

  getStatus(): any {
    return this.payload['status'] ?? null;
  }

  getPatient(): any {
    return this.payload['patient'] ?? null;
  }

  getSuppliedItem(): any {
    return this.payload['suppliedItem'] ?? null;
  }

  getOccurrenceDateTime(): any {
    return this.payload['occurrenceDateTime'] ?? null;
  }

  getSupplier(): any {
    return this.payload['supplier'] ?? null;
  }

  getDestination(): any {
    return this.payload['destination'] ?? null;
  }

  getReceiver(): any {
    return this.payload['receiver'] ?? null;
  }
}
