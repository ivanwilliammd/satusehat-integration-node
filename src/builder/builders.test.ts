import { describe, it, expect } from 'vitest';
import { BillingStatusBuilder } from './BillingStatus';
import { EndpointBuilder } from './Endpoint';
import { PurificationDecisionBuilder } from './PurificationDecision';
import { MedicationStatementBuilder } from './MedicationStatement';
import { TaskBuilder } from './Task';
import { ActivityDefinition } from './ActivityDefinition';
import { CapabilityStatement } from './CapabilityStatement';
import { CatalogEntry } from './CatalogEntry';
import { DeviceMetric } from './DeviceMetric';
import { DocumentManifest } from './DocumentManifest';
import { EnrollmentResponse } from './EnrollmentResponse';
import { ExplanationOfBenefit } from './ExplanationOfBenefit';
import { HealthcareService } from './HealthcareService';
import { InsurancePlan } from './InsurancePlan';
import { MedicationKnowledge } from './MedicationKnowledge';
import { MedicinalProduct } from './MedicinalProduct';
import { MedicinalProductAuthorization } from './MedicinalProductAuthorization';
import { MedicinalProductContraindication } from './MedicinalProductContraindication';
import { MedicinalProductIndication } from './MedicinalProductIndication';
import { MedicinalProductIngredient } from './MedicinalProductIngredient';
import { MedicinalProductInteraction } from './MedicinalProductInteraction';
import { MedicinalProductManufactured } from './MedicinalProductManufactured';
import { MedicinalProductPackaged } from './MedicinalProductPackaged';
import { MedicinalProductPharmaceutical } from './MedicinalProductPharmaceutical';
import { MedicinalProductUndesirableEffect } from './MedicinalProductUndesirableEffect';
import { ObservationDefinition } from './ObservationDefinition';
import { OrganizationAffiliation } from './OrganizationAffiliation';
import { ResearchStudy } from './ResearchStudy';
import { ResourceGuide } from './ResourceGuide';
import { SpecimenDefinition } from './SpecimenDefinition';
import { SubstanceReferenceInformation } from './SubstanceReferenceInformation';

describe('BillingStatusBuilder', () => {
  it('sets resourceType', () => {
    expect(new BillingStatusBuilder().build().resourceType).toBe('BillingStatus');
  });

  it('setId', () => {
    expect(new BillingStatusBuilder().setId('bs-1').build().id).toBe('bs-1');
  });

  it('addIdentifier', () => {
    const res = new BillingStatusBuilder().addIdentifier('http://sys-ids.kemkes.go.id/billing', 'BILL-001').build();
    expect(res.identifier[0].system).toBe('http://sys-ids.kemkes.go.id/billing');
    expect(res.identifier[0].value).toBe('BILL-001');
  });

  it('setStatus', () => {
    expect(new BillingStatusBuilder().setStatus('active').build().status).toBe('active');
  });

  it('auto-prefixes setInsurer bare', () => {
    const res = new BillingStatusBuilder().setInsurer('org-001', 'BPJS').build();
    expect(res.insurer.reference).toBe('Organization/org-001');
    expect(res.insurer.display).toBe('BPJS');
  });

  it('auto-prefixes setSubject bare', () => {
    const res = new BillingStatusBuilder().setSubject('100000030009', 'Budi').build();
    expect(res.subject.reference).toBe('Patient/100000030009');
  });

  it('auto-prefixes setRequest bare', () => {
    const res = new BillingStatusBuilder().setRequest('cer-001').build();
    expect(res.request.reference).toBe('CoverageEligibilityRequest/cer-001');
  });

  it('preserves already-prefixed setInsurer', () => {
    const res = new BillingStatusBuilder().setInsurer('Organization/org-001').build();
    expect(res.insurer.reference).toBe('Organization/org-001');
  });

  it('full chaining', () => {
    const res = new BillingStatusBuilder()
      .setId('bs-full').setStatus('active')
      .addIdentifier('http://sys', 'VAL')
      .setInsurer('org-001', 'BPJS')
      .setRecipient('org-002', 'Recipient')
      .setSubject('1001', 'Budi')
      .setRequest('cer-001')
      .build();
    expect(res.resourceType).toBe('BillingStatus');
    expect(res.id).toBe('bs-full');
    expect(res.status).toBe('active');
  });
});

