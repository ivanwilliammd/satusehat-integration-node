/** Endpoint, HealthcareService and Bundle against the canonical goldens. */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { EndpointBuilder } from './Endpoint';
import { HealthcareService } from './HealthcareService';
import { BundleBuilder } from './Bundle';
import { Identifier } from '../datatype/datatypes';

const golden = (nama: string) =>
  JSON.parse(readFileSync(new URL(`./testdata/${nama}_php_golden.json`, import.meta.url), 'utf8'));

describe('Endpoint PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new EndpointBuilder();
    b.setId('end-1');
    b.addIdentifier('http://sys-ids.kemkes.go.id/endpoint/1', 'end-1');
    b.addIdentifier(new Identifier('urn:oid:1.2.3', 'alt-1'));
    b.setStatus('active');
    b.setConnectionType('hl7-fhir-rest', 'HL7 FHIR');
    b.setName('Endpoint SATUSEHAT');
    b.setManagingOrganization('1000000001', 'RS Contoh');
    b.addContact('phone', '0254000002', 'work');
    b.setPeriod('2026-01-01');
    b.addPayloadType('any', 'Any');
    b.addPayloadMimeType('application/fhir+json');
    b.setAddress('https://api.satusehat.kemkes.go.id/fhir-r4/v1');
    b.addHeader('Authorization: Bearer x');

    expect(b.build()).toEqual(golden('endpoint'));
  });
});

describe('HealthcareService PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new HealthcareService();
    b.setId('hs-1');
    b.addIdentifier('http://sys-ids.kemkes.go.id/healthcareservice/1', '1', 'official', 'PRN');
    b.setStatus('active');
    b.setName('Poli Umum');
    b.setType('http://terminology.hl7.org/CodeSystem/service-type', '124', 'General Practice');
    b.setType('http://terminology.hl7.org/CodeSystem/service-type', '125', 'General Practice 2');
    b.setLocation('Location/1000000003', 'Poli Umum Lt. 1');
    b.setProvidedBy('Organization/1000000001');

    expect(b.build()).toEqual(golden('healthcare_service'));
  });
});

describe('Bundle PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new BundleBuilder('transaction');
    b.setId('bundle-1');
    b.setTimestamp('2026-01-05T09:00:00+07:00');
    b.setTotal(2);
    b.addTransactionEntry(
      { resourceType: 'Patient', id: '1000000001' },
      'urn:uuid:1',
      'POST',
      'Patient',
      undefined,
      undefined,
      'identifier=http://sys-ids.kemkes.go.id/patient/1000000001|1000000001',
    );
    b.addGetEntry('urn:uuid:2', 'Patient/1000000001');
    b.addLink('self', 'https://api.satusehat.kemkes.go.id/fhir-r4/v1');

    expect(b.build()).toEqual(golden('bundle'));
  });
});
