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
}
