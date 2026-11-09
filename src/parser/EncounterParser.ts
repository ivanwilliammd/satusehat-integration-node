export class EncounterParser {
  private encounter: Record<string, any>;

  constructor(encounter: Record<string, any> = {}) {
    this.encounter = encounter ?? {};
  }

  getStatus(): any {
    return this.encounter['status'] ?? null;
  }

  getLocations(): any {
    return this.encounter['location'] ?? null;
  }

  getLocationReferences(): Array<string | null> {
    const locations = this.encounter['location'] ?? [];
    return (Array.isArray(locations) ? locations : []).map((location: any) =>
      this.removePrefix(location?.['location']?.['reference'] ?? null, 'Location/')
    );
  }

  getLocationDisplays(): Array<string | null> {
    const locations = this.encounter['location'] ?? [];
    return (Array.isArray(locations) ? locations : []).map(
      (location: any) => location?.['location']?.['display'] ?? null
    );
  }

  getSubject(): any {
    return this.encounter['subject'] ?? null;
  }

  getSubjectReference(): string | null {
    return this.removePrefix(this.encounter['subject']?.['reference'] ?? null, 'Patient/');
  }

  getSubjectDisplay(): any {
    return this.encounter['subject']?.['display'] ?? null;
  }

  getParticipants(): any {
    return this.encounter['participant'] ?? null;
  }

  getParticipantReferences(): Array<string | null> {
    const participants = this.encounter['participant'] ?? [];
    return (Array.isArray(participants) ? participants : []).map((participant: any) =>
      this.removePrefix(participant?.['individual']?.['reference'] ?? null, 'Practitioner/')
    );
  }

  getParticipantDisplays(): Array<string | null> {
    const participants = this.encounter['participant'] ?? [];
    return (Array.isArray(participants) ? participants : []).map(
      (participant: any) => participant?.['individual']?.['display'] ?? null
    );
  }

  getDiagnosis(): any {
    return this.encounter['diagnosis'] ?? null;
  }

  getDiagnosisReferences(): Array<string | null> {
    const diagnoses = this.encounter['diagnosis'] ?? [];
    return (Array.isArray(diagnoses) ? diagnoses : []).map((diagnosis: any) =>
      this.removePrefix(diagnosis?.['condition']?.['reference'] ?? null, 'Condition/')
    );
  }

  getDiagnosisDisplays(): Array<string | null> {
    const diagnoses = this.encounter['diagnosis'] ?? [];
    return (Array.isArray(diagnoses) ? diagnoses : []).map(
      (diagnosis: any) => diagnosis?.['condition']?.['display'] ?? null
    );
  }

  getRegistrationIds(): Array<string | null> {
    const identifiers = this.encounter['identifier'] ?? [];
    return (Array.isArray(identifiers) ? identifiers : []).map(
      (identifier: any) => identifier?.['value'] ?? null
    );
  }

  getStatusHistory(): any {
    return this.encounter['statusHistory'] ?? null;
  }

  getConsultationMethod(): any {
    return this.encounter['class'] ?? null;
  }

  getServiceProvider(): any {
    return this.encounter['serviceProvider'] ?? null;
  }

  getPeriod(): any {
    return this.encounter['period'] ?? null;
  }

  getPeriodStart(): any {
    return this.encounter['period']?.['start'] ?? null;
  }

  getPeriodEnd(): any {
    return this.encounter['period']?.['end'] ?? null;
  }

  private removePrefix(value: string | null, prefix: string): string | null {
    if (value && typeof value === 'string' && value.startsWith(prefix)) {
      return value.slice(prefix.length);
    }
    return value;
  }
}
