/**
 * GenomicStudy: modul terakhir Node yang belum pernah dibandingkan PHP.
 * Golden dibuat dari skrip PHP bertipe, karena setter PHP-nya menuntut objek datatype.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { GenomicStudy } from './GenomicStudy';

const golden = (nama: string) =>
  JSON.parse(readFileSync(new URL(`./testdata/${nama}_scalar_php_golden.json`, import.meta.url), 'utf8'));

function isi(b: GenomicStudy): GenomicStudy {
  b.setMetaProfile('https://fhir.kemkes.go.id/r4/StructureDefinition/GenomicStudy');
  b.setId('gs-1');
  b.addIdentifier('http://sys.id/ni', 'NI-700');
  b.setStatus('available');
  b.addType(
    { coding: [{ system: 'http://loinc.org', code: 'LA26806-2', display: 'Whole exome sequencing' }], text: 'WES' }
  );
  b.addType({ text: 'Germline' });
  b.setSubject('Patient/1000000001', 'Budi Santoso');
  b.setEncounter('Encounter/enc-1');
  b.setStartDate('2026-01-05');
  b.addBasedOn('ServiceRequest/sr-1');
  b.addBasedOn('ServiceRequest/sr-2');
  b.setReferrer('Practitioner/1000000002');
  b.addInterpreter('Practitioner/1000000003');
  b.addReason({
    coding: [{ system: 'http://snomed.info/sct', code: '404684003', display: 'Clinical finding' }],
    text: 'Curiga sindrom genetik',
  });
  b.addNote('Sampel diterima 08.00');
  b.setDescription('Analisis exome pasien');
  b.addAnalysis({ identifier: [{ system: 'http://sys.id/gs', value: 'AN-1' }] });
  b.addPerformer('Practitioner/1000000004');
  b.addPerformer('Organization/1000000001', 'ORG');
  return b;
}

describe('GenomicStudy parity', () => {
  it('sama dengan golden PHP', () => {
    expect(isi(new GenomicStudy()).build()).toEqual(golden('genomic_study'));
  });

  it('startDate ditulis sebagai startDate, bukan started', () => {
    const hasil = isi(new GenomicStudy()).build();
    expect(hasil['startDate']).toBe('2026-01-05');
    expect(hasil['started']).toBeUndefined();
  });

  it('addType menumpuk, bukan menimpa', () => {
    const hasil = isi(new GenomicStudy()).build();
    expect(hasil['type']).toHaveLength(2);
  });

  it('reason dibungkus concept, sesuai CodeableReference di R4', () => {
    const hasil = isi(new GenomicStudy()).build();
    expect(hasil['reason'][0]['concept']['text']).toBe('Curiga sindrom genetik');
  });

  it('setStatus menolak nilai di luar lima yang sah', () => {
    const b = new GenomicStudy();
    expect(() => b.setStatus('done')).toThrow(/Invalid status/);
  });
});
