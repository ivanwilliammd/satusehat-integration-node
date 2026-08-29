/** CoverageEligibilityResponse FHIR R4 Resource Builder */
import { Reference } from '../datatype/datatypes';

export class CoverageEligibilityResponse {
  private data: Record<string, any> = { resourceType: 'CoverageEligibilityResponse' };

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
  setRequest(reference: string): this { this.data['request'] = { reference }; return this; }
  setRequestProvider(reference: string): this { this.data['requestProvider'] = { reference }; return this; }
  setInsurer(reference: string): this { this.data['insurer'] = { reference }; return this; }
  addCoverage(reference: string, preAuthRef = ''): this {
    const coverage: Record<string, any> = { reference };
    if (preAuthRef) coverage['preAuthRef'] = [preAuthRef];
    this.data['coverage'] = this.data['coverage'] || [];
    this.data['coverage'].push(coverage);
    return this;
  }
  setOutcome(outcome: string): this { this.data['outcome'] = outcome; return this; }
  setDisposition(disposition: string): this { this.data['disposition'] = disposition; return this; }
  addInsurance(coverageReference: string, benefitBalanceName?: string, benefitBalanceTypeSystem?: string, benefitBalanceTypeCode?: string, benefitBalanceTypeDisplay?: string): this {
    const insurance: Record<string, any> = { coverage: { reference: coverageReference } };
    if (benefitBalanceName) {
      const item: Record<string, any> = { name: benefitBalanceName };
      if (benefitBalanceTypeSystem && benefitBalanceTypeCode) {
        item['type'] = { coding: [{ system: benefitBalanceTypeSystem, code: benefitBalanceTypeCode, display: benefitBalanceTypeDisplay ?? '' }] };
      }
      insurance['benefitBalance'] = insurance['benefitBalance'] || [];
      insurance['benefitBalance'].push(item);
    }
    this.data['insurance'] = this.data['insurance'] || [];
    this.data['insurance'].push(insurance);
    return this;
  }
}
