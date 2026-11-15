/**
 * Claim FHIR R4 Resource Builder
 * Setara PayloadBuilderClaim.php. Nama method camelCase, semantik sama.
 *
 * Beberapa setter menulis ke elemen bersarang lewat jalur (`item/0/quantity/value`,
 * `billablePeriod/start`), meniru `Builder::set` PHP.
 *
 * Dua quirk PHP ditiru dan ditandai, bukan diperbaiki diam-diam:
 * - `addItemQuantity` menulis `quantity/currency`, padahal FHIR Claim.item.quantity
 *   bertipe Quantity (value + unit);
 * - `addInsuranceAccount` menumpuk ke `insurance/account` tanpa membuat kerangka
 *   insurance (sequence/focal/coverage).
 */
export class ClaimBuilder {
  private data: Record<string, any> = { resourceType: 'Claim' };

  private set(key: string, value: any): void { this.data[key] = value; }
  private push(key: string, value: any): void {
    if (!this.data[key]) this.data[key] = [];
    this.data[key].push(value);
  }

  private static isIndex(seg: string): boolean { return /^\d+$/.test(seg); }

  private titik(path: string): { induk: any; kunci: string | number } {
    const segs = path.split('/');
    let cur: any = this.data;
    segs.slice(0, -1).forEach((seg, i) => {
      const kunci: string | number = ClaimBuilder.isIndex(seg) ? Number(seg) : seg;
      if (cur[kunci] === undefined || cur[kunci] === null) {
        cur[kunci] = ClaimBuilder.isIndex(segs[i + 1]) ? [] : {};
      }
      cur = cur[kunci];
    });
    const terakhir = segs[segs.length - 1];
    return { induk: cur, kunci: ClaimBuilder.isIndex(terakhir) ? Number(terakhir) : terakhir };
  }

  private setPath(path: string, value: any): void {
    const { induk, kunci } = this.titik(path);
    induk[kunci] = value;
  }

  private pushPath(path: string, value: any): void {
    const { induk, kunci } = this.titik(path);
    if (!Array.isArray(induk[kunci])) induk[kunci] = [];
    induk[kunci].push(value);
  }

  private static kode(system: string, code: string, display = ''): Record<string, any> {
    return { coding: [{ system, code, display }] };
  }

  setId(id: string): this { this.set('id', id); return this; }

  addIdentifier(system: string, value: string): this { this.push('identifier', { system, value }); return this; }

  setStatus(status: string): this { this.set('status', status); return this; }

  setType(system: string, code: string, display: string = ''): this {
    this.set('type', ClaimBuilder.kode(system, code, display));
    return this;
  }

  setSubType(system: string, code: string, display: string = ''): this {
    this.set('subType', ClaimBuilder.kode(system, code, display));
    return this;
  }

  setUse(use: string): this { this.set('use', use); return this; }

  setPriority(system: string, code: string, display: string = ''): this {
    this.set('priority', ClaimBuilder.kode(system, code, display));
    return this;
  }

  setPatient(reference: string, display: string = ''): this {
    const patient: Record<string, any> = { reference };
    if (display) patient['display'] = display;
    this.set('patient', patient);
    return this;
  }

  setBillablePeriod(start: string, end: string = ''): this {
    this.setPath('billablePeriod/start', start);
    if (end) this.setPath('billablePeriod/end', end);
    return this;
  }

  setCreated(dateTime: string): this { this.set('created', dateTime); return this; }

  setEnterer(reference: string): this { this.set('enterer', { reference }); return this; }

  setInsurer(reference: string): this { this.set('insurer', { reference }); return this; }

  setProvider(reference: string): this { this.set('provider', { reference }); return this; }

  setPriorityPayor(reference: string): this { this.push('priorityPayor', { reference }); return this; }

  setPrescriber(reference: string): this { this.set('prescriber', { reference }); return this; }

  setFacility(reference: string, display: string = ''): this {
    const facility: Record<string, any> = { reference };
    if (display) facility['display'] = display;
    this.set('facility', facility);
    return this;
  }

  addRelated(
    referenceSystem: string | null = null,
    referenceCode: string | null = null,
    referenceDisplay: string | null = null,
    relationshipSystem: string | null = null,
    relationshipCode: string | null = null
  ): this {
    const related: Record<string, any> = {};
    if (referenceSystem && referenceCode) {
      related['reference'] = { system: referenceSystem, code: referenceCode, display: referenceDisplay ?? '' };
    }
    if (relationshipSystem && relationshipCode) {
      related['relationship'] = { coding: [{ system: relationshipSystem, code: relationshipCode }] };
    }
    this.push('related', related);
    return this;
  }

