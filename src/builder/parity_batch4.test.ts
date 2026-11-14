/** MedicationStatement, MedicationAdministration, DiagnosticReport and Specimen
 *  against the canonical goldens, following the Go parity call sequences. */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { MedicationStatement } from './MedicationStatement';
import { MedicationAdministration } from './MedicationAdministration';
import { DiagnosticReport } from './DiagnosticReport';
import { Specimen } from './Specimen';
import { CodeableConcept, Coding, Identifier, Quantity, Reference } from '../datatype/datatypes';

const golden = (nama: string) =>
  JSON.parse(readFileSync(new URL(`./testdata/${nama}_php_golden.json`, import.meta.url), 'utf8'));

const cc = (system: string, code: string, display?: string) => {
  const c = new CodeableConcept();
  c.coding.push(new Coding(system, code, display));
  return c;
};
const ref = (reference: string, display?: string) => new Reference(reference, display);
const qty = (value: number, unit: string, system?: string, code?: string) => {
  const q = new Quantity();
  q.value = value;
  q.unit = unit;
  if (system) q.system = system;
  if (code) q.code = code;
  return q;
};

describe('MedicationStatement PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new MedicationStatement();
    b.setId('9000000001');
    b.addIdentifier('http://sys-ids.kemkes.go.id/medicationstatement/1000000001', '9000000001');
    b.setStatus('active');
    b.addStatusReason('replaced', 'Replaced', 'http://terminology.hl7.org/CodeSystem/medication-statement-status');
    b.setCategory(cc('http://terminology.hl7.org/CodeSystem/medication-statement-category', 'inpatient', 'Inpatient'));
    b.setMedicationCodeableConcept(
      cc('http://terminology.kemkes.go.id/CodeSystem/medication-code', '910002021', 'Paracetamol 500 mg'),
    );
    b.setSubject('1000000001', 'Budi Santoso');
    b.setContext('2000000001');
    b.setDateAsserted('2026-01-05T09:00:00+07:00');
    b.setEffectiveDateTime('2026-01-04T20:00:00+07:00');
    b.setInformationSource('1000000002', 'dr. Ani');
    b.setDerivedFrom('MedicationRequest/7000000001');
    b.setReasonCode(cc('http://hl7.org/fhir/sid/icd-10', 'A09', 'Diarrhoea'));
    b.setReasonReference(ref('Condition/5000000001'));
    b.addNote('Dilaporkan sendiri oleh pasien.');
    b.addDosageInstruction('3 x 1 tablet sesudah makan', 3, 1, 'd');

    expect(b.build()).toEqual(golden('medication_statement'));
  });
});

describe('MedicationAdministration PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new MedicationAdministration();
    b.setId('9100000001');
    b.addIdentifier('http://sys-ids.kemkes.go.id/medicationadministration/1000000001', '9100000001');
    b.setStatus('completed');
    b.setMedicationReference('Medication/6000000001');
    b.setSubject('Patient/1000000001');
    b.setContext(ref('Encounter/2000000001'));
    b.setEffectivePeriod('2026-01-05T08:00:00+07:00', '2026-01-05T08:10:00+07:00');
    b.addPerformer(ref('Practitioner/1000000002', 'Ns. Dwi'));
    b.addReasonCode(cc('http://hl7.org/fhir/sid/icd-10', 'A09', 'Diarrhoea'));
    b.setRequest(ref('MedicationRequest/7000000001'));
    b.setDosage(
      qty(500, 'mg', 'http://unitsofmeasure.org', 'mg'),
      cc('http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration', 'PO', 'Oral'),
      cc('http://snomed.info/sct', '181251004', 'Structure of mouth'),
    );

    expect(b.build()).toEqual(golden('medication_administration'));
  });
});

describe('DiagnosticReport PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new DiagnosticReport();
    b.setId('9500000001');
    b.addIdentifier(new Identifier('http://sys-ids.kemkes.go.id/diagnosticreport/1000000001', '9500000001'));
    b.setStatus('final');
    b.addCategory(cc('http://terminology.hl7.org/CodeSystem/v2-0074', 'LAB', 'Laboratory'));
    b.setCode(cc('http://loinc.org', '57021-8', 'CBC panel'));
    b.setSubject(ref('Patient/1000000001', 'Budi Santoso'));
    b.setEncounter(ref('Encounter/2000000001'));
    b.setEffectiveDateTime('2026-01-05T08:30:00+07:00');
    b.setIssued('2026-01-05T09:00:00+07:00');
    b.addPerformer(ref('Organization/1000000001', 'Lab RS Contoh'));
    b.addResult(ref('Observation/3000000001'));
    b.addResult(ref('Observation/3000000002'));
    b.addSpecimen(ref('Specimen/4000000001'));
    b.addBasedOn(ref('ServiceRequest/9400000001'));
    b.setConclusion('Dalam batas normal');
    b.addConclusionCode(cc('http://snomed.info/sct', '281900007', 'No abnormality detected'));

    expect(b.build()).toEqual(golden('diagnostic_report'));
  });
});

describe('Specimen PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new Specimen();
    b.setId('4000000001');
    b.addIdentifier(new Identifier('http://sys-ids.kemkes.go.id/specimen/1000000001', '4000000001'));
    b.setStatus('available');
    b.setType(cc('http://snomed.info/sct', '119297000', 'Blood specimen'));
    b.setSubject(ref('Patient/1000000001', 'Budi Santoso'));
    b.setReceivedTime('2026-01-05T08:45:00+07:00');
    b.setCollectedDateTime('2026-01-05T08:15:00+07:00');
    b.setCollector(ref('Practitioner/1000000002', 'Ns. Dwi'));
    b.setFastingStatusCodeableConcept(
      cc('http://terminology.hl7.org/CodeSystem/v2-0916', 'F', 'Patient was fasting'),
    );
    b.setMethod(cc('http://snomed.info/sct', '129316008', 'Venipuncture'));
    b.setQuantity(qty(3, 'mL', 'http://unitsofmeasure.org', 'mL'));
    b.setBodySite(cc('http://snomed.info/sct', '368208006', 'Left antecubital fossa'));
    b.addRequest(ref('ServiceRequest/9400000001'));
    b.addCondition('Puasa 8 jam');
    b.addProcessing('2026-01-05T08:50:00+07:00');
    b.addTransportedTime('2026-01-05T09:10:00+07:00');
    b.addTransportedPerson('Kurir Lab', [{ system: 'phone', value: '081200000000' }]);
    b.addReceivedPerson(ref('Practitioner/1000000002'));

    expect(b.build()).toEqual(golden('specimen'));
  });
});
