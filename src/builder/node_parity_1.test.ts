/**
 * Composition, DocumentReference and CarePlan must produce the same payloads as their PHP builders.
 * The goldens are shared with the Go port, so all three SDKs compare against one source of truth.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { Composition } from './Composition';
import { DocumentReference } from './DocumentReference';
import { CarePlan } from './CarePlan';
import { Attachment, CodeableConcept, Coding, Identifier, Reference } from '../datatype/datatypes';

const load = (nama: string) => JSON.parse(readFileSync(new URL(`./testdata/${nama}`, import.meta.url), 'utf8'));
const cc = (system: string, code: string, display: string) => {
  const c = new CodeableConcept();
  c.coding.push(new Coding(system, code, display));
  return c;
};
const period = (start: string, end?: string) => ({
  toArray: () => (end ? { start, end } : { start }),
});

describe('Composition PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new Composition();
    b.setId('comp-1');
    b.addIdentifier(new Identifier('http://sys-ids.kemkes.go.id/composition/1000000001', 'comp-1'));
    b.setStatus('final');
    b.setType(cc('http://loinc.org', '11488-4', 'Consult note'));
    b.addCategory(cc('http://terminology.hl7.org/CodeSystem/v3-ActCode', 'LP173421-1', 'Report'));
    b.setTitle('Resume Medis Rawat Jalan');
    b.setDate('2026-01-05T09:30:00+07:00');
    b.addAuthor(new Reference('Practitioner/1000000002', 'dr. Ani'));
    b.setSubject(new Reference('Patient/1000000001', 'Budi Santoso'));
    b.setEncounter(new Reference('Encounter/2000000001'));
    b.setCustodian(new Reference('Organization/1000000001', 'RS Contoh'));
    b.addAttester('legal', new Reference('Practitioner/1000000002'));
    b.addSection({
      title: 'Keluhan Utama',
      code: cc('http://loinc.org', '10154-3', 'Chief complaint').toArray(),
      text: { status: 'generated', div: '<div>Demam tiga hari</div>' },
    });

    expect(b.build()).toEqual(load('composition_php_golden.json'));
  });
});

describe('DocumentReference PHP parity', () => {
  it('matches the canonical payload', () => {
    const att = new Attachment();
    att.contentType = 'application/pdf';
    att.url = 'https://example.org/doc-1.pdf';

    const b = new DocumentReference();
    b.setId('doc-1');
    b.addIdentifier(new Identifier('http://sys-ids.kemkes.go.id/document/1000000001', 'doc-1'));
    b.setMasterIdentifier(new Identifier('urn:oid:1.2.3.4', 'master-1'));
    b.setStatus('current');
    b.setDocStatus('final');
    b.addType(cc('http://loinc.org', '11488-4', 'Consult note'));
    b.addCategory(cc('http://terminology.hl7.org/CodeSystem/v3-ActCode', 'LP173421-1', 'Report'));
    b.setSubject(new Reference('Patient/1000000001', 'Budi Santoso'));
    b.setDate('2026-01-05T10:00:00+07:00');
    b.addAuthor(new Reference('Practitioner/1000000002', 'dr. Ani'));
    b.setCustodian(new Reference('Organization/1000000001'));
    b.addRelatesTo('replaces', new Reference('DocumentReference/doc-0'));
    b.setDescription('Resume medis rawat jalan');
    b.addSecurityLabel(cc('http://terminology.hl7.org/CodeSystem/v3-Confidentiality', 'N', 'Normal'));
    b.addContent(
      att,
      cc('http://ihe.net/fhir/ValueSet/IHE.FormatCode.codesystem', 'urn:ihe:iti:xds:2017:mimeTypeSufficient', 'PDF'),
    );
    b.setContext({ encounter: [{ reference: 'Encounter/2000000001' }] });

    expect(b.build()).toEqual(load('document_reference_php_golden.json'));
  });
});

describe('CarePlan PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new CarePlan();
    b.setId('cp-1');
    b.addIdentifier(new Identifier('http://sys-ids.kemkes.go.id/careplan/1', 'cp-1'));
    b.setStatus('active');
    b.setIntent('plan');
    b.addCategory(cc('http://snomed.info/sct', '38717000', 'Ambulatory'));
    b.setTitle('Rencana Perawatan Hipertensi');
    b.setDescription('Pemantauan tekanan darah dan diet rendah garam');
    b.setSubject(new Reference('Patient/1000000001', 'Budi Santoso'));
    b.setEncounter(new Reference('Encounter/2000000001'));
    b.setPeriod(period('2026-01-05', '2026-04-05'));
    b.setAuthor(new Reference('Practitioner/1000000002', 'dr. Ani'));
    b.addContributor(new Reference('Practitioner/1000000003'));
    b.addAddressee(new Reference('Patient/1000000001'));
    b.addGoal(new Reference('Goal/g-1'));
    b.addActivity({
      status: 'scheduled',
      description: 'Kontrol tekanan darah tiap 2 minggu',
      code: cc('http://snomed.info/sct', '386053000', 'Evaluation procedure').toArray(),
    });

    expect(b.build()).toEqual(load('care_plan_php_golden.json'));
  });
});
