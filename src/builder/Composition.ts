/** Composition FHIR R4 Resource Builder — mirrors PayloadBuilderComposition in the PHP SDK. */
import { CodeableConcept, Identifier, Reference } from '../datatype/datatypes';

export class Composition {
  private data: Record<string, any> = { resourceType: 'Composition' };

  private set(k: string, v: any): void { this.data[k] = v; }

  private push(k: string, v: any): void {
    if (!Array.isArray(this.data[k])) this.data[k] = [];
    this.data[k].push(v);
  }

  setId(id: string): this { this.set('id', id); return this; }

  addIdentifier(identifier: Identifier): this { this.push('identifier', identifier.toArray()); return this; }

  setStatus(status: string): this { this.set('status', status); return this; }

  setType(type: CodeableConcept): this { this.set('type', type.toArray()); return this; }

  addCategory(category: CodeableConcept): this { this.push('category', category.toArray()); return this; }

  setTitle(title: string): this { this.set('title', title); return this; }

  setDate(date: string): this { this.set('date', date); return this; }

  addAuthor(author: Reference): this { this.push('author', author.toArray()); return this; }

  setSubject(subject: Reference): this { this.set('subject', subject.toArray()); return this; }

  setEncounter(encounter: Reference): this { this.set('encounter', encounter.toArray()); return this; }

  setCustodian(custodian: Reference): this { this.set('custodian', custodian.toArray()); return this; }

  addAttester(mode: string, party: Reference): this {
    this.push('attester', { mode, party: party.toArray() });
    return this;
  }

  /** PHP tidak membentuk section, jadi map diterima apa adanya. */
  addSection(section: Record<string, any>): this { this.push('section', section); return this; }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}
