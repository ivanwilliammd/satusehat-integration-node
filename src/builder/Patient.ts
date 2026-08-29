/** Patient FHIR R4 Resource Builder */
import { Address, CodeableConcept, ContactPoint, HumanName, Identifier, Reference } from '../datatype/datatypes';

export class Patient {
  private data: Record<string, any> = { resourceType: 'Patient' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setMetaProfile(profile: string): this {
    this.data['meta'] = this.data['meta'] || { profile: [] };
    this.data['meta']['profile'].push(profile);
    return this;
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
  setGender(gender: string): this { this.data['gender'] = gender; return this; }
  setBirthDate(birthDate: string): this { this.data['birthDate'] = birthDate; return this; }
  setDeceasedBoolean(deceased: boolean): this { this.data['deceasedBoolean'] = deceased; return this; }
  setDeceasedDateTime(dateTime: string): this { this.data['deceasedDateTime'] = dateTime; return this; }
  setMultipleBirthBoolean(multipleBirth: boolean): this { this.data['multipleBirthBoolean'] = multipleBirth; return this; }
  setMultipleBirthInteger(multipleBirth: number): this { this.data['multipleBirthInteger'] = multipleBirth; return this; }
  addAddress(address: Address): this {
    this.data['address'] = this.data['address'] || [];
    this.data['address'].push(address.toArray());
    return this;
  }
  addTelecom(telecom: ContactPoint): this {
    this.data['telecom'] = this.data['telecom'] || [];
    this.data['telecom'].push(telecom.toArray());
    return this;
  }
  setMaritalStatus(maritalStatus: CodeableConcept): this { this.data['maritalStatus'] = maritalStatus.toArray(); return this; }
  addCommunication(language: CodeableConcept, preferred = true): this {
    this.data['communication'] = this.data['communication'] || [];
    this.data['communication'].push({ language: language.toArray(), preferred });
    return this;
  }
  addContact(relationship: CodeableConcept, name: HumanName, telecom: ContactPoint, address?: Address, organization?: Reference): this {
    const contact: Record<string, any> = {
      relationship: [relationship.toArray()],
      name: name.toArray(),
      telecom: [telecom.toArray()],
    };
    if (address !== undefined) contact['address'] = address.toArray();
    if (organization !== undefined) contact['organization'] = organization.toArray();
    this.data['contact'] = this.data['contact'] || [];
    this.data['contact'].push(contact);
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
