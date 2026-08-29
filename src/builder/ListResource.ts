/** ListResource FHIR R4 Resource Builder */
import { CodeableConcept, Identifier, Reference } from '../datatype/datatypes';

export class ListResource {
  private data: Record<string, any> = { resourceType: 'ListResource' };

  setId(id: string): this { this.data['id'] = id; return this; }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setMode(mode: string): this { this.data['mode'] = mode; return this; }
  setTitle(title: string): this { this.data['title'] = title; return this; }
  setCode(code: CodeableConcept): this { this.data['code'] = code.toArray(); return this; }
  setSubject(ref: Reference): this { this.data['subject'] = ref.toArray(); return this; }
  setEncounter(ref: Reference): this { this.data['encounter'] = ref.toArray(); return this; }
  addNote(text: string): this { this.data['note'] = this.data['note'] || []; this.data['note'].push({ text }); return this; }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}
