export class DiagnosticReportParser {
  private diagnosticReport: Record<string, any>;

  constructor(diagnosticReport: Record<string, any> = {}) {
    this.diagnosticReport = diagnosticReport ?? {};
  }

  getIdentifiers(): any {
    return this.diagnosticReport['identifier'] ?? null;
  }

  getStatus(): any {
    return this.diagnosticReport['status'] ?? null;
  }

  getCategories(): any {
    return this.diagnosticReport['category'] ?? null;
  }

  getCode(): any {
    return this.diagnosticReport['code'] ?? null;
  }

  getSubject(): any {
    return this.diagnosticReport['subject'] ?? null;
  }

  getSubjectReference(): string | null {
    return this.removePrefix(this.diagnosticReport['subject']?.['reference'] ?? null, 'Patient/');
  }

  getEncounter(): any {
    return this.diagnosticReport['encounter'] ?? null;
  }

  getEncounterReference(): string | null {
    return this.removePrefix(this.diagnosticReport['encounter']?.['reference'] ?? null, 'Encounter/');
  }

  getEffectiveDateTime(): any {
    return this.diagnosticReport['effectiveDateTime'] ?? null;
  }

  getIssued(): any {
    return this.diagnosticReport['issued'] ?? null;
  }

  getPerformers(): any {
    return this.diagnosticReport['performer'] ?? null;
  }

  getPerformerReferences(): Array<string | null> {
    const performers = this.diagnosticReport['performer'] ?? [];
    return (Array.isArray(performers) ? performers : []).map((performer: any) =>
      this.removePrefix(performer?.['reference'] ?? null, 'Practitioner/')
    );
  }

  getResults(): any {
    return this.diagnosticReport['result'] ?? null;
  }

  getResultReferences(): Array<string | null> {
    const results = this.diagnosticReport['result'] ?? [];
    return (Array.isArray(results) ? results : []).map((result: any) =>
      this.removePrefix(result?.['reference'] ?? null, 'Observation/')
    );
  }

  getSpecimens(): any {
    return this.diagnosticReport['specimen'] ?? null;
  }

  getSpecimenReferences(): Array<string | null> {
    const specimens = this.diagnosticReport['specimen'] ?? [];
    return (Array.isArray(specimens) ? specimens : []).map((specimen: any) =>
      this.removePrefix(specimen?.['reference'] ?? null, 'Specimen/')
    );
  }

  getConclusionCodes(): any {
    return this.diagnosticReport['conclusionCode'] ?? null;
  }

  getBasedOn(): any {
    return this.diagnosticReport['basedOn'] ?? null;
  }

  getConclusion(): any {
    return this.diagnosticReport['conclusion'] ?? null;
  }

  private removePrefix(value: string | null, prefix: string): string | null {
    if (value && typeof value === 'string' && value.startsWith(prefix)) {
      return value.slice(prefix.length);
    }
    return value;
  }
}
