/** Goal FHIR R4 Resource Builder */
import { Age, Annotation, CodeableConcept, Coding, Identifier, Period, Quantity, Range, Reference } from '../datatype/datatypes';

export class Goal {
  private data: Record<string, any> = { resourceType: 'Goal' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}