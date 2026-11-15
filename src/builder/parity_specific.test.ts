/** Golden PHP untuk builder yang permukaannya khas per resource. */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ActivityDefinition } from './ActivityDefinition';
import { BillingStatus } from './BillingStatus';
import { CapabilityStatement } from './CapabilityStatement';
import { CatalogEntry } from './CatalogEntry';
import { Communication } from './Communication';
import { CommunicationRequest } from './CommunicationRequest';
import { Consent } from './Consent';
import { CoverageEligibilityRequest } from './CoverageEligibilityRequest';
import { CoverageEligibilityResponse } from './CoverageEligibilityResponse';
import { DetectedIssue } from './DetectedIssue';
import { DeviceMetric } from './DeviceMetric';
import { DocumentManifest } from './DocumentManifest';
import { EnrollmentResponse } from './EnrollmentResponse';
import { ExplanationOfBenefit } from './ExplanationOfBenefit';
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
import { PurificationDecision } from './PurificationDecision';
import { ResearchStudy } from './ResearchStudy';
import { ResourceGuide } from './ResourceGuide';
import { SpecimenDefinition } from './SpecimenDefinition';
import { SubstanceReferenceInformation } from './SubstanceReferenceInformation';

const golden = (nama: string) =>
  JSON.parse(readFileSync(new URL(`./testdata/${nama}_php_golden.json`, import.meta.url), 'utf8'));

