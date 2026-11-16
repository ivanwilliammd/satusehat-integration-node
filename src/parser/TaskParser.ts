export class TaskParser {
  private task: Record<string, any>;

  constructor(task: Record<string, any> = {}) {
    this.task = task ?? {};
  }

  getIdentifiers(): any {
    return this.task['identifier'] ?? null;
  }

  getInstantiatesUri(): any {
    return this.task['instantiatesUri'] ?? null;
  }

  getStatus(): any {
    return this.task['status'] ?? null;
  }

  getIntent(): any {
    return this.task['intent'] ?? null;
  }

  getPriority(): any {
    return this.task['priority'] ?? null;
  }

  getDescription(): any {
    return this.task['description'] ?? null;
  }

  getFor(): any {
    return this.task['for'] ?? null;
  }

  getForReference(): string | null {
    return this.removePrefix(this.task['for']?.['reference'] ?? null, 'Patient/');
  }

  getEncounter(): any {
    return this.task['encounter'] ?? null;
  }

  getEncounterReference(): string | null {
    return this.removePrefix(this.task['encounter']?.['reference'] ?? null, 'Encounter/');
  }

  getAuthoredOn(): any {
    return this.task['authoredOn'] ?? null;
  }

  getRequester(): any {
    return this.task['requester'] ?? null;
  }

  getRequesterReference(): string | null {
    return this.removePrefix(this.task['requester']?.['reference'] ?? null, 'Practitioner/');
  }

  getInputs(): any {
    return this.task['input'] ?? null;
  }

  private removePrefix(value: string | null, prefix: string): string | null {
    if (value && typeof value === 'string' && value.startsWith(prefix)) {
      return value.slice(prefix.length);
    }
    return value;
  }

  getId(): any {
    return this.task?.['id'] ?? null;
  }

  getIdentifier(): any {
    return this.task?.['identifier'] ?? null;
  }

  getInstantiatesCanonical(): any {
    return this.task?.['instantiatesCanonical'] ?? null;
  }

  getStatusReason(): any {
    return this.task?.['statusReason'] ?? null;
  }

  getBusinessStatus(): any {
    return this.task?.['businessStatus'] ?? null;
  }

  getCode(): any {
    return this.task?.['code'] ?? null;
  }

  getFocus(): any {
    return this.task?.['focus'] ?? null;
  }

  getExecutionPeriod(): any {
    return this.task?.['executionPeriod'] ?? null;
  }

  getLastModified(): any {
    return this.task?.['lastModified'] ?? null;
  }

  getOwner(): any {
    return this.task?.['owner'] ?? null;
  }

  getLocation(): any {
    return this.task?.['location'] ?? null;
  }

  getReasonCode(): any {
    return this.task?.['reasonCode'] ?? null;
  }

  getReasonReference(): any {
    return this.task?.['reasonReference'] ?? null;
  }

  getInput(): any {
    return this.task?.['input'] ?? null;
  }

  getOutput(): any {
    return this.task?.['output'] ?? null;
  }

  getRestriction(): any {
    return this.task?.['restriction'] ?? null;
  }

  getNote(): any {
    return this.task?.['note'] ?? null;
  }

  getExtension(): any {
    return this.task?.['extension'] ?? null;
  }
}
