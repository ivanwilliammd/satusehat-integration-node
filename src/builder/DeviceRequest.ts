/** DeviceRequest FHIR R4 Resource Builder */
export class DeviceRequest {
  private data: Record<string, any> = { resourceType: 'DeviceRequest' };

  setId(id: string): this { this.data.id = id; return this; }


  addIdentifier(system: string, value: string): this {
    this.data['identifier'] = this.data['identifier'] || [];
    this.data['identifier'].push({ system, value });
    return this;
  }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setSubject(reference: string, display?: string): this {
    const subject: Record<string, any> = { reference };
    if (display !== undefined) subject['display'] = display;
    this.data['subject'] = subject;
    return this;
  }
  setCode(system: string, code: string, display: string): this {
    this.data['code'] = { coding: [{ system, code, display }] };
    return this;
  }
  setEncounter(reference: string): this { this.data['encounter'] = { reference }; return this; }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}
