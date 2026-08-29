/** PaymentReconciliation FHIR R4 Resource Builder */
import { Reference } from '../datatype/datatypes';

export class PaymentReconciliation {
  private data: Record<string, any> = { resourceType: 'PaymentReconciliation' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  addIdentifier(system: string, value: string): this {
    this.data['identifier'] = this.data['identifier'] || [];
    this.data['identifier'].push({ system, value });
    return this;
  }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setType(system: string, code: string, display = ''): this {
    this.data['type'] = { coding: [{ system, code, display }] };
    return this;
  }
  setCreated(dateTime: string): this { this.data['created'] = dateTime; return this; }
  setPeriod(start: string, end = ''): this {
    this.data['period'] = { start };
    if (end) this.data['period']['end'] = end;
    return this;
  }
  setRequest(reference: string): this { this.data['request'] = { reference }; return this; }
  setRequestProvider(reference: string): this { this.data['requestProvider'] = { reference }; return this; }
  setOutcome(outcomeSystem: string, outcomeCode: string, outcomeDisplay = ''): this {
    this.data['outcome'] = { coding: [{ system: outcomeSystem, code: outcomeCode, display: outcomeDisplay }] };
    return this;
  }
  setDisposition(disposition: string): this { this.data['disposition'] = disposition; return this; }
  setInsurer(reference: string): this { this.data['insurer'] = { reference }; return this; }
  setRequestMatchDate(date: string): this { this.data['requestMatchDate'] = date; return this; }
  setOutcomeCode(system: string, code: string, display = ''): this {
    this.data['outcomeCode'] = this.data['outcomeCode'] || [];
    this.data['outcomeCode'].push({ coding: [{ system, code, display }] });
    return this;
  }
  addRequestor(reference: string, display = ''): this {
    const requestor: Record<string, any> = { reference };
    if (display) requestor['display'] = display;
    this.data['requestor'] = this.data['requestor'] || [];
    this.data['requestor'].push(requestor);
    return this;
  }
  addProcessNote(text: string, type?: string): this {
    const note: Record<string, any> = { text };
    if (type) note['type'] = type;
    this.data['processNote'] = this.data['processNote'] || [];
    this.data['processNote'].push(note);
    return this;
  }
  setPaymentDate(date: string): this { this.data['paymentDate'] = date; return this; }
  setPaymentAmount(value: number, code = 'IDR'): this {
    this.data['paymentAmount'] = { value, currency: code };
    return this;
  }
  setPaymentIdentifier(system: string, value: string): this {
    this.data['paymentIdentifier'] = { system, value };
    return this;
  }
  addDetail(typeSystem: string, typeCode: string, amount?: number, requestReference?: string): this {
    const detail: Record<string, any> = { type: { coding: [{ system: typeSystem, code: typeCode }] } };
    if (amount !== undefined) detail['amount'] = { value: amount };
    if (requestReference) detail['request'] = { reference: requestReference };
    this.data['detail'] = this.data['detail'] || [];
    this.data['detail'].push(detail);
    return this;
  }
  setTotalAmount(value: number, code = 'IDR'): this {
    this.data['totalAmount'] = { value, currency: code };
    return this;
  }
}
