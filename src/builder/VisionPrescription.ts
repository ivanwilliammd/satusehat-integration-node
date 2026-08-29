/** VisionPrescription FHIR R4 Resource Builder */
export class VisionPrescription {
  private data: Record<string, any> = { resourceType: 'VisionPrescription' };

  setId(id: string): this { this.data.id = id; return this; }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}
