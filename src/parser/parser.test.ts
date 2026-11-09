import { describe, expect, it } from 'vitest';
import {
  DeviceParser,
  DiagnosticReportParser,
  DocumentReferenceParser,
  EncounterParser,
  GenomicStudyParser,
  GroupParser,
  LocationParser,
  MolecularSequenceParser,
  ObservationParser,
  OrganizationParser,
  PatientParser,
  PractitionerParser,
  ProcedureParser,
  RelatedPersonParser,
  RiskAssessmentParser,
  ServiceRequestParser,
  SpecimenParser,
  TaskParser,
} from './index';

describe('FHIR Resource Parsers (all 18)', () => {
  it('DeviceParser extracts device properties', () => {
    const p = new DeviceParser({
      identifier: [{ value: 'DEV-1' }],
      status: 'active',
      manufacturer: 'Acme Med',
      deviceName: [{ name: 'Monitor' }],
      type: { text: 'ECG' },
    });
    expect(p.getStatus()).toBe('active');
    expect(p.getManufacturer()).toBe('Acme Med');
    expect(p.getIdentifiers()).toEqual([{ value: 'DEV-1' }]);
    expect(p.getDeviceNames()).toEqual([{ name: 'Monitor' }]);
    expect(p.getType()).toEqual({ text: 'ECG' });
  });

  it('DiagnosticReportParser extracts references without prefix', () => {
    const p = new DiagnosticReportParser({
      status: 'final',
      subject: { reference: 'Patient/P100' },
      encounter: { reference: 'Encounter/E100' },
      performer: [{ reference: 'Practitioner/PR1' }],
      result: [{ reference: 'Observation/O1' }],
      specimen: [{ reference: 'Specimen/S1' }],
      conclusion: 'Normal',
    });
    expect(p.getStatus()).toBe('final');
    expect(p.getSubjectReference()).toBe('P100');
    expect(p.getEncounterReference()).toBe('E100');
    expect(p.getPerformerReferences()).toEqual(['PR1']);
    expect(p.getResultReferences()).toEqual(['O1']);
    expect(p.getSpecimenReferences()).toEqual(['S1']);
    expect(p.getConclusion()).toBe('Normal');
  });

  it('DocumentReferenceParser extracts fields', () => {
    const p = new DocumentReferenceParser({
      status: 'current',
      docStatus: 'final',
      subject: { reference: 'Patient/P100' },
      custodian: { reference: 'Organization/ORG1' },
      description: 'Discharge Summary',
    });
    expect(p.getStatus()).toBe('current');
    expect(p.getDocStatus()).toBe('final');
    expect(p.getSubjectReference()).toBe('Patient/P100');
    expect(p.getCustodianReference()).toBe('Organization/ORG1');
    expect(p.getDescription()).toBe('Discharge Summary');
  });

  it('EncounterParser extracts references, displays, and period', () => {
    const p = new EncounterParser({
      status: 'finished',
      identifier: [{ value: 'REG-001' }],
      subject: { reference: 'Patient/P100', display: 'Budi' },
      location: [{ location: { reference: 'Location/L1', display: 'Poli Umum' } }],
      participant: [{ individual: { reference: 'Practitioner/PR1', display: 'Dr. Siti' } }],
      diagnosis: [{ condition: { reference: 'Condition/C1', display: 'Flu' } }],
      period: { start: '2026-01-01T08:00:00Z', end: '2026-01-01T09:00:00Z' },
    });
    expect(p.getStatus()).toBe('finished');
    expect(p.getRegistrationIds()).toEqual(['REG-001']);
    expect(p.getSubjectReference()).toBe('P100');
    expect(p.getSubjectDisplay()).toBe('Budi');
    expect(p.getLocationReferences()).toEqual(['L1']);
    expect(p.getLocationDisplays()).toEqual(['Poli Umum']);
    expect(p.getParticipantReferences()).toEqual(['PR1']);
    expect(p.getParticipantDisplays()).toEqual(['Dr. Siti']);
    expect(p.getDiagnosisReferences()).toEqual(['C1']);
    expect(p.getDiagnosisDisplays()).toEqual(['Flu']);
    expect(p.getPeriodStart()).toBe('2026-01-01T08:00:00Z');
    expect(p.getPeriodEnd()).toBe('2026-01-01T09:00:00Z');
  });

  it('GenomicStudyParser, GroupParser, LocationParser, MolecularSequenceParser work', () => {
    const gs = new GenomicStudyParser({
      status: 'registered',
      subject: { reference: 'Patient/P1' },
      description: 'WGS',
    });
    expect(gs.getStatus()).toBe('registered');
    expect(gs.getSubjectReference()).toBe('Patient/P1');
    expect(gs.getDescription()).toBe('WGS');

    const grp = new GroupParser({ active: true, type: 'person', actual: true, name: 'Cohort A', quantity: 10 });
    expect(grp.getActive()).toBe(true);
    expect(grp.getName()).toBe('Cohort A');
    expect(grp.getQuantity()).toBe(10);

    const loc = new LocationParser({
      name: 'Ruang ICU',
      status: 'active',
      managingOrganization: { reference: 'Organization/ORG-1' },
      partOf: { reference: 'Location/LOC-PARENT' },
    });
    expect(loc.getName()).toBe('Ruang ICU');
    expect(loc.getManagingOrganizationReference()).toBe('ORG-1');
    expect(loc.getPartOfReference()).toBe('LOC-PARENT');

    const ms = new MolecularSequenceParser({
      type: 'dna',
      coordinateSystem: 0,
      patient: { reference: 'Patient/P1' },
      specimen: { reference: 'Specimen/S1' },
      device: { reference: 'Device/D1' },
      performer: { reference: 'Organization/O1' },
    });
    expect(ms.getType()).toBe('dna');
    expect(ms.getCoordinateSystem()).toBe(0);
    expect(ms.getPatientReference()).toBe('P1');
    expect(ms.getSpecimenReference()).toBe('S1');
    expect(ms.getDeviceReference()).toBe('D1');
    expect(ms.getPerformerReference()).toBe('O1');
  });

  it('ObservationParser, OrganizationParser, PatientParser, PractitionerParser work', () => {
    const obs = new ObservationParser({
      status: 'final',
      subject: { reference: 'Patient/P1' },
      encounter: { reference: 'Encounter/E1' },
      performer: [{ reference: 'Practitioner/PR1' }],
      specimen: { reference: 'Specimen/S1' },
      valueQuantity: { value: 120, unit: 'mmHg' },
    });
    expect(obs.getStatus()).toBe('final');
    expect(obs.getSubjectReference()).toBe('P1');
    expect(obs.getEncounterReference()).toBe('E1');
    expect(obs.getPerformerReferences()).toEqual(['PR1']);
    expect(obs.getSpecimenReference()).toBe('S1');
    expect(obs.getValueQuantity()).toEqual({ value: 120, unit: 'mmHg' });

    const org = new OrganizationParser({
      name: 'RS Sehat',
      partOf: { reference: 'Organization/ORG-MAIN' },
    });
    expect(org.getName()).toBe('RS Sehat');
    expect(org.getPartOfReference()).toBe('ORG-MAIN');

    const pat = new PatientParser({
      gender: 'female',
      birthDate: '1995-05-10',
      deceasedBoolean: false,
      multipleBirthInteger: 2,
    });
    expect(pat.getGender()).toBe('female');
    expect(pat.getBirthDate()).toBe('1995-05-10');
    expect(pat.getDeceased()).toBe(false);
    expect(pat.getMultipleBirth()).toBe(2);

    const prac = new PractitionerParser({
      id: 'PR-100',
      active: true,
      gender: 'male',
      address: [
        {
          line: ['Jl. Kesehatan No. 1'],
          extension: [
            {
              extension: [
                { url: 'province', valueCode: '31' },
                { url: 'city', valueCode: '3171' },
                { url: 'district', valueCode: '317101' },
                { url: 'village', valueCode: '3171011001' },
              ],
            },
          ],
        },
      ],
      qualification: [{ identifier: [{ value: 'STR-12345' }] }],
    });
    expect(prac.getId()).toBe('PR-100');
    expect(prac.getActive()).toBe(true);
    expect(prac.getAddressLine()).toBe('Jl. Kesehatan No. 1');
    expect(prac.getCity()).toBe('3171');
    expect(prac.getVillage()).toBe('3171011001');
    expect(prac.getQualifications()).toBe('STR-12345');
  });

  it('ProcedureParser, RelatedPersonParser, RiskAssessmentParser, ServiceRequestParser, SpecimenParser, TaskParser work', () => {
    const proc = new ProcedureParser({
      status: 'completed',
      subject: { reference: 'Patient/P1', display: 'Budi' },
      encounter: { reference: 'Encounter/E1', display: 'Enc 1' },
      performer: [{ actor: { reference: 'Practitioner/PR1', display: 'Dr. A' } }],
      location: { reference: 'Location/L1' },
    });
    expect(proc.getStatus()).toBe('completed');
    expect(proc.getSubjectReference()).toBe('P1');
    expect(proc.getEncounterReference()).toBe('E1');
    expect(proc.getPerformerReferences()).toEqual(['PR1']);
    expect(proc.getPerformerDisplays()).toEqual(['Dr. A']);
    expect(proc.getLocation()).toBe('L1');

    const rp = new RelatedPersonParser({
      active: true,
      gender: 'female',
      patient: { reference: 'Patient/P1' },
    });
    expect(rp.getActive()).toBe(true);
    expect(rp.getGender()).toBe('female');
    expect(rp.getPatientReference()).toBe('Patient/P1');

    const ra = new RiskAssessmentParser({
      status: 'final',
      subject: { reference: 'Patient/P1' },
      encounter: { reference: 'Encounter/E1' },
      condition: { reference: 'Condition/C1' },
      performer: { reference: 'Practitioner/PR1' },
      mitigation: 'Diet rendah garam',
    });
    expect(ra.getStatus()).toBe('final');
    expect(ra.getSubjectReference()).toBe('P1');
    expect(ra.getEncounterReference()).toBe('E1');
    expect(ra.getConditionReference()).toBe('C1');
    expect(ra.getPerformerReference()).toBe('PR1');
    expect(ra.getMitigation()).toBe('Diet rendah garam');

    const sr = new ServiceRequestParser({
      status: 'active',
      intent: 'order',
      subject: { reference: 'Patient/P1', display: 'Budi' },
      encounter: { reference: 'Encounter/E1', display: 'Enc' },
      requester: { reference: 'Practitioner/PR1', display: 'Dr. A' },
    });
    expect(sr.getStatus()).toBe('active');
    expect(sr.getIntent()).toBe('order');
    expect(sr.getEncounterReference()).toBe('E1');
    expect(sr.getRequesterDisplay()).toBe('Dr. A');

    const spec = new SpecimenParser({
      status: 'available',
      subject: { reference: 'Patient/P1', display: 'Budi' },
      collection: {
        collectedDateTime: '2026-01-01T10:00:00Z',
        collector: { reference: 'Practitioner/PR1', display: 'Analis' },
      },
    });
    expect(spec.getStatus()).toBe('available');
    expect(spec.getSubjectReference()).toBe('P1');
    expect(spec.getCollectorReference()).toBe('PR1');
    expect(spec.getCollectorDisplay()).toBe('Analis');

    const task = new TaskParser({
      status: 'requested',
      intent: 'order',
      for: { reference: 'Patient/P1' },
      encounter: { reference: 'Encounter/E1' },
      requester: { reference: 'Practitioner/PR1' },
    });
    expect(task.getStatus()).toBe('requested');
    expect(task.getForReference()).toBe('P1');
    expect(task.getEncounterReference()).toBe('E1');
    expect(task.getRequesterReference()).toBe('PR1');
  });
});
