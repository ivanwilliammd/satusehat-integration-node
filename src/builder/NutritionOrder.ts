/** NutritionOrder FHIR R4 Resource Builder */
import { Reference } from '../datatype/datatypes';

export class NutritionOrder {
  private data: Record<string, any> = { resourceType: 'NutritionOrder' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setStatus(status: string): this { this.data['status'] = status; return this; }
  setIntent(intent: string): this { this.data['intent'] = intent; return this; }
  setPatient(ref: Reference): this { this.data['patient'] = (ref as any).toArray(); return this; }
  setDateTime(dt: string): this { this.data['dateTime'] = dt; return this; }
  setOrderer(ref: Reference): this { this.data['orderer'] = (ref as any).toArray(); return this; }
}
