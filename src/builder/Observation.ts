/** Observation FHIR R4 Resource Builder */
import { Annotation, CodeableConcept, Identifier, Period, Quantity, Range, Ratio, Reference } from '../datatype/datatypes';

export class Observation {
  private data: Record<string, any> = { resourceType: 'Observation' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  addIdentifier(identifier: Identifier): this {
    this.data['identifier'] = this.data['identifier'] || [];
    this.data['identifier'].push(identifier.toArray());
    return this;
  }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  addCategory(category: CodeableConcept): this {
    this.data['category'] = this.data['category'] || [];
    this.data['category'].push(category.toArray());
    return this;
  }
  setCode(code: CodeableConcept): this { this.data['code'] = code.toArray(); return this; }
  setSubject(subject: Reference): this { this.data['subject'] = subject.toArray(); return this; }
  setEncounter(encounter: Reference): this { this.data['encounter'] = encounter.toArray(); return this; }
  setEffectiveDateTime(dateTime: string): this { this.data['effectiveDateTime'] = dateTime; return this; }
  setEffectivePeriod(period: Period): this { this.data['effectivePeriod'] = period.toArray(); return this; }
  setEffectiveInstant(instant: string): this { this.data['effectiveInstant'] = instant; return this; }
  setEffectivePeriodStart(start: string): this { this.data['effectivePeriod'] = { start }; return this; }
  setEffectivePeriodEnd(end: string): this {
    const existing = (this.data['effectivePeriod'] as Record<string, any>) ?? {};
    this.data['effectivePeriod'] = { ...existing, end };
    return this;
  }
  setValueQuantity(value: Quantity): this { this.data['valueQuantity'] = value.toArray(); return this; }
  setValueCodeableConcept(value: CodeableConcept): this { this.data['valueCodeableConcept'] = value.toArray(); return this; }
  setValueString(value: string): this { this.data['valueString'] = value; return this; }
  setValueBoolean(value: boolean): this { this.data['valueBoolean'] = value; return this; }
  setValueInteger(value: number): this { this.data['valueInteger'] = value; return this; }
  setValueRange(value: Range): this { this.data['valueRange'] = value.toArray(); return this; }
  setValueRatio(value: Ratio): this { this.data['valueRatio'] = value.toArray(); return this; }
  setValueTime(value: string): this { this.data['valueTime'] = value; return this; }
  setValueDateTime(value: string): this { this.data['valueDateTime'] = value; return this; }
  setValuePeriod(value: Period): this { this.data['valuePeriod'] = value.toArray(); return this; }
  addInterpretation(interpretation: CodeableConcept): this {
    this.data['interpretation'] = this.data['interpretation'] || [];
    this.data['interpretation'].push(interpretation.toArray());
    return this;
  }
  addNote(note: Annotation): this {
    this.data['note'] = this.data['note'] || [];
    this.data['note'].push(note.toArray());
    return this;
  }
  addBodySite(bodySite: CodeableConcept): this {
    this.data['bodySite'] = this.data['bodySite'] || [];
    this.data['bodySite'].push(bodySite.toArray());
    return this;
  }
  setMethod(method: CodeableConcept): this { this.data['method'] = method.toArray(); return this; }
  setSpecimen(specimen: Reference): this { this.data['specimen'] = specimen.toArray(); return this; }
  setDevice(device: Reference): this { this.data['device'] = device.toArray(); return this; }
  addReferenceRange(low?: Quantity, high?: Quantity, type?: CodeableConcept, text?: string): this {
    const range: Record<string, any> = {};
    if (low !== undefined) range['low'] = low.toArray();
    if (high !== undefined) range['high'] = high.toArray();
    if (type !== undefined) range['type'] = type.toArray();
    if (text !== undefined) range['text'] = text;
    this.data['referenceRange'] = this.data['referenceRange'] || [];
    this.data['referenceRange'].push(Object.fromEntries(Object.entries(range).filter(([, v]) => v !== undefined)));
    return this;
  }
  addComponent(code: CodeableConcept, value: Quantity | CodeableConcept | Range | Ratio | string | number | boolean): this {
    const component: Record<string, any> = { code: code.toArray() };
    if (value instanceof Quantity) component['valueQuantity'] = value.toArray();
    else if (value instanceof CodeableConcept) component['valueCodeableConcept'] = value.toArray();
    else if (value instanceof Range) component['valueRange'] = value.toArray();
    else if (value instanceof Ratio) component['valueRatio'] = value.toArray();
    else if (typeof value === 'string') component['valueString'] = value;
    else if (typeof value === 'number') component['valueInteger'] = value;
    else if (typeof value === 'boolean') component['valueBoolean'] = value;
    this.data['component'] = this.data['component'] || [];
    this.data['component'].push(component);
    return this;
  }
  addExtension(url: string, value: unknown, valueType?: string): this {
    const extension: Record<string, any> = { url };
    if (valueType !== undefined) {
      extension['value' + valueType.charAt(0).toUpperCase() + valueType.slice(1)] = value;
    } else {
      extension['valueString'] = typeof value === 'string' ? value : value;
    }
    this.data['extension'] = this.data['extension'] || [];
    this.data['extension'].push(extension);
    return this;
  }
}
