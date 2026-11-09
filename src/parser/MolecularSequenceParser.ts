export class MolecularSequenceParser {
  private molecularSequence: Record<string, any>;

  constructor(molecularSequence: Record<string, any> = {}) {
    this.molecularSequence = molecularSequence ?? {};
  }

  getText(): any {
    return this.molecularSequence['text'] ?? null;
  }

  getType(): any {
    return this.molecularSequence['type'] ?? null;
  }

  getCoordinateSystem(): any {
    return this.molecularSequence['coordinateSystem'] ?? null;
  }

  getPatientReference(): string | null {
    return this.removePrefix(this.molecularSequence['patient']?.['reference'] ?? null, 'Patient/');
  }

  getSpecimenReference(): string | null {
    return this.removePrefix(this.molecularSequence['specimen']?.['reference'] ?? null, 'Specimen/');
  }

  getDeviceReference(): string | null {
    return this.removePrefix(this.molecularSequence['device']?.['reference'] ?? null, 'Device/');
  }

  getPerformerReference(): string | null {
    return this.removePrefix(this.molecularSequence['performer']?.['reference'] ?? null, 'Organization/');
  }

  getReferenceSeq(): any {
    return this.molecularSequence['referenceSeq'] ?? null;
  }

  getVariants(): any {
    return this.molecularSequence['variant'] ?? null;
  }

  private removePrefix(value: string | null, prefix: string): string | null {
    if (value && typeof value === 'string' && value.startsWith(prefix)) {
      return value.slice(prefix.length);
    }
    return value;
  }
}
