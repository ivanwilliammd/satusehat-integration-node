/** DiagnosticReport FHIR R4 Resource Builder */
import { CodeableConcept, Identifier, Reference } from '../datatype/datatypes';

export class DiagnosticReport {
  private data: Record<string, any> = { resourceType: 'DiagnosticReport' };

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
  setIssued(instant: string): this { this.data['issued'] = instant; return this; }
  addPerformer(performer: Reference): this {
    this.data['performer'] = this.data['performer'] || [];
    this.data['performer'].push(performer.toArray());
    return this;
  }
  addResult(result: Reference): this {
    this.data['result'] = this.data['result'] || [];
    this.data['result'].push(result.toArray());
    return this;
  }
  addSpecimen(specimen: Reference): this {
    this.data['specimen'] = this.data['specimen'] || [];
    this.data['specimen'].push(specimen.toArray());
    return this;
  }
  addConclusionCode(conclusionCode: CodeableConcept): this {
    this.data['conclusionCode'] = this.data['conclusionCode'] || [];
    this.data['conclusionCode'].push(conclusionCode.toArray());
    return this;
  }
  addBasedOn(basedOn: Reference): this {
    this.data['basedOn'] = this.data['basedOn'] || [];
    this.data['basedOn'].push(basedOn.toArray());
    return this;
  }
  setConclusion(conclusion: string): this { this.data['conclusion'] = conclusion; return this; }
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
