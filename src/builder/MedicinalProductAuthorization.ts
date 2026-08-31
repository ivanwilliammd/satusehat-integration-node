/** MedicinalProductAuthorization FHIR R4 Resource Builder */
export class MedicinalProductAuthorization {
  private data: Record<string, any> = { resourceType: 'MedicinalProductAuthorization' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  addIdentifier(system: string, value: string, use?: string, typeCode?: string, typeDisplay?: string): this {
    const ident: Record<string, any> = { system, value };
    if (use !== undefined) ident['use'] = use;
    if (typeCode !== undefined) {
      ident['type'] = { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v2-0203', code: typeCode, display: typeDisplay ?? typeCode }] };
    }
    this.data['identifier'] = this.data['identifier'] || [];
    this.data['identifier'].push(ident);
    return this;
  }

  setStatus(status: string): this { this.data['status'] = status; return this; }

  setCountry(system: string, code: string, display: string = ''): this {
    this.data['country'] = { coding: [{ system, code, display }] };
    return this;
  }

  setRegulator(reference: string, display?: string): this {
    const ref: Record<string, any> = { reference };
    if (display !== undefined) ref['display'] = display;
    this.data['regulator'] = ref;
    return this;
  }

  setValidityPeriod(value: string): this { this.data['validityPeriod'] = value; return this; }
}
