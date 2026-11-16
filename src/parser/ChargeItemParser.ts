/**
 * ChargeItemParser — typed accessors over the official SATUSEHAT ChargeItem payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/ChargeItem.json, copied unchanged to
 * src/parser/testdata/ChargeItem.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class ChargeItemParser {
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

  getCode(): any {
    return this.payload['code'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getContext(): any {
    return this.payload['context'] ?? null;
  }

  getOccurrencePeriod(): any {
    return this.payload['occurrencePeriod'] ?? null;
  }

  getPerformer(): any {
    return this.payload['performer'] ?? null;
  }

  getQuantity(): any {
    return this.payload['quantity'] ?? null;
  }

  getAccount(): any {
    return this.payload['account'] ?? null;
  }

  getExtension(): any {
    return this.payload['extension'] ?? null;
  }

  getId(): any {
    return this.payload?.['id'] ?? null;
  }

  getIdentifier(): any {
    return this.payload?.['identifier'] ?? null;
  }

  getPartOf(): any {
    return this.payload?.['partOf'] ?? null;
  }

  getFocus(): any {
    return this.payload?.['focus'] ?? null;
  }

  getPerformedDateTime(): any {
    return this.payload?.['performedDateTime'] ?? null;
  }

  getPerformingOrganization(): any {
    return this.payload?.['performingOrganization'] ?? null;
  }

  getRequestingOrganization(): any {
    return this.payload?.['requestingOrganization'] ?? null;
  }

  getBodysite(): any {
    return this.payload?.['bodysite'] ?? null;
  }

  getProductCodeableConcept(): any {
    return this.payload?.['productCodeableConcept'] ?? null;
  }

  getPriceOverride(): any {
    return this.payload?.['priceOverride'] ?? null;
  }

  getOverrideReason(): any {
    return this.payload?.['overrideReason'] ?? null;
  }

  getEnterer(): any {
    return this.payload?.['enterer'] ?? null;
  }

  getEnteredDate(): any {
    return this.payload?.['enteredDate'] ?? null;
  }

  getReason(): any {
    return this.payload?.['reason'] ?? null;
  }

  getService(): any {
    return this.payload?.['service'] ?? null;
  }
}
