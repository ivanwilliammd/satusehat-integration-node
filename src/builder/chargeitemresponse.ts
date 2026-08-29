/** ChargeItemResponse FHIR R4 Resource Builder */
import { CodeableConcept, Reference } from '../datatype/datatypes';

export class ChargeItemResponseBuilder {
  private data: Record<string, any> = { resourceType: 'ChargeItemResponse' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  addIdentifier(system: string, value: string): this {
    if (!this.data['identifier']) this.data['identifier'] = [];
    (this.data['identifier'] as any[]).push({ system, value });
    return this;
  }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setChargeItem(reference: string): this { this.data['chargeItem'] = { reference }; return this; }
  setRequest(reference: string): this { this.data['request'] = { reference }; return this; }
  setOutcome(cc: CodeableConcept): this { this.data['outcome'] = (cc as any).toArray(); return this; }
  setDescription(desc: string): this { this.data['description'] = desc; return this; }
  setCreated(dt: string): this { this.data['created'] = dt; return this; }
  setRequestor(ref: Reference): this { this.data['requestor'] = (ref as any).toArray(); return this; }
}