describe('EndpointBuilder', () => {
  it('sets resourceType', () => {
    expect(new EndpointBuilder().build().resourceType).toBe('Endpoint');
  });

  it('setId', () => {
    expect(new EndpointBuilder().setId('ep-1').build().id).toBe('ep-1');
  });

  it('setStatus active', () => {
    expect(new EndpointBuilder().setStatus('active').build().status).toBe('active');
  });

  it('setStatus invalid throws', () => {
    expect(() => new EndpointBuilder().setStatus('invalid')).toThrow();
  });

  it('setConnectionType', () => {
    const res = new EndpointBuilder().setConnectionType('ihe-xcpd', 'IHE XCPD').build();
    expect(res.connectionType.coding[0].code).toBe('ihe-xcpd');
    expect(res.connectionType.coding[0].display).toBe('IHE XCPD');
  });

  it('setName', () => {
    expect(new EndpointBuilder().setName('FHIR Server').build().name).toBe('FHIR Server');
  });

  it('auto-prefixes managingOrganization bare', () => {
    const res = new EndpointBuilder().setManagingOrganization('org-001', 'RS Sehat').build();
    expect(res.managingOrganization.reference).toBe('Organization/org-001');
  });

  it('addContact', () => {
    const res = new EndpointBuilder().addContact('phone', '+622112345678', 'work').build();
    expect(res.contact[0].system).toBe('phone');
    expect(res.contact[0].use).toBe('work');
  });

  it('setPeriod', () => {
    const res = new EndpointBuilder().setPeriod('2022-12-20', '2022-12-30').build();
    expect(res.period.start).toBe('2022-12-20');
    expect(res.period.end).toBe('2022-12-30');
  });

  it('addPayloadType', () => {
    const res = new EndpointBuilder().addPayloadType('none', 'None').build();
    expect(res.payloadType[0].coding[0].code).toBe('none');
  });

  it('addPayloadMimeType', () => {
    const res = new EndpointBuilder().addPayloadMimeType('application/fhir+json').build();
    expect(res.payloadMimeType[0]).toBe('application/fhir+json');
  });

  it('setAddress', () => {
    expect(new EndpointBuilder().setAddress('https://fhir.example.com').build().address).toBe('https://fhir.example.com');
  });

  it('addHeader', () => {
    const res = new EndpointBuilder().addHeader('Authorization: Bearer xyz').build();
    expect(res.header[0]).toBe('Authorization: Bearer xyz');
  });
});

describe('PurificationDecisionBuilder', () => {
  it('sets resourceType', () => {
    expect(new PurificationDecisionBuilder().build().resourceType).toBe('PurificationDecision');
  });

  it('setId', () => {
    expect(new PurificationDecisionBuilder().setId('pd-1').build().id).toBe('pd-1');
  });

  it('addIdentifier', () => {
    const res = new PurificationDecisionBuilder().addIdentifier('http://sys', 'PD-001').build();
    expect(res.identifier[0].system).toBe('http://sys');
  });

  it('setStatus with code and display', () => {
    const res = new PurificationDecisionBuilder().setStatus('approved', 'Approved', 'http://sys').build();
    expect(res.status.coding[0].code).toBe('approved');
    expect(res.status.coding[0].display).toBe('Approved');
    expect(res.status.coding[0].system).toBe('http://sys');
  });

  it('auto-prefixes setInsurer bare', () => {
    const res = new PurificationDecisionBuilder().setInsurer('org-001').build();
    expect(res.insurer.reference).toBe('Organization/org-001');
  });

  it('auto-prefixes setProvider bare', () => {
    const res = new PurificationDecisionBuilder().setProvider('org-002').build();
    expect(res.provider.reference).toBe('Organization/org-002');
  });

  it('auto-prefixes setClaimResponse bare', () => {
    const res = new PurificationDecisionBuilder().setClaimResponse('cr-001').build();
    expect(res.claimResponse.reference).toBe('ClaimResponse/cr-001');
  });

  it('setCreated', () => {
    expect(new PurificationDecisionBuilder().setCreated('2024-01-15T10:35:00+00:00').build().created)
      .toBe('2024-01-15T10:35:00+00:00');
  });

  it('full chaining', () => {
    const res = new PurificationDecisionBuilder()
      .setId('pd-full').addIdentifier('http://sys', 'PD-001')
      .setStatus('approved', 'Approved')
      .setInsurer('org-bpjs', 'BPJS')
      .setProvider('hos-001', 'RS Sehat')
      .setClaimResponse('cr-001', 'Claim')
      .setCreated('2024-01-15T10:35:00+00:00')
      .build();
    expect(res.resourceType).toBe('PurificationDecision');
    expect(res.status.coding[0].code).toBe('approved');
    expect(res.claimResponse.reference).toBe('ClaimResponse/cr-001');
  });
});

