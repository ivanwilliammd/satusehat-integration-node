/** DocumentReference FHIR R4 Resource Builder — mirrors PayloadBuilderDocumentReference in PHP. */
import { Attachment, CodeableConcept, Identifier, Reference } from '../datatype/datatypes';

export class DocumentReference {
  private data: Record<string, any> = { resourceType: 'DocumentReference' };

  private set(k: string, v: any): void { this.data[k] = v; }

  private push(k: string, v: any): void {
    if (!Array.isArray(this.data[k])) this.data[k] = [];
    this.data[k].push(v);
  }

  setId(id: string): this { this.set('id', id); return this; }

  addIdentifier(identifier: Identifier): this { this.push('identifier', identifier.toArray()); return this; }

  setMasterIdentifier(identifier: Identifier): this { this.set('masterIdentifier', identifier.toArray()); return this; }

  setStatus(status: string): this { this.set('status', status); return this; }

  setDocStatus(docStatus: string): this { this.set('docStatus', docStatus); return this; }

  /** PHP menulis type sebagai daftar walau FHIR menyebut 0..1. */
  addType(type: CodeableConcept): this { this.push('type', type.toArray()); return this; }

  addCategory(category: CodeableConcept): this { this.push('category', category.toArray()); return this; }

  setSubject(subject: Reference): this { this.set('subject', subject.toArray()); return this; }

  setDate(date: string): this { this.set('date', date); return this; }

  addAuthor(author: Reference): this { this.push('author', author.toArray()); return this; }

  setCustodian(custodian: Reference): this { this.set('custodian', custodian.toArray()); return this; }

  addRelatesTo(code: string, target: Reference): this {
    this.push('relatesTo', { code, target: target.toArray() });
    return this;
  }

  setDescription(description: string): this { this.set('description', description); return this; }

  addSecurityLabel(label: CodeableConcept): this { this.push('securityLabel', label.toArray()); return this; }

  addContent(attachment: Attachment, format?: CodeableConcept): this {
    const content: Record<string, any> = { attachment: attachment.toArray() };
    if (format !== undefined) content.format = format.toArray();
    this.push('content', content);
    return this;
  }

  setContext(context: Record<string, any>): this { this.set('context', context); return this; }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}
