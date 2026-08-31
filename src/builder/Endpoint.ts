/** Endpoint FHIR R4 Resource Builder */
export class EndpointBuilder {
  private data: Record<string, any> = { resourceType: 'Endpoint' };

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

  setStatus(status: string): this {
    const valid = ['active', 'suspended', 'error', 'off', 'entered-in-error', 'test'];
    if (!valid.includes(status)) throw new Error(`Invalid status: ${status}`);
    this.set('status', status);
    return this;
  }

  setConnectionType(code: string, display: string, system = 'http://terminology.hl7.org/CodeSystem/endpoint-connection-type'): this {
    this.set('connectionType', { coding: [{ code, display, system }] });
    return this;
  }

  setName(name: string): this { this.set('name', name); return this; }

  setManagingOrganization(ref: string, display?: string): this {
    const prefixed = !/^(urn:|https?:\/\/)/.test(ref) && !ref.includes('/') ? `Organization/${ref}` : ref;
    this.set('managingOrganization', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  addContact(system: string, value: string, use?: string): this {
    this.push('contact', { system, value, ...(use ? { use } : {}) });
    return this;
  }

  setPeriod(start: string, end?: string): this {
    this.set('period', { start, ...(end ? { end } : {}) });
    return this;
  }

  addPayloadType(code: string, display: string, system = 'http://terminology.hl7.org/CodeSystem/endpoint-payload-type'): this {
    this.push('payloadType', { coding: [{ code, display, system }] });
    return this;
  }

  addPayloadMimeType(mimeType: string): this {
    this.push('payloadMimeType', mimeType);
    return this;
  }

  setAddress(address: string): this { this.set('address', address); return this; }

  addHeader(header: string): this {
    this.push('header', header);
    return this;
  }
}
