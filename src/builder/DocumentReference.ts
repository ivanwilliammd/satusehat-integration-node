/** DocumentReference FHIR R4 Resource Builder */
import { Attachment, CodeableConcept, Identifier, Reference } from '../datatype/datatypes';

export class DocumentReference {
  private data: Record<string, any> = { resourceType: 'DocumentReference' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}