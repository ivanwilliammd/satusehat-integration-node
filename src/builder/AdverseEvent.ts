/** AdverseEvent FHIR R4 Resource Builder */
import { CodeableConcept, Reference } from '../datatype/datatypes';
import { konsep, rujuk } from './datatypeInput';

export class AdverseEventBuilder {
  private data: Record<string, any> = { resourceType: 'AdverseEvent' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setEventParticipant(actor: any): this { this.data['eventParticipant'] = rujuk(actor); return this; }
  setSubject(ref: any): this { this.data['subject'] = rujuk(ref); return this; }
  setEncounter(ref: any): this { this.data['encounter'] = rujuk(ref); return this; }
  setDate(dt: string): this { this.data['date'] = dt; return this; }
  setSeriousness(cc: any, code?: string, display?: string): this { this.data['seriousness'] = konsep(cc, code, display); return this; }
  setOutcome(cc: any, code?: string, display?: string): this { this.data['outcome'] = konsep(cc, code, display); return this; }

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

  setCode(system: string, code: string, display: string): this {
    this.data['code'] = { coding: [{ system, code, display }] };
    return this;
  }
}

/** Nama kanon `AdverseEvent`: seragam dengan modul lain. `AdverseEventBuilder` dipertahankan untuk pemanggil lama. */
export { AdverseEventBuilder as AdverseEvent };
