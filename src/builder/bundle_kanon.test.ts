/**
 * Bundle: 7 method kanon yang sebelumnya hanya ada di PHP.
 *
 * noAutoTimestamp, addPaginationLinks, addBatchOnlyEntry, addHistoryEntry,
 * addEntryWithResponse, addOutcomeEntry, setSignature.
 */
import { describe, expect, it } from 'vitest';
import { BundleBuilder } from './Bundle';

describe('Bundle method kanon', () => {
  it('noAutoTimestamp menghapus timestamp yang dipasang constructor', () => {
    const b = new BundleBuilder(BundleBuilder.TYPE_SEARCHSET).noAutoTimestamp().build();
    expect(b.timestamp).toBeUndefined();
  });

  it('addPaginationLinks memasang self/first/last dan next bila masih ada sisa', () => {
    const b = new BundleBuilder(BundleBuilder.TYPE_SEARCHSET)
      .addPaginationLinks('https://fhir.example/Patient', 2, 10, 35)
      .build();
    const rel = Object.fromEntries(b.link.map((l: any) => [l.relation, l.url]));
    expect(rel.self).toBe('https://fhir.example/Patient?offset=10&count=10');
    expect(rel.first).toBe('https://fhir.example/Patient?offset=0&count=10');
    expect(rel.last).toBe('https://fhir.example/Patient?offset=30&count=10');
    expect(rel.previous).toBe('https://fhir.example/Patient?offset=0&count=10');
    expect(rel.next).toBe('https://fhir.example/Patient?offset=20&count=10');
  });

  it('halaman terakhir tidak menambah link next', () => {
    const b = new BundleBuilder(BundleBuilder.TYPE_SEARCHSET)
      .addPaginationLinks('https://fhir.example/Patient', 4, 10, 35)
      .build();
    expect(b.link.map((l: any) => l.relation)).not.toContain('next');
  });

  it('addBatchOnlyEntry menulis request dan melewati resource bila null', () => {
    const b = new BundleBuilder(BundleBuilder.TYPE_BATCH)
      .addBatchOnlyEntry(null, 'urn:uuid:1', 'DELETE', 'Patient/1', 'W/"3"')
      .build();
    expect(b.entry[0].resource).toBeUndefined();
    expect(b.entry[0].request).toEqual({ method: 'DELETE', url: 'Patient/1', ifMatch: 'W/"3"' });
  });

  it('addHistoryEntry menulis response lengkap', () => {
    const b = new BundleBuilder(BundleBuilder.TYPE_HISTORY_FEED)
      .addHistoryEntry({ resourceType: 'Patient' }, 'Patient/1/_history/2', '200 OK', 200, 'W/"2"', '2026-01-05T10:00:00Z', 'Patient/1', 'outcome-1')
      .build();
    expect(b.entry[0].response).toEqual({
      status: '200 OK',
      statusCode: 200,
      etag: 'W/"2"',
      lastModified: '2026-01-05T10:00:00Z',
      location: 'Patient/1',
      outcome: 'outcome-1',
    });
  });

  it('addOutcomeEntry memberi search.mode = outcome', () => {
    const b = new BundleBuilder(BundleBuilder.TYPE_SEARCHSET)
      .addOutcomeEntry({ resourceType: 'OperationOutcome' }, 'urn:uuid:2')
      .build();
    expect(b.entry[0].search).toEqual({ mode: 'outcome' });
  });

  it('setSignature menulis type sebagai daftar Coding dan who sebagai Reference', () => {
    const b = new BundleBuilder(BundleBuilder.TYPE_DOCUMENT)
      .setSignature('1.2.840.10065.1.12.1.1', 'application/jose', 'abc', 'RS256', '2026-01-05', 'Practitioner/1', 'Organization/2')
      .build();
    expect(b.signature.type).toEqual([{ code: '1.2.840.10065.1.12.1.1' }]);
    expect(b.signature.who).toEqual({ reference: 'Practitioner/1' });
    expect(b.signature.onBehalfOf).toEqual({ reference: 'Organization/2' });
  });
});
