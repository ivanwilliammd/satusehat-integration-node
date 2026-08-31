/** CapabilityStatement FHIR R4 Resource Builder */
export class CapabilityStatement {
  private data: Record<string, any> = { resourceType: 'CapabilityStatement' };

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

  setDate(value: string): this { this.data['date'] = value; return this; }

  setKind(system: string, code: string, display: string = ''): this {
    this.data['kind'] = { coding: [{ system, code, display }] };
    return this;
  }

  setFhirVersion(system: string, code: string, display: string = ''): this {
    this.data['fhirVersion'] = { coding: [{ system, code, display }] };
    return this;
  }

  setFormat(system: string, code: string, display: string = ''): this {
    this.data['format'] = { coding: [{ system, code, display }] };
    return this;
  }

  setRest(system: string, code: string, display: string = ''): this {
    this.data['rest'] = { coding: [{ system, code, display }] };
    return this;
  }
}
