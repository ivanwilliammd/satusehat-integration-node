/**
 * Procedure FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/procedure.html
 */
import { SharedBuilder } from './SharedBuilder';
import { Annotation, CodeableConcept, Identifier, Period, Quantity, Range, Reference } from '../datatype/datatypes';

export class Procedure extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'Procedure'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setStatus(status: string): this { this.set('status', status); return this; }
  setCategory(category: CodeableConcept): this { this.set('category', this.nestedToArray(category)); return this; }
  setCode(code: CodeableConcept): this { this.set('code', this.nestedToArray(code)); return this; }
  setSubject(subject: Reference): this { this.set('subject', this.nestedToArray(subject)); return this; }
  setEncounter(encounter: Reference): this { this.set('encounter', this.nestedToArray(encounter)); return this; }
  // performed[x] polymorphic setters
  setPerformedDateTime(dateTime: string): this { this.set('performedDateTime', dateTime); return this; }
  setPerformedPeriod(period: Period): this { this.set('performedPeriod', this.nestedToArray(period)); return this; }
  setPerformedString(performedString: string): this { this.set('performedString', performedString); return this; }
  setPerformedAge(age: Range): this { this.set('performedAge', this.nestedToArray(age)); return this; }
  setPerformedRange(range: Range): this { this.set('performedRange', this.nestedToArray(range)); return this; }
  addPerformer(actor: Reference, function$?: CodeableConcept, onBehalfOf?: Reference): this {
    const performer: Record<string, unknown> = { actor: this.nestedToArray(actor) };
    if (function$ !== undefined) performer['function'] = this.nestedToArray(function$);
    if (onBehalfOf !== undefined) performer['onBehalfOf'] = this.nestedToArray(onBehalfOf);
    this.push('performer', performer);
    return this;
  }
  setOutcome(outcome: CodeableConcept): this { this.set('outcome', this.nestedToArray(outcome)); return this; }
  addReport(report: Reference): this { this.push('report', this.nestedToArray(report)); return this; }
  addFollowUp(followUp: CodeableConcept): this { this.push('followUp', this.nestedToArray(followUp)); return this; }
  addNote(note: Annotation): this { this.push('note', this.nestedToArray(note)); return this; }
  addFocalDevice(action: CodeableConcept, device?: Reference, manufactureItem?: Reference): this {
    const focalDevice: Record<string, unknown> = { action: this.nestedToArray(action) };
    if (device !== undefined) focalDevice['device'] = this.nestedToArray(device);
    if (manufactureItem !== undefined) focalDevice['manufactureItem'] = this.nestedToArray(manufactureItem);
    this.push('focalDevice', focalDevice);
    return this;
  }
  addUsedReference(reference: Reference, type?: CodeableConcept): this {
    const used = this.nestedToArray(reference) as Record<string, unknown>;
    if (type !== undefined) used['type'] = this.nestedToArray(type);
    this.push('usedReference', used);
    return this;
  }
  addUsedCode(usedCode: CodeableConcept): this { this.push('usedCode', this.nestedToArray(usedCode)); return this; }
  addBodySite(bodySite: CodeableConcept): this { this.push('bodySite', this.nestedToArray(bodySite)); return this; }
  addExtension(url: string, value: unknown, valueType?: string): this { super.addExtension(url, value, valueType); return this; }
}
