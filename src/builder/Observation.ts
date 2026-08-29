/**
 * Observation FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/observation.html
 */
import { SharedBuilder } from './SharedBuilder';
import { Annotation, CodeableConcept, Identifier, Period, Quantity, Range, Ratio, Reference } from '../datatype/datatypes';

export class Observation extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'Observation'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setStatus(status: string): this { this.set('status', status); return this; }
  addCategory(category: CodeableConcept): this { this.push('category', this.nestedToArray(category)); return this; }
  setCode(code: CodeableConcept): this { this.set('code', this.nestedToArray(code)); return this; }
  setSubject(subject: Reference): this { this.set('subject', this.nestedToArray(subject)); return this; }
  setEncounter(encounter: Reference): this { this.set('encounter', this.nestedToArray(encounter)); return this; }
  setEffectiveDateTime(dateTime: string): this { this.set('effectiveDateTime', dateTime); return this; }
  setEffectivePeriod(period: Period): this { this.set('effectivePeriod', this.nestedToArray(period)); return this; }
  setEffectiveInstant(instant: string): this { this.set('effectiveInstant', instant); return this; }
  setEffectivePeriodStart(start: string): this { this.set('effectivePeriod', { start }); return this; }
  setEffectivePeriodEnd(end: string): this {
    const existing = (this.data['effectivePeriod'] as Record<string, unknown>) ?? {};
    this.set('effectivePeriod', { ...existing, end });
    return this;
  }
  // Value[x] polymorphic setters
  setValueQuantity(value: Quantity): this { this.set('valueQuantity', this.nestedToArray(value)); return this; }
  setValueCodeableConcept(value: CodeableConcept): this { this.set('valueCodeableConcept', this.nestedToArray(value)); return this; }
  setValueString(value: string): this { this.set('valueString', value); return this; }
  setValueBoolean(value: boolean): this { this.set('valueBoolean', value); return this; }
  setValueInteger(value: number): this { this.set('valueInteger', value); return this; }
  setValueRange(value: Range): this { this.set('valueRange', this.nestedToArray(value)); return this; }
  setValueRatio(value: Ratio): this { this.set('valueRatio', this.nestedToArray(value)); return this; }
  setValueTime(value: string): this { this.set('valueTime', value); return this; }
  setValueDateTime(value: string): this { this.set('valueDateTime', value); return this; }
  setValuePeriod(value: Period): this { this.set('valuePeriod', this.nestedToArray(value)); return this; }
  addInterpretation(interpretation: CodeableConcept): this { this.push('interpretation', this.nestedToArray(interpretation)); return this; }
  addNote(note: Annotation): this { this.push('note', this.nestedToArray(note)); return this; }
  addBodySite(bodySite: CodeableConcept): this { this.push('bodySite', this.nestedToArray(bodySite)); return this; }
  setMethod(method: CodeableConcept): this { this.set('method', this.nestedToArray(method)); return this; }
  setSpecimen(specimen: Reference): this { this.set('specimen', this.nestedToArray(specimen)); return this; }
  setDevice(device: Reference): this { this.set('device', this.nestedToArray(device)); return this; }
  addReferenceRange(low?: Quantity, high?: Quantity, type?: CodeableConcept, text?: string): this {
    const range: Record<string, unknown> = {};
    if (low !== undefined) range['low'] = this.nestedToArray(low);
    if (high !== undefined) range['high'] = this.nestedToArray(high);
    if (type !== undefined) range['type'] = this.nestedToArray(type);
    if (text !== undefined) range['text'] = text;
    this.push('referenceRange', Object.fromEntries(Object.entries(range).filter(([, v]) => v !== undefined)));
    return this;
  }
  addComponent(code: CodeableConcept, value: Quantity | CodeableConcept | Range | Ratio | string | number | boolean): this {
    const component: Record<string, unknown> = { code: this.nestedToArray(code) };
    if (value instanceof Quantity) component['valueQuantity'] = this.nestedToArray(value);
    else if (value instanceof CodeableConcept) component['valueCodeableConcept'] = this.nestedToArray(value);
    else if (value instanceof Range) component['valueRange'] = this.nestedToArray(value);
    else if (value instanceof Ratio) component['valueRatio'] = this.nestedToArray(value);
    else if (typeof value === 'string') component['valueString'] = value;
    else if (typeof value === 'number') component['valueInteger'] = value;
    else if (typeof value === 'boolean') component['valueBoolean'] = value;
    this.push('component', component);
    return this;
  }
  addExtension(url: string, value: unknown, valueType?: string): this { super.addExtension(url, value, valueType); return this; }
}
