import { describe, expect, it } from 'vitest';
import {
  ALL,
  EXT_ADMINISTRATIVE_CODE,
  NIK_SYSTEM,
  administrativeCode,
  officialIdentifier,
} from './SatusehatNonStandard';

describe('SatusehatNonStandard', () => {
  it('semua URL memakai domain Kemkes', () => {
    for (const [nama, url] of ALL) {
      expect(url.startsWith('https://fhir.kemkes.go.id/'), `${nama}: ${url}`).toBe(true);
    }
  });

  it('berisi 11 objek non-standar', () => {
    expect(ALL.length).toBe(11);
  });

  it('tidak ada URL ganda', () => {
    expect(new Set(ALL.map(([, u]) => u)).size).toBe(ALL.length);
  });

  it('identifier resmi selalu official', () => {
    expect(officialIdentifier(NIK_SYSTEM, '3171234567890001')).toEqual({
      use: 'official',
      system: NIK_SYSTEM,
      value: '3171234567890001',
    });
  });

  it('administrativeCode memakai irisan', () => {
    const ext = administrativeCode([
      ['province', '31'],
      ['city', '3171'],
    ]);
    expect(ext.url).toBe(EXT_ADMINISTRATIVE_CODE);
    expect(ext.extension).toHaveLength(2);
    expect(ext.extension[0]).toEqual({ url: 'province', valueCode: '31' });
  });
});
