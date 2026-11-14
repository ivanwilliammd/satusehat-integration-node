/**
 * CarePlanParser — typed accessors over the official SATUSEHAT CarePlan payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/CarePlan.json, copied unchanged to
 * src/parser/testdata/CarePlan.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class CarePlanParser {
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

  getTitle(): any {
    return this.payload['title'] ?? null;
  }

  getDescription(): any {
    return this.payload['description'] ?? null;
  }

  getCategory(): any {
    return this.payload['category'] ?? null;
  }

  getStatus(): any {
    return this.payload['status'] ?? null;
  }

  getIntent(): any {
    return this.payload['intent'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getEncounter(): any {
    return this.payload['encounter'] ?? null;
  }

  getPeriod(): any {
    return this.payload['period'] ?? null;
  }

  getCreated(): any {
    return this.payload['created'] ?? null;
  }

  getAuthor(): any {
    return this.payload['author'] ?? null;
  }

  getActivity(): any {
    return this.payload['activity'] ?? null;
  }
}
