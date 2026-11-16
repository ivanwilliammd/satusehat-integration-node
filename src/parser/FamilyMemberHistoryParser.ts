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

  getIdentifier(): any {
    return this.payload?.['identifier'] ?? null;
  }

  getReasonCode(): any {
    return this.payload?.['reasonCode'] ?? null;
  }

  getReasonReference(): any {
    return this.payload?.['reasonReference'] ?? null;
  }

  getNote(): any {
    return this.payload?.['note'] ?? null;
  }

  getId(): any {
    return this.payload?.['id'] ?? null;
  }

  getInstantiatesCanonical(): any {
    return this.payload?.['instantiatesCanonical'] ?? null;
  }

  getDataAbsentReason(): any {
    return this.payload?.['dataAbsentReason'] ?? null;
  }

  getName(): any {
    return this.payload?.['name'] ?? null;
  }

  getSex(): any {
    return this.payload?.['sex'] ?? null;
  }

  getBornPeriod(): any {
    return this.payload?.['bornPeriod'] ?? null;
  }

  getBornDate(): any {
    return this.payload?.['bornDate'] ?? null;
  }

  getBornString(): any {
    return this.payload?.['bornString'] ?? null;
  }

  getAgeAge(): any {
    return this.payload?.['ageAge'] ?? null;
  }

  getAgeUnit(): any {
    return this.payload?.['ageUnit'] ?? null;
  }

  getAgeRange(): any {
    return this.payload?.['ageRange'] ?? null;
  }

  getAgeString(): any {
    return this.payload?.['ageString'] ?? null;
  }

  getDeceasedAge(): any {
    return this.payload?.['deceasedAge'] ?? null;
  }

  getDeceasedAgeUnit(): any {
    return this.payload?.['deceasedAgeUnit'] ?? null;
  }

  getDeceasedRange(): any {
    return this.payload?.['deceasedRange'] ?? null;
  }

  getDeceasedDate(): any {
    return this.payload?.['deceasedDate'] ?? null;
  }

  getDeceasedString(): any {
    return this.payload?.['deceasedString'] ?? null;
  }

  getDeceasedCodeableConcept(): any {
    return this.payload?.['deceasedCodeableConcept'] ?? null;
  }
}
