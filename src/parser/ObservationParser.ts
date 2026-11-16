export class ObservationParser {
  private observation: Record<string, any>;

  constructor(observation: Record<string, any> = {}) {
    this.observation = observation ?? {};
  }

  getStatus(): any {
    return this.observation['status'] ?? null;
  }

  getCategories(): any {
    return this.observation['category'] ?? null;
  }

  getCode(): any {
    return this.observation['code'] ?? null;
  }

  getSubject(): any {
    return this.observation['subject'] ?? null;
  }

  getSubjectReference(): string | null {
    return this.removePrefix(this.observation['subject']?.['reference'] ?? null, 'Patient/');
  }

  getEncounter(): any {
    return this.observation['encounter'] ?? null;
  }

  getEncounterReference(): string | null {
    return this.removePrefix(this.observation['encounter']?.['reference'] ?? null, 'Encounter/');
  }

  getEffectiveDateTime(): any {
    return this.observation['effectiveDateTime'] ?? null;
  }

  getIssued(): any {
    return this.observation['issued'] ?? null;
  }

  getPerformers(): any {
    return this.observation['performer'] ?? null;
  }

  getPerformerReferences(): Array<string | null> {
    const performers = this.observation['performer'] ?? [];
    return (Array.isArray(performers) ? performers : []).map((performer: any) =>
      this.removePrefix(performer?.['reference'] ?? null, 'Practitioner/')
    );
  }

  getValueQuantity(): any {
    return this.observation['valueQuantity'] ?? null;
  }

  getValueString(): any {
    return this.observation['valueString'] ?? null;
  }

  getValueCodeableConcept(): any {
    return this.observation['valueCodeableConcept'] ?? null;
  }

  getBasedOn(): any {
    return this.observation['basedOn'] ?? null;
  }

  getSpecimen(): any {
    return this.observation['specimen'] ?? null;
  }

  getSpecimenReference(): string | null {
    return this.removePrefix(this.observation['specimen']?.['reference'] ?? null, 'Specimen/');
  }

  getInterpretations(): any {
    return this.observation['interpretation'] ?? null;
  }

  getReferenceRanges(): any {
    return this.observation['referenceRange'] ?? null;
  }

  getDerivedFrom(): any {
    return this.observation['derivedFrom'] ?? null;
  }

  getComponents(): any {
    return this.observation['component'] ?? null;
  }

  getIdentifiers(): any {
    return this.observation['identifier'] ?? null;
  }

  getPartOf(): any {
    return this.observation['partOf'] ?? null;
  }

  getMethod(): any {
    return this.observation['method'] ?? null;
  }

  getNote(): any {
    return this.observation['note'] ?? null;
  }

  private removePrefix(value: string | null, prefix: string): string | null {
    if (value && typeof value === 'string' && value.startsWith(prefix)) {
      return value.slice(prefix.length);
    }
    return value;
  }

  getId(): any {
    return this.observation?.['id'] ?? null;
  }

  getIdentifier(): any {
    return this.observation?.['identifier'] ?? null;
  }

  getCategory(): any {
    return this.observation?.['category'] ?? null;
  }

  getEffectivePeriod(): any {
    return this.observation?.['effectivePeriod'] ?? null;
  }

  getEffectiveInstant(): any {
    return this.observation?.['effectiveInstant'] ?? null;
  }

  getValueBoolean(): any {
    return this.observation?.['valueBoolean'] ?? null;
  }

  getValueInteger(): any {
    return this.observation?.['valueInteger'] ?? null;
  }

  getValueRange(): any {
    return this.observation?.['valueRange'] ?? null;
  }

  getValueRatio(): any {
    return this.observation?.['valueRatio'] ?? null;
  }

  getValueTime(): any {
    return this.observation?.['valueTime'] ?? null;
  }

  getValueDateTime(): any {
    return this.observation?.['valueDateTime'] ?? null;
  }

  getValuePeriod(): any {
    return this.observation?.['valuePeriod'] ?? null;
  }

  getInterpretation(): any {
    return this.observation?.['interpretation'] ?? null;
  }

  getBodySite(): any {
    return this.observation?.['bodySite'] ?? null;
  }

  getDevice(): any {
    return this.observation?.['device'] ?? null;
  }

  getReferenceRange(): any {
    return this.observation?.['referenceRange'] ?? null;
  }

  getComponent(): any {
    return this.observation?.['component'] ?? null;
  }

  getExtension(): any {
    return this.observation?.['extension'] ?? null;
  }

  getEffectiveTiming(): any {
    return this.observation?.['effectiveTiming'] ?? null;
  }
}
