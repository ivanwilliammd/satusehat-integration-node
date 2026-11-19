import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { Document } from './document';

// The fixture is byte-identical to the PHP SDK's: parity is a test, not a claim in a README.
const fixture = (): string =>
  readFileSync(join(__dirname, '__fixtures__', 'clinical_document.xml'), 'utf8');

describe('CDA document', () => {
  it('reads the header', () => {
    const doc = Document.parse(fixture());
    expect(doc.title()).toBe('Resume Medis Rawat Inap');
    expect(doc.typeCode()).toBe('34133-9');
    expect(doc.effectiveTime()).toBe('20261118103000');
    expect(doc.custodian()).toBe('RS Umum Contoh');
    expect(doc.documentId()).toBe('2.16.840.1.113883.3.3157.1004.1|DOC-20261118-0001');
  });

  it('keeps identifier roots apart', () => {
    const patient = Document.parse(fixture()).patient();
    expect(patient.name()).toBe('Siti ANGGRAENI');
    expect(patient.administrativeGender).toBe('F');
    expect(patient.birthTime).toBe('19850312');
    expect(patient.identifiers).toHaveLength(2);
    expect(patient.identifier('2.16.840.1.113883.3.3157.1003.1')).toBe('3171234567890001');
    expect(patient.identifier('1.2.840.114350.1.13.1.1')).toBe('MRN-0098123');
    expect(patient.identifier('9.9.9')).toBe('');
  });

  it('reads authors', () => {
    expect(Document.parse(fixture()).authors()).toEqual(['Ivan HARSONO']);
  });

  it('finds nested sections by LOINC', () => {
    const doc = Document.parse(fixture());
    expect(doc.sections()).toHaveLength(2);
    expect(doc.sections()[0].title).toBe('Riwayat Penyakit Sekarang');
    expect(doc.section('29548-5')?.children).toHaveLength(1);
    expect(doc.section('11450-4')).not.toBeNull();
    expect(doc.section('00000-0')).toBeNull();
  });

  it('flattens narrative to text and keeps paragraph breaks', () => {
    const text = Document.parse(fixture()).sectionText('10164-2');
    expect(text).toContain('demam tiga hari');
    expect(text).toContain('demam tiga hari.\nRiwayat perjalanan');
    expect(text).not.toContain('<paragraph>');
  });

  it('validates a complete document', () => {
    expect(Document.parse(fixture()).validate()).toEqual([]);
  });

  it('reports what is missing', () => {
    const broken = '<ClinicalDocument xmlns="urn:hl7-org:v3"><title>Kosong</title></ClinicalDocument>';
    const problems = Document.parse(broken).validate();
    expect(problems).toContain('ClinicalDocument/id wajib ada.');
    expect(problems).toContain('recordTarget wajib ada.');
    expect(problems).toContain('custodian wajib ada.');
    expect(problems).toContain('author wajib ada.');
    expect(problems).toContain('structuredBody wajib berisi minimal satu section.');
  });

  it('builds a document that validates', () => {
    const doc = Document.build({
      id: 'DOC-TEST-1',
      title: 'Resume Medis',
      custodian: 'RS Contoh',
      author: 'Dokter Contoh',
      patientId: '3171234567890001',
      patientName: 'ANGGRAENI',
      gender: 'F',
      birthTime: '19850312',
      sections: [{ loinc: '10164-2', title: 'Riwayat', text: '<paragraph>Demam.</paragraph>' }],
    });
    expect(doc.validate()).toEqual([]);
    expect(doc.title()).toBe('Resume Medis');
    expect(doc.patient().name()).toBe('ANGGRAENI');
    expect(doc.patient().identifier('2.16.840.1.113883.3.3157.1003.1')).toBe('3171234567890001');
    expect(doc.sectionText('10164-2')).toBe('Demam.');
  });

  it('preserves structure the SDK does not model', () => {
    const again = Document.parse(Document.parse(fixture()).toXml());
    expect(again.toXml()).toContain('encompassingEncounter');
    expect(again.toXml()).toContain('ENC-556677');
    expect(again.title()).toBe('Resume Medis Rawat Inap');
    expect(again.sections()).toHaveLength(2);
  });

  it('refuses XML that is not a ClinicalDocument', () => {
    expect(() => Document.parse('<Patient xmlns="http://hl7.org/fhir"><id value="1"/></Patient>')).toThrow(
      /bukan ClinicalDocument/,
    );
  });

  it('refuses malformed XML', () => {
    expect(() => Document.parse('<ClinicalDocument><unclosed>')).toThrow(/tidak sah/);
  });
});
