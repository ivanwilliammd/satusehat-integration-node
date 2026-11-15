/** ListResource FHIR R4 Resource Builder */
import { CodeableConcept, Identifier, Reference } from '../datatype/datatypes';
import { konsep, rujuk } from './datatypeInput';

export class ListResource {
  private data: Record<string, any> = { resourceType: 'List' };

  setId(id: string): this { this.data['id'] = id; return this; }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setMode(mode: string): this { this.data['mode'] = mode; return this; }
  setTitle(title: string): this { this.data['title'] = title; return this; }
  setCode(code: any, kode?: string, display?: string): this { this.data['code'] = konsep(code, kode, display); return this; }
  setSubject(ref: any): this { this.data['subject'] = rujuk(ref); return this; }
  setEncounter(ref: any): this { this.data['encounter'] = rujuk(ref); return this; }
  addNote(text: string): this { this.data['note'] = this.data['note'] || []; this.data['note'].push({ text }); return this; }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  addIdentifier(system: string, value: string, use: string | null = null, typeCode: string | null = null, typeDisplay: string | null = null): this {
    const ident: Record<string, any> = { system, value };
    if (use !== null) ident['use'] = use;
    if (typeCode !== null) {
      ident['type'] = { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v2-0203', code: typeCode, display: typeDisplay ?? typeCode }] };
    }
    if (!Array.isArray(this.data['identifier'])) this.data['identifier'] = [];
    this.data['identifier'].push(ident);
    return this;
  }

  setDate(date: string): this { this.data['date'] = date; return this; }
}
