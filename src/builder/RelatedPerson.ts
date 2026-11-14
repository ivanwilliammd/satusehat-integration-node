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
  addIdentifier(identifier: Identifier | string, value?: string): this {
    this.data['identifier'] = this.data['identifier'] || [];
    if (typeof identifier === 'string') {
      this.data['identifier'].push({ system: identifier, value });
    } else {
      this.data['identifier'].push(identifier.toArray());
    }
    return this;
  }
  setActive(active: boolean): this { this.data['active'] = active; return this; }
  setPatient(patient: Reference | string, display?: string): this {
    if (typeof patient === 'string') {
      let ref = patient;
      if (!/^(urn:|https?:\/\/)/.test(ref) && !ref.includes('/')) ref = 'Patient/' + ref;
      this.data['patient'] = { reference: ref, ...(display !== undefined ? { display } : {}) };
    } else {
      this.data['patient'] = patient.toArray();
    }
    return this;
  }
  addRelationship(relationship: CodeableConcept | string, display?: string): this {
    this.data['relationship'] = this.data['relationship'] || [];
    if (typeof relationship === 'string') {
      this.data['relationship'].push({
        // Kanon menulis display: null bila tidak diberikan; menyalin kode ke display adalah karangan.
        coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v2-0131', code: relationship, display: display ?? null }],
      });
    } else {
      this.data['relationship'].push(relationship.toArray());
    }
    return this;
  }
  addName(name: HumanName | string, text?: string): this {
    this.data['name'] = this.data['name'] || [];
    if (typeof name === 'string') {
      this.data['name'].push({ text: text ?? name });
    } else {
      this.data['name'].push(name.toArray());
    }
    return this;
  }
  addTelecom(telecom: ContactPoint | string, value?: string, use = 'home'): this {
    this.data['telecom'] = this.data['telecom'] || [];
    if (typeof telecom === 'string') {
      this.data['telecom'].push({ system: telecom, value, use });
    } else {
      this.data['telecom'].push(telecom.toArray());
    }
    return this;
  }
  setGender(gender: string): this { this.data['gender'] = gender; return this; }
  setBirthDate(birthDate: string): this { this.data['birthDate'] = birthDate; return this; }
  addAddress(address: Address | Record<string, any>): this {
    this.data['address'] = this.data['address'] || [];
    this.data['address'].push(typeof (address as Address).toArray === 'function' ? (address as Address).toArray() : address);
    return this;
  }
  addCommunication(language: CodeableConcept | string, preferred = true): this {
    this.data['communication'] = this.data['communication'] || [];
    const lang = typeof language === 'string'
      ? { coding: [{ system: 'urn:ietf:bcp:47', code: language }] }
      : language.toArray();
    this.data['communication'].push({ language: lang, preferred });
    return this;
  }
  addExtension(url: string, value: unknown, valueType?: string): this {
    const extension: Record<string, any> = { url };
    if (valueType !== undefined) {
      extension['value' + valueType.charAt(0).toUpperCase() + valueType.slice(1)] = value;
    } else {
      // Kanon memilih tipe dari nilai: boolean → valueBoolean, angka → valueInteger, sisanya valueString.
      if (typeof value === 'boolean') extension['valueBoolean'] = value;
      else if (typeof value === 'number') extension['valueInteger'] = value;
      else extension['valueString'] = value;
    }
    this.data['extension'] = this.data['extension'] || [];
    this.data['extension'].push(extension);
    return this;
  }
}
