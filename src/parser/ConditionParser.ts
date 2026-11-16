/**
 * ConditionParser — typed accessors over the official SATUSEHAT Condition payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/Condition.json, copied unchanged to
 * src/parser/testdata/Condition.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class ConditionParser {
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

  getStage(): any {
    return this.payload['stage'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getEncounter(): any {
    return this.payload['encounter'] ?? null;
  }

  getRecordedDate(): any {
    return this.payload['recordedDate'] ?? null;
  }

  getId(): any {
    return this.payload?.['id'] ?? null;
  }

  getIdentifier(): any {
    return this.payload?.['identifier'] ?? null;
  }

  getSeverity(): any {
    return this.payload?.['severity'] ?? null;
  }

  getOnsetDateTime(): any {
    return this.payload?.['onsetDateTime'] ?? null;
  }

  getOnsetAge(): any {
    return this.payload?.['onsetAge'] ?? null;
  }

  getOnsetPeriod(): any {
    return this.payload?.['onsetPeriod'] ?? null;
  }

  getOnsetRange(): any {
    return this.payload?.['onsetRange'] ?? null;
  }

  getOnsetString(): any {
    return this.payload?.['onsetString'] ?? null;
  }

  getAbatementDateTime(): any {
    return this.payload?.['abatementDateTime'] ?? null;
  }

  getAbatementAge(): any {
    return this.payload?.['abatementAge'] ?? null;
  }

  getAbatementPeriod(): any {
    return this.payload?.['abatementPeriod'] ?? null;
  }

  getAbatementRange(): any {
    return this.payload?.['abatementRange'] ?? null;
  }

  getAbatementString(): any {
    return this.payload?.['abatementString'] ?? null;
  }

  getRecorder(): any {
    return this.payload?.['recorder'] ?? null;
  }

  getAsserter(): any {
    return this.payload?.['asserter'] ?? null;
  }

  getEvidence(): any {
    return this.payload?.['evidence'] ?? null;
  }

  getNote(): any {
    return this.payload?.['note'] ?? null;
  }

  getExtension(): any {
    return this.payload?.['extension'] ?? null;
  }
}
