/**
 * MolecularSequence FHIR R4 Resource Builder
 * Setara PayloadBuilderMolecularSequence.php. Menerima objek datatype seperti PHP,
 * dan bentuk singkat (system, code, display) untuk pemanggil yang tidak membawa objek.
 *
 * `build()` menuntut coordinateSystem — PHP melempar RuntimeException, di sini
 * Error. Itu deviasi yang disengaja dan sudah menjadi pola di seluruh repo Node.
 */
type Konsep = Record<string, any>;

export class MolecularSequenceBuilder {
  private data: Record<string, any> = { resourceType: 'MolecularSequence' };

  private set(key: string, value: any): void { this.data[key] = value; }
  private push(key: string, value: any): void {
    if (!this.data[key]) this.data[key] = [];
    this.data[key].push(value);
  }

  private static konsep(arg: Konsep | string, code?: string, display?: string): Konsep {
    if (typeof arg === 'string') {
      if (code === undefined) return { text: arg };
      return { coding: [{ system: arg, code, display }] };
    }
    return arg;
  }

  private ref(arg: Konsep | string, display?: string): Konsep {
    if (typeof arg === 'string') {
      const r: Konsep = { reference: arg };
      if (display !== undefined) r['display'] = display;
      return r;
    }
    return arg;
  }

  setId(id: string): this { this.set('id', id); return this; }

  setText(status: string, div: string): this { this.set('text', { status, div }); return this; }

  setType(type: string): this {
    if (!['aa', 'dna', 'rna'].includes(type)) {
      throw new Error('Invalid type: must be one of aa, dna, rna');
    }
    this.set('type', type);
    return this;
  }

  setCoordinateSystem(coordinateSystem: number): this {
    this.set('coordinateSystem', coordinateSystem);
    return this;
  }

  setPatient(arg: Konsep | string, display?: string): this { this.set('patient', this.ref(arg, display)); return this; }

  setSpecimen(arg: Konsep | string): this { this.set('specimen', this.ref(arg)); return this; }

  setDevice(arg: Konsep | string): this { this.set('device', this.ref(arg)); return this; }

  setPerformer(arg: Konsep | string): this { this.set('performer', this.ref(arg)); return this; }

  setReferenceSeq(
    referenceSeqId: Konsep | string,
    strand: string | null = 'watson',
    windowStart: number | null = null,
    windowEnd: number | null = null,
    orientation: string | null = null,
    idCode?: string,
    idDisplay?: string
  ): this {
    const refSeq: Konsep = { referenceSeqId: MolecularSequenceBuilder.konsep(referenceSeqId, idCode, idDisplay) };
    if (strand !== null) refSeq['strand'] = strand;
    if (windowStart !== null) refSeq['windowStart'] = windowStart;
    if (windowEnd !== null) refSeq['windowEnd'] = windowEnd;
    if (orientation !== null) refSeq['orientation'] = orientation;
    this.set('referenceSeq', refSeq);
    return this;
  }

  addVariant(
    start: number,
    end: number,
    observedAllele: string,
    referenceAllele: string,
    variantPointer: Konsep | string | null = null
  ): this {
    const variant: Konsep = { start, end, observedAllele, referenceAllele };
    if (variantPointer !== null) variant['variantPointer'] = this.ref(variantPointer);
    this.push('variant', variant);
    return this;
  }

  build(): Record<string, any> {
    if (this.data['coordinateSystem'] === undefined || this.data['coordinateSystem'] === null) {
      throw new Error('MolecularSequence.coordinateSystem is required');
    }
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}

/** Nama kanon `MolecularSequence`: seragam dengan modul lain. `MolecularSequenceBuilder` dipertahankan untuk pemanggil lama. */
export { MolecularSequenceBuilder as MolecularSequence };
