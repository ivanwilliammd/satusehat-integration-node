/** Medication FHIR R4 Resource Builder */
import { CodeableConcept, Identifier, Quantity, Reference } from '../datatype/datatypes';

export class Medication {
  private data: Record<string, any> = {
    resourceType: 'Medication',
    meta: { profile: ['https://fhir.kemkes.go.id/r4/StructureDefinition/Medication'] },
  };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  addIdentifier(identifier: Identifier): this {
    this.data['identifier'] = this.data['identifier'] || [];
    this.data['identifier'].push(identifier.toArray());
    return this;
  }
  setCode(code: CodeableConcept): this { this.data['code'] = code.toArray(); return this; }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setManufacturer(manufacturer: Reference): this { this.data['manufacturer'] = manufacturer.toArray(); return this; }
  setForm(form: CodeableConcept): this { this.data['form'] = form.toArray(); return this; }
  addIngredient(itemCodeableConcept: CodeableConcept, isActive: boolean, strength?: Quantity): this {
    const ingredient: Record<string, any> = { itemCodeableConcept: itemCodeableConcept.toArray(), isActive };
    if (strength !== undefined) ingredient['strength'] = strength.toArray();
    this.data['ingredient'] = this.data['ingredient'] || [];
    this.data['ingredient'].push(ingredient);
    return this;
  }
  setBatch(lotNumber: string, expirationDate: string): this {
    this.data['batch'] = { lotNumber, expirationDate };
    return this;
  }
  addMedicationType(code: string, display: string): this {
    const medicationTypeOption: Record<string, string> = { NC: 'Non-compound', SD: 'Gives of such doses', EP: 'Divide into equal parts' };
    this.data['extension'] = this.data['extension'] || [];
    this.data['extension'].push({
      url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/MedicationType',
      valueCodeableConcept: {
        coding: [{ system: 'http://terminology.kemkes.go.id/CodeSystem/medication-type', code, display: medicationTypeOption[display] ?? display }],
      },
    });
    return this;
  }
}
