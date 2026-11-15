/**
 * Invoice FHIR R4 Resource Builder
 * Setara PayloadBuilderInvoice.php. Nama method camelCase, semantik sama.
 *
 * Beberapa setter menulis lewat jalur bertitik miring (`totalNet/value`,
 * `lineItem/0/priceComponent`) karena PHP melakukannya begitu; `setPath` meniru
 * perilaku `Builder::set` — segmen numerik menunjuk elemen daftar yang sudah ada.
 */
export class InvoiceBuilder {
  private data: Record<string, any> = { resourceType: 'Invoice' };

  private set(key: string, value: any): void { this.data[key] = value; }
  private push(key: string, value: any): void {
    if (!this.data[key]) this.data[key] = [];
    this.data[key].push(value);
  }

  private static isIndex(seg: string): boolean { return /^\d+$/.test(seg); }

  private setPath(path: string, value: any): void {
    const segs = path.split('/');
    let cur: any = this.data;
    segs.forEach((seg, i) => {
      const akhir = i === segs.length - 1;
      const kunci: string | number = InvoiceBuilder.isIndex(seg) ? Number(seg) : seg;
      if (akhir) {
        cur[kunci] = value;
        return;
      }
      if (cur[kunci] === undefined || cur[kunci] === null) {
        cur[kunci] = InvoiceBuilder.isIndex(segs[i + 1]) ? [] : {};
      }
      cur = cur[kunci];
    });
  }

  private pushPath(path: string, value: any): void {
    const segs = path.split('/');
    let cur: any = this.data;
    segs.forEach((seg, i) => {
      const akhir = i === segs.length - 1;
      const kunci: string | number = InvoiceBuilder.isIndex(seg) ? Number(seg) : seg;
      if (akhir) {
        if (!Array.isArray(cur[kunci])) cur[kunci] = [];
        cur[kunci].push(value);
        return;
      }
      if (cur[kunci] === undefined || cur[kunci] === null) {
        cur[kunci] = InvoiceBuilder.isIndex(segs[i + 1]) ? [] : {};
      }
      cur = cur[kunci];
    });
  }

  setId(id: string): this { this.set('id', id); return this; }

  addIdentifier(system: string, value: string): this { this.push('identifier', { system, value }); return this; }

  setStatus(status: string): this { this.set('status', status); return this; }

  setCancelledReason(reason: string): this { this.set('cancelledReason', reason); return this; }

  setType(system: string, code: string, display: string = ''): this {
    this.set('type', { coding: [{ system, code, display }] });
    return this;
  }

  setDate(dateTime: string): this { this.set('date', dateTime); return this; }

  setParticipant(roleSystem: string, roleCode: string, reference: string, display: string = ''): this {
    const participant: Record<string, any> = {
      role: { coding: [{ system: roleSystem, code: roleCode }] },
      actor: { reference },
    };
    if (display) participant['actor']['display'] = display;
    this.push('participant', participant);
    return this;
  }

  setIssuer(reference: string): this { this.set('issuer', { reference }); return this; }

  /** PHP menamai setter ini setCustomer tetapi menulis ke elemen `subject`. Ditiru. */
  setCustomer(reference: string): this { this.set('subject', { reference }); return this; }

  setAccount(reference: string): this { this.set('account', { reference }); return this; }

  addLineItem(
    sequence: number,
    serviceSystem: string,
    serviceCode: string,
    serviceDisplay: string,
    quantity: number | null = null,
    unitPrice: number | null = null,
    priceFactor: number | null = null
  ): this {
    const lineItem: Record<string, any> = {
      sequence,
      service: { coding: [{ system: serviceSystem, code: serviceCode, display: serviceDisplay }] },
    };
    if (quantity !== null) lineItem['quantity'] = { value: quantity };
    if (unitPrice !== null) {
      lineItem['priceComponent'] = lineItem['priceComponent'] || [];
      lineItem['priceComponent'].push({ type: 'base', amount: { value: unitPrice } });
    }
    if (priceFactor !== null) {
      lineItem['priceComponent'] = lineItem['priceComponent'] || [];
      lineItem['priceComponent'].push({ type: 'factor', factor: priceFactor });
    }
    this.push('lineItem', lineItem);
    return this;
  }

  addLineItemPriceComponent(itemIdx: number, type: string, amount: number, code: string | null = null): this {
    const component: Record<string, any> = { type, amount: { value: amount } };
    if (code) component['code'] = code;
    this.pushPath(`lineItem/${itemIdx}/priceComponent`, component);
    return this;
  }

  setTotalNet(value: number, code: string = 'IDR'): this {
    this.setPath('totalNet/value', value);
    this.setPath('totalNet/currency', code);
    return this;
  }

  setTotalGross(value: number, code: string = 'IDR'): this {
    this.setPath('totalGross/value', value);
    this.setPath('totalGross/currency', code);
    return this;
  }

  setTotalVAT(value: number, code: string = 'IDR'): this {
    this.setPath('totalVAT/value', value);
    this.setPath('totalVAT/currency', code);
    return this;
  }

  setPaymentTerms(text: string): this { this.set('paymentTerms', text); return this; }

  addNote(text: string): this { this.push('note', { text }); return this; }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}

/** Nama kanon `Invoice`: seragam dengan modul lain. `InvoiceBuilder` dipertahankan untuk pemanggil lama. */
export { InvoiceBuilder as Invoice };
