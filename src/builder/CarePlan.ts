/** CarePlan FHIR R4 Resource Builder */
import { Annotation, CodeableConcept, Coding, Identifier, Period, Reference } from '../datatype/datatypes';

export class CarePlan {
  private data: Record<string, any> = { resourceType: 'CarePlan' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}