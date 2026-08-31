/** PurificationDecision NON-FHIR JSON Resource Builder */
export class PurificationDecisionBuilder {
  private data: Record<string, any> = { resourceType: 'PurificationDecision' };

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

  setStatus(code: string, display?: string, system?: string): this {
    const coding: any = { code, display: display ?? code };
    if (system) coding.system = system;
    this.set('status', { coding: [coding] });
    return this;
  }

  setInsurer(ref: string, display?: string): this {
    const prefixed = !/^(urn:|https?:\/\/)/.test(ref) && !ref.includes('/') ? `Organization/${ref}` : ref;
    this.set('insurer', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  setProvider(ref: string, display?: string): this {
    const prefixed = !/^(urn:|https?:\/\/)/.test(ref) && !ref.includes('/') ? `Organization/${ref}` : ref;
    this.set('provider', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  setClaimResponse(ref: string, display?: string): this {
    const prefixed = !/^(urn:|https?:\/\/)/.test(ref) && !ref.includes('/') ? `ClaimResponse/${ref}` : ref;
    this.set('claimResponse', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  setCreated(created: string): this { this.set('created', created); return this; }
}
