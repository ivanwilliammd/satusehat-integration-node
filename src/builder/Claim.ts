/** Claim FHIR R4 Resource Builder */
export class Claim {
  private data: Record<string, any> = { resourceType: 'Claim' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}