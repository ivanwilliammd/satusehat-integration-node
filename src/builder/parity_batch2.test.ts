/** Condition, Medication, MedicationRequest and MedicationDispense against the canonical goldens. */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { Condition } from './Condition';
import { Medication } from './Medication';
import { MedicationRequest } from './MedicationRequest';
import { MedicationDispense } from './MedicationDispense';
import { CodeableConcept, Coding, Identifier, Quantity, Reference } from '../datatype/datatypes';

const golden = (nama: string) =>
  JSON.parse(readFileSync(new URL(`./testdata/${nama}_php_golden.json`, import.meta.url), 'utf8'));

const cc = (system: string, code: string, display: string) => {
  const c = new CodeableConcept();
  c.coding.push(new Coding(system, code, display));
  return c;
};
const qty = (value: number, unit: string, system?: string, code?: string) => {
  const q = new Quantity();
  q.value = value;
  q.unit = unit;
  if (system) q.system = system;
  if (code) q.code = code;
  return q;
};

describe('Condition PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new Condition();
    b.setId('5000000001');
    b.addIdentifier(new Identifier('http://sys-ids.kemkes.go.id/condition/1000000001', '5000000001'));
    b.setClinicalStatus(
      cc('http://terminology.hl7.org/CodeSystem/condition-clinical', 'active', 'Active'),
    );
    b.setVerificationStatus(
      cc('http://terminology.hl7.org/CodeSystem/condition-ver-status', 'confirmed', 'Confirmed'),
    );
    b.addCategory(
      cc('http://terminology.hl7.org/CodeSystem/condition-category', 'encounter-diagnosis', 'Encounter Diagnosis'),
    );
    b.setCode(
      cc('http://hl7.org/fhir/sid/icd-10', 'A09', 'Diarrhoea and gastroenteritis of presumed infectious origin'),
    );
    b.setSubject(new Reference('Patient/1000000001', 'Budi Santoso'));
    b.setEncounter(new Reference('Encounter/2000000001'));
    b.setOnsetDateTime('2026-01-04T10:00:00+07:00');
    b.setRecordedDate('2026-01-05T08:45:00+07:00');
    b.setRecorder(new Reference('Practitioner/1000000002', 'dr. Ani'));
    b.setAsserter(new Reference('Practitioner/1000000002', 'dr. Ani'));
    b.addStage(cc('http://snomed.info/sct', '255407002', 'Stage 1'));
    b.addEvidence(cc('http://loinc.org', '2339-0', 'Glucose'));
    b.addNote('Pasien membaik dengan rehidrasi.');

    expect(b.build()).toEqual(golden('condition'));
  });
});

describe('Medication PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new Medication();
    b.setId('6000000001');
    b.addIdentifier(new Identifier('http://sys-ids.kemkes.go.id/medication/1000000001', '6000000001'));
    b.setCode(
      cc('http://terminology.kemkes.go.id/CodeSystem/medication-code', '910002021', 'Paracetamol 500 mg'),
    );
    b.setStatus('active');
    b.setManufacturer(new Reference('Organization/1000000001', 'PT Kimia Farma'));
    b.setForm(cc('http://terminology.kemkes.go.id/CodeSystem/medication-form', 'BS006', 'Tablet'));
    b.addIngredient(
      cc('http://terminology.kemkes.go.id/CodeSystem/active-substance', 'AS0001', 'Paracetamol'),
      true,
      qty(500, 'mg', 'http://unitsofmeasure.org', 'mg'),
    );
    b.setBatch('LOT-2026-001', '2028-01-31');
    b.addMedicationType('NC', 'Non-compound');

    expect(b.build()).toEqual(golden('medication'));
  });
});

describe('MedicationRequest PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new MedicationRequest();
    b.setId('7000000001');
    b.addIdentifier(
      new Identifier('http://sys-ids.kemkes.go.id/medicationrequest/1000000001', '7000000001'),
    );
    b.setStatus('active');
    b.setIntent('order');
    b.addCategory(
      cc('http://terminology.hl7.org/CodeSystem/medicationrequest-category', 'outpatient', 'Outpatient'),
    );
    b.setMedicationCodeableConcept(
      cc('http://terminology.kemkes.go.id/CodeSystem/medication-code', '910002021', 'Paracetamol 500 mg'),
    );
    b.setSubject(new Reference('Patient/1000000001', 'Budi Santoso'));
    b.setEncounter(new Reference('Encounter/2000000001'));
    b.setAuthoredOn('2026-01-05T09:10:00+07:00');
    b.setRequester(new Reference('Practitioner/1000000002', 'dr. Ani'));
    b.addReasonCode(cc('http://hl7.org/fhir/sid/icd-10', 'A09', 'Diarrhoea'));
    b.addDosageInstruction({ text: '3 x 1 tablet sesudah makan' } as any);
    b.setDispenseRequest(
      undefined,
      1,
      qty(10, 'tablet'),
      qty(3, 'day', 'http://unitsofmeasure.org', 'd'),
    );
    b.setInitialFill(qty(10, 'tablet'));
    b.setSubstitution(
      cc('http://terminology.hl7.org/CodeSystem/v3-substanceAdminSubstitution', 'G', 'generic'),
      true,
    );

    expect(b.build()).toEqual(golden('medication_request'));
  });
});

describe('MedicationDispense PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new MedicationDispense();
    b.setId('8000000001');
    b.addIdentifier('http://sys-ids.kemkes.go.id/medicationdispense/1000000001', '8000000001');
    b.setStatus('completed');
    b.setMedicationReference('Medication/6000000001', 'Paracetamol 500 mg');
    b.setSubject('1000000001', 'Budi Santoso');
    b.setContext('2000000001');
    b.addPerformer('1000000002', 'Apt. Rina');
    b.setLocation('1000000003', 'Depo Farmasi');
    b.addAuthorizingPrescription('7000000001');
    b.setCategory('outpatient', 'Outpatient');
    b.setQuantity(10, 'tablet', 'http://unitsofmeasure.org', 'TAB');
    b.setDaysSupply(3, 'day', 'http://unitsofmeasure.org', 'd');
    b.setWhenPrepared('2026-01-05T10:15:00+07:00');
    b.setWhenHandedOver('2026-01-05T10:30:00+07:00');
    b.addDosageInstruction(
      1,
      '3 x 1 tablet sesudah makan',
      1,
      'tablet',
      'O',
      'Oral',
      'BID',
      'Twice a day',
      'PC',
      'Sesudah makan',
    );
    b.setSubstitution(true, 'G', 'generic');

    expect(b.build()).toEqual(golden('medication_dispense'));
  });
});
