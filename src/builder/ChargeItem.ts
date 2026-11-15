/**
 * ChargeItem FHIR R4 Resource Builder
 * Setara PayloadBuilderChargeItem.php. Nama method camelCase, semantik sama.
 */
export class ChargeItemBuilder {
  private data: Record<string, any> = { resourceType: 'ChargeItem' };

  private set(key: string, value: any): void { this.data[key] = value; }
  private push(key: string, value: any): void {
    if (!this.data[key]) this.data[key] = [];
    this.data[key].push(value);
  }

  setId(id: string): this { this.set('id', id); return this; }

  addIdentifier(system: string, value: string): this { this.push('identifier', { system, value }); return this; }

  setStatus(status: string): this { this.set('status', status); return this; }

  setPartOf(reference: string): this { this.push('partOf', { reference }); return this; }

  setCode(system: string, code: string, display: string = ''): this {
    this.set('code', { coding: [{ system, code, display }] });
    return this;
  }

  setSubject(reference: string): this { this.set('subject', { reference }); return this; }

  setFocus(reference: string): this { this.set('focus', { reference }); return this; }

  /** FHIR R4 menamai elemen ini `context`, bukan `encounter`. PHP melakukan hal yang sama. */
  setEncounter(reference: string): this { this.set('context', { reference }); return this; }

  setPerformedDate(dateTime: string): this { this.set('performedDateTime', dateTime); return this; }

  setPerformerActor(reference: string, functionSystem: string | null = null, functionCode: string | null = null): this {
    const performer: Record<string, any> = { actor: { reference } };
    if (functionSystem && functionCode) {
      performer['function'] = { coding: [{ system: functionSystem, code: functionCode }] };
    }
    this.push('performer', performer);
    return this;
  }

  setPerformerCostCenter(reference: string): this {
    this.push('performer', { actor: { reference } });
    return this;
  }

  setOrganization(reference: string): this { this.set('performingOrganization', { reference }); return this; }

  setRequestingOrganization(reference: string): this { this.set('requestingOrganization', { reference }); return this; }

  /** Quirk PHP: `quantity` di FHIR bertipe Quantity, di sini ditulis sebagai angka. Ditiru, tidak diperbaiki. */
  setQuantity(quantity: number): this { this.set('quantity', quantity); return this; }

  setBodysite(system: string, code: string, display: string = ''): this {
    this.push('bodysite', { coding: [{ system, code, display }] });
    return this;
  }

  setProductCode(system: string, code: string, display: string = ''): this {
    this.set('productCodeableConcept', { coding: [{ system, code, display }] });
    return this;
  }

  setPriceOverride(value: number, code: string = 'IDR'): this {
    this.set('priceOverride', { value, currency: code });
    return this;
  }

  setOverrideReason(overrideReason: string): this { this.set('overrideReason', overrideReason); return this; }

  setEnterer(reference: string): this { this.set('enterer', { reference }); return this; }

  setEnteredDate(dateTime: string): this { this.set('enteredDate', dateTime); return this; }

  setReason(system: string, code: string, display: string = ''): this {
    this.push('reason', { coding: [{ system, code, display }] });
    return this;
  }

  setService(reference: string): this { this.push('service', { reference }); return this; }

  setAccount(reference: string): this { this.push('account', { reference }); return this; }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}

/** Nama kanon `ChargeItem`: seragam dengan modul lain. `ChargeItemBuilder` dipertahankan untuk pemanggil lama. */
export { ChargeItemBuilder as ChargeItem };
