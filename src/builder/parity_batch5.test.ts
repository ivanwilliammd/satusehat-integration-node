/** Practitioner, Organization, Location and RelatedPerson against the canonical goldens. */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { Practitioner } from './Practitioner';
import { Organization } from './Organization';
import { Location } from './Location';
import { RelatedPerson } from './RelatedPerson';
import {
  Address,
  CodeableConcept,
  Coding,
  ContactPoint,
  HumanName,
  Identifier,
  Reference,
} from '../datatype/datatypes';

const golden = (nama: string) =>
  JSON.parse(readFileSync(new URL(`./testdata/${nama}_php_golden.json`, import.meta.url), 'utf8'));

const cc = (system: string, code: string, display?: string) => {
  const c = new CodeableConcept();
  c.coding.push(new Coding(system, code, display));
  return c;
};
const ref = (reference: string, display?: string) => new Reference(reference, display);
const tel = (system: string, value: string, use?: string) => {
  const t = new ContactPoint();
  t.system = system;
  t.value = value;
  if (use) t.use = use;
  return t;
};
const addr = (line: string[], city: string, use?: string, postalCode?: string) => {
  const a = new Address();
  if (use) a.use = use;
  a.line = line;
  a.city = city;
  if (postalCode) a.postalCode = postalCode;
  return a;
};

describe('Practitioner PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new Practitioner();
    b.setId('1000000002');
    b.addIdentifier(
      new Identifier('http://sys-ids.kemkes.go.id/practitioner/1000000002', '1000000002'),
    );
    b.setActive(true);
    b.addName(new HumanName('Lestari', ['Ani'], undefined, 'dr. Ani Lestari'));
    b.addTelecom(tel('phone', '081200000000', 'work'));
    b.addAddress(addr(['Jl. Contoh No. 1'], 'Serang', 'work', '42111'));
    b.setGender('female');
    b.setBirthDate('1985-04-12');
    b.addPhoto('https://example.org/ani.jpg', 'image/jpeg');
    b.addQualification(
      new Identifier('http://sys-ids.kemkes.go.id/qualification/1000000002', 'STR-1'),
      cc('http://terminology.hl7.org/CodeSystem/v2-0360', 'MD', 'Doctor of Medicine'),
      '2020-01-01',
      ref('Organization/1000000001'),
    );
    b.addCommunication(cc('urn:ietf:bcp:47', 'id-ID', 'Indonesian'), true);

    expect(b.build()).toEqual(golden('practitioner'));
  });
});

describe('Organization PHP parity', () => {
  it('matches the canonical payload', () => {
    const t = tel('phone', '0254000000');
    const a = addr(['Jl. Rumah Sakit No. 1'], 'Serang');
    const b = new Organization();
    b.setId('1000000001');
    b.addIdentifier(
      new Identifier('http://sys-ids.kemkes.go.id/organization/1000000001', '1000000001'),
    );
    b.setActive(true);
    b.setName('RS Contoh');
    b.addAlias('RSC');
    b.setType(cc('http://terminology.hl7.org/CodeSystem/organization-type', 'prov', 'Healthcare Provider'));
    b.addTelecom(t);
    b.addAddress(a);
    b.setPartOf(ref('Organization/1000000009'));
    b.addContact(t, 'ADMIN', 'Bagian Admisi', a);
    b.addEndpoint(ref('Endpoint/end-1'));

    expect(b.build()).toEqual(golden('organization'));
  });
});

describe('Location PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new Location();
    b.setId('1000000003');
    b.addIdentifier(new Identifier('http://sys-ids.kemkes.go.id/location/1000000003', '1000000003'));
    b.setStatus('active');
    b.setOperationalStatus(cc('http://terminology.hl7.org/CodeSystem/v2-0116', 'O', 'Occupied'));
    b.setName('Poli Umum');
    b.addAlias('POLI-01');
    b.setDescription('Ruang pemeriksaan umum lantai 1');
    b.setType(cc('http://terminology.hl7.org/CodeSystem/v3-RoleCode', 'OUTPHARM', 'outpatient pharmacy'));
    b.addTelecom(tel('phone', '0254000001'));
    b.addAddress(addr(['Jl. Rumah Sakit No. 1'], 'Serang'));
    b.setPhysicalType(cc('http://terminology.hl7.org/CodeSystem/location-physical-type', 'ro', 'Room'));
    b.setPosition(-6.1234, 106.1234, 12.5);
    b.setManagingOrganization(ref('Organization/1000000001'));
    b.setPartOf(ref('Location/1000000009'));

    expect(b.build()).toEqual(golden('location'));
  });
});

describe('RelatedPerson PHP parity', () => {
  it('matches the canonical payload', () => {
    const b = new RelatedPerson();
    b.setId('rp-1');
    b.addIdentifier('http://sys-ids.kemkes.go.id/relatedperson/1000000001', 'rp-1');
    b.setActive(true);
    b.setPatient('1000000001', 'Budi Santoso');
    b.addRelationship('SPS', 'Spouse');
    b.addRelationship('CHILD'); // kanon menulis display: null
    b.addName(new HumanName('Yessike', [], undefined, 'Yessike'));
    b.addTelecom('phone', '081211112222');
    b.addAddress(addr(['Jl. Contoh No. 2'], 'Serang'));
    b.addCommunication('id-ID', true);
    b.setGender('female');
    b.setBirthDate('1990-02-02');
    b.addExtension('https://fhir.kemkes.go.id/r4/StructureDefinition/relatedperson-is-guardian', true);

    expect(b.build()).toEqual(golden('related_person'));
  });
});
