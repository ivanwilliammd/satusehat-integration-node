/** ChargeItemDefinition FHIR R4 Resource Builder */
import { CodeableConcept } from '../datatype/datatypes';

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
  setCode(code: CodeableConcept): this { this.data['code'] = (code as any).toArray(); return this; }
}
