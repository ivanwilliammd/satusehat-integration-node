/** CareTeam must produce the same payload as PayloadBuilderCareTeam in the PHP SDK. */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { CareTeam } from './CareTeam';

const golden = JSON.parse(readFileSync(new URL('./testdata/care_team_php_golden.json', import.meta.url), 'utf8'));

describe('CareTeam PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new CareTeam();
    b.setId('ct-1');
    b.addIdentifier('urn:oid:1.2.3', 'ct-1', 'official', 'PRN');
    b.setStatus('active');
    b.setCode({ system: 'http://snomed.info/sct', code: '768242006', display: 'Care team' });
    b.setSubject('Patient/1000000001', 'Budi Santoso');
    b.setEncounter('Encounter/2000000001');

    expect(b.build()).toEqual(golden);
  });
});
