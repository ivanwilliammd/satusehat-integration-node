/**
 * Flag FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/flag.html
 */
import { SharedBuilder } from './SharedBuilder';
import { CodeableConcept, Identifier, Period, Reference } from '../datatype/datatypes';

export class Flag extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'Flag'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setStatus(status: string): this { this.set('status', status); return this; }
  setCategory(category: CodeableConcept): this { this.set('category', this.nestedToArray(category)); return this; }
  setCode(code: CodeableConcept): this { this.set('code', this.nestedToArray(code)); return this; }
  setSubject(subject: Reference): this { this.set('subject', this.nestedToArray(subject)); return this; }
  setEncounter(encounter: Reference): this { this.set('encounter', this.nestedToArray(encounter)); return this; }
  setPeriod(period: Period): this { this.set('period', this.nestedToArray(period)); return this; }
  setAuthor(author: Reference): this { this.set('author', this.nestedToArray(author)); return this; }
}