describe('MedicationStatementBuilder', () => {
  it('sets resourceType', () => {
    expect(new MedicationStatementBuilder().build().resourceType).toBe('MedicationStatement');
  });

  it('setSubject auto-prefix bare id', () => {
    const res = new MedicationStatementBuilder().setSubject('100000030009', 'Budi').build();
    expect(res.subject.reference).toBe('Patient/100000030009');
    expect(res.subject.display).toBe('Budi');
  });

  it('setSubject preserves already-prefixed', () => {
    const res = new MedicationStatementBuilder().setSubject('Patient/100000030009').build();
    expect(res.subject.reference).toBe('Patient/100000030009');
  });

  it('setMedicationReference auto-prefix bare', () => {
    const res = new MedicationStatementBuilder().setMedicationReference('med-001', 'Paracetamol').build();
    expect(res.medicationReference.reference).toBe('Medication/med-001');
  });

  it('setContext auto-prefix bare', () => {
    const res = new MedicationStatementBuilder().setContext('enc-001').build();
    expect(res.context.reference).toBe('Encounter/enc-001');
  });

  it('setInformationSource auto-prefix bare', () => {
    const res = new MedicationStatementBuilder().setInformationSource('100000030009').build();
    expect(res.informationSource.reference).toBe('Patient/100000030009');
  });

  it('setStatus urn preserved', () => {
    const res = new MedicationStatementBuilder().setSubject('urn:uuid:550e8400-e29b-41d4-a716').build();
    expect(res.subject.reference).toBe('urn:uuid:550e8400-e29b-41d4-a716');
  });

  it('setStatus https preserved', () => {
    const res = new MedicationStatementBuilder().setSubject('https://satusehat.example.com/Patient/123').build();
    expect(res.subject.reference).toBe('https://satusehat.example.com/Patient/123');
  });

  it('addDosageInstruction with all params', () => {
    const res = new MedicationStatementBuilder()
      .addDosageInstruction('Paracetamol 500mg', 3, 1, 'd').build();
    expect(res.dosage[0].text).toBe('Paracetamol 500mg');
    expect(res.dosage[0].timing.repeat.frequency).toBe(3);
    expect(res.dosage[0].timing.repeat.period).toBe(1);
    expect(res.dosage[0].timing.repeat.periodUnit).toBe('d');
  });

  it('addContained', () => {
    const res = new MedicationStatementBuilder()
      .addContained({ resourceType: 'Medication', id: 'inline-med', code: {} }).build();
    expect(res.contained[0].id).toBe('inline-med');
  });

  it('chaining', () => {
    const b = new MedicationStatementBuilder()
      .setId('ms-002').setStatus('completed')
      .setSubject('100000030009', 'Budi')
      .setMedicationReference('med-001');
    expect(b.build().resourceType).toBe('MedicationStatement');
    expect(b.build().id).toBe('ms-002');
  });
});

