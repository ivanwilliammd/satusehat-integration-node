/**
 * ImmunizationRecommendation FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/immunizationrecommendation.html
 */
import { SharedBuilder } from './SharedBuilder';
import { CodeableConcept, Identifier, Reference } from '../datatype/datatypes';

export class ImmunizationRecommendation extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'ImmunizationRecommendation'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setPatient(patient: Reference): this { this.set('patient', this.nestedToArray(patient)); return this; }
  addRecommendation(
    vaccineCode: CodeableConcept,
    targetDisease?: CodeableConcept,
    doseNumberPositiveInt?: number,
    seriesDosesPositiveInt?: number,
    forecastStatus?: CodeableConcept,
    dateCriterion?: Array<{ code: CodeableConcept; value: string }>,
    notes?: Array<{ text: string }>,
  ): this {
    const recommendation: Record<string, unknown> = {};
    recommendation['vaccineCode'] = this.nestedToArray(vaccineCode);
    if (targetDisease !== undefined) recommendation['targetDisease'] = this.nestedToArray(targetDisease);
    if (doseNumberPositiveInt !== undefined) recommendation['doseNumberPositiveInt'] = doseNumberPositiveInt;
    if (seriesDosesPositiveInt !== undefined) recommendation['seriesDosesPositiveInt'] = seriesDosesPositiveInt;
    if (forecastStatus !== undefined) recommendation['forecastStatus'] = this.nestedToArray(forecastStatus);
    if (dateCriterion !== undefined) {
      recommendation['dateCriterion'] = dateCriterion.map(dc => ({
        code: this.nestedToArray(dc.code),
        value: dc.value,
      }));
    }
    if (notes !== undefined) {
      recommendation['note'] = notes.map(n => ({ text: n.text }));
    }
    this.push('recommendation', recommendation);
    return this;
  }
}
