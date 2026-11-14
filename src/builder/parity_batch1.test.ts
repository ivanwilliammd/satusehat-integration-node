/**
 * Patient, Encounter and Observation must reproduce the payloads the canonical PHP builder produces.
 * The goldens are the same files the Go and Python ports compare against.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { Patient } from './Patient';
import { Encounter } from './Encounter';
import { Observation } from './Observation';
import {
  Address,
  CodeableConcept,
  Coding,
  ContactPoint,
  HumanName,
  Identifier,
  Period,
  Quantity,
  Range,
  Reference,
} from '../datatype/datatypes';

const golden = (nama: string) =>
  JSON.parse(readFileSync(new URL(`./testdata/${nama}_php_golden.json`, import.meta.url), 'utf8'));

const cc = (system: string, code: string, display: string) => {
  const c = new CodeableConcept();
  c.coding.push(new Coding(system, code, display));
  return c;
};
const qty = (value: number, unit: string, code?: string) => {
  const q = new Quantity();
  q.value = value;
  q.unit = unit;
  if (code) {
    q.system = 'http://unitsofmeasure.org';
    q.code = code;
  }
  return q;
};

describe('Patient PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new Patient();
    b.setMetaProfile('https://fhir.kemkes.go.id/r4/StructureDefinition/Patient');
    b.setId('1000000001');
    b.addIdentifier(new Identifier('https://fhir.kemkes.go.id/id/nik', '3171234567890001'));
    b.setActive(true);
    b.addName(new HumanName('Santoso', ['Budi'], 'official', 'Budi Santoso'));
    b.setGender('male');
    b.setBirthDate('1990-01-31');
    const tel = new ContactPoint('phone', '+6281234567890', 'mobile');
    b.addTelecom(tel);
    const addr = new Address();
    addr.use = 'home';
    addr.line = ['Jl. Contoh No. 1'];
    addr.city = 'Jakarta';
    addr.country = 'ID';
    b.addAddress(addr);
    b.setMaritalStatus(
      cc('http://terminology.hl7.org/CodeSystem/v3-MaritalStatus', 'M', 'Married'),
    );
    b.addCommunication(cc('urn:ietf:bcp:47', 'id-ID', 'Indonesian'), true);
    b.addExtension(
      'https://fhir.kemkes.go.id/r4/StructureDefinition/patient-mother',
      '1000000002',
    );

    expect(b.build()).toEqual(golden('patient'));
  });
});

describe('Encounter PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new Encounter();
    b.setId('2000000001');
    b.addIdentifier(new Identifier('http://sys-ids.kemkes.go.id/encounter/1000000001', '2000000001'));
    b.setStatus('finished');
    b.setClass(new Coding('http://terminology.hl7.org/CodeSystem/v3-ActCode', 'AMB', 'ambulatory'));
    b.addType(cc('http://terminology.hl7.org/CodeSystem/encounter-type', 'AMB', 'Ambulatory'));
    b.setSubject(new Reference('Patient/1000000001', 'Budi Santoso'));
    b.addParticipant(
      new Reference('Practitioner/1000000002', 'dr. Ani'),
      cc('http://terminology.hl7.org/CodeSystem/v3-ParticipationType', 'ATND', 'attender'),
    );
    b.addLocation(new Reference('Location/1000000003', 'Poli Umum'), 'active');
    b.setPeriod(new Period('2026-01-05T08:00:00+07:00', '2026-01-05T09:00:00+07:00'));
    b.setServiceProvider(new Reference('Organization/1000000001', 'RS Contoh'));
    b.addDiagnosis(new Reference('Condition/1000000004'), 1);
    b.addReasonCode(cc('http://hl7.org/fhir/sid/icd-10', 'A09', 'Diarrhoea'));

    expect(b.build()).toEqual(golden('encounter'));
  });
});

describe('Observation PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new Observation();
    b.setId('3000000001');
    b.addIdentifier(new Identifier('http://sys-ids.kemkes.go.id/observation/1000000001', '3000000001'));
    b.setStatus('final');
    b.addCategory(
      cc('http://terminology.hl7.org/CodeSystem/observation-category', 'laboratory', 'Laboratory'),
    );
    b.setCode(cc('http://loinc.org', '8867-4', 'Heart rate'));
    b.setSubject(new Reference('Patient/1000000001', 'Budi Santoso'));
    b.setEncounter(new Reference('Encounter/2000000001'));
    b.setEffectiveDateTime('2026-01-05T08:30:00+07:00');
    b.setValueQuantity(qty(88, 'beats/minute', '/min'));
    b.addInterpretation(
      cc('http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation', 'N', 'Normal'),
    );
    b.addNote('Diukur saat pasien duduk.');
    b.addBodySite(cc('http://snomed.info/sct', '7569003', 'Finger structure'));
    b.setSpecimen(new Reference('Specimen/4000000001'));
    b.addReferenceRange(
      qty(60, 'beats/minute', '/min'),
      qty(100, 'beats/minute', '/min'),
      undefined,
      'Dewasa saat istirahat',
    );
    b.addComponent(
      cc('http://loinc.org', '8480-6', 'Systolic blood pressure'),
      qty(120, 'mmHg', 'mm[Hg]'),
    );

    expect(b.build()).toEqual(golden('observation'));
  });
});
