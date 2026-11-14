/** Procedure FHIR R4 Resource Builder */
import { Annotation, CodeableConcept, Identifier, Period, Range, Reference } from '../datatype/datatypes';

export class Procedure {
  private data: Record<string, any> = { resourceType: 'Procedure' };

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
  addBasedOn(basedOn: Reference): this {
    this.data['basedOn'] = this.data['basedOn'] || [];
    this.data['basedOn'].push(basedOn.toArray());
    return this;
  }

  setStatus(status: string): this { this.data['status'] = status; return this; }
  setCategory(category: CodeableConcept): this { this.data['category'] = category.toArray(); return this; }
  setCode(code: CodeableConcept): this { this.data['code'] = code.toArray(); return this; }
  setSubject(subject: Reference): this { this.data['subject'] = subject.toArray(); return this; }
  setEncounter(encounter: Reference): this { this.data['encounter'] = encounter.toArray(); return this; }
  setPerformedDateTime(dateTime: string): this { this.data['performedDateTime'] = dateTime; return this; }
  setPerformedPeriod(period: Period): this { this.data['performedPeriod'] = period.toArray(); return this; }
  setPerformedString(performedString: string): this { this.data['performedString'] = performedString; return this; }
  setPerformedAge(age: Range): this { this.data['performedAge'] = age.toArray(); return this; }
  setPerformedRange(range: Range): this { this.data['performedRange'] = range.toArray(); return this; }
  addPerformer(actor: Reference, fn?: CodeableConcept, onBehalfOf?: Reference): this {
    const performer: Record<string, any> = { actor: actor.toArray() };
    if (fn !== undefined) performer['function'] = fn.toArray();
    if (onBehalfOf !== undefined) performer['onBehalfOf'] = onBehalfOf.toArray();
    this.data['performer'] = this.data['performer'] || [];
    this.data['performer'].push(performer);
    return this;
  }
  addReasonCode(reasonCode: CodeableConcept): this {
    this.data['reasonCode'] = this.data['reasonCode'] || [];
    this.data['reasonCode'].push(reasonCode.toArray());
    return this;
  }

  addReasonReference(reasonReference: Reference): this {
    this.data['reasonReference'] = this.data['reasonReference'] || [];
    this.data['reasonReference'].push(reasonReference.toArray());
    return this;
  }

  setOutcome(outcome: CodeableConcept): this { this.data['outcome'] = outcome.toArray(); return this; }
  addReport(report: Reference): this {
    this.data['report'] = this.data['report'] || [];
    this.data['report'].push(report.toArray());
    return this;
  }
  addFollowUp(followUp: CodeableConcept): this {
    this.data['followUp'] = this.data['followUp'] || [];
    this.data['followUp'].push(followUp.toArray());
    return this;
  }
  addNote(note: Annotation | string): this {
    this.data['note'] = this.data['note'] || [];
    // Kanon PHP menerima Annotation|string; string menjadi {text}.
    this.data['note'].push(typeof note === 'string' ? { text: note } : note.toArray());
    return this;
  }
  addFocalDevice(action: CodeableConcept, device?: Reference, manufactureItem?: Reference): this {
    const focalDevice: Record<string, any> = { action: action.toArray() };
    if (device !== undefined) focalDevice['device'] = device.toArray();
    if (manufactureItem !== undefined) focalDevice['manufactureItem'] = manufactureItem.toArray();
    this.data['focalDevice'] = this.data['focalDevice'] || [];
    this.data['focalDevice'].push(focalDevice);
    return this;
  }
  addUsedReference(reference: Reference, type?: CodeableConcept): this {
    const used = reference.toArray() as Record<string, any>;
    if (type !== undefined) used['type'] = type.toArray();
    this.data['usedReference'] = this.data['usedReference'] || [];
    this.data['usedReference'].push(used);
    return this;
  }
  addUsedCode(usedCode: CodeableConcept): this {
    this.data['usedCode'] = this.data['usedCode'] || [];
    this.data['usedCode'].push(usedCode.toArray());
    return this;
  }
  addBodySite(bodySite: CodeableConcept): this {
    this.data['bodySite'] = this.data['bodySite'] || [];
    this.data['bodySite'].push(bodySite.toArray());
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