describe('TaskBuilder', () => {
  it('sets resourceType', () => {
    expect(new TaskBuilder().build().resourceType).toBe('Task');
  });

  it('setId', () => {
    expect(new TaskBuilder().setId('task-001').build().id).toBe('task-001');
  });

  it('setStatus valid', () => {
    expect(new TaskBuilder().setStatus('requested').build().status).toBe('requested');
  });

  it('setStatus invalid throws', () => {
    expect(() => new TaskBuilder().setStatus('invalid')).toThrow();
  });

  it('setIntent valid', () => {
    expect(new TaskBuilder().setIntent('order').build().intent).toBe('order');
  });

  it('setIntent invalid throws', () => {
    expect(() => new TaskBuilder().setIntent('invalid')).toThrow();
  });

  it('setFor auto-prefix bare', () => {
    const res = new TaskBuilder().setFor('100000030009', 'Budi').build();
    expect(res.for.reference).toBe('Patient/100000030009');
  });

  it('setEncounter auto-prefix bare', () => {
    const res = new TaskBuilder().setEncounter('enc-001').build();
    expect(res.encounter.reference).toBe('Encounter/enc-001');
  });

  it('setRequester auto-prefix bare', () => {
    const res = new TaskBuilder().setRequester('N10000001').build();
    expect(res.requester.reference).toBe('Practitioner/N10000001');
  });

  it('setOwner auto-prefix bare', () => {
    const res = new TaskBuilder().setOwner('N20000001').build();
    expect(res.owner.reference).toBe('Practitioner/N20000001');
  });

  it('setLocation auto-prefix bare', () => {
    const res = new TaskBuilder().setLocation('loc-001').build();
    expect(res.location.reference).toBe('Location/loc-001');
  });

  it('preserves already-prefixed', () => {
    const res = new TaskBuilder().setFor('Patient/100000030009').build();
    expect(res.for.reference).toBe('Patient/100000030009');
  });

  it('addInput with text type', () => {
    const res = new TaskBuilder().addInput('Darah', '120/80 mmHg').build();
    expect(res.input[0].type.text).toBe('Darah');
    expect(res.input[0].valueString).toBe('120/80 mmHg');
  });

  it('addOutput', () => {
    const res = new TaskBuilder().addOutput('Hasil Lab', 'Hb 14 g/dL').build();
    expect(res.output[0].type.text).toBe('Hasil Lab');
    expect(res.output[0].valueString).toBe('Hb 14 g/dL');
  });

  it('addIdentifier', () => {
    const res = new TaskBuilder().addIdentifier('http://sys', 'TASK-001').build();
    expect(res.identifier[0].system).toBe('http://sys');
    expect(res.identifier[0].value).toBe('TASK-001');
  });

  it('chaining', () => {
    const res = new TaskBuilder()
      .setId('task-full').setStatus('requested').setIntent('order')
      .setFor('100000030009').setEncounter('enc-001')
      .setRequester('N10000001')
      .addInput('Catatan', 'Pasien stabil')
      .build();
    expect(res.resourceType).toBe('Task');
    expect(res.status).toBe('requested');
    expect(res.for.reference).toBe('Patient/100000030009');
    expect(res.input[0].valueString).toBe('Pasien stabil');
  });
});


describe('Phase 6 — FHIR R4 non-SATUSEHAT resources', () => {
  const cases: Array<[string, new () => any]> = [
    [ActivityDefinition, 'ActivityDefinition'],
    [CapabilityStatement, 'CapabilityStatement'],
    [CatalogEntry, 'CatalogEntry'],
    [DeviceMetric, 'DeviceMetric'],
    [DocumentManifest, 'DocumentManifest'],
    [EnrollmentResponse, 'EnrollmentResponse'],
    [ExplanationOfBenefit, 'ExplanationOfBenefit'],
    [HealthcareService, 'HealthcareService'],
    [InsurancePlan, 'InsurancePlan'],
    [MedicationKnowledge, 'MedicationKnowledge'],
    [MedicinalProduct, 'MedicinalProduct'],
    [MedicinalProductAuthorization, 'MedicinalProductAuthorization'],
    [MedicinalProductContraindication, 'MedicinalProductContraindication'],
    [MedicinalProductIndication, 'MedicinalProductIndication'],
    [MedicinalProductIngredient, 'MedicinalProductIngredient'],
    [MedicinalProductInteraction, 'MedicinalProductInteraction'],
    [MedicinalProductManufactured, 'MedicinalProductManufactured'],
    [MedicinalProductPackaged, 'MedicinalProductPackaged'],
    [MedicinalProductPharmaceutical, 'MedicinalProductPharmaceutical'],
    [MedicinalProductUndesirableEffect, 'MedicinalProductUndesirableEffect'],
    [ObservationDefinition, 'ObservationDefinition'],
    [OrganizationAffiliation, 'OrganizationAffiliation'],
    [ResearchStudy, 'ResearchStudy'],
    [ResourceGuide, 'ResourceGuide'],
    [SpecimenDefinition, 'SpecimenDefinition'],
    [SubstanceReferenceInformation, 'SubstanceReferenceInformation'],
  ];

  it.each(cases)('%s builds valid payload', (Builder, resourceType) => {
    const payload = new Builder()
      .setId(`ph6-${resourceType.toLowerCase()}`)
      .setStatus('active')
      .build();
    expect(payload.resourceType).toBe(resourceType);
    expect(payload.id).toBe(`ph6-${resourceType.toLowerCase()}`);
    expect(payload.status).toBe('active');
  });

  it('OrganizationAffiliation has typed fields', () => {
    const payload = new OrganizationAffiliation()
      .setOrganization('org-1', 'RSCM')
      .setCode('http://terminology.hl7.org/CodeSystem/organization-role', 'provider', 'Provider')
      .build();
    expect(payload.organization.reference).toBe('org-1');
    expect(payload.code.coding[0].code).toBe('provider');
  });
});
