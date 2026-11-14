/**
 * CommunicationParser — typed accessors over the official SATUSEHAT Communication payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/Communication.json, copied unchanged to
 * src/parser/testdata/Communication.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class CommunicationParser {
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

  getBasedOn(): any {
    return this.payload['basedOn'] ?? null;
  }

  getPayload(): any {
    return this.payload['payload'] ?? null;
  }

  getAbout(): any {
    return this.payload['about'] ?? null;
  }

  getInResponseTo(): any {
    return this.payload['inResponseTo'] ?? null;
  }

  getSender(): any {
    return this.payload['sender'] ?? null;
  }

  getRecipient(): any {
    return this.payload['recipient'] ?? null;
  }
}
