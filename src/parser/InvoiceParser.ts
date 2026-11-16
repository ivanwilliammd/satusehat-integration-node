/**
 * InvoiceParser — typed accessors over the official SATUSEHAT Invoice payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/Invoice.json, copied unchanged to
 * src/parser/testdata/Invoice.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class InvoiceParser {
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

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getDate(): any {
    return this.payload['date'] ?? null;
  }

  getIssuer(): any {
    return this.payload['issuer'] ?? null;
  }

  getAccount(): any {
    return this.payload['account'] ?? null;
  }

  getLineItem(): any {
    return this.payload['lineItem'] ?? null;
  }

  getTotalNet(): any {
    return this.payload['totalNet'] ?? null;
  }

  getId(): any {
    return this.payload?.['id'] ?? null;
  }

  getIdentifier(): any {
    return this.payload?.['identifier'] ?? null;
  }

  getCancelledReason(): any {
    return this.payload?.['cancelledReason'] ?? null;
  }

  getType(): any {
    return this.payload?.['type'] ?? null;
  }

  getParticipant(): any {
    return this.payload?.['participant'] ?? null;
  }

  getPaymentTerms(): any {
    return this.payload?.['paymentTerms'] ?? null;
  }

  getNote(): any {
    return this.payload?.['note'] ?? null;
  }
}
