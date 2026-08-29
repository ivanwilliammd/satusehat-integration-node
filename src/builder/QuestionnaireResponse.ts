/** QuestionnaireResponse FHIR R4 Resource Builder */
import { CodeableConcept, Reference } from '../datatype/datatypes';

export class QuestionnaireResponse {
  private data: Record<string, any> = { resourceType: 'QuestionnaireResponse' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  setStatus(status = 'completed'): this { this.data['status'] = status; return this; }
  setQuestionnaire(questionnaire: string): this { this.data['questionnaire'] = questionnaire; return this; }
  setSubject(subject: Reference): this { this.data['subject'] = subject.toArray(); return this; }
  setEncounter(encounter: Reference): this { this.data['encounter'] = encounter.toArray(); return this; }
  setAuthored(dateTime: string): this { this.data['authored'] = dateTime; return this; }
  setAuthor(author: Reference): this { this.data['author'] = author.toArray(); return this; }
  setSource(source: Reference): this { this.data['source'] = source.toArray(); return this; }
  addItem(linkId: string, text?: string, answer?: CodeableConcept): this {
    const item: Record<string, any> = { linkId };
    if (text !== undefined) item['text'] = text;
    if (answer !== undefined) item['answer'] = [{ ...answer.toArray() }];
    this.data['item'] = this.data['item'] || [];
    this.data['item'].push(item);
    return this;
  }
}
