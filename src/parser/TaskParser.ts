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
}
