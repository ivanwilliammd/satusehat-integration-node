/** ChargeItem FHIR R4 Resource Builder */
export class ChargeItem {
  private data: Record<string, any> = { resourceType: 'ChargeItem' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}