const kasus: Array<[string, () => Record<string, any>]> = [
  ['activity_definition', () => { const b = new ActivityDefinition(); b.setId("ad-1"); b.addIdentifier("http://sys.id/ni", "NI-1"); b.setStatus("active"); b.setDescription("Edukasi gizi"); b.setKind("http://terminology.hl7.org/CodeSystem/activity-definition-kind", "ServiceRequest", "Service Request"); b.setCode("http://terminology.kemkes.go.id/CodeSystem/activity", "EDU-1", "Edukasi"); b.setAuthor("Practitioner/1000000002", "dr. Budi"); b.setTiming("2026-01-05"); return b.build(); }],
  ['billing_status', () => { const b = new BillingStatus(); b.setId("bs-1"); b.addIdentifier("http://sys.id/ni", "NI-90"); b.setStatus("active"); b.setInsurer("Organization/1000000001", "BPJS"); b.setRecipient("Organization/1000000002", "RS Sehat"); b.setSubject("Patient/1000000001", "Budi Santoso"); b.setRequest("CoverageEligibilityRequest/cer-1", "Klaim"); return b.build(); }],
  ['capability_statement', () => { const b = new CapabilityStatement(); b.setId("cs-1"); b.addIdentifier("http://sys.id/ni", "NI-2"); b.setStatus("active"); b.setDate("2026-01-05"); b.setKind("http://hl7.org/fhir/capability-statement-kind", "instance", "Instance"); b.setFhirVersion("http://hl7.org/fhir/FHIR-version", "4.0.1", "4.0.1"); b.setFormat("http://hl7.org/fhir/restful-format", "json", "JSON"); b.setRest("http://hl7.org/fhir/restful-mode", "server", "Server"); return b.build(); }],
  ['catalog_entry', () => { const b = new CatalogEntry(); b.setId("ce-1"); b.addIdentifier("http://sys.id/ni", "NI-3"); b.setStatus("active"); b.setType("http://terminology.hl7.org/CodeSystem/catalogType", "medication", "Medication"); b.setReference("Medication/med-1", "Amoksisilin"); b.setValidityPeriod("2026-01-05/2026-12-31"); return b.build(); }],
  ['communication', () => { const b = new Communication(); b.setId("communication-1"); b.addIdentifier("http://sys.id/ni", "NI-32"); b.setStatus("active"); b.setSubject("Patient/1000000001", "Budi Santoso"); b.setCode("http://terminology.kemkes.go.id/CodeSystem/activity", "ACT-1", "Konsultasi"); b.setEncounter("Encounter/enc-1"); return b.build(); }],
  ['communication_request', () => { const b = new CommunicationRequest(); b.setId("communicationrequest-1"); b.addIdentifier("http://sys.id/ni", "NI-33"); b.setStatus("active"); b.setSubject("Patient/1000000001", "Budi Santoso"); b.setCode("http://terminology.kemkes.go.id/CodeSystem/activity", "ACT-1", "Konsultasi"); b.setEncounter("Encounter/enc-1"); return b.build(); }],
  ['consent', () => { const b = new Consent(); b.setId("consent-1"); b.addIdentifier("http://sys.id/ni", "NI-35"); b.setStatus("active"); b.setSubject("Patient/1000000001", "Budi Santoso"); b.setCode("http://terminology.kemkes.go.id/CodeSystem/activity", "ACT-1", "Konsultasi"); b.setEncounter("Encounter/enc-1"); return b.build(); }],
  ['coverage_eligibility_request', () => { const b = new CoverageEligibilityRequest(); b.setId("cer-2"); b.addIdentifier("http://sys.id/ni", "NI-60"); b.setStatus("active"); b.setPatient("Patient/1000000001", "Budi Santoso"); b.setInsurer("Organization/1000000001"); b.setCreated("2026-01-05"); b.addCoverage("Coverage/cov-1", "PRE-1"); b.setEnterer("Practitioner/1000000002"); b.setProvider("Organization/1000000001"); b.addItem("http://terminology.kemkes.go.id/CodeSystem/lab", "LAB-1", "Darah Lengkap", "http://terminology.hl7.org/CodeSystem/ex-benefitcategory", "1"); b.setPriority("http://terminology.hl7.org/CodeSystem/processpriority", "normal", "Normal"); b.setPurpose(["validation", "benefits"]); b.setServicedDate("2026-01-05"); return b.build(); }],
  ['coverage_eligibility_response', () => { const b = new CoverageEligibilityResponse(); b.setId("cer-1"); b.setStatus("active"); b.setPurpose(["benefits"]); b.setServicedDate("2026-01-05"); b.setRequestProvider("Organization/1000000001"); b.setPatient("Patient/1000000001"); b.addInsurance("Coverage/cov-1", "Rawat inap", "http://terminology.hl7.org/CodeSystem/benefit-category", "1", "Medical Care"); return b.build(); }],
  ['detected_issue', () => { const b = new DetectedIssue(); b.setId("detectedissue-1"); b.addIdentifier("http://sys.id/ni", "NI-34"); b.setStatus("active"); b.setSubject("Patient/1000000001", "Budi Santoso"); b.setCode("http://terminology.kemkes.go.id/CodeSystem/activity", "ACT-1", "Konsultasi"); b.setEncounter("Encounter/enc-1"); return b.build(); }],
  ['device_metric', () => { const b = new DeviceMetric(); b.setId("dm-1"); b.addIdentifier("http://sys.id/ni", "NI-4"); b.setStatus("active"); b.setType("http://terminology.hl7.org/CodeSystem/device-metric-type", "heart-rate", "Heart rate"); b.setCategory("http://terminology.hl7.org/CodeSystem/metric-category", "measurement", "Measurement"); b.setMeasurementPeriod("2026-01-05"); return b.build(); }],
  ['document_manifest', () => { const b = new DocumentManifest(); b.setId("dmf-1"); b.addIdentifier("http://sys.id/ni", "NI-5"); b.setStatus("current"); b.setType("http://loinc.org", "34133-9", "Summary of episode note"); b.setSubject("Patient/1000000001", "Budi Santoso"); b.setCreated("2026-01-05"); b.setSource("Practitioner/1000000002", "dr. Budi"); return b.build(); }],
  ['enrollment_response', () => { const b = new EnrollmentResponse(); b.setId("er-1"); b.addIdentifier("http://sys.id/ni", "NI-6"); b.setStatus("active"); b.setRequest("EnrollmentRequest/erq-1", "Pendaftaran"); b.setOutcome("http://terminology.hl7.org/CodeSystem/remittance-outcome", "complete", "Complete"); b.setDisposition("Disetujui"); b.setCreated("2026-01-05"); return b.build(); }],
  ['explanation_of_benefit', () => { const b = new ExplanationOfBenefit(); b.setId("eob-1"); b.addIdentifier("http://sys.id/ni", "NI-7"); b.setStatus("active"); b.setType("http://terminology.hl7.org/CodeSystem/claim-type", "institutional", "Institutional"); b.setUse("http://terminology.hl7.org/CodeSystem/claim-use", "claim", "Claim"); b.setPatient("Patient/1000000001", "Budi Santoso"); b.setCreated("2026-01-05"); b.setProvider("Organization/1000000001", "RS Sehat"); return b.build(); }],
  ['insurance_plan', () => { const b = new InsurancePlan(); b.setId("ip-1"); b.addIdentifier("http://sys.id/ni", "NI-8"); b.setStatus("active"); b.setName("BPJS Kesehatan"); b.setType("http://terminology.hl7.org/CodeSystem/insurance-plan-type", "medical", "Medical"); b.setAdministeredBy("Organization/1000000001", "BPJS"); b.setCoverage("http://terminology.hl7.org/CodeSystem/coverage-type", "institutional", "Institutional"); return b.build(); }],
  ['medication_knowledge', () => { const b = new MedicationKnowledge(); b.setId("mk-1"); b.addIdentifier("http://sys.id/ni", "NI-9"); b.setStatus("active"); b.setCode("http://terminology.kemkes.go.id/CodeSystem/medication", "MED-1", "Amoksisilin"); b.setManufacturer("Organization/1000000001", "Kimia Farma"); b.setDoseForm("http://snomed.info/sct", "385055001", "Tablet"); return b.build(); }],
  ['medicinal_product', () => { const b = new MedicinalProduct(); b.setId("mp-1"); b.addIdentifier("http://sys.id/ni", "NI-20"); b.setStatus("active"); b.setName("Amoksisilin"); b.setManufacturer("Organization/1000000001", "Kimia Farma"); b.setProductClass("http://terminology.hl7.org/CodeSystem/medicinal-product-class", "antibiotic", "Antibiotic"); return b.build(); }],
  ['medicinal_product_authorization', () => { const b = new MedicinalProductAuthorization(); b.setId("mpa-1"); b.addIdentifier("http://sys.id/ni", "NI-21"); b.setStatus("active"); b.setCountry("urn:iso:std:iso:3166", "ID", "Indonesia"); b.setRegulator("Organization/1000000002", "BPOM"); b.setValidityPeriod("2026-01-05/2031-01-05"); return b.build(); }],
  ['medicinal_product_contraindication', () => { const b = new MedicinalProductContraindication(); b.setId("mpc-1"); b.addIdentifier("http://sys.id/ni", "NI-22"); b.setStatus("active"); b.setSubject("MedicinalProduct/mp-1", "Amoksisilin"); b.setDisease("http://snomed.info/sct", "91936005", "Alergi penisilin"); b.setComorbidity("Condition/cond-9", "Gagal ginjal"); return b.build(); }],
  ['medicinal_product_indication', () => { const b = new MedicinalProductIndication(); b.setId("mpi-1"); b.addIdentifier("http://sys.id/ni", "NI-23"); b.setStatus("active"); b.setSubject("MedicinalProduct/mp-1", "Amoksisilin"); b.setDisease("http://snomed.info/sct", "233604007", "Pneumonia"); b.setComorbidity("Condition/cond-10", "Diabetes"); return b.build(); }],
  ['medicinal_product_ingredient', () => { const b = new MedicinalProductIngredient(); b.setId("mpg-1"); b.addIdentifier("http://sys.id/ni", "NI-24"); b.setStatus("active"); b.setRole("http://terminology.hl7.org/CodeSystem/medicinal-product-ingredient-role", "active", "Active"); b.setSubstance("Amoksisilin trihidrat"); b.setQuantity("500 mg"); return b.build(); }],
  ['medicinal_product_interaction', () => { const b = new MedicinalProductInteraction(); b.setId("mpn-1"); b.addIdentifier("http://sys.id/ni", "NI-25"); b.setStatus("active"); b.setSubject("MedicinalProduct/mp-1", "Amoksisilin"); b.setDescription("Interaksi dengan warfarin"); b.setInteractant("http://snomed.info/sct", "372756006", "Warfarin"); return b.build(); }],
  ['medicinal_product_manufactured', () => { const b = new MedicinalProductManufactured(); b.setId("mpm-1"); b.addIdentifier("http://sys.id/ni", "NI-26"); b.setStatus("active"); b.setQuantity("500 mg"); b.setManufacturer("Organization/1000000001", "Kimia Farma"); b.setIngredient("http://snomed.info/sct", "387517004", "Amoksisilin"); return b.build(); }],
  ['medicinal_product_packaged', () => { const b = new MedicinalProductPackaged(); b.setId("mpp-1"); b.addIdentifier("http://sys.id/ni", "NI-27"); b.setStatus("active"); b.setPackageItem("http://terminology.hl7.org/CodeSystem/package-type", "box", "Box"); b.setDescription("Dus 10 tablet"); b.setManufacturer("Organization/1000000001", "Kimia Farma"); return b.build(); }],
  ['medicinal_product_pharmaceutical', () => { const b = new MedicinalProductPharmaceutical(); b.setId("mph-1"); b.addIdentifier("http://sys.id/ni", "NI-28"); b.setStatus("active"); b.setRoute("http://snomed.info/sct", "26643006", "Oral"); b.setDoseForm("http://snomed.info/sct", "385055001", "Tablet"); b.setIngredient("http://snomed.info/sct", "387517004", "Amoksisilin"); return b.build(); }],
  ['medicinal_product_undesirable_effect', () => { const b = new MedicinalProductUndesirableEffect(); b.setId("mpu-1"); b.addIdentifier("http://sys.id/ni", "NI-29"); b.setStatus("active"); b.setSubject("MedicinalProduct/mp-1", "Amoksisilin"); b.setSymptomConditionEffect("http://snomed.info/sct", "422587007", "Nausea"); b.setClassification("http://terminology.hl7.org/CodeSystem/undesirable-effect-frequency", "common", "Common"); return b.build(); }],
  ['observation_definition', () => { const b = new ObservationDefinition(); b.setId("od-1"); b.addIdentifier("http://sys.id/ni", "NI-10"); b.setStatus("active"); b.setCode("http://loinc.org", "8867-4", "Heart rate"); b.setCategory("http://terminology.hl7.org/CodeSystem/observation-category", "vital-signs", "Vital Signs"); b.setMethod("http://snomed.info/sct", "37931006", "Auscultation"); return b.build(); }],
  ['organization_affiliation', () => { const b = new OrganizationAffiliation(); b.setId("oa-1"); b.addIdentifier("http://sys.id/ni", "NI-11"); b.setStatus("active"); b.setOrganization("Organization/1000000001", "RS Sehat"); b.setParticipatingOrganization("Organization/1000000002", "Klinik Sehat"); b.setNetwork("http://terminology.hl7.org/CodeSystem/network-type", "nt1", "Network 1"); b.setCode("http://terminology.hl7.org/CodeSystem/organization-role", "provider", "Provider"); return b.build(); }],
  ['purification_decision', () => { const b = new PurificationDecision(); b.setId("pd-1"); b.addIdentifier("http://sys.id/ni", "NI-91"); b.setStatus("approved", "Approved", "http://terminology.hl7.org/CodeSystem/decision"); b.setInsurer("Organization/1000000001", "BPJS"); b.setProvider("Organization/1000000002", "RS Sehat"); b.setClaimResponse("ClaimResponse/cr-1", "Respons"); b.setCreated("2026-01-05"); return b.build(); }],
  ['research_study', () => { const b = new ResearchStudy(); b.setId("rs-1"); b.addIdentifier("http://sys.id/ni", "NI-12"); b.setStatus("active"); b.setTitle("Studi Hipertensi"); b.setProtocol("PlanDefinition/pd-1", "Protokol"); b.setSponsor("Organization/1000000001", "FKUI"); b.setPhase("http://terminology.hl7.org/CodeSystem/research-study-phase", "phase-2", "Phase 2"); return b.build(); }],
  ['resource_guide', () => { const b = new ResourceGuide(); b.setId("rg-1"); b.addIdentifier("http://sys.id/ni", "NI-92", "official", "MC", "Medical Record Number"); b.setStatus("active"); b.setName("Panduan"); b.setDescription("Panduan implementasi"); b.setVersion("1.0.0"); b.setPublisher("Kemenkes"); return b.build(); }],
  ['specimen_definition', () => { const b = new SpecimenDefinition(); b.setId("sd-1"); b.addIdentifier("http://sys.id/ni", "NI-81"); b.setStatus("active"); b.setType("http://snomed.info/sct", "122555007", "Venous blood specimen"); b.setCollection("Darah vena"); b.setPreparation("http://terminology.hl7.org/CodeSystem/preparation", "spun", "Spun"); return b.build(); }],
  ['substance_reference_information', () => { const b = new SubstanceReferenceInformation(); b.setId("sri-1"); b.setStatus("active"); b.setComment("Informasi referensi"); b.setGene("http://www.genenames.org", "HGNC:5", "A1BG"); b.setGeneElement("http://snomed.info/sct", "123", "Elemen"); return b.build(); }],
];

describe('parity builder khas', () => {
  it.each(kasus)('%s sama dengan golden PHP', (nama, buat) => {
    expect(buat()).toEqual(golden(nama));
  });
});
