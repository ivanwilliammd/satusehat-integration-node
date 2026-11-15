/**
 * Account FHIR R4 Resource Builder
 * Setara PayloadBuilderAccount.php: semantik sama, nama method camelCase.
 */
export class AccountBuilder {
  private data: Record<string, any> = { resourceType: 'Account' };

  private set(key: string, value: any): void { this.data[key] = value; }
  private push(key: string, value: any): void {
    if (!this.data[key]) this.data[key] = [];
    this.data[key].push(value);
  }

  setId(id: string): this { this.set('id', id); return this; }

  setStatus(status: string = 'active'): this {
    const nilai = status.toLowerCase();
    if (!['active', 'inactive', 'entered-in-error', 'on-hold', 'unknown'].includes(nilai)) {
      throw new Error(`status '${status}' tidak valid untuk Account`);
    }
    this.set('status', nilai);
    return this;
  }

  setType(system: string, code: string, display: string, text: string): this {
    this.set('type', { coding: [{ system, code, display }], text });
    return this;
  }

  setName(name: string): this { this.set('name', name); return this; }

  addSubject(reference: string, display: string | null = null): this {
    const subject: Record<string, any> = { reference };
    if (display !== null) subject['display'] = display;
    this.push('subject', subject);
    return this;
  }

  setServicePeriod(start: string, end: string): this {
    this.set('servicePeriod', { start, end });
    return this;
  }

  addCoverage(reference: string, priority: number): this {
    this.push('coverage', { coverage: { reference }, priority });
    return this;
  }

  setOwner(reference: string): this { this.set('owner', { reference }); return this; }

  setDescription(description: string): this { this.set('description', description); return this; }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}

/** Nama kanon `Account`: seragam dengan modul lain. `AccountBuilder` dipertahankan untuk pemanggil lama. */
export { AccountBuilder as Account };
