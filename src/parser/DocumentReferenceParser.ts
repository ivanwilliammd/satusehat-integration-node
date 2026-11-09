export class DocumentReferenceParser {
  private documentReference: Record<string, any>;

  constructor(documentReference: Record<string, any> = {}) {
    this.documentReference = documentReference ?? {};
  }

  getIdentifiers(): any {
    return this.documentReference['identifier'] ?? null;
  }

  getMasterIdentifier(): any {
    return this.documentReference['masterIdentifier'] ?? null;
  }

  getStatus(): any {
    return this.documentReference['status'] ?? null;
  }

  getDocStatus(): any {
    return this.documentReference['docStatus'] ?? null;
  }

  getTypes(): any {
    return this.documentReference['type'] ?? null;
  }

  getCategories(): any {
    return this.documentReference['category'] ?? null;
  }

  getSubjectReference(): any {
    return this.documentReference['subject']?.['reference'] ?? null;
  }

  getDate(): any {
    return this.documentReference['date'] ?? null;
  }

  getAuthors(): any {
    return this.documentReference['author'] ?? null;
  }

  getCustodianReference(): any {
    return this.documentReference['custodian']?.['reference'] ?? null;
  }

  getRelatesTo(): any {
    return this.documentReference['relatesTo'] ?? null;
  }

  getDescription(): any {
    return this.documentReference['description'] ?? null;
  }

  getSecurityLabels(): any {
    return this.documentReference['securityLabel'] ?? null;
  }

  getContents(): any {
    return this.documentReference['content'] ?? null;
  }

  getContext(): any {
    return this.documentReference['context'] ?? null;
  }
}
