/**
 * QuestionnaireResponseParser — typed accessors over the official SATUSEHAT QuestionnaireResponse payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/QuestionnaireResponse.json, copied unchanged to
 * src/parser/testdata/QuestionnaireResponse.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class QuestionnaireResponseParser {
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

  getQuestionnaire(): any {
    return this.payload['questionnaire'] ?? null;
  }

  getStatus(): any {
    return this.payload['status'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getEncounter(): any {
    return this.payload['encounter'] ?? null;
  }

  getAuthored(): any {
    return this.payload['authored'] ?? null;
  }

  getAuthor(): any {
    return this.payload['author'] ?? null;
  }

  getSource(): any {
    return this.payload['source'] ?? null;
  }

  getItem(): any {
    return this.payload['item'] ?? null;
  }
}
