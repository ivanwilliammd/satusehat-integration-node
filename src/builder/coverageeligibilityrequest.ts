/** CoverageEligibilityRequest FHIR R4 Resource Builder */
import { CodeableConcept, Reference } from '../datatype/datatypes';

export class CoverageEligibilityRequestBuilder {
  private data: Record<string, any> = { resourceType: 'CoverageEligibilityRequest' };

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
  setPriority(cc: CodeableConcept): this { this.data['priority'] = (cc as any).toArray(); return this; }
  setPurpose(purpose: string[]): this { this.data['purpose'] = purpose; return this; }
  setPatient(ref: Reference): this { this.data['patient'] = (ref as any).toArray(); return this; }
  setServicedDate(dt: string): this { this.data['servicedDate'] = dt; return this; }
  setCreated(dt: string): this { this.data['created'] = dt; return this; }
  setRequestor(ref: Reference): this { this.data['requestor'] = (ref as any).toArray(); return this; }
  setInsurer(ref: Reference): this { this.data['insurer'] = (ref as any).toArray(); return this; }
}
