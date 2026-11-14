/**
 * ClinicalImpressionParser — typed accessors over the official SATUSEHAT ClinicalImpression payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/ClinicalImpression.json, copied unchanged to
 * src/parser/testdata/ClinicalImpression.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class ClinicalImpressionParser {
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

  getCode(): any {
    return this.payload['code'] ?? null;
  }

  getDescription(): any {
    return this.payload['description'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getEncounter(): any {
    return this.payload['encounter'] ?? null;
  }

  getEffectiveDateTime(): any {
    return this.payload['effectiveDateTime'] ?? null;
  }

  getDate(): any {
    return this.payload['date'] ?? null;
  }

  getAssessor(): any {
    return this.payload['assessor'] ?? null;
  }

  getProblem(): any {
    return this.payload['problem'] ?? null;
  }

  getInvestigation(): any {
    return this.payload['investigation'] ?? null;
  }

  getSummary(): any {
    return this.payload['summary'] ?? null;
  }

  getFinding(): any {
    return this.payload['finding'] ?? null;
  }

  getPrognosisCodeableConcept(): any {
    return this.payload['prognosisCodeableConcept'] ?? null;
  }
}
