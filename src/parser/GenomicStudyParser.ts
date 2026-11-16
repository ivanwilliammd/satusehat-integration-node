export class GenomicStudyParser {
  private genomicStudy: Record<string, any>;

  constructor(genomicStudy: Record<string, any> = {}) {
    this.genomicStudy = genomicStudy ?? {};
  }

  getIdentifiers(): any {
    return this.genomicStudy['identifier'] ?? null;
  }

  getStatus(): any {
    return this.genomicStudy['status'] ?? null;
  }

  getTypes(): any {
    return this.genomicStudy['type'] ?? null;
  }

  getSubjectReference(): any {
    return this.genomicStudy['subject']?.['reference'] ?? null;
  }

  getEncounterReference(): any {
    return this.genomicStudy['encounter']?.['reference'] ?? null;
  }

  getStartDate(): any {
    return this.genomicStudy['startDate'] ?? null;
  }

  getBasedOnReferences(): any {
    return this.genomicStudy['basedOn'] ?? null;
  }

  getReferrerReference(): any {
    return this.genomicStudy['referrer']?.['reference'] ?? null;
  }

  getInterpreterReferences(): any {
    return this.genomicStudy['interpreter'] ?? null;
  }

  getReasons(): any {
    return this.genomicStudy['reason'] ?? null;
  }

  getNotes(): any {
    return this.genomicStudy['note'] ?? null;
  }

  getDescription(): any {
    return this.genomicStudy['description'] ?? null;
  }

  getAnalyses(): any {
    return this.genomicStudy['analysis'] ?? null;
  }

  getPerformers(): any {
    return this.genomicStudy['performer'] ?? null;
  }

  getId(): any {
    return this.genomicStudy?.['id'] ?? null;
  }

  getIdentifier(): any {
    return this.genomicStudy?.['identifier'] ?? null;
  }

  getType(): any {
    return this.genomicStudy?.['type'] ?? null;
  }

  getSubject(): any {
    return this.genomicStudy?.['subject'] ?? null;
  }

  getEncounter(): any {
    return this.genomicStudy?.['encounter'] ?? null;
  }

  getBasedOn(): any {
    return this.genomicStudy?.['basedOn'] ?? null;
  }

  getReferrer(): any {
    return this.genomicStudy?.['referrer'] ?? null;
  }

  getInterpreter(): any {
    return this.genomicStudy?.['interpreter'] ?? null;
  }

  getReason(): any {
    return this.genomicStudy?.['reason'] ?? null;
  }

  getNote(): any {
    return this.genomicStudy?.['note'] ?? null;
  }

  getAnalysis(): any {
    return this.genomicStudy?.['analysis'] ?? null;
  }

  getPerformer(): any {
    return this.genomicStudy?.['performer'] ?? null;
  }

  getMeta(): any {
    return this.genomicStudy?.['meta'] ?? null;
  }
}
