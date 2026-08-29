/** ClaimResponse FHIR R4 Resource Builder */
export class ClaimResponse {
  private data: Record<string, any> = { resourceType: 'ClaimResponse' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}