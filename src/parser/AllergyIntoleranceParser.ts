/**
 * AllergyIntoleranceParser — typed accessors over the official SATUSEHAT AllergyIntolerance payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/AllergyIntolerance.json, copied unchanged to
 * src/parser/testdata/AllergyIntolerance.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class AllergyIntoleranceParser {
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

  getClinicalStatus(): any {
    return this.payload['clinicalStatus'] ?? null;
  }

  getVerificationStatus(): any {
    return this.payload['verificationStatus'] ?? null;
  }

  getCategory(): any {
    return this.payload['category'] ?? null;
  }

  getCode(): any {
    return this.payload['code'] ?? null;
  }

  getPatient(): any {
    return this.payload['patient'] ?? null;
  }

  getEncounter(): any {
    return this.payload['encounter'] ?? null;
  }

  getRecordedDate(): any {
    return this.payload['recordedDate'] ?? null;
  }

  getRecorder(): any {
    return this.payload['recorder'] ?? null;
  }

  getType(): any {
    return this.payload?.['type'] ?? null;
  }

  getCriticality(): any {
    return this.payload?.['criticality'] ?? null;
  }

  getOnsetDateTime(): any {
    return this.payload?.['onsetDateTime'] ?? null;
  }

  getAsserter(): any {
    return this.payload?.['asserter'] ?? null;
  }

  getLastOccurrence(): any {
    return this.payload?.['lastOccurrence'] ?? null;
  }

  getNote(): any {
    return this.payload?.['note'] ?? null;
  }

  getReaction(): any {
    return this.payload?.['reaction'] ?? null;
  }
}
