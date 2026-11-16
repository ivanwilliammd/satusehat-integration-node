/**
 * EndpointParser — pembaca elemen tingkat atas resource FHIR R4 Endpoint.
 *
 * Dihasilkan dari EndpointBuilder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class EndpointParser {
  private payload: Record<string, any>;

  constructor(payload: Record<string, any> = {}) {
    this.payload = payload ?? {};
  }

  getRaw(): Record<string, any> {
    return this.payload;
  }

  getId(): any {
    return this.payload['id'] ?? null;
  }

  getIdentifier(): any {
    return this.payload['identifier'] ?? null;
  }

  getStatus(): any {
    return this.payload['status'] ?? null;
  }

  getConnectionType(): any {
    return this.payload['connectionType'] ?? null;
  }

  getName(): any {
    return this.payload['name'] ?? null;
  }

  getManagingOrganization(): any {
    return this.payload['managingOrganization'] ?? null;
  }

  getContact(): any {
    return this.payload['contact'] ?? null;
  }

  getPeriod(): any {
    return this.payload['period'] ?? null;
  }

  getPayloadType(): any {
    return this.payload['payloadType'] ?? null;
  }

  getPayloadMimeType(): any {
    return this.payload['payloadMimeType'] ?? null;
  }

  getAddress(): any {
    return this.payload['address'] ?? null;
  }

  getHeader(): any {
    return this.payload['header'] ?? null;
  }
}
