/**
 * ClaimResponse FHIR R4 Resource Builder
 * Setara PayloadBuilderClaimResponse.php. Nama method camelCase, semantik sama.
 *
 * Satu quirk PHP ditiru dan ditandai: `addItemAdjudication` menumpuk ke `item`,
 * bukan ke `item[<i>]/adjudication`. Akibatnya adjudikasi muncul sebagai entri
 * item tersendiri dan payload tidak sah menurut R4 — tetapi port harus sama
 * dengan kanon, jadi ditiru sampai kanon diperbaiki.
 */
export class ClaimResponseBuilder {
  private data: Record<string, any> = { resourceType: 'ClaimResponse' };

  private set(key: string, value: any): void { this.data[key] = value; }
  private push(key: string, value: any): void {
    if (!this.data[key]) this.data[key] = [];
    this.data[key].push(value);
  }

  private static isIndex(seg: string): boolean { return /^\d+$/.test(seg); }

  private titik(path: string): { induk: any; kunci: string | number } {
    const segs = path.split('/');
    let cur: any = this.data;
    segs.slice(0, -1).forEach((seg, i) => {
      const kunci: string | number = ClaimResponseBuilder.isIndex(seg) ? Number(seg) : seg;
      if (cur[kunci] === undefined || cur[kunci] === null) {
        cur[kunci] = ClaimResponseBuilder.isIndex(segs[i + 1]) ? [] : {};
      }
      cur = cur[kunci];
    });
    const terakhir = segs[segs.length - 1];
    return { induk: cur, kunci: ClaimResponseBuilder.isIndex(terakhir) ? Number(terakhir) : terakhir };
  }

  private setPath(path: string, value: any): void {
    const { induk, kunci } = this.titik(path);
    induk[kunci] = value;
  }

  private pushPath(path: string, value: any): void {
    const { induk, kunci } = this.titik(path);
    if (!Array.isArray(induk[kunci])) induk[kunci] = [];
    induk[kunci].push(value);
  }

  private static kode(system: string, code: string, display = ''): Record<string, any> {
    return { coding: [{ system, code, display }] };
  }

  setId(id: string): this { this.set('id', id); return this; }

  addIdentifier(system: string, value: string): this { this.push('identifier', { system, value }); return this; }

  setStatus(status: string): this { this.set('status', status); return this; }

  setType(system: string, code: string, display: string = ''): this {
    this.set('type', ClaimResponseBuilder.kode(system, code, display));
    return this;
  }

  setSubType(system: string, code: string, display: string = ''): this {
    this.set('subType', ClaimResponseBuilder.kode(system, code, display));
    return this;
  }

  setUse(use: string): this { this.set('use', use); return this; }

  setPatient(reference: string): this { this.set('patient', { reference }); return this; }

  setCreated(dateTime: string): this { this.set('created', dateTime); return this; }

  setInsurer(reference: string): this { this.set('insurer', { reference }); return this; }

  setRequestor(reference: string): this { this.set('requestor', { reference }); return this; }

  setRequest(reference: string): this { this.set('request', { reference }); return this; }

  setOutcome(outcome: string): this { this.set('outcome', outcome); return this; }

  setDisposition(disposition: string): this { this.set('disposition', disposition); return this; }

  setPreAuthRef(preAuthRef: string): this { this.set('preAuthRef', preAuthRef); return this; }

  setPreAuthPeriod(start: string, end: string = ''): this {
    this.setPath('preAuthPeriod/start', start);
    if (end) this.setPath('preAuthPeriod/end', end);
    return this;
  }

  setPayeeType(system: string, code: string, display: string = ''): this {
    this.set('payeeType', ClaimResponseBuilder.kode(system, code, display));
    return this;
  }

  addItem(itemSequence: number, detailSequence: number | null = null, subDetailSequence: number | null = null): this {
    const item: Record<string, any> = { itemSequence };
    if (detailSequence !== null) item['detailSequence'] = detailSequence;
    if (subDetailSequence !== null) item['subDetailSequence'] = subDetailSequence;
    this.push('item', item);
    return this;
  }

  /** Quirk PHP: menumpuk ke `item`, bukan ke `item[<i>]/adjudication`. Ditiru apa adanya. */
  addItemAdjudication(
    itemSequence: number,
    categorySystem: string,
    categoryCode: string,
    value: number | null = null,
    reasonSystem: string | null = null,
    reasonCode: string | null = null
  ): this {
    const adjudication: Record<string, any> = {
      itemSequence,
      category: { coding: [{ system: categorySystem, code: categoryCode }] },
    };
    if (value !== null) adjudication['value'] = value;
    if (reasonSystem && reasonCode) {
      adjudication['reason'] = { coding: [{ system: reasonSystem, code: reasonCode }] };
    }
    this.push('item', adjudication);
    return this;
  }

  addAddItem(
    itemSequence: number,
    productOrServiceSystem: string,
    productOrServiceCode: string,
    productOrServiceDisplay: string | null = null
  ): this {
    this.push('addItem', {
      itemSequence: [itemSequence],
      productOrService: ClaimResponseBuilder.kode(
        productOrServiceSystem,
        productOrServiceCode,
        productOrServiceDisplay ?? ''
      ),
    });
    return this;
  }

  /** Menulis ke addItem TERAKHIR, seperti PHP (`count(...) - 1`). */
  addAddItemAdjudication(
    sequenceLinkId: number,
    categorySystem: string,
    categoryCode: string,
    value: number | null = null
  ): this {
    const itemIdx = (this.data['addItem'] ?? []).length - 1;
    const adjudication: Record<string, any> = {
      itemSequence: sequenceLinkId,
      category: { coding: [{ system: categorySystem, code: categoryCode }] },
    };
    if (value !== null) adjudication['value'] = value;
    this.pushPath(`addItem/${itemIdx}/adjudication`, adjudication);
    return this;
  }

  addError(itemSequence: number, codeSystem: string, code: string, display: string = ''): this {
    this.push('error', {
      itemSequence,
      code: { coding: [{ system: codeSystem, code, display }] },
    });
    return this;
  }

  addCoverage(
    sequence: number,
    reference: string,
    focal: boolean | null = null,
    prioritySystem: string | null = null,
    priorityCode: string | null = null
  ): this {
    const coverage: Record<string, any> = { sequence, reference };
    if (focal !== null) coverage['focal'] = Boolean(focal);
    if (prioritySystem && priorityCode) {
      coverage['priority'] = { coding: [{ system: prioritySystem, code: priorityCode }] };
    }
    this.push('coverage', coverage);
    return this;
  }

  /** Dinamai setTotal tetapi MENUMPUK: FHIR ClaimResponse.total 0..*. */
  setTotal(value: number, categorySystem: string, categoryCode: string): this {
    this.push('total', {
      category: { coding: [{ system: categorySystem, code: categoryCode }] },
      value,
    });
    return this;
  }

  setPayment(
    value: number,
    typeSystem: string,
    typeCode: string,
    date: string,
    reference: string | null = null
  ): this {
    this.setPath('payment/type', { coding: [{ system: typeSystem, code: typeCode }] });
    this.setPath('payment/date', date);
    this.setPath('payment/amount/value', value);
    if (reference) this.setPath('payment/reference', reference);
    return this;
  }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}

/** Nama kanon `ClaimResponse`: seragam dengan modul lain. `ClaimResponseBuilder` dipertahankan untuk pemanggil lama. */
export { ClaimResponseBuilder as ClaimResponse };
