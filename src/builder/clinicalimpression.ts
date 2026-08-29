/** ClinicalImpression FHIR R4 Resource Builder */
import { CodeableConcept, Identifier, Period, Reference } from '../datatype/datatypes';

export class ClinicalImpressionBuilder {
  private data: Record<string, any> = { resourceType: 'ClinicalImpression' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  addIdentifier(ident: Identifier): this {
    if (!this.data['identifier']) this.data['identifier'] = [];
    (this.data['identifier'] as any[]).push((ident as any).toArray());
    return this;
  }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setCode(cc: CodeableConcept): this { this.data['code'] = (cc as any).toArray(); return this; }
  setSubject(ref: Reference): this { this.data['subject'] = (ref as any).toArray(); return this; }
  setEncounter(ref: Reference): this { this.data['encounter'] = (ref as any).toArray(); return this; }
  setEffectiveDateTime(dt: string): this { this.data['effectiveDateTime'] = dt; return this; }
  setEffectivePeriod(period: Period): this { this.data['effectivePeriod'] = (period as any).toArray(); return this; }
  setDate(date: string): this { this.data['date'] = date; return this; }
  setAssessor(ref: Reference): this { this.data['assessor'] = (ref as any).toArray(); return this; }
}
