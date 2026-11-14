/** CareTeam FHIR R4 Resource Builder — mirrors PayloadBuilderCareTeam in the PHP SDK. */
import { CodeableConcept, Reference } from '../datatype/datatypes';

export class CareTeam {
  private data: Record<string, any> = { resourceType: 'CareTeam' };

  private set(k: string, v: any): void { this.data[k] = v; }

  private push(k: string, v: any): void {
    if (!Array.isArray(this.data[k])) this.data[k] = [];
    this.data[k].push(v);
  }

  setId(id: string): this { this.set('id', id); return this; }

  /** system, value, use, typeCode, typeDisplay — display default ke code, seperti PHP. */
  addIdentifier(system: string, value: string, use?: string, typeCode?: string, typeDisplay?: string): this {
    const ident: Record<string, any> = { system, value };
    if (use !== undefined) ident.use = use;
    if (typeCode !== undefined) {
      ident.type = {
        coding: [{
          system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
          code: typeCode,
          display: typeDisplay ?? typeCode,
        }],
      };
    }
    this.push('identifier', ident);
    return this;
  }

  setStatus(status: string): this { this.set('status', status); return this; }

  setCode(code: CodeableConcept | { system: string; code: string; display: string }): this {
    this.set('code', 'toArray' in code ? code.toArray() : { coding: [{ system: code.system, code: code.code, display: code.display }] });
    return this;
  }

  setSubject(reference: string | Reference, display?: string): this {
    if (typeof reference !== 'string') { this.set('subject', reference.toArray()); return this; }
    const ref: Record<string, any> = { reference };
    if (display !== undefined) ref.display = display;
    this.set('subject', ref);
    return this;
  }

  setEncounter(reference: string | Reference): this {
    this.set('encounter', typeof reference === 'string' ? { reference } : reference.toArray());
    return this;
  }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}
