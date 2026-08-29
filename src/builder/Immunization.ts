/** Immunization FHIR R4 Resource Builder */
import { CodeableConcept, Coding, Identifier, Quantity, Reference } from '../datatype/datatypes';

export class Immunization {
  private data: Record<string, any> = { resourceType: 'Immunization' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setMetaProfile(profile: string): this { this.data['meta'] = { profile: [profile] }; return this; }
  setId(id: string): this { this.data['id'] = id; return this; }
  addIdentifier(identifier: Identifier): this {
    this.data['identifier'] = this.data['identifier'] || [];
    this.data['identifier'].push(identifier.toArray());
    return this;
  }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setVaccineCode(vaccineCode: CodeableConcept): this { this.data['vaccineCode'] = vaccineCode.toArray(); return this; }
  setVaccineCodeFromCode(code: string, display?: string, system = 'http://snomed.info/sct'): this {
    const cc = new CodeableConcept();
    cc.addCoding(new Coding(system, code, display));
    return this.setVaccineCode(cc);
  }
  setPatient(patient: Reference, display?: string): this {
    const p = patient.toArray() as Record<string, any>;
    if (display !== undefined) p['display'] = display;
    this.data['patient'] = p;
    return this;
  }
  setOccurrenceDateTime(dateTime: string): this { this.data['occurrenceDateTime'] = dateTime; return this; }
  addPerformer(actor: Reference, fn?: CodeableConcept): this {
    const performer: Record<string, any> = { actor: actor.toArray() };
    if (fn !== undefined) performer['function'] = fn.toArray();
    this.data['performer'] = this.data['performer'] || [];
    this.data['performer'].push(performer);
    return this;
  }
  setDoseQuantity(value: number, unit: string, system?: string, code?: string): this {
    const q: Record<string, any> = { value, unit };
    if (system !== undefined) q['system'] = system;
    if (code !== undefined) q['code'] = code;
    this.data['doseQuantity'] = q;
    return this;
  }
  setLocation(location: Reference, display?: string): this {
    const l = location.toArray() as Record<string, any>;
    if (display !== undefined) l['display'] = display;
    this.data['location'] = l;
    return this;
  }
  setLotNumber(lotNumber: string): this { this.data['lotNumber'] = lotNumber; return this; }
  setRecorded(dateTime: string): this { this.data['recorded'] = dateTime; return this; }
  setPrimarySource(primarySource: boolean): this { this.data['primarySource'] = primarySource; return this; }
  addProtocolApplied(doseNumberPositiveInt: number, series?: CodeableConcept): this {
    const row: Record<string, any> = { doseNumberPositiveInt };
    if (series !== undefined) row['seriesDosesPositiveInt'] = 1;
    this.data['protocolApplied'] = this.data['protocolApplied'] || [];
    this.data['protocolApplied'].push(row);
    return this;
  }
  addReasonCode(reason: CodeableConcept): this {
    this.data['reasonCode'] = this.data['reasonCode'] || [];
    this.data['reasonCode'].push(reason.toArray());
    return this;
  }
  setRoute(route: CodeableConcept): this { this.data['route'] = route.toArray(); return this; }
  setRouteFromCode(code: string, display?: string, system = 'http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration'): this {
    const cc = new CodeableConcept();
    cc.addCoding(new Coding(system, code, display));
    return this.setRoute(cc);
  }
  addExtension(url: string, value: string): this {
    this.data['extension'] = this.data['extension'] || [];
    this.data['extension'].push({ url, valueString: value });
    return this;
  }
}
