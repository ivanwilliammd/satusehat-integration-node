/** CareTeam FHIR R4 Resource Builder — mirrors PayloadBuilderCareTeam in the PHP SDK. */
import { CodeableConcept, Reference } from '../datatype/datatypes';
import { konsep, rujuk } from './datatypeInput';

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

  /** PHP menerima (system, code, display). Objek datatype tetap diterima. */
  setCode(code: any, kode?: string, display?: string): this {
    if (typeof code === 'string') {
      this.set('code', { coding: [{ system: code, code: kode ?? '', display: display ?? '' }] });
      return this;
    }
    // R4: code adalah CodeableConcept; objek polos {system,code} harus dibungkus coding.
    const tipe = typeof code?.toArray === 'function' ? code.toArray() : Array.isArray(code?.coding) ? code : { coding: [code] };
    this.set('code', tipe);
    return this;
  }

  setSubject(reference: string | Reference, display?: string): this {
    this.set('subject', rujuk(reference, display));
    return this;
  }

  setEncounter(reference: string | Reference): this {
    this.set('encounter', rujuk(reference));
    return this;
  }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}
