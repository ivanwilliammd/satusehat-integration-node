/**
 * FamilyMemberHistoryParser — typed accessors over the official SATUSEHAT FamilyMemberHistory payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/FamilyMemberHistory.json, copied unchanged to
 * src/parser/testdata/FamilyMemberHistory.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class FamilyMemberHistoryParser {
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

  getRelationship(): any {
    return this.payload['relationship'] ?? null;
  }

  getDeceasedBoolean(): any {
    return this.payload['deceasedBoolean'] ?? null;
  }

  getPatient(): any {
    return this.payload['patient'] ?? null;
  }

  getDate(): any {
    return this.payload['date'] ?? null;
  }

  getCondition(): any {
    return this.payload['condition'] ?? null;
  }
}
