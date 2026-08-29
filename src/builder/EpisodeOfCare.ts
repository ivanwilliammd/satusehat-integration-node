/** EpisodeOfCare FHIR R4 Resource Builder */
import { CodeableConcept, Identifier, Period, Reference } from '../datatype/datatypes';

export class EpisodeOfCare {
  private data: Record<string, any> = { resourceType: 'EpisodeOfCare' };

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
  setStatus(status: string): this { this.data['status'] = status; return this; }
  addStatusHistory(status: string, start: string, end?: string): this {
    const period: Record<string, any> = { start };
    if (end !== undefined) period['end'] = end;
    this.data['statusHistory'] = this.data['statusHistory'] || [];
    this.data['statusHistory'].push({ status, period });
    return this;
  }
  setPatient(patient: Reference): this { this.data['patient'] = patient.toArray(); return this; }
  setManagingOrganization(organization: Reference): this { this.data['managingOrganization'] = organization.toArray(); return this; }
  addType(type: CodeableConcept): this {
    this.data['type'] = this.data['type'] || [];
    this.data['type'].push(type.toArray());
    return this;
  }
  setPeriod(period: Period): this { this.data['period'] = period.toArray(); return this; }
  addDiagnosis(condition: Reference, role: CodeableConcept, rank?: number): this {
    const diagnosis: Record<string, any> = { condition: condition.toArray(), role: role.toArray() };
    if (rank !== undefined) diagnosis['rank'] = rank;
    this.data['diagnosis'] = this.data['diagnosis'] || [];
    this.data['diagnosis'].push(diagnosis);
    return this;
  }
  addReferralRequest(referralRequest: Reference): this {
    this.data['referralRequest'] = this.data['referralRequest'] || [];
    this.data['referralRequest'].push(referralRequest.toArray());
    return this;
  }
  setCareManager(careManager: Reference): this { this.data['careManager'] = careManager.toArray(); return this; }
  addTeam(team: Reference): this {
    this.data['team'] = this.data['team'] || [];
    this.data['team'].push(team.toArray());
    return this;
  }
  addAccount(account: Reference): this {
    this.data['account'] = this.data['account'] || [];
    this.data['account'].push(account.toArray());
    return this;
  }
}
