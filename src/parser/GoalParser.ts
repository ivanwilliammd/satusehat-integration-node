/**
 * GoalParser — typed accessors over the official SATUSEHAT Goal payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/Goal.json, copied unchanged to
 * src/parser/testdata/Goal.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class GoalParser {
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

  getId(): any {
    return this.payload['id'] ?? null;
  }

  getLifecycleStatus(): any {
    return this.payload['lifecycleStatus'] ?? null;
  }

  getAchievementStatus(): any {
    return this.payload['achievementStatus'] ?? null;
  }

  getCategory(): any {
    return this.payload['category'] ?? null;
  }

  getDescription(): any {
    return this.payload['description'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getTarget(): any {
    return this.payload['target'] ?? null;
  }

  getStatusDate(): any {
    return this.payload['statusDate'] ?? null;
  }

  getExpressedBy(): any {
    return this.payload['expressedBy'] ?? null;
  }

  getAddresses(): any {
    return this.payload['addresses'] ?? null;
  }

  getOutcomeCode(): any {
    return this.payload['outcomeCode'] ?? null;
  }

  getIdentifier(): any {
    return this.payload?.['identifier'] ?? null;
  }

  getStartDateTime(): any {
    return this.payload?.['startDateTime'] ?? null;
  }

  getStartPeriod(): any {
    return this.payload?.['startPeriod'] ?? null;
  }

  getStatusReason(): any {
    return this.payload?.['statusReason'] ?? null;
  }

  getNote(): any {
    return this.payload?.['note'] ?? null;
  }

  getOutcomeReference(): any {
    return this.payload?.['outcomeReference'] ?? null;
  }

  getStartAge(): any {
    return this.payload?.['startAge'] ?? null;
  }
}
