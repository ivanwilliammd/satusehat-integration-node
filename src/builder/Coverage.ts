/** Coverage FHIR R4 Resource Builder — mirrors PayloadBuilderCoverage in the PHP SDK. */
import { CodeableConcept, Identifier, Reference } from '../datatype/datatypes';
import { ident, konsep, rujuk } from './datatypeInput';

export class Coverage {
  private data: Record<string, any> = { resourceType: 'Coverage' };

  private set(k: string, v: any): void { this.data[k] = v; }

  private push(k: string, v: any): void {
    if (!Array.isArray(this.data[k])) this.data[k] = [];
    this.data[k].push(v);
  }

  setId(id: string): this { this.set('id', id); return this; }

  addIdentifier(identifier: Identifier | { system: string; value: string } | string, value?: string): this {
    this.push('identifier', ident(identifier, value));
    return this;
  }

  setStatus(status: string): this { this.set('status', status); return this; }

  /** PHP menerima (system, code, display) dan selalu menulis display walau kosong. */
  setType(type: any, code?: string, display?: string): this {
    if (typeof type === 'string') {
      this.set('type', { coding: [{ system: type, code: code ?? '', display: display ?? '' }] });
      return this;
    }
    this.set('type', konsep(type, code, display));
    return this;
  }

  setPolicyHolder(reference: string | Reference): this {
    this.set('policyHolder', rujuk(reference));
    return this;
  }

  setSubscriber(reference: string | Reference): this {
    this.set('subscriber', rujuk(reference));
    return this;
  }

  setSubscriberId(value: string): this { this.set('subscriberId', value); return this; }

  setBeneficiary(reference: string | Reference): this {
    this.set('beneficiary', rujuk(reference));
    return this;
  }

  setDependent(value: string): this { this.set('dependent', value); return this; }

  setRelationship(relationship: any, code?: string): this {
    if (typeof relationship === 'string') {
      this.set('relationship', { coding: [{ system: relationship, code: code ?? '' }] });
      return this;
    }
    // R4: relationship adalah CodeableConcept; objek polos dibungkus coding.
    this.set('relationship', Array.isArray(relationship?.coding) ? relationship : { coding: [relationship] });
    return this;
  }

  addPayor(reference: string | Reference, display?: string): this {
    this.push('payor', rujuk(reference, display));
    return this;
  }

  addClass(type: any, value: string, name?: string): this {
    // R4: class.type adalah CodeableConcept. Objek polos {system,code} dulu ditulis apa
    // adanya, sehingga payload tidak sah R4 (system/code di tingkat elemen, tanpa coding).
    const tipe = typeof type?.toArray === 'function' ? type.toArray() : Array.isArray(type?.coding) ? type : { coding: [type] };
    const row: Record<string, any> = { type: tipe, value };
    if (name) row.name = name;
    this.push('class', row);
    return this;
  }

  setOrder(order: number): this { this.set('order', order); return this; }

  setNetwork(network: string): this { this.set('network', network); return this; }

  /** FHIR R4: costToBeneficiary.value[x] adalah Money. */
  addCostToBeneficiary(value: number, currency = 'IDR'): this {
    this.push('costToBeneficiary', { valueMoney: { value, currency } });
    return this;
  }

  setPeriod(start: string, end?: string): this {
    this.set('period', end ? { start, end } : { start });
    return this;
  }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setClass(typeSystem: string, typeCode: string, value: string, name = ''): this {
    const kelas: Record<string, any> = { type: { coding: [{ system: typeSystem, code: typeCode }] }, value };
    if (name) kelas['name'] = name;
    if (!Array.isArray(this.data['class'])) this.data['class'] = [];
    this.data['class'].push(kelas);
    return this;
  }

  /** R4: value[x] adalah Money, jadi nilai dan mata uang berada di dalam valueMoney. */
  setCostToBeneficiary(value: number, code = 'IDR'): this {
    if (!Array.isArray(this.data['costToBeneficiary'])) this.data['costToBeneficiary'] = [];
    this.data['costToBeneficiary'].push({ valueMoney: { value, currency: code } });
    return this;
  }
}
