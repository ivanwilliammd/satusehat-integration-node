/** Substance FHIR R4 Resource Builder */
import { CodeableConcept } from '../datatype/datatypes';

export class SubstanceBuilder {
  private data: Record<string, any> = { resourceType: 'Substance' };

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
  addCategory(cc: CodeableConcept): this {
    if (!this.data['category']) this.data['category'] = [];
    (this.data['category'] as any[]).push((cc as any).toArray());
    return this;
  }
  setCode(cc: CodeableConcept): this { this.data['code'] = (cc as any).toArray(); return this; }
  setDescription(desc: string): this { this.data['description'] = desc; return this; }
}
