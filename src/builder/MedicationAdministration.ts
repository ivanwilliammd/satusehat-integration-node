/** MedicationAdministration FHIR R4 Resource Builder — mirrors PayloadBuilderMedicationAdministration in PHP. */
export class MedicationAdministration {
  private data: Record<string, any> = { resourceType: 'MedicationAdministration' };

  private push(k: string, v: any): void {
    if (!Array.isArray(this.data[k])) this.data[k] = [];
    this.data[k].push(v);
  }

  private arr(v: any): any {
    return v && typeof v.toArray === 'function' ? v.toArray() : v;
  }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.data['id'] = id; return this; }

  addIdentifier(system: string, value: string): this {
    this.push('identifier', { system, value });
    return this;
  }

  setStatus(status: string): this { this.data['status'] = status; return this; }

  /** Kanon menulis medicationReference; setMedication yang lama tetap menulis medicationCodeableConcept. */
  setMedicationReference(reference: string, display?: string): this {
    const ref: Record<string, any> = { reference };
    if (display !== undefined) ref.display = display;
    this.data['medicationReference'] = ref;
    return this;
  }

  setMedicationCodeableConcept(cc: Record<string, any>): this {
    this.data['medicationCodeableConcept'] = this.arr(cc);
    return this;
  }

  /** Nama lama: hanya menerima CodeableConcept. */
  setMedication(cc: Record<string, any>): this { return this.setMedicationCodeableConcept(cc); }

  setSubject(subject: string | Record<string, any>, display?: string): this {
    if (typeof subject === 'string') {
      const ref: Record<string, any> = {
        reference: subject.includes('/') ? subject : `Patient/${subject}`,
      };
      if (display !== undefined) ref.display = display;
      this.data['subject'] = ref;
    } else {
      this.data['subject'] = this.arr(subject);
    }
    return this;
  }

  setContext(context: string | Record<string, any>): this {
    if (typeof context === 'string') {
      this.data['context'] = {
        reference: context.includes('/') ? context : `Encounter/${context}`,
      };
    } else {
      this.data['context'] = this.arr(context);
    }
    return this;
  }

  /** Nama lama untuk context. */
  setEncounter(context: string | Record<string, any>): this { return this.setContext(context); }

  setEffectiveDateTime(dateTime: string): this { this.data['effectiveDateTime'] = dateTime; return this; }

  setEffectivePeriod(start: string, end?: string): this {
    const period: Record<string, any> = { start };
    if (end !== undefined) period.end = end;
    this.data['effectivePeriod'] = period;
    return this;
  }

  addPerformer(actor: Record<string, any>, fn?: Record<string, any>): this {
    const row: Record<string, any> = { actor: this.arr(actor) };
    if (fn !== undefined) row.function = this.arr(fn);
    this.push('performer', row);
    return this;
  }

  addReasonCode(reasonCode: Record<string, any>): this {
    this.push('reasonCode', this.arr(reasonCode));
    return this;
  }

  addReasonReference(reasonReference: Record<string, any>): this {
    this.push('reasonReference', this.arr(reasonReference));
    return this;
  }

  setRequest(request: Record<string, any>): this {
    this.data['request'] = this.arr(request);
    return this;
  }

  /** Nama lama untuk request. */
  setRequester(request: Record<string, any>): this { return this.setRequest(request); }

  setDosage(dose: Record<string, any>, route?: Record<string, any>, site?: Record<string, any>, text?: string): this {
    const dosage: Record<string, any> = { dose: this.arr(dose) };
    if (route !== undefined) dosage.route = this.arr(route);
    if (site !== undefined) dosage.site = this.arr(site);
    if (text !== undefined) dosage.text = text;
    this.data['dosage'] = dosage;
    return this;
  }

  addNote(text: string): this { this.push('note', { text }); return this; }

  addExtension(url: string, value: any, valueType = 'String'): this {
    this.push('extension', { url, [`value${valueType}`]: value });
    return this;
  }
}

/** Nama lama dipertahankan supaya pemanggil dan uji yang sudah ada tetap jalan. */
export class MedicationAdministrationBuilder extends MedicationAdministration {}
