/**
 * VisionPrescriptionParser — typed accessors over the official SATUSEHAT VisionPrescription payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/VisionPrescription.json, copied unchanged to
 * src/parser/testdata/VisionPrescription.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class VisionPrescriptionParser {
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

  getCreated(): any {
    return this.payload['created'] ?? null;
  }

  getPatient(): any {
    return this.payload['patient'] ?? null;
  }

  getEncounter(): any {
    return this.payload['encounter'] ?? null;
  }

  getDateWritten(): any {
    return this.payload['dateWritten'] ?? null;
  }

  getPrescriber(): any {
    return this.payload['prescriber'] ?? null;
  }

  getLensSpecification(): any {
    return this.payload['lensSpecification'] ?? null;
  }
}
