/** PaymentNotice FHIR R4 Resource Builder */
import { CodeableConcept, Money, Reference } from '../datatype/datatypes';
import { konsep, rujuk } from './datatypeInput';

export class PaymentNotice {
  private data: Record<string, any> = { resourceType: 'PaymentNotice' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setStatus(status: string): this { this.data['status'] = status; return this; }
  setRequest(reference: string): this { this.data['request'] = { reference }; return this; }
  setResponse(reference: string): this { this.data['response'] = { reference }; return this; }
  setCreated(dt: string): this { this.data['created'] = dt; return this; }
  setProvider(ref: any): this { this.data['provider'] = rujuk(ref); return this; }
  setAmount(money: any): this { this.data['amount'] = typeof money?.toArray === 'function' ? money.toArray() : money; return this; }
}
