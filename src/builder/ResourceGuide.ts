/** ResourceGuide FHIR R4 Resource Builder */
export class ResourceGuide {
  private data: Record<string, any> = { resourceType: 'ResourceGuide' };

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

  setName(value: string): this { this.data['name'] = value; return this; }

  setDescription(value: string): this { this.data['description'] = value; return this; }

  setVersion(value: string): this { this.data['version'] = value; return this; }

  setPublisher(value: string): this { this.data['publisher'] = value; return this; }
}
