/**
 * Immunization FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/immunization.html
 */
import { SharedBuilder } from './SharedBuilder';
import { CodeableConcept, Coding, Identifier, Quantity, Reference } from '../datatype/datatypes';

export class Immunization extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'Immunization'; }

  setMetaProfile(profile: string): this { this.set('meta', { profile: [profile] }); return this; }
  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setStatus(status: string): this { this.set('status', status); return this; }
  setVaccineCode(vaccineCode: CodeableConcept): this { this.set('vaccineCode', this.nestedToArray(vaccineCode)); return this; }
  setVaccineCodeFromCode(code: string, display?: string, system = 'http://snomed.info/sct'): this {
    const cc = new CodeableConcept();
    cc.addCoding(new Coding(system, code, display));
    return this.setVaccineCode(cc);
  }
  setPatient(patient: Reference, display?: string): this {
    const p = this.nestedToArray(patient) as Record<string, unknown>;
    if (display !== undefined) p['display'] = display;
    this.set('patient', p);
    return this;
  }
  setOccurrenceDateTime(dateTime: string): this { this.set('occurrenceDateTime', dateTime); return this; }
  addPerformer(actor: Reference, fn?: CodeableConcept): this {
    const performer: Record<string, unknown> = { actor: this.nestedToArray(actor) };
    if (fn !== undefined) performer['function'] = this.nestedToArray(fn);
    this.push('performer', performer);
    return this;
  }
  setDoseQuantity(value: number, unit: string, system?: string, code?: string): this {
    this.set('doseQuantity', { value, unit, ...(system !== undefined ? { system } : {}), ...(code !== undefined ? { code } : {}) });
    return this;
  }
  setLocation(location: Reference, display?: string): this {
    const l = this.nestedToArray(location) as Record<string, unknown>;
    if (display !== undefined) l['display'] = display;
    this.set('location', l);
    return this;
  }
  setLotNumber(lotNumber: string): this { this.set('lotNumber', lotNumber); return this; }
  setRecorded(dateTime: string): this { this.set('recorded', dateTime); return this; }
  setPrimarySource(primarySource: boolean): this { this.set('primarySource', primarySource); return this; }
  addProtocolApplied(doseNumberPositiveInt: number, series?: CodeableConcept): this {
    const row: Record<string, unknown> = { doseNumberPositiveInt };
    if (series !== undefined) row['seriesDosesPositiveInt'] = 1;
    this.push('protocolApplied', row);
    return this;
  }
  addReasonCode(reason: CodeableConcept): this { this.push('reasonCode', this.nestedToArray(reason)); return this; }
  setRoute(route: CodeableConcept): this { this.set('route', this.nestedToArray(route)); return this; }
  setRouteFromCode(code: string, display?: string, system = 'http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration'): this {
    const cc = new CodeableConcept();
    cc.addCoding(new Coding(system, code, display));
    return this.setRoute(cc);
  }
  addExtension(url: string, value: string): this { this.push('extension', { url, valueString: value }); return this; }
}
