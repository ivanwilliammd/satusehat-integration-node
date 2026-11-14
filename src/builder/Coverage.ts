/** Coverage FHIR R4 Resource Builder — mirrors PayloadBuilderCoverage in the PHP SDK. */
import { CodeableConcept, Identifier, Reference } from '../datatype/datatypes';

export class Coverage {
  private data: Record<string, any> = { resourceType: 'Coverage' };

  private set(k: string, v: any): void { this.data[k] = v; }

  private push(k: string, v: any): void {
    if (!Array.isArray(this.data[k])) this.data[k] = [];
    this.data[k].push(v);
  }

  setId(id: string): this { this.set('id', id); return this; }

  addIdentifier(identifier: Identifier | { system: string; value: string }): this {
    const nilai = 'toArray' in identifier ? identifier.toArray() : identifier;
    this.push('identifier', nilai);
    return this;
  }

  setStatus(status: string): this { this.set('status', status); return this; }

  /** PHP selalu menulis display walau kosong. */
  setType(type: CodeableConcept | { system: string; code: string; display?: string }): this {
    if ('toArray' in type) {
      this.set('type', type.toArray());
    } else {
      this.set('type', { coding: [{ system: type.system, code: type.code, display: type.display ?? '' }] });
    }
    return this;
  }

  setPolicyHolder(reference: string | Reference): this {
    this.set('policyHolder', typeof reference === 'string' ? { reference } : reference.toArray());
    return this;
  }

  setSubscriber(reference: string | Reference): this {
    this.set('subscriber', typeof reference === 'string' ? { reference } : reference.toArray());
    return this;
  }

  setSubscriberId(value: string): this { this.set('subscriberId', value); return this; }

  setBeneficiary(reference: string | Reference): this {
    this.set('beneficiary', typeof reference === 'string' ? { reference } : reference.toArray());
    return this;
  }

  setDependent(value: string): this { this.set('dependent', value); return this; }

  setRelationship(relationship: { system: string; code: string } | CodeableConcept): this {
    if ('toArray' in relationship) {
      this.set('relationship', relationship.toArray());
    } else {
      this.set('relationship', { coding: [{ system: relationship.system, code: relationship.code }] });
    }
    return this;
  }

  addPayor(reference: string | Reference, display?: string): this {
    const ref = typeof reference === 'string' ? { reference } : reference.toArray();
    if (display) ref.display = display;
    this.push('payor', ref);
    return this;
  }

  addClass(
    type: { system: string; code: string } | CodeableConcept,
    value: string,
    name?: string,
  ): this {
    const row: Record<string, any> = {
      type: 'toArray' in type ? type.toArray() : { coding: [{ system: type.system, code: type.code }] },
      value,
    };
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
}
