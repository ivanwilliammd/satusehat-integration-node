export class RiskAssessmentParser {
  private riskAssessment: Record<string, any>;

  constructor(riskAssessment: Record<string, any> = {}) {
    this.riskAssessment = riskAssessment ?? {};
  }

  getStatus(): any {
    return this.riskAssessment['status'] ?? null;
  }

  getIdentifiers(): any {
    return this.riskAssessment['identifier'] ?? null;
  }

  getCode(): any {
    return this.riskAssessment['code'] ?? null;
  }

  getSubject(): any {
    return this.riskAssessment['subject'] ?? null;
  }

  getSubjectReference(): string | null {
    return this.removePrefix(this.riskAssessment['subject']?.['reference'] ?? null, 'Patient/');
  }

  getEncounter(): any {
    return this.riskAssessment['encounter'] ?? null;
  }

  getEncounterReference(): string | null {
    return this.removePrefix(this.riskAssessment['encounter']?.['reference'] ?? null, 'Encounter/');
  }

  getOccurrenceDateTime(): any {
    return this.riskAssessment['occurrenceDateTime'] ?? null;
  }

  getCondition(): any {
    return this.riskAssessment['condition'] ?? null;
  }

  getConditionReference(): string | null {
    return this.removePrefix(this.riskAssessment['condition']?.['reference'] ?? null, 'Condition/');
  }

  getPerformer(): any {
    return this.riskAssessment['performer'] ?? null;
  }

  getPerformerReference(): string | null {
    return this.removePrefix(this.riskAssessment['performer']?.['reference'] ?? null, 'Practitioner/');
  }

  getReasonReferences(): any {
    return this.riskAssessment['reasonReference'] ?? null;
  }

  getBasis(): any {
    return this.riskAssessment['basis'] ?? null;
  }

  getPredictions(): any {
    return this.riskAssessment['prediction'] ?? null;
  }

  getMitigation(): any {
    return this.riskAssessment['mitigation'] ?? null;
  }

  getNotes(): any {
    return this.riskAssessment['note'] ?? null;
  }

  private removePrefix(value: string | null, prefix: string): string | null {
    if (value && typeof value === 'string' && value.startsWith(prefix)) {
      return value.slice(prefix.length);
    }
    return value;
  }
}
