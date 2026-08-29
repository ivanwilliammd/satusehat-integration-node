export class BaseBuilder {
  protected data: any = {};
  toJSON(): any { return this.data; }
}

export class PatientBuilder extends BaseBuilder {
  constructor() { super(); this.data.resourceType = 'Patient'; }
  setNik(nik: string): this {
    this.data.identifier = [{ system: 'https://fhir.kemkes.go.id/id/nik', value: nik }];
    return this;
  }
  setName(name: string): this { this.data.name = [{ use: 'official', text: name }]; return this; }
  setGender(gender: string): this { this.data.gender = gender; return this; }
  setBirthDate(date: string): this { this.data.birthDate = date; return this; }
}

export class PractitionerBuilder extends BaseBuilder {
  constructor() { super(); this.data.resourceType = 'Practitioner'; }
  setNik(nik: string): this {
    this.data.identifier = [{ system: 'https://fhir.kemkes.go.id/id/nik', value: nik }];
    return this;
  }
  setName(name: string): this { this.data.name = [{ use: 'official', text: name }]; return this; }
}

export class OrganizationBuilder extends BaseBuilder {
  constructor() { super(); this.data.resourceType = 'Organization'; }
  setId(id: string): this { this.data.id = id; return this; }
  setName(name: string): this { this.data.name = name; return this; }
}

export class LocationBuilder extends BaseBuilder {
  constructor() { super(); this.data.resourceType = 'Location'; }
  setName(name: string): this { this.data.name = name; return this; }
  setManagingOrganization(orgRef: string): this {
    this.data.managingOrganization = { reference: orgRef };
    return this;
  }
}

export class EncounterBuilder extends BaseBuilder {
  constructor() { super(); this.data.resourceType = 'Encounter'; }
  setStatus(status: string): this { this.data.status = status; return this; }
  setSubject(ref: string, display: string): this {
    this.data.subject = { reference: ref, display };
    return this;
  }
}

export class ConditionBuilder extends BaseBuilder {
  constructor() { super(); this.data.resourceType = 'Condition'; }
  setClinicalStatus(code: string): this {
    this.data.clinicalStatus = {
      coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-clinical', code }]
    };
    return this;
  }
  setSubject(ref: string, display: string): this {
    this.data.subject = { reference: ref, display };
    return this;
  }
}

export class ClaimBuilder extends BaseBuilder {
  constructor() {
    super("Claim");
  }
  setStatus(status: string): this {
    this.data.status = status;
    return this;
  }
  setUse(use: string): this {
    this.data.use = use;
    return this;
  }
}

export class CoverageBuilder extends BaseBuilder {
  constructor() {
    super("Coverage");
  }
  setStatus(status: string): this {
    this.data.status = status;
    return this;
  }
}
