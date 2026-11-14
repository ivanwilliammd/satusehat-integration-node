/** MedicationDispense FHIR R4 Resource Builder — mirrors PayloadBuilderMedicationDispense in the PHP SDK. */
export class MedicationDispense {
  private data: Record<string, any> = { resourceType: 'MedicationDispense' };

  private push(k: string, v: any): void {
    if (!Array.isArray(this.data[k])) this.data[k] = [];
    this.data[k].push(v);
  }

  /** Id polos diberi awalan tipe, seperti Builder::reference() di PHP. */
  private ref(tipe: string, nilai: string): string {
    if (nilai.startsWith('urn:') || nilai.includes('/')) return nilai;
    return `${tipe}/${nilai}`;
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

  setMedicationReference(reference: string, display?: string): this {
    const ref: Record<string, any> = { reference };
    if (display !== undefined) ref.display = display;
    this.data['medicationReference'] = ref;
    return this;
  }

  setSubject(subjectId: string, display?: string): this {
    const ref: Record<string, any> = { reference: this.ref('Patient', subjectId) };
    if (display !== undefined) ref.display = display;
    this.data['subject'] = ref;
    return this;
  }

  setContext(contextId: string): this {
    if (!this.data['context']) this.data['context'] = {};
    this.data['context'].reference = this.ref('Encounter', contextId);
    return this;
  }

  addPerformer(actorId: string, display?: string): this {
    const actor: Record<string, any> = { reference: this.ref('Practitioner', actorId) };
    if (display !== undefined) actor.display = display;
    this.push('performer', { actor });
    return this;
  }

  setLocation(locationId: string, display?: string): this {
    const ref: Record<string, any> = { reference: this.ref('Location', locationId) };
    if (display !== undefined) ref.display = display;
    this.data['location'] = ref;
    return this;
  }

  addAuthorizingPrescription(requestId: string): this {
    this.push('authorizingPrescription', { reference: this.ref('MedicationRequest', requestId) });
    return this;
  }

  setCategory(
    code: string,
    display?: string,
    system = 'http://terminology.hl7.org/CodeSystem/medicationdispense-category',
  ): this {
    const coding: Record<string, any> = { system, code };
    if (display !== undefined) coding.display = display;
    if (!this.data['category']) this.data['category'] = {};
    this.data['category'].coding = [coding];
    return this;
  }

  setQuantity(value: number, unit: string, system?: string, code?: string): this {
    const quantity: Record<string, any> = { value, unit };
    if (system !== undefined) quantity.system = system;
    if (code !== undefined) quantity.code = code;
    this.data['quantity'] = quantity;
    return this;
  }

  setDaysSupply(value: number, unit: string, system?: string, code?: string): this {
    const days: Record<string, any> = { value, unit };
    if (system !== undefined) days.system = system;
    if (code !== undefined) days.code = code;
    this.data['daysSupply'] = days;
    return this;
  }

  setWhenPrepared(dateTime: string): this { this.data['whenPrepared'] = dateTime; return this; }

  setWhenHandedOver(dateTime: string): this { this.data['whenHandedOver'] = dateTime; return this; }

  addDosageInstruction(
    sequence: number,
    text: string,
    doseValue: number,
    doseUnit: string,
    routeCode: string,
    routeDisplay: string,
    timingCode: string,
    timingDisplay: string,
    additionalCode: string,
    additionalText: string,
  ): this {
    this.push('dosageInstruction', {
      sequence,
      text,
      additionalInstruction: [{ coding: [{ code: additionalCode, display: additionalText }] }],
      timing: { code: { coding: [{ code: timingCode, display: timingDisplay }] } },
      route: { coding: [{ code: routeCode, display: routeDisplay }] },
      doseAndRate: [{ doseQuantity: { value: doseValue, unit: doseUnit } }],
    });
    return this;
  }

  setSubstitution(wasSubstituted: boolean, typeCode?: string, typeDisplay?: string): this {
    const substitution: Record<string, any> = { wasSubstituted };
    if (typeCode !== undefined) {
      const coding: Record<string, any> = { code: typeCode };
      if (typeDisplay !== undefined) coding.display = typeDisplay;
      substitution.type = { coding: [coding] };
    }
    this.data['substitution'] = substitution;
    return this;
  }

  addContained(resource: Record<string, any>): this { this.push('contained', resource); return this; }
}

/** Nama lama dipertahankan supaya pemanggil dan uji yang sudah ada tetap jalan. */
export class MedicationDispenseBuilder extends MedicationDispense {}
