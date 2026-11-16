export class ProcedureParser {
  private procedure: Record<string, any>;

  constructor(procedure: Record<string, any> = {}) {
    this.procedure = procedure ?? {};
  }

  getIdentifiers(): any {
    return this.procedure['identifier'] ?? null;
  }

  getStatus(): any {
    return this.procedure['status'] ?? null;
  }

  getCategory(): any {
    return this.procedure['category'] ?? null;
  }

  getCode(): any {
    return this.procedure['code'] ?? null;
  }

  getSubject(): any {
    return this.procedure['subject'] ?? null;
  }

  getSubjectReference(): string | null {
    return this.removePrefix(this.procedure['subject']?.['reference'] ?? null, 'Patient/');
  }

  getSubjectDisplay(): any {
    return this.procedure['subject']?.['display'] ?? null;
  }

  getEncounter(): any {
    return this.procedure['encounter'] ?? null;
  }

  getEncounterReference(): string | null {
    return this.removePrefix(this.procedure['encounter']?.['reference'] ?? null, 'Encounter/');
  }

  getEncounterDisplay(): any {
    return this.procedure['encounter']?.['display'] ?? null;
  }

  getPerformers(): any {
    return this.procedure['performer'] ?? null;
  }

  getPerformerReferences(): Array<string | null> {
    const performers = this.procedure['performer'] ?? [];
    return (Array.isArray(performers) ? performers : []).map((performer: any) =>
      this.removePrefix(performer?.['actor']?.['reference'] ?? null, 'Practitioner/')
    );
  }

  getPerformerDisplays(): Array<string | null> {
    const performers = this.procedure['performer'] ?? [];
    return (Array.isArray(performers) ? performers : []).map(
      (performer: any) => performer?.['actor']?.['display'] ?? null
    );
  }

  getPerformedPeriod(): any {
    return this.procedure['performedPeriod'] ?? null;
  }

  getReasonCodes(): any {
    return this.procedure['reasonCode'] ?? null;
  }

  getBodySites(): any {
    return this.procedure['bodySite'] ?? null;
  }

  getNotes(): any {
    return this.procedure['note'] ?? null;
  }

  getUsedCodes(): any {
    return this.procedure['usedCode'] ?? null;
  }

  getBasedOn(): any {
    return this.procedure['basedOn'] ?? null;
  }

  getLocation(): string | null {
    return this.removePrefix(this.procedure['location']?.['reference'] ?? null, 'Location/');
  }

  private removePrefix(value: string | null, prefix: string): string | null {
    if (value && typeof value === 'string' && value.startsWith(prefix)) {
      return value.slice(prefix.length);
    }
    return value;
  }

  getId(): any {
    return this.procedure?.['id'] ?? null;
  }

  getIdentifier(): any {
    return this.procedure?.['identifier'] ?? null;
  }

  getPerformedDateTime(): any {
    return this.procedure?.['performedDateTime'] ?? null;
  }

  getPerformedString(): any {
    return this.procedure?.['performedString'] ?? null;
  }

  getPerformedAge(): any {
    return this.procedure?.['performedAge'] ?? null;
  }

  getPerformedRange(): any {
    return this.procedure?.['performedRange'] ?? null;
  }

  getPerformer(): any {
    return this.procedure?.['performer'] ?? null;
  }

  getReasonCode(): any {
    return this.procedure?.['reasonCode'] ?? null;
  }

  getReasonReference(): any {
    return this.procedure?.['reasonReference'] ?? null;
  }

  getOutcome(): any {
    return this.procedure?.['outcome'] ?? null;
  }

  getReport(): any {
    return this.procedure?.['report'] ?? null;
  }

  getFollowUp(): any {
    return this.procedure?.['followUp'] ?? null;
  }

  getNote(): any {
    return this.procedure?.['note'] ?? null;
  }

  getFocalDevice(): any {
    return this.procedure?.['focalDevice'] ?? null;
  }

  getUsedReference(): any {
    return this.procedure?.['usedReference'] ?? null;
  }

  getUsedCode(): any {
    return this.procedure?.['usedCode'] ?? null;
  }

  getBodySite(): any {
    return this.procedure?.['bodySite'] ?? null;
  }

  getExtension(): any {
    return this.procedure?.['extension'] ?? null;
  }
}
