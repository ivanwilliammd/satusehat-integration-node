/**
 * DeviceDispenseParser — typed accessors over the official SATUSEHAT DeviceDispense payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/DeviceDispense.json, copied unchanged to
 * src/parser/testdata/DeviceDispense.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class DeviceDispenseParser {
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

  getBasedOn(): any {
    return this.payload['basedOn'] ?? null;
  }

  getDevice(): any {
    return this.payload['device'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getReceiver(): any {
    return this.payload['receiver'] ?? null;
  }

  getPerformer(): any {
    return this.payload['performer'] ?? null;
  }

  getWhenPrepared(): any {
    return this.payload['whenPrepared'] ?? null;
  }

  getWhenHandedOver(): any {
    return this.payload['whenHandedOver'] ?? null;
  }

  getDestination(): any {
    return this.payload['destination'] ?? null;
  }

  getNote(): any {
    return this.payload['note'] ?? null;
  }
}
