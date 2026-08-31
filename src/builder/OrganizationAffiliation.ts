/** OrganizationAffiliation FHIR R4 Resource Builder */
export class OrganizationAffiliation {
  private data: Record<string, any> = { resourceType: 'OrganizationAffiliation' };

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

  setOrganization(reference: string, display?: string): this {
    const ref: Record<string, any> = { reference };
    if (display !== undefined) ref['display'] = display;
    this.data['organization'] = ref;
    return this;
  }

  setParticipatingOrganization(reference: string, display?: string): this {
    const ref: Record<string, any> = { reference };
    if (display !== undefined) ref['display'] = display;
    this.data['participatingOrganization'] = ref;
    return this;
  }

  setNetwork(system: string, code: string, display: string = ''): this {
    this.data['network'] = { coding: [{ system, code, display }] };
    return this;
  }

  setCode(system: string, code: string, display: string = ''): this {
    this.data['code'] = { coding: [{ system, code, display }] };
    return this;
  }
}
