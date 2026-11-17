import { describe, expect, it } from 'vitest';
import { assertR4Elements, unknownElements } from './R4ElementGuard';

describe('R4ElementGuard', () => {
  it('menerima payload yang hanya memakai elemen R4', () => {
    expect(
      unknownElements({ resourceType: 'Patient', identifier: [], name: [], gender: 'male' }),
    ).toEqual([]);
  });

  it('menolak elemen yang tidak ada di resource-nya', () => {
    // `onsetDateTime` milik Condition/Observation, bukan Goal.
    expect(unknownElements({ resourceType: 'Goal', onsetDateTime: '2026-01-01' })).toEqual([
      'onsetDateTime',
    ]);
  });

  it('menerjemahkan ListResource ke List', () => {
    expect(unknownElements({ resourceType: 'ListResource', entry: [] })).toEqual([]);
  });

  it('resource di luar definisi R4 tidak diperiksa', () => {
    expect(unknownElements({ resourceType: 'BillingStatus', apa: 1 })).toEqual([]);
  });

  it('assert melempar dengan nama resource dan daftar elemen', () => {
    expect(() => assertR4Elements({ resourceType: 'Goal', onsetDateTime: 'x' })).toThrow(
      /Goal menulis elemen yang tidak ada di FHIR R4: onsetDateTime/,
    );
  });

  it('payload tanpa resourceType ditolak', () => {
    expect(unknownElements({ nama: 'x' })).toEqual(['resourceType']);
  });
});
