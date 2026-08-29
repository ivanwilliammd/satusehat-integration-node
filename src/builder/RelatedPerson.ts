/** RelatedPerson FHIR R4 Resource Builder */
import { Address, CodeableConcept, ContactPoint, HumanName, Identifier, Reference } from '../datatype/datatypes';

export class RelatedPerson {
  private data: Record<string, any> = { resourceType: 'RelatedPerson' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  addIdentifier(identifier: Identifier): this {
    this.data['identifier'] = this.data['identifier'] || [];
    this.data['identifier'].push(identifier.toArray());
    return this;
  }
  setActive(active: boolean): this { this.data['active'] = active; return this; }
  setPatient(patient: Reference): this { this.data['patient'] = patient.toArray(); return this; }
  addRelationship(relationship: CodeableConcept): this {
    this.data['relationship'] = this.data['relationship'] || [];
    this.data['relationship'].push(relationship.toArray());
    return this;
  }
  addName(name: HumanName): this {
    this.data['name'] = this.data['name'] || [];
    this.data['name'].push(name.toArray());
    return this;
  }
  addTelecom(telecom: ContactPoint): this {
    this.data['telecom'] = this.data['telecom'] || [];
    this.data['telecom'].push(telecom.toArray());
    return this;
  }
  setGender(gender: string): this { this.data['gender'] = gender; return this; }
  setBirthDate(birthDate: string): this { this.data['birthDate'] = birthDate; return this; }
  addAddress(address: Address): this {
    this.data['address'] = this.data['address'] || [];
    this.data['address'].push(address.toArray());
    return this;
  }
  addCommunication(language: CodeableConcept, preferred = true): this {
    this.data['communication'] = this.data['communication'] || [];
    this.data['communication'].push({ language: language.toArray(), preferred });
    return this;
  }
  addExtension(url: string, value: unknown, valueType?: string): this {
    const extension: Record<string, any> = { url };
    if (valueType !== undefined) {
      extension['value' + valueType.charAt(0).toUpperCase() + valueType.slice(1)] = value;
    } else {
      extension['valueString'] = typeof value === 'string' ? value : value;
    }
    this.data['extension'] = this.data['extension'] || [];
    this.data['extension'].push(extension);
    return this;
  }
}
