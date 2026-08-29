/** QuestionnaireResponse FHIR R4 Resource Builder */
import { Reference } from '../datatype/datatypes';

export class QuestionnaireResponseBuilder {
  private data: Record<string, any> = { resourceType: 'QuestionnaireResponse' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setStatus(status: string): this { this.data['status'] = status; return this; }
  setQuestionnaire(reference: string): this { this.data['questionnaire'] = { reference }; return this; }
  setSubject(ref: Reference): this { this.data['subject'] = (ref as any).toArray(); return this; }
  setEncounter(ref: Reference): this { this.data['encounter'] = (ref as any).toArray(); return this; }
  setAuthored(dt: string): this { this.data['authored'] = dt; return this; }
  setAuthor(ref: Reference): this { this.data['author'] = (ref as any).toArray(); return this; }
}
