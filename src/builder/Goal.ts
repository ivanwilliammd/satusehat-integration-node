/** Goal FHIR R4 Resource Builder — mirrors PayloadBuilderGoal in the PHP SDK. */
import { Annotation, CodeableConcept, Identifier, Reference } from '../datatype/datatypes';

export class Goal {
  private data: Record<string, any> = { resourceType: 'Goal' };

  private set(k: string, v: any): void { this.data[k] = v; }

  private push(k: string, v: any): void {
    if (!Array.isArray(this.data[k])) this.data[k] = [];
    this.data[k].push(v);
  }

  setId(id: string): this { this.set('id', id); return this; }

  addIdentifier(identifier: Identifier): this { this.push('identifier', identifier.toArray()); return this; }

  setLifecycleStatus(status: string): this { this.set('lifecycleStatus', status); return this; }

  setDescription(description: CodeableConcept): this { this.set('description', description.toArray()); return this; }

  setSubject(subject: Reference): this { this.set('subject', subject.toArray()); return this; }

  setStartDateTime(startDateTime: string): this { this.set('startDateTime', startDateTime); return this; }

  setStartPeriod(period: any): this { this.set('startPeriod', period.toArray()); return this; }

  addTargetDetailQuantity(quantity: any): this { this.push('target', { detailQuantity: quantity.toArray() }); return this; }

  addTargetDetailCodeableConcept(detail: CodeableConcept): this {
    this.push('target', { detailCodeableConcept: detail.toArray() });
    return this;
  }

  addTargetRange(range: any): this { this.push('target', { detailRange: range.toArray() }); return this; }

  /** PHP menulis statusReason sebagai string; FHIR meminta CodeableConcept. */
  setStatusReason(statusReason: string): this { this.set('statusReason', statusReason); return this; }

  addNote(note: Annotation | string): this {
    this.push('note', typeof note === 'string' ? { text: note } : note.toArray());
    return this;
  }

  addOutcomeReference(reference: Reference): this { this.push('outcomeReference', reference.toArray()); return this; }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}
