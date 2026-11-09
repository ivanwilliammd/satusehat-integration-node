export class ServiceRequestParser {
  private serviceRequest: Record<string, any>;

  constructor(serviceRequest: Record<string, any> = {}) {
    this.serviceRequest = serviceRequest ?? {};
  }

  getIdentifiers(): any {
    return this.serviceRequest['identifier'] ?? null;
  }

  getRequisition(): any {
    return this.serviceRequest['requisition'] ?? null;
  }

  getStatus(): any {
    return this.serviceRequest['status'] ?? null;
  }

  getIntent(): any {
    return this.serviceRequest['intent'] ?? null;
  }

  getCategories(): any {
    return this.serviceRequest['category'] ?? null;
  }

  getPriority(): any {
    return this.serviceRequest['priority'] ?? null;
  }

  getDoNotPerform(): any {
    return this.serviceRequest['doNotPerform'] ?? null;
  }

  getCode(): any {
    return this.serviceRequest['code'] ?? null;
  }

  getQuantityQuantity(): any {
    return this.serviceRequest['quantityQuantity'] ?? null;
  }

  getSubjectReference(): any {
    return this.serviceRequest['subject']?.['reference'] ?? null;
  }

  getSubjectDisplay(): any {
    return this.serviceRequest['subject']?.['display'] ?? null;
  }

  getEncounterReference(): string | null {
    return this.removePrefix(this.serviceRequest['encounter']?.['reference'] ?? null, 'Encounter/');
  }

  getEncounterDisplay(): any {
    return this.serviceRequest['encounter']?.['display'] ?? null;
  }

  getOccurrenceDateTime(): any {
    return this.serviceRequest['occurrenceDateTime'] ?? null;
  }

  getAuthoredOn(): any {
    return this.serviceRequest['authoredOn'] ?? null;
  }

  getRequesterReference(): any {
    return this.serviceRequest['requester']?.['reference'] ?? null;
  }

  getRequesterDisplay(): any {
    return this.serviceRequest['requester']?.['display'] ?? null;
  }

  getPerformers(): any {
    return this.serviceRequest['performer'] ?? null;
  }

  getReasonCodes(): any {
    return this.serviceRequest['reasonCode'] ?? null;
  }

  getSupportingInfo(): any {
    return this.serviceRequest['supportingInfo'] ?? null;
  }

  getSpecimens(): any {
    return this.serviceRequest['specimen'] ?? null;
  }

  getNotes(): any {
    return this.serviceRequest['note'] ?? null;
  }

  getPatientInstruction(): any {
    return this.serviceRequest['patientInstruction'] ?? null;
  }

  getRelevantHistory(): any {
    return this.serviceRequest['relevantHistory'] ?? null;
  }

  private removePrefix(value: string | null, prefix: string): string | null {
    if (value && typeof value === 'string' && value.startsWith(prefix)) {
      return value.slice(prefix.length);
    }
    return value;
  }
}
