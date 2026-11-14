/**
 * PaymentReconciliationParser — typed accessors over the official SATUSEHAT PaymentReconciliation payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/PaymentReconciliation.json, copied unchanged to
 * src/parser/testdata/PaymentReconciliation.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class PaymentReconciliationParser {
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

  getPeriod(): any {
    return this.payload['period'] ?? null;
  }

  getCreated(): any {
    return this.payload['created'] ?? null;
  }

  getPaymentIssuer(): any {
    return this.payload['paymentIssuer'] ?? null;
  }

  getRequestor(): any {
    return this.payload['requestor'] ?? null;
  }

  getOutcome(): any {
    return this.payload['outcome'] ?? null;
  }

  getDisposition(): any {
    return this.payload['disposition'] ?? null;
  }

  getPaymentDate(): any {
    return this.payload['paymentDate'] ?? null;
  }

  getPaymentAmount(): any {
    return this.payload['paymentAmount'] ?? null;
  }

  getDetail(): any {
    return this.payload['detail'] ?? null;
  }

  getProcessNote(): any {
    return this.payload['processNote'] ?? null;
  }
}
