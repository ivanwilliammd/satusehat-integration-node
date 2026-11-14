/** Procedure, AllergyIntolerance, Immunization and ServiceRequest against the canonical goldens.
 *  The call sequence mirrors the Go parity tests, so all three ports build the same payload. */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { Procedure } from './Procedure';
import { AllergyIntolerance } from './AllergyIntolerance';
import { Immunization } from './Immunization';
import { ServiceRequest } from './ServiceRequest';
import { CodeableConcept, Coding, Identifier, Period, Quantity, Reference } from '../datatype/datatypes';

const golden = (nama: string) =>
  JSON.parse(readFileSync(new URL(`./testdata/${nama}_php_golden.json`, import.meta.url), 'utf8'));

const cc = (system: string, code: string, display?: string) => {
  const c = new CodeableConcept();
  c.coding.push(new Coding(system, code, display));
  return c;
};
const ref = (reference: string, display?: string) => new Reference(reference, display);
const period = (start: string, end: string) => {
  const p = new Period();
  p.start = start;
  p.end = end;
  return p;
};

describe('Procedure PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new Procedure();
    b.setId('9300000001');
    b.addIdentifier(new Identifier('http://sys-ids.kemkes.go.id/procedure/1000000001', '9300000001'));
    b.setStatus('completed');
    b.setCategory(cc('http://snomed.info/sct', '103693007', 'Diagnostic procedure'));
    b.setCode(cc('http://hl7.org/fhir/sid/icd-9-cm', '88.72', 'Diagnostic ultrasound of heart'));
    b.setSubject(ref('Patient/1000000001', 'Budi Santoso'));
    b.setEncounter(ref('Encounter/2000000001'));
    b.addBasedOn(ref('ServiceRequest/9400000001'));
    b.addReasonCode(cc('http://hl7.org/fhir/sid/icd-10', 'I50.9', 'Heart failure'));
    b.setPerformedPeriod(period('2026-01-05T08:00:00+07:00', '2026-01-05T08:30:00+07:00'));
    b.addPerformer(ref('Practitioner/1000000002', 'dr. Ani'));
    b.setOutcome(cc('http://snomed.info/sct', '385669000', 'Successful'));
    b.addReport(ref('DiagnosticReport/9500000001'));
    b.addFollowUp(cc('http://snomed.info/sct', '182836005', 'Review of medication'));
    b.addNote('Pasien puasa 6 jam sebelum tindakan.');
    b.addFocalDevice(
      cc('http://snomed.info/sct', '129442004', 'Insertion'),
      ref('Device/9600000001'),
    );
    b.addUsedCode(cc('http://snomed.info/sct', '40701008', 'Echocardiography'));
    b.addBodySite(cc('http://snomed.info/sct', '302509004', 'Heart structure'));

    expect(b.build()).toEqual(golden('procedure'));
  });
});

describe('AllergyIntolerance PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new AllergyIntolerance();
    b.addIdentifier(new Identifier('http://sys-ids.kemkes.go.id/allergy/1000000001', 'A1'));
    b.setClinicalStatus('active');
    b.setVerificationStatus('confirmed');
    b.setType('allergy');
    b.addCategory('medication');
    b.setCriticality('high');
    b.setCode(cc('http://snomed.info/sct', '387517004', 'Paracetamol'));
    b.setPatient(ref('Patient/1000000001', 'Budi Santoso'));
    b.setEncounter(ref('Encounter/2000000001'));
    b.setOnsetDateTime('2026-01-05T08:00:00+07:00');
    b.setRecordedDate('2026-01-05T08:20:00+07:00');
    b.setRecorder(ref('Practitioner/1000000002', 'dr. Ani'));
    b.setAsserter(ref('Patient/1000000001'));
    b.setLastOccurrence('2026-01-05T08:05:00+07:00');
    b.addNote('Riwayat gatal setelah minum paracetamol.');
    b.addReaction(
      cc('http://snomed.info/sct', '387517004', 'Paracetamol'),
      cc('http://snomed.info/sct', '126485001', 'Urticaria'),
      'Ruam merah pada lengan',
      '2026-01-05T08:05:00+07:00',
      'moderate',
      cc('http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration', 'PO', 'Oral'),
      'Muncul 15 menit setelah minum',
    );

    expect(b.build()).toEqual(golden('allergy_intolerance'));
  });
});

describe('Immunization PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new Immunization();
    b.setMetaProfile('https://fhir.kemkes.go.id/r4/StructureDefinition/Immunization');
    b.setId('9200000001');
    b.addIdentifier(new Identifier('http://sys-ids.kemkes.go.id/immunization/1000000001', '9200000001'));
    b.setStatus('completed');
    b.setVaccineCodeFromCode('93001282', 'Vaksin COVID-19');
    b.setPatient(ref('Patient/1000000001'), 'Budi Santoso');
    b.setOccurrenceDateTime('2026-01-05T09:00:00+07:00');
    b.addPerformer(
      ref('Practitioner/1000000002'),
      cc('http://terminology.hl7.org/CodeSystem/v2-0443', 'AP', 'Administering Provider'),
    );
    b.setDoseQuantity(72, 'ug');
    b.setLocation(ref('Location/1000000003'), 'Poli Umum');
    b.setLotNumber('LOT-2026-001');
    b.setRecorded('2026-01-05T09:05:00+07:00');
    b.setPrimarySource(true);
    b.addProtocolApplied(2, cc('http://snomed.info/sct', '1234', 'Primary series'), 3);
    b.setRouteFromCode('IM', 'Intramuscular');
    b.addReasonCode(cc('http://snomed.info/sct', '429060002', 'Prophylaxis'));
    b.addExtension(
      'https://fhir.kemkes.go.id/r4/StructureDefinition/immunization-vaccine-holder',
      'PT Bio Farma',
    );

    expect(b.build()).toEqual(golden('immunization'));
  });
});

describe('ServiceRequest PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new ServiceRequest();
    b.setId('9400000001');
    b.addIdentifier(
      new Identifier('http://sys-ids.kemkes.go.id/servicerequest/1000000001', '9400000001'),
    );
    b.setRequisition(
      new Identifier('http://sys-ids.kemkes.go.id/requisition/1000000001', 'REQ-1'),
    );
    b.setStatus('active');
    b.setIntent('order');
    b.addCategory(cc('http://snomed.info/sct', '108252007', 'Laboratory procedure'));
    b.setPriority('urgent');
    b.setDoNotPerform(false);
    b.setCode(cc('http://loinc.org', '57021-8', 'CBC panel'));
    const q = new Quantity();
    q.value = 1;
    q.unit = 'panel';
    b.setQuantityQuantity(q);
    b.setSubject(ref('Patient/1000000001', 'Budi Santoso'));
    b.setEncounter(ref('Encounter/2000000001'));
    b.setOccurrenceDateTime('2026-01-05T08:00:00+07:00');
    b.setAuthoredOn('2026-01-05T07:40:00+07:00');
    b.setRequester(ref('Practitioner/1000000002', 'dr. Ani'));
    b.addPerformer(ref('Organization/1000000001', 'Lab RS Contoh'));
    b.addReasonCode(cc('http://hl7.org/fhir/sid/icd-10', 'A09', 'Diarrhoea'));
    b.addSpecimen(ref('Specimen/4000000001'));
    b.addNote('Mohon hasil dipercepat.');
    b.setPatientInstruction('Puasa 8 jam sebelum pengambilan darah.');

    expect(b.build()).toEqual(golden('service_request'));
  });
});
