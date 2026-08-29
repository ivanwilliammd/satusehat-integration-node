/** Composition FHIR R4 Resource Builder */
import { Annotation, CodeableConcept, Coding, Identifier, Narrative, Period, Reference } from '../datatype/datatypes';

export class Composition {
  private data: Record<string, any> = { resourceType: 'Composition' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}