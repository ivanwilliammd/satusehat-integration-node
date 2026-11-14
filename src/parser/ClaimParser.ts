/**
 * ClaimParser — typed accessors over the official SATUSEHAT Claim payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/Claim.json, copied unchanged to
 * src/parser/testdata/Claim.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class ClaimParser {
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

  getType(): any {
    return this.payload['type'] ?? null;
  }

  getUse(): any {
    return this.payload['use'] ?? null;
  }

  getPatient(): any {
    return this.payload['patient'] ?? null;
  }

  getBillablePeriod(): any {
    return this.payload['billablePeriod'] ?? null;
  }

  getCreated(): any {
    return this.payload['created'] ?? null;
  }

  getEnterer(): any {
    return this.payload['enterer'] ?? null;
  }

  getInsurer(): any {
    return this.payload['insurer'] ?? null;
  }

  getProvider(): any {
    return this.payload['provider'] ?? null;
  }

  getPriority(): any {
    return this.payload['priority'] ?? null;
  }

  getPayee(): any {
    return this.payload['payee'] ?? null;
  }

  getFacility(): any {
    return this.payload['facility'] ?? null;
  }

  getSupportingInfo(): any {
    return this.payload['supportingInfo'] ?? null;
  }

  getDiagnosis(): any {
    return this.payload['diagnosis'] ?? null;
  }

  getProcedure(): any {
    return this.payload['procedure'] ?? null;
  }

  getInsurance(): any {
    return this.payload['insurance'] ?? null;
  }

  getTotal(): any {
    return this.payload['total'] ?? null;
  }

  getExtension(): any {
    return this.payload['extension'] ?? null;
  }
}
