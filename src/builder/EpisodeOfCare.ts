/**
 * EpisodeOfCare FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/episodeofcare.html
 */
import { SharedBuilder } from './SharedBuilder';
import { CodeableConcept, Identifier, Period, Reference } from '../datatype/datatypes';

export class EpisodeOfCare extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'EpisodeOfCare'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setStatus(status: string): this { this.set('status', status); return this; }
  addStatusHistory(status: string, start: string, end?: string): this {
    const period: Record<string, unknown> = { start };
    if (end !== undefined) period['end'] = end;
    this.push('statusHistory', { status, period });
    return this;
  }
  setPatient(patient: Reference): this { this.set('patient', this.nestedToArray(patient)); return this; }
  setManagingOrganization(organization: Reference): this { this.set('managingOrganization', this.nestedToArray(organization)); return this; }
  addType(type: CodeableConcept): this { this.push('type', this.nestedToArray(type)); return this; }
  setPeriod(period: Period): this { this.set('period', this.nestedToArray(period)); return this; }
  addDiagnosis(condition: Reference, role: CodeableConcept, rank?: number): this {
    const diagnosis: Record<string, unknown> = {
      condition: this.nestedToArray(condition),
      role: this.nestedToArray(role),
    };
    if (rank !== undefined) diagnosis['rank'] = rank;
    this.push('diagnosis', diagnosis);
    return this;
  }
  addReferralRequest(referralRequest: Reference): this { this.push('referralRequest', this.nestedToArray(referralRequest)); return this; }
  setCareManager(careManager: Reference): this { this.set('careManager', this.nestedToArray(careManager)); return this; }
  addTeam(team: Reference): this { this.push('team', this.nestedToArray(team)); return this; }
  addAccount(account: Reference): this { this.push('account', this.nestedToArray(account)); return this; }
}
