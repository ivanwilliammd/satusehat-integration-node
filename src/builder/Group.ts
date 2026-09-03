/** Group FHIR R4 Resource Builder */
import { CodeableConcept, Identifier, Reference } from '../datatype/datatypes';

export class GroupBuilder {
  private data: Record<string, any> = { resourceType: 'Group' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setMetaProfile(profile: string): this { this.data['meta/profile'] = [profile]; return this; }
  setId(id: string): this { this.data['id'] = id; return this; }
  addIdentifier(identifier: Identifier | string, value?: string): this {
    if (!this.data['identifier']) this.data['identifier'] = [];
    if (typeof identifier === 'string') {
      this.data['identifier'].push({ system: identifier, value });
    } else {
      this.data['identifier'].push(identifier.toArray());
    }
    return this;
  }
  setActive(active: boolean): this { this.data['active'] = active; return this; }
  setType(type_: string): this { this.data['type'] = type_; return this; }
  setActual(actual: boolean): this { this.data['actual'] = actual; return this; }
  setCode(code: CodeableConcept | Record<string, any>): this {
    this.data['code'] = code && typeof (code as CodeableConcept).toArray === 'function' ? (code as CodeableConcept).toArray() : code;
    return this;
  }
  setName(name: string): this { this.data['name'] = name; return this; }
  setQuantity(quantity: number): this { this.data['quantity'] = quantity; return this; }
  setManagingEntity(managingEntity: Reference | Record<string, any>): this {
    this.data['managingEntity'] = managingEntity && typeof (managingEntity as Reference).toArray === 'function' ? (managingEntity as Reference).toArray() : managingEntity;
    return this;
  }
  addMember(reference: Reference | string, displayOrPeriod?: string | Record<string, any> | boolean, periodOrInactive?: Record<string, any> | boolean, inactive?: boolean): this {
    const member: Record<string, any> = {};
    if (typeof reference !== 'string') {
      member['entity'] = (reference as Reference).toArray();
    } else {
      let ref = reference;
      if (!/^(urn:|https?:\/\/)/.test(ref) && !ref.includes('/')) ref = 'Patient/' + ref;
      member['entity'] = { reference: ref };
      if (typeof displayOrPeriod === 'string') member['entity']['display'] = displayOrPeriod;
    }

    let period: Record<string, any> | null = null;
    if (displayOrPeriod !== undefined && displayOrPeriod !== null && typeof displayOrPeriod === 'object') period = displayOrPeriod as Record<string, any>;
    else if (periodOrInactive !== undefined && periodOrInactive !== null && typeof periodOrInactive === 'object') period = periodOrInactive as Record<string, any>;

    let inactiveVal: boolean | null = null;
    if (typeof displayOrPeriod === 'boolean') inactiveVal = displayOrPeriod;
    else if (typeof periodOrInactive === 'boolean') inactiveVal = periodOrInactive;
    if (inactive !== undefined && inactive !== null) inactiveVal = inactive;

    if (period) member['period'] = period;
    if (inactiveVal !== null) member['inactive'] = inactiveVal;

    if (!this.data['member']) this.data['member'] = [];
    this.data['member'].push(member);
    return this;
  }
  addExtension(url: string, value: unknown): this {
    const extension: Record<string, any> = { url };
    if (typeof value === 'boolean') extension['valueBoolean'] = value;
    else if (typeof value === 'string') extension['valueString'] = value;
    else if (typeof value === 'number' && Number.isInteger(value)) extension['valueInteger'] = value;
    else if (typeof value === 'object' && value !== null) Object.assign(extension, value);
    if (!this.data['extension']) this.data['extension'] = [];
    this.data['extension'].push(extension);
    return this;
  }
}
