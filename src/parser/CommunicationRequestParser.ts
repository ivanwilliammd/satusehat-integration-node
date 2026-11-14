/**
 * CommunicationRequestParser — typed accessors over the official SATUSEHAT CommunicationRequest payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/CommunicationRequest.json, copied unchanged to
 * src/parser/testdata/CommunicationRequest.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class CommunicationRequestParser {
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

  getCategory(): any {
    return this.payload['category'] ?? null;
  }

  getPayload(): any {
    return this.payload['payload'] ?? null;
  }

  getAbout(): any {
    return this.payload['about'] ?? null;
  }

  getSender(): any {
    return this.payload['sender'] ?? null;
  }

  getRecipient(): any {
    return this.payload['recipient'] ?? null;
  }
}
