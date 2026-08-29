/** MolecularSequence FHIR R4 Resource Builder */
import { CodeableConcept, Reference } from '../datatype/datatypes';

export class MolecularSequence {
  private data: Record<string, any> = { resourceType: 'MolecularSequence' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}