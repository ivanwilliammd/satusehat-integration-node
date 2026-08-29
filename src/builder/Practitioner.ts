/** Practitioner FHIR R4 Resource Builder */
import { Address, CodeableConcept, ContactPoint, HumanName, Identifier, Reference } from '../datatype/datatypes';

export class Practitioner {
  private data: Record<string, any> = { resourceType: 'Practitioner' };

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
  addAddress(address: Address): this {
    this.data['address'] = this.data['address'] || [];
    this.data['address'].push(address.toArray());
    return this;
  }
  setGender(gender: string): this { this.data['gender'] = gender; return this; }
  setBirthDate(birthDate: string): this { this.data['birthDate'] = birthDate; return this; }
  addPhoto(url: string, contentType?: string): this {
    const photo: Record<string, any> = { url };
    if (contentType !== undefined) photo['contentType'] = contentType;
    this.data['photo'] = this.data['photo'] || [];
    this.data['photo'].push(photo);
    return this;
  }
  addQualification(identifier: Identifier, code: CodeableConcept, periodStart?: string, issuer?: Reference): this {
    const qualification: Record<string, any> = {
      identifier: [identifier.toArray()],
      code: code.toArray(),
    };
    if (periodStart !== undefined) qualification['period'] = { start: periodStart };
    if (issuer !== undefined) qualification['issuer'] = issuer.toArray();
    this.data['qualification'] = this.data['qualification'] || [];
    this.data['qualification'].push(qualification);
    return this;
  }
  addCommunication(language: CodeableConcept, preferred?: boolean): this {
    const communication: Record<string, any> = { language: language.toArray() };
    if (preferred !== undefined) communication['preferred'] = preferred;
    this.data['communication'] = this.data['communication'] || [];
    this.data['communication'].push(communication);
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
