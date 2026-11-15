/** ChargeItemDefinition FHIR R4 Resource Builder */
import { CodeableConcept } from '../datatype/datatypes';
import { konsep, rujuk } from './datatypeInput';

export class ChargeItemDefinition {
  private data: Record<string, any> = { resourceType: 'ChargeItemDefinition' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  setUrl(url: string): this { this.data['url'] = url; return this; }
  setVersion(version: string): this { this.data['version'] = version; return this; }
  setName(name: string): this { this.data['name'] = name; return this; }
  setTitle(title: string): this { this.data['title'] = title; return this; }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setDate(date: string): this { this.data['date'] = date; return this; }
  setPublisher(publisher: string): this { this.data['publisher'] = publisher; return this; }
  setDescription(description: string): this { this.data['description'] = description; return this; }
  setCode(code: any, kode?: string, display?: string): this { this.data['code'] = konsep(code, kode, display); return this; }

  addIdentifier(system: string, value: string): this {
    if (!Array.isArray(this.data['identifier'])) this.data['identifier'] = [];
    this.data['identifier'].push({ system, value });
    return this;
  }

  /** Quirk kanon: `display` dan `timingDateTime` ditulis di tingkat instance, bukan di dalam Reference. */
  addInstance(reference: string | null = null, display: string | null = null, timingDateTime: string | null = null): this {
    const instance: Record<string, any> = {};
    if (reference) instance['reference'] = { reference };
    if (display !== null) instance['display'] = display;
    if (timingDateTime !== null) instance['timingDateTime'] = timingDateTime;
    if (!Array.isArray(this.data['instance'])) this.data['instance'] = [];
    this.data['instance'].push(instance);
    return this;
  }

  addProperty(codeSystem: string, codeValue: string, valueString: string): this {
    if (!Array.isArray(this.data['property'])) this.data['property'] = [];
    this.data['property'].push({ code: { coding: [{ system: codeSystem, code: codeValue }] }, valueString });
    return this;
  }

  /** Meniru `'applies' . ucfirst(...)`: membentuk appliesDateTime, appliesAge, dst. */
  addApplies(appliesType: string, value: any): this {
    this.data[`applies${appliesType[0].toUpperCase()}${appliesType.slice(1)}`] = value;
    return this;
  }
}
