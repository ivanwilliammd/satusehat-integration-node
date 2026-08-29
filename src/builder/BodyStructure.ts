/**
 * BodyStructure FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/bodystructure.html
 */
import { SharedBuilder } from './SharedBuilder';
import { CodeableConcept, Identifier, Reference } from '../datatype/datatypes';

export class BodyStructure extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'BodyStructure'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setActive(active: boolean): this { this.set('active', active); return this; }
  setMorphology(morphology: CodeableConcept): this { this.set('morphology', this.nestedToArray(morphology)); return this; }
  setLocation(location: CodeableConcept): this { this.set('location', this.nestedToArray(location)); return this; }
  addLocationQualifier(qualifier: CodeableConcept): this { this.push('locationQualifier', this.nestedToArray(qualifier)); return this; }
  setDescription(description: string): this { this.set('description', description); return this; }
  setImage(data: string, contentType: string, title?: string): this {
    this.push('image', { data, contentType, ...(title !== undefined ? { title } : {}) });
    return this;
  }
  setPatient(patient: Reference): this { this.set('patient', this.nestedToArray(patient)); return this; }
}
