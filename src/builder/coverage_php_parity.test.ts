/** Coverage must produce the same payload as PayloadBuilderCoverage in the PHP SDK. */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { Coverage } from './Coverage';
import { CodeableConcept, Coding, Identifier, Reference } from '../datatype/datatypes';

const golden = JSON.parse(
  readFileSync(new URL('./testdata/coverage_php_golden.json', import.meta.url), 'utf8'),
);

describe('Coverage PHP parity', () => {
  it('matches the canonical payload', () => {
    const cc = (system: string, code: string, display: string) => {
      const c = new CodeableConcept();
      c.coding.push(new Coding(system, code, display));
      return c;
    };

    const b = new Coverage();
    b.setId('cov-1');
    b.addIdentifier(new Identifier('http://sys-ids.kemkes.go.id/coverage/1000000001', 'cov-1'));
    b.setStatus('active');
    b.setType(cc('http://terminology.hl7.org/CodeSystem/v3-ActCode', 'EHCPOL', 'extended healthcare'));
    b.setPolicyHolder('Patient/1000000001');
    b.setSubscriber('Patient/1000000001');
    b.setSubscriberId('BPJS-0001');
    b.setBeneficiary('Patient/1000000001');
    b.setDependent('1');
    b.setRelationship({ system: 'http://terminology.hl7.org/CodeSystem/subscriber-relationship', code: 'self' });
    b.addPayor('Organization/1000000001', 'BPJS Kesehatan');
    b.addClass({ system: 'http://terminology.hl7.org/CodeSystem/coverage-class', code: 'group' }, 'GRP-1', 'Grup A');
    b.setOrder(1);
    b.setNetwork('JKN');
    b.addCostToBeneficiary(50000, 'IDR');
    b.setPeriod('2026-01-01', '2026-12-31');

    expect(b.build()).toEqual(golden);
  });
});
