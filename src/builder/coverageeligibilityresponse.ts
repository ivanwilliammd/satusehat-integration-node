/** CoverageEligibilityResponse FHIR R4 Resource Builder */
import { Reference } from '../datatype/datatypes';

export class CoverageEligibilityResponseBuilder {
  private data: Record<string, any> = { resourceType: 'CoverageEligibilityResponse' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  addIdentifier(system: string, value: string): this {
    if (!this.data['identifier']) this.data['identifier'] = [];
    (this.data['identifier'] as any[]).push({ system, value });
    return this;
  }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setPurpose(purpose: string[]): this { this.data['purpose'] = purpose; return this; }
  setPatient(ref: Reference): this { this.data['patient'] = (ref as any).toArray(); return this; }
  setServicedDate(dt: string): this { this.data['servicedDate'] = dt; return this; }
  setCreated(dt: string): this { this.data['created'] = dt; return this; }
  setRequest(reference: string): this { this.data['request'] = { reference }; return this; }
}
