/** RiskAssessment FHIR R4 Resource Builder */
import { Annotation, CodeableConcept, Identifier, Reference } from '../datatype/datatypes';

export class RiskAssessment {
  private data: Record<string, any> = { resourceType: 'RiskAssessment' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}