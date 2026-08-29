/** CoverageEligibilityRequest FHIR R4 Resource Builder */
import { CodeableConcept, Reference } from '../datatype/datatypes';

export class CoverageEligibilityRequest {
  private data: Record<string, any> = { resourceType: 'CoverageEligibilityRequest' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  addIdentifier(system: string, value: string): this {
    this.data['identifier'] = this.data['identifier'] || [];
    this.data['identifier'].push({ system, value });
    return this;
  }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setPriority(system: string, code: string, display = ''): this {
    this.data['priority'] = { coding: [{ system, code, display }] };
    return this;
  }
  setPurpose(purpose: string[]): this { this.data['purpose'] = purpose; return this; }
  setPatient(reference: string, display = ''): this {
    const patient: Record<string, any> = { reference };
    if (display) patient['display'] = display;
    this.data['patient'] = patient;
    return this;
  }
  setServicedDate(date: string): this { this.data['servicedDate'] = date; return this; }
  setServicedPeriod(start: string, end = ''): this {
    this.data['servicedPeriod'] = this.data['servicedPeriod'] || {};
    this.data['servicedPeriod']['start'] = start;
    if (end) this.data['servicedPeriod']['end'] = end;
    return this;
  }
  setCreated(dateTime: string): this { this.data['created'] = dateTime; return this; }
  setEnterer(reference: string): this { this.data['enterer'] = { reference }; return this; }
  setProvider(reference: string): this { this.data['provider'] = { reference }; return this; }
  setInsurer(reference: string): this { this.data['insurer'] = { reference }; return this; }
  addCoverage(reference: string, preAuthRef = ''): this {
    const coverage: Record<string, any> = { reference };
    if (preAuthRef) coverage['preAuthRef'] = [preAuthRef];
    this.data['coverage'] = this.data['coverage'] || [];
    this.data['coverage'].push(coverage);
    return this;
  }
  addItem(productOrServiceSystem: string, productOrServiceCode: string, productOrServiceDisplay: string, categorySystem?: string, categoryCode?: string): this {
    const item: Record<string, any> = {
      productOrService: { coding: [{ system: productOrServiceSystem, code: productOrServiceCode, display: productOrServiceDisplay }] },
    };
    if (categorySystem && categoryCode) {
      item['category'] = { coding: [{ system: categorySystem, code: categoryCode }] };
    }
    this.data['item'] = this.data['item'] || [];
    this.data['item'].push(item);
    return this;
  }
}
