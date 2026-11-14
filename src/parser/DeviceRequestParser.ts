/**
 * DeviceRequestParser — typed accessors over the official SATUSEHAT DeviceRequest payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/DeviceRequest.json, copied unchanged to
 * src/parser/testdata/DeviceRequest.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class DeviceRequestParser {
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

  getIntent(): any {
    return this.payload['intent'] ?? null;
  }

  getPriority(): any {
    return this.payload['priority'] ?? null;
  }

  getCodeReference(): any {
    return this.payload['codeReference'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getAuthoredOn(): any {
    return this.payload['authoredOn'] ?? null;
  }

  getRequester(): any {
    return this.payload['requester'] ?? null;
  }

  getPerformer(): any {
    return this.payload['performer'] ?? null;
  }

  getReasonCode(): any {
    return this.payload['reasonCode'] ?? null;
  }
}
