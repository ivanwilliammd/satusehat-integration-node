/**
 * PaymentNotice FHIR R4 Resource Builder.
 *
 * Setara PayloadBuilderPaymentNotice.php (14 method). Versi sebelumnya enam method, dan
 * `setAmount` menulis elemen `amount` yang tidak ada di PaymentNotice R4.
 *
 * Tiga quirk kanon ditiru dan ditandai:
 * - `setPayment(value, code)` menulis `payment/amount/{value,currency}` — di R4 `payment`
 *   bertipe Reference, uang ada di `amount`;
 * - `setInsurer` menulis `insurer`, yang juga tidak ada di PaymentNotice R4;
 * - `setPaymentReconciliation` menulis `paymentReconciliation`, padahal elemen R4-nya
 *   bernama `payment`.
 */
import { rujuk } from './datatypeInput';

export class PaymentNotice {
  private data: Record<string, any> = { resourceType: 'PaymentNotice' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  private push(key: string, value: any): void {
    if (!Array.isArray(this.data[key])) this.data[key] = [];
    this.data[key].push(value);
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  addIdentifier(system: string, value: string): this { this.push('identifier', { system, value }); return this; }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setRequest(reference: string): this { this.data['request'] = { reference }; return this; }
  setResponse(reference: string): this { this.data['response'] = { reference }; return this; }
  setStatusDate(date: string): this { this.data['statusDate'] = date; return this; }
  setCreated(dateTime: string): this { this.data['created'] = dateTime; return this; }
  setProvider(ref: any): this { this.data['provider'] = rujuk(ref); return this; }
  setPayee(reference: string): this { this.data['payee'] = { reference }; return this; }

  /** Quirk kanon: menulis payment.amount, meski R4 memakai payment sebagai Reference. */
  setPayment(value: number, code = 'IDR'): this {
    this.data['payment'] = { amount: { value, currency: code } };
    return this;
  }

  setPaymentDate(date: string): this { this.data['paymentDate'] = date; return this; }

  setPaymentStatus(system: string, code: string, display = ''): this {
    this.data['paymentStatus'] = { coding: [{ system, code, display }] };
    return this;
  }

  setInsurer(reference: string): this { this.data['insurer'] = { reference }; return this; }
  setPaymentReconciliation(reference: string): this { this.data['paymentReconciliation'] = { reference }; return this; }

  /** Satu-satunya setter sah R4 di luar kanon: PaymentNotice.amount bertipe Money. */
  setAmount(money: any): this {
    this.data['amount'] = typeof money?.toArray === 'function' ? money.toArray() : money;
    return this;
  }
}
