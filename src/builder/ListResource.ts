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
}
