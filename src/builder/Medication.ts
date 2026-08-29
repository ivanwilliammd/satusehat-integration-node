/**
 * Medication FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/medication.html
 */
import { SharedBuilder } from './SharedBuilder';
import { CodeableConcept, Identifier, Quantity, Reference } from '../datatype/datatypes';

export class Medication extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'Medication'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setCode(code: CodeableConcept): this { this.set('code', this.nestedToArray(code)); return this; }
  setStatus(status: string): this { this.set('status', status); return this; }
  setManufacturer(manufacturer: Reference): this { this.set('manufacturer', this.nestedToArray(manufacturer)); return this; }
  setForm(form: CodeableConcept): this { this.set('form', this.nestedToArray(form)); return this; }
  addIngredient(itemCodeableConcept: CodeableConcept, isActive: boolean, strength?: Quantity): this {
    const ingredient: Record<string, unknown> = {
      itemCodeableConcept: this.nestedToArray(itemCodeableConcept),
      isActive,
    };
    if (strength !== undefined) ingredient['strength'] = this.nestedToArray(strength);
    this.push('ingredient', ingredient);
    return this;
  }
  setBatch(lotNumber: string, expirationDate: string): this {
    this.set('batch', { lotNumber, expirationDate });
    return this;
  }
  addMedicationType(code: string, display: string): this {
    const medicationTypeMap: Record<string, string> = {
      NC: 'Non-compound',
      SD: 'Gives of such doses',
      EP: 'Divide into equal parts',
    };
    this.push('extension', {
      url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/MedicationType',
      valueCodeableConcept: {
        coding: [{
          system: 'http://terminology.kemkes.go.id/CodeSystem/medication-type',
          code,
          display: medicationTypeMap[display] ?? display,
        }],
      },
    });
    return this;
  }
}
