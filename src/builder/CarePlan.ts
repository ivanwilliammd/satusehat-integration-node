/** CarePlan FHIR R4 Resource Builder — mirrors PayloadBuilderCarePlan in the PHP SDK. */
import { CodeableConcept, Identifier, Reference } from '../datatype/datatypes';

export class CarePlan {
  private data: Record<string, any> = { resourceType: 'CarePlan' };

  private set(k: string, v: any): void { this.data[k] = v; }

  private push(k: string, v: any): void {
    if (!Array.isArray(this.data[k])) this.data[k] = [];
    this.data[k].push(v);
  }

  setId(id: string): this { this.set('id', id); return this; }

  addIdentifier(identifier: Identifier): this { this.push('identifier', identifier.toArray()); return this; }

  setStatus(status: string): this { this.set('status', status); return this; }

  setIntent(intent: string): this { this.set('intent', intent); return this; }

  addCategory(category: CodeableConcept): this { this.push('category', category.toArray()); return this; }

  setTitle(title: string): this { this.set('title', title); return this; }

  setDescription(description: string): this { this.set('description', description); return this; }

  setSubject(subject: Reference): this { this.set('subject', subject.toArray()); return this; }

  setEncounter(encounter: Reference): this { this.set('encounter', encounter.toArray()); return this; }

  setPeriod(period: any): this { this.set('period', period.toArray()); return this; }

  setAuthor(author: Reference): this { this.set('author', author.toArray()); return this; }

  addContributor(contributor: Reference): this { this.push('contributor', contributor.toArray()); return this; }

  addAddressee(addressee: Reference): this { this.push('addressee', addressee.toArray()); return this; }

  addSupportingInfo(info: Reference): this { this.push('supportingInfo', info.toArray()); return this; }

  addGoal(goal: Reference): this { this.push('goal', goal.toArray()); return this; }

  /** detail diterima apa adanya, dibungkus {detail: …} seperti PHP. */
  addActivity(detail: Record<string, any>): this { this.push('activity', { detail }); return this; }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}
