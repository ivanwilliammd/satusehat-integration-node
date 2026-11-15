/**
 * RiskAssessment FHIR R4 Resource Builder
 * Setara PayloadBuilderRiskAssessment.php. Menerima objek datatype seperti PHP,
 * dan juga bentuk singkat (system, code, display) yang dipakai builder lain di repo ini.
 */
type Konsep = Record<string, any>;

export class RiskAssessmentBuilder {
  private data: Record<string, any> = { resourceType: 'RiskAssessment' };

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

  setId(id: string): this { this.set('id', id); return this; }

  addIdentifier(arg: Konsep | string, value?: string): this {
    const ident = typeof arg === 'string' ? { system: arg, value } : arg;
    this.push('identifier', ident);
    return this;
  }

  setStatus(status: string): this { this.set('status', status); return this; }

  setCode(arg: Konsep | string, code?: string, display?: string): this {
    this.set('code', RiskAssessmentBuilder.konsep(arg, code, display));
    return this;
  }

  private ref(arg: Konsep | string, display?: string): Konsep {
    if (typeof arg === 'string') {
      const r: Konsep = { reference: arg };
      if (display !== undefined) r['display'] = display;
      return r;
    }
    return arg;
  }

  setSubject(arg: Konsep | string, display?: string): this {
    this.set('subject', this.ref(arg, display));
    return this;
  }

  setEncounter(arg: Konsep | string): this { this.set('encounter', this.ref(arg)); return this; }

  setOccurrenceDateTime(dateTime: string): this { this.set('occurrenceDateTime', dateTime); return this; }

  setCondition(arg: Konsep | string): this { this.set('condition', this.ref(arg)); return this; }

  setPerformer(arg: Konsep | string): this { this.set('performer', this.ref(arg)); return this; }

  addReasonReference(arg: Konsep | string): this { this.push('reasonReference', this.ref(arg)); return this; }

  addBasis(arg: Konsep | string): this { this.push('basis', this.ref(arg)); return this; }

  addPrediction(
    outcome: Konsep | string,
    probabilityDecimal: number,
    qualitativeRisk: Konsep | null = null,
    relativeRisk: number | null = null,
    outcomeCode?: string,
    outcomeDisplay?: string
  ): this {
    const prediction: Konsep = {
      outcome: RiskAssessmentBuilder.konsep(outcome, outcomeCode, outcomeDisplay),
      probabilityDecimal,
    };
    if (qualitativeRisk !== null) prediction['qualitativeRisk'] = qualitativeRisk;
    if (relativeRisk !== null) prediction['relativeRisk'] = relativeRisk;
    this.push('prediction', prediction);
    return this;
  }

  setMitigation(mitigation: string): this { this.set('mitigation', mitigation); return this; }

  addNote(note: Konsep | string): this {
    this.push('note', typeof note === 'string' ? { text: note } : note);
    return this;
  }

  /** Meniru PHP: `valueType` menentukan nama kunci `value<String|Boolean|Integer|…>`. */
  addExtension(url: string, value: any, valueType: string | null = null): this {
    const extension: Konsep = { url };
    if (valueType !== null) {
      extension[`value${valueType.charAt(0).toUpperCase()}${valueType.slice(1)}`] = value;
    } else {
      extension['valueString'] = value;
    }
    this.push('extension', extension);
    return this;
  }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}

/** Nama kanon `RiskAssessment`: seragam dengan modul lain. `RiskAssessmentBuilder` dipertahankan untuk pemanggil lama. */
export { RiskAssessmentBuilder as RiskAssessment };
