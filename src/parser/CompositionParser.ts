/**
 * CompositionParser — typed accessors over the official SATUSEHAT Composition payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/Composition.json, copied unchanged to
 * src/parser/testdata/Composition.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class CompositionParser {
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

  getAttester(): any {
    return this.payload['attester'] ?? null;
  }

  getType(): any {
    return this.payload['type'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getEncounter(): any {
    return this.payload['encounter'] ?? null;
  }

  getDate(): any {
    return this.payload['date'] ?? null;
  }

  getAuthor(): any {
    return this.payload['author'] ?? null;
  }

  getTitle(): any {
    return this.payload['title'] ?? null;
  }

  getSection(): any {
    return this.payload['section'] ?? null;
  }
}
