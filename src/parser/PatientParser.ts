export class PatientParser {
  private patient: Record<string, any>;

  constructor(patient: Record<string, any> = {}) {
    this.patient = patient ?? {};
  }

  getIdentifiers(): any {
    return this.patient['identifier'] ?? null;
  }

  getName(): any {
    return this.patient['name'] ?? null;
  }

  getTelecom(): any {
    return this.patient['telecom'] ?? null;
  }

  getGender(): any {
    return this.patient['gender'] ?? null;
  }

  getBirthDate(): any {
    return this.patient['birthDate'] ?? null;
  }

  getDeceased(): any {
    return this.patient['deceasedBoolean'] ?? null;
  }

  getAddress(): any {
    return this.patient['address'] ?? null;
  }

  getMaritalStatus(): any {
    return this.patient['maritalStatus'] ?? null;
  }

  getMultipleBirth(): any {
    return this.patient['multipleBirthBoolean'] ?? this.patient['multipleBirthInteger'] ?? null;
  }

  getEmergencyContact(): any {
    return this.patient['contact'] ?? null;
  }

  getCommunication(): any {
    return this.patient['communication'] ?? null;
  }

  getExtension(): any {
    return this.patient['extension'] ?? null;
  }
}
