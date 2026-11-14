/**
 * DeviceUseStatementParser — typed accessors over the official SATUSEHAT DeviceUseStatement payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/DeviceUseStatement.json, copied unchanged to
 * src/parser/testdata/DeviceUseStatement.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class DeviceUseStatementParser {
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

  getDevice(): any {
    return this.payload['device'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getTimingPeriod(): any {
    return this.payload['timingPeriod'] ?? null;
  }

  getRecordedOn(): any {
    return this.payload['recordedOn'] ?? null;
  }

  getSource(): any {
    return this.payload['source'] ?? null;
  }

  getReasonCode(): any {
    return this.payload['reasonCode'] ?? null;
  }

  getNote(): any {
    return this.payload['note'] ?? null;
  }
}
