export class LocationParser {
  private location: Record<string, any>;

  constructor(location: Record<string, any> = {}) {
    this.location = location ?? {};
  }

  getIdentifiers(): any {
    return this.location['identifier'] ?? null;
  }

  getName(): any {
    return this.location['name'] ?? null;
  }

  getStatus(): any {
    return this.location['status'] ?? null;
  }

  getOperationalStatus(): any {
    return this.location['operationalStatus'] ?? null;
  }

  getTelecom(): any {
    return this.location['telecom'] ?? null;
  }

  getAddress(): any {
    return this.location['address'] ?? null;
  }

  getPhysicalType(): any {
    return this.location['physicalType'] ?? null;
  }

  getPosition(): any {
    return this.location['position'] ?? null;
  }

  getManagingOrganization(): any {
    return this.location['managingOrganization'] ?? null;
  }

  getManagingOrganizationReference(): string | null {
    return this.removePrefix(this.location['managingOrganization']?.['reference'] ?? null, 'Organization/');
  }

  getPartOf(): any {
    return this.location['partOf'] ?? null;
  }

  getPartOfReference(): string | null {
    return this.removePrefix(this.location['partOf']?.['reference'] ?? null, 'Location/');
  }

  private removePrefix(value: string | null, prefix: string): string | null {
    if (value && typeof value === 'string' && value.startsWith(prefix)) {
      return value.slice(prefix.length);
    }
    return value;
  }
}
