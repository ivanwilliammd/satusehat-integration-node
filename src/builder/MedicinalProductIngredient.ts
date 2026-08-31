/** MedicinalProductIngredient FHIR R4 Resource Builder */
export class MedicinalProductIngredient {
  private data: Record<string, any> = { resourceType: 'MedicinalProductIngredient' };

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

  setRole(system: string, code: string, display: string = ''): this {
    this.data['role'] = { coding: [{ system, code, display }] };
    return this;
  }

  setSubstance(value: string): this { this.data['substance'] = value; return this; }

  setQuantity(value: string): this { this.data['quantity'] = value; return this; }
}