  addCoverage(
    reference: string,
    focal: boolean | null = null,
    prioritySystem: string | null = null,
    priorityCode: string | null = null
  ): this {
    const coverage: Record<string, any> = { reference };
    if (focal !== null) coverage['focal'] = Boolean(focal);
    if (prioritySystem && priorityCode) {
      coverage['priority'] = { coding: [{ system: prioritySystem, code: priorityCode }] };
    }
    this.push('coverage', coverage);
    return this;
  }

  addItem(
    sequence: number,
    productOrServiceSystem: string,
    productOrServiceCode: string,
    productOrServiceDisplay: string,
    careTeamSequence: number | null = null,
    diagnosisSequence: number | null = null,
    procedureSequence: number | null = null,
    informationSequence: number | null = null
  ): this {
    const item: Record<string, any> = {
      sequence,
      productOrService: ClaimBuilder.kode(productOrServiceSystem, productOrServiceCode, productOrServiceDisplay),
    };
    if (careTeamSequence !== null) item['careTeamSequence'] = [careTeamSequence];
    if (diagnosisSequence !== null) item['diagnosisSequence'] = [diagnosisSequence];
    if (procedureSequence !== null) item['procedureSequence'] = [procedureSequence];
    if (informationSequence !== null) item['informationSequence'] = [informationSequence];
    this.push('item', item);
    return this;
  }

  addItemServicedPeriod(itemIdx: number, start: string, end: string = ''): this {
    this.setPath(`item/${itemIdx}/servicedPeriod/start`, start);
    if (end) this.setPath(`item/${itemIdx}/servicedPeriod/end`, end);
    return this;
  }

  addItemLocation(itemIdx: number, system: string, code: string, display: string = ''): this {
    this.pushPath(`item/${itemIdx}/location`, ClaimBuilder.kode(system, code, display));
    return this;
  }

  /** Quirk PHP: FHIR Claim.item.quantity bertipe Quantity, di sini ditulis value+currency. Ditiru. */
  addItemQuantity(itemIdx: number, value: number, code: string = 'IDR'): this {
    this.setPath(`item/${itemIdx}/quantity/value`, value);
    this.setPath(`item/${itemIdx}/quantity/currency`, code);
    return this;
  }

  addItemUnitPrice(itemIdx: number, value: number, code: string = 'IDR'): this {
    this.setPath(`item/${itemIdx}/unitPrice/value`, value);
    this.setPath(`item/${itemIdx}/unitPrice/currency`, code);
    return this;
  }

  addCareTeam(
    sequence: number,
    providerReference: string,
    roleSystem: string | null = null,
    roleCode: string | null = null,
    roleDisplay: string | null = null
  ): this {
    const careTeam: Record<string, any> = { sequence, provider: { reference: providerReference } };
    if (roleSystem && roleCode) {
      careTeam['role'] = { coding: [{ system: roleSystem, code: roleCode, display: roleDisplay ?? '' }] };
    }
    this.push('careTeam', careTeam);
    return this;
  }

  addDiagnosis(
    sequence: number,
    system: string,
    code: string,
    typeSystem: string | null = null,
    typeCode: string | null = null
  ): this {
    const diagnosis: Record<string, any> = {
      sequence,
      diagnosisCodeableConcept: { coding: [{ system, code }] },
    };
    if (typeSystem && typeCode) {
      diagnosis['type'] = { coding: [{ system: typeSystem, code: typeCode }] };
    }
    this.push('diagnosis', diagnosis);
    return this;
  }

  addProcedure(
    sequence: number,
    system: string,
    code: string,
    date: string | null = null,
    typeSystem: string | null = null,
    typeCode: string | null = null
  ): this {
    const procedure: Record<string, any> = {
      sequence,
      procedureCodeableConcept: { coding: [{ system, code }] },
    };
    if (date) procedure['date'] = date;
    if (typeSystem && typeCode) {
      procedure['type'] = { coding: [{ system: typeSystem, code: typeCode }] };
    }
    this.push('procedure', procedure);
    return this;
  }

  /** Quirk PHP: menumpuk ke `insurance/account` tanpa membuat kerangka insurance. Ditiru. */
  addInsuranceAccount(reference: string): this {
    this.pushPath('insurance/account', { reference });
    return this;
  }

  setTotal(value: number, code: string = 'IDR'): this {
    this.set('total', { value, currency: code });
    return this;
  }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}

/** Nama kanon `Claim`: seragam dengan modul lain. `ClaimBuilder` dipertahankan untuk pemanggil lama. */
export { ClaimBuilder as Claim };
