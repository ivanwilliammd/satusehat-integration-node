export class OrganizationParser {
  private organization: Record<string, any>;

  constructor(organization: Record<string, any> = {}) {
    this.organization = organization ?? {};
  }

  getIdentifiers(): any {
    return this.organization['identifier'] ?? null;
  }

  getName(): any {
    return this.organization['name'] ?? null;
  }

  getOperationalStatus(): any {
    return this.organization['extension'] ?? null;
  }

  getPartOf(): any {
    return this.organization['partOf'] ?? null;
  }

  getPartOfReference(): string | null {
    return this.removePrefix(this.organization['partOf']?.['reference'] ?? null, 'Organization/');
  }

  getType(): any {
    return this.organization['type'] ?? null;
  }

  getTelecom(): any {
    return this.organization['telecom'] ?? null;
  }

  getAddress(): any {
    return this.organization['address'] ?? null;
  }

  private removePrefix(value: string | null, prefix: string): string | null {
    if (value && typeof value === 'string' && value.startsWith(prefix)) {
      return value.slice(prefix.length);
    }
    return value;
  }
}
