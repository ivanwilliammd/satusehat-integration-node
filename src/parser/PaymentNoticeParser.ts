/**
 * PaymentNoticeParser — typed accessors over the official SATUSEHAT PaymentNotice payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/PaymentNotice.json, copied unchanged to
 * src/parser/testdata/PaymentNotice.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class PaymentNoticeParser {
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

  getRequest(): any {
    return this.payload['request'] ?? null;
  }

  getResponse(): any {
    return this.payload['response'] ?? null;
  }

  getCreated(): any {
    return this.payload['created'] ?? null;
  }

  getPaymentDate(): any {
    return this.payload['paymentDate'] ?? null;
  }

  getProvider(): any {
    return this.payload['provider'] ?? null;
  }

  getPayee(): any {
    return this.payload['payee'] ?? null;
  }

  getRecipient(): any {
    return this.payload['recipient'] ?? null;
  }

  getAmount(): any {
    return this.payload['amount'] ?? null;
  }

  getPayment(): any {
    return this.payload['payment'] ?? null;
  }

  getPaymentStatus(): any {
    return this.payload['paymentStatus'] ?? null;
  }
}
