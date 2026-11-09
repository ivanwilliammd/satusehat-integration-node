export class SpecimenParser {
  private specimen: Record<string, any>;

  constructor(specimen: Record<string, any> = {}) {
    this.specimen = specimen ?? {};
  }

  getIdentifiers(): any {
    return this.specimen['identifier'] ?? null;
  }

  getStatus(): any {
    return this.specimen['status'] ?? null;
  }

  getType(): any {
    return this.specimen['type'] ?? null;
  }

  getSubject(): any {
    return this.specimen['subject'] ?? null;
  }

  getSubjectReference(): string | null {
    return this.removePrefix(this.specimen['subject']?.['reference'] ?? null, 'Patient/');
  }

  getSubjectDisplay(): any {
    return this.specimen['subject']?.['display'] ?? null;
  }

  getReceivedTime(): any {
    return this.specimen['receivedTime'] ?? null;
  }

  getRequests(): any {
    return this.specimen['request'] ?? null;
  }

  getCollectedDateTime(): any {
    return this.specimen['collection']?.['collectedDateTime'] ?? null;
  }

  getCollector(): any {
    return this.specimen['collection']?.['collector'] ?? null;
  }

  getCollectorReference(): string | null {
    return this.removePrefix(this.specimen['collection']?.['collector']?.['reference'] ?? null, 'Practitioner/');
  }

  getCollectorDisplay(): any {
    return this.specimen['collection']?.['collector']?.['display'] ?? null;
  }

  getFastingStatus(): any {
    return this.specimen['collection']?.['fastingStatusCodeableConcept'] ?? null;
  }

  getMethod(): any {
    return this.specimen['collection']?.['method'] ?? null;
  }

  getQuantity(): any {
    return this.specimen['collection']?.['quantity'] ?? null;
  }

  getBodySite(): any {
    return this.specimen['collection']?.['bodySite'] ?? null;
  }

  getConditions(): any {
    return this.specimen['condition'] ?? null;
  }

  getExtensions(): any {
    return this.specimen['extension'] ?? null;
  }

  getProcessing(): any {
    return this.specimen['processing'] ?? null;
  }

  private removePrefix(value: string | null, prefix: string): string | null {
    if (value && typeof value === 'string' && value.startsWith(prefix)) {
      return value.slice(prefix.length);
    }
    return value;
  }
}
