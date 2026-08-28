export class BaseBuilder {
  protected data: any = {};
  toJSON(): any { return this.data; }
}

export class PatientBuilder extends BaseBuilder {
  constructor() { super(); this.data.resourceType = 'Patient'; }
  setName(name: string): this { this.data.name = [{ use: 'official', text: name }]; return this; }
}

export class PractitionerBuilder extends BaseBuilder {
  constructor() { super(); this.data.resourceType = 'Practitioner'; }
  setName(name: string): this { this.data.name = [{ use: 'official', text: name }]; return this; }
}

export class OrganizationBuilder extends BaseBuilder {
  constructor() { super(); this.data.resourceType = 'Organization'; }
}

export class LocationBuilder extends BaseBuilder {
  constructor() { super(); this.data.resourceType = 'Location'; }
}

export class EncounterBuilder extends BaseBuilder {
  constructor() { super(); this.data.resourceType = 'Encounter'; }
}

export class ConditionBuilder extends BaseBuilder {
  constructor() { super(); this.data.resourceType = 'Condition'; }
}
