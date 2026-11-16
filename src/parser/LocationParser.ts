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

  getId(): any {
    return this.location?.['id'] ?? null;
  }

  getIdentifier(): any {
    return this.location?.['identifier'] ?? null;
  }

  getAlias(): any {
    return this.location?.['alias'] ?? null;
  }

  getDescription(): any {
    return this.location?.['description'] ?? null;
  }

  getType(): any {
    return this.location?.['type'] ?? null;
  }

  getEndpoint(): any {
    return this.location?.['endpoint'] ?? null;
  }

  getExtension(): any {
    return this.location?.['extension'] ?? null;
  }
}
