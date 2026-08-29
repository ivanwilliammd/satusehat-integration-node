/** PaymentReconciliation FHIR R4 Resource Builder */
import { Reference } from '../datatype/datatypes';

export class PaymentReconciliationBuilder {
  private data: Record<string, any> = { resourceType: 'PaymentReconciliation' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setStatus(status: string): this { this.data['status'] = status; return this; }
  setCreated(dt: string): this { this.data['created'] = dt; return this; }
  setPeriodStart(dt: string): this { this.data['period'] = { start: dt }; return this; }
  setPeriodEnd(dt: string): this {
    if (this.data['period']) {
      (this.data['period'] as any)['end'] = dt;
    } else {
      this.data['periodEnd'] = dt;
    }
    return this;
  }
  setRequestor(ref: Reference): this { this.data['requestor'] = (ref as any).toArray(); return this; }
  setOutcome(outcome: string): this { this.data['outcome'] = outcome; return this; }
}
