export class RelatedPersonParser {
  private relatedPerson: Record<string, any>;

  constructor(relatedPerson: Record<string, any> = {}) {
    this.relatedPerson = relatedPerson ?? {};
  }

  getIdentifiers(): any {
    return this.relatedPerson['identifier'] ?? null;
  }

  getActive(): any {
    return this.relatedPerson['active'] ?? null;
  }

  getPatientReference(): any {
    return this.relatedPerson['patient']?.['reference'] ?? null;
  }

  getRelationships(): any {
    return this.relatedPerson['relationship'] ?? null;
  }

  getNames(): any {
    return this.relatedPerson['name'] ?? null;
  }

  getTelecoms(): any {
    return this.relatedPerson['telecom'] ?? null;
  }

  getGender(): any {
    return this.relatedPerson['gender'] ?? null;
  }

  getBirthDate(): any {
    return this.relatedPerson['birthDate'] ?? null;
  }

  getAddresses(): any {
    return this.relatedPerson['address'] ?? null;
  }

  getCommunications(): any {
    return this.relatedPerson['communication'] ?? null;
  }
}
