/** BillingStatus NON-FHIR JSON Resource Builder */
export class BillingStatusBuilder {
  private data: Record<string, any> = { resourceType: 'BillingStatus' };

  private set(key: string, value: any): void { this.data[key] = value; }
  private push(key: string, value: any): void {
    if (!this.data[key]) this.data[key] = [];
    this.data[key].push(value);
  }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.set('id', id); return this; }

  addIdentifier(system: string, value: string): this {
    this.push('identifier', { system, value });
    return this;
  }

  setStatus(status: string): this { this.set('status', status); return this; }

  setInsurer(ref: string, display?: string): this {
    const prefixed = !/^(urn:|https?:\/\/)/.test(ref) && !ref.includes('/') ? `Organization/${ref}` : ref;
    this.set('insurer', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  setRecipient(ref: string, display?: string): this {
    const prefixed = !/^(urn:|https?:\/\/)/.test(ref) && !ref.includes('/') ? `Organization/${ref}` : ref;
    this.set('recipient', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  setSubject(ref: string, display?: string): this {
    const prefixed = !/^(urn:|https?:\/\/)/.test(ref) && !ref.includes('/') ? `Patient/${ref}` : ref;
    this.set('subject', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  setRequest(ref: string, display?: string): this {
    const prefixed = !/^(urn:|https?:\/\/)/.test(ref) && !ref.includes('/') ? `CoverageEligibilityRequest/${ref}` : ref;
    this.set('request', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }
}
