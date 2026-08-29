/** ImmunizationRecommendation FHIR R4 Resource Builder */
import { CodeableConcept, Identifier, Reference } from '../datatype/datatypes';

export class ImmunizationRecommendation {
  private data: Record<string, any> = { resourceType: 'ImmunizationRecommendation' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  addIdentifier(system: string, value: string, use?: string, typeCode?: string, typeDisplay?: string): this {
    const ident: Record<string, any> = { system, value };
    if (use !== undefined) ident['use'] = use;
    if (typeCode !== undefined) {
      ident['type'] = { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v2-0203', code: typeCode, display: typeDisplay ?? typeCode }] };
    }
    this.data['identifier'] = this.data['identifier'] || [];
    this.data['identifier'].push(ident);
    return this;
  }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setCode(system: string, code: string, display: string): this {
    this.data['code'] = { coding: [{ system, code, display }] };
    return this;
  }
  setSubject(reference: string, display?: string): this {
    const subject: Record<string, any> = { reference };
    if (display !== undefined) subject['display'] = display;
    this.data['subject'] = subject;
    return this;
  }
  setEncounter(reference: string): this { this.data['encounter'] = { reference }; return this; }
  setPatient(patient: Reference): this { this.data['patient'] = patient.toArray(); return this; }
  addRecommendation(vaccineCode: CodeableConcept, targetDisease?: CodeableConcept, doseNumberPositiveInt?: number, seriesDosesPositiveInt?: number, forecastStatus?: CodeableConcept, dateCriterion?: Array<{ code: CodeableConcept; value: string }>, notes?: Array<{ text: string }>): this {
    const recommendation: Record<string, any> = {};
    recommendation['vaccineCode'] = vaccineCode.toArray();
    if (targetDisease !== undefined) recommendation['targetDisease'] = targetDisease.toArray();
    if (doseNumberPositiveInt !== undefined) recommendation['doseNumberPositiveInt'] = doseNumberPositiveInt;
    if (seriesDosesPositiveInt !== undefined) recommendation['seriesDosesPositiveInt'] = seriesDosesPositiveInt;
    if (forecastStatus !== undefined) recommendation['forecastStatus'] = forecastStatus.toArray();
    if (dateCriterion !== undefined) {
      recommendation['dateCriterion'] = dateCriterion.map(dc => ({ code: dc.code.toArray(), value: dc.value }));
    }
    if (notes !== undefined) {
      recommendation['note'] = notes.map(n => ({ text: n.text }));
    }
    this.data['recommendation'] = this.data['recommendation'] || [];
    this.data['recommendation'].push(recommendation);
    return this;
  }
}
