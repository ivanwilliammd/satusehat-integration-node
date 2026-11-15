/**
 * 53 builder yang permukaannya sama persis di PHP, Go, Node dan Python.
 *
 * Golden-nya keluaran builder PHP. Kalau salah satu port menaruh nilai di tempat
 * lain, payload-nya tetap sah dan ujinya tetap hijau — karena itu perbandingan
 * yang dipakai adalah kesamaan payload penuh, bukan pemeriksaan beberapa field.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { AuditEvent } from './AuditEvent';
import { Basic } from './Basic';
import { Binary } from './Binary';
import { BiologicallyDerivedProduct } from './BiologicallyDerivedProduct';
import { BodyStructure } from './BodyStructure';
import { Contract } from './Contract';
import { DeviceDefinition } from './DeviceDefinition';
import { DeviceRequest } from './DeviceRequest';
import { DeviceUseStatement } from './DeviceUseStatement';
import { EffectEvidenceSynthesis } from './EffectEvidenceSynthesis';
import { EnrollmentRequest } from './EnrollmentRequest';
import { EventDefinition } from './EventDefinition';
import { Evidence } from './Evidence';
import { EvidenceVariable } from './EvidenceVariable';
import { ExampleScenario } from './ExampleScenario';
import { Flag } from './Flag';
import { GuidanceResponse } from './GuidanceResponse';
import { ImagingManifest } from './ImagingManifest';
import { ImagingSelection } from './ImagingSelection';
import { ImmunizationEvaluation } from './ImmunizationEvaluation';
import { ImmunizationRecommendation } from './ImmunizationRecommendation';
import { Library } from './Library';
import { Linkage } from './Linkage';
import { Measure } from './Measure';
import { MeasureReport } from './MeasureReport';
import { Media } from './Media';
import { MessageDefinition } from './MessageDefinition';
import { MessageHeader } from './MessageHeader';
import { OperationOutcome } from './OperationOutcome';
import { Person } from './Person';
import { PlanDefinition } from './PlanDefinition';
import { Provenance } from './Provenance';
import { Questionnaire } from './Questionnaire';
import { RequestGroup } from './RequestGroup';
import { ResearchDefinition } from './ResearchDefinition';
import { ResearchElementDefinition } from './ResearchElementDefinition';
import { ResearchSubject } from './ResearchSubject';
import { RiskEvidenceSynthesis } from './RiskEvidenceSynthesis';
import { Schedule } from './Schedule';
import { SearchParameter } from './SearchParameter';
import { Slot } from './Slot';
import { Subscription } from './Subscription';
import { SubstanceNucleicAcid } from './SubstanceNucleicAcid';
import { SubstancePolymer } from './SubstancePolymer';
import { SubstanceProtein } from './SubstanceProtein';
import { SubstanceSourceMaterial } from './SubstanceSourceMaterial';
import { SubstanceSpecification } from './SubstanceSpecification';
import { SupplyDelivery } from './SupplyDelivery';
import { SupplyRequest } from './SupplyRequest';
import { TestReport } from './TestReport';
import { TestScript } from './TestScript';
import { VerificationResult } from './VerificationResult';
import { VisionPrescription } from './VisionPrescription';

const golden = (nama: string) =>
  JSON.parse(readFileSync(new URL(`./testdata/${nama}_php_golden.json`, import.meta.url), 'utf8'));

const kasus: Array<[string, () => Record<string, any>]> = [
  ['audit_event', () => new AuditEvent().setId('audit-event-1').addIdentifier('http://sys.id/ni','NI-100').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['basic', () => new Basic().setId('basic-1').addIdentifier('http://sys.id/ni','NI-101').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['binary', () => new Binary().setId('binary-1').addIdentifier('http://sys.id/ni','NI-102').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['biologically_derived_product', () => new BiologicallyDerivedProduct().setId('biologically-derived-product-1').addIdentifier('http://sys.id/ni','NI-103').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['body_structure', () => new BodyStructure().setId('body-structure-1').addIdentifier('http://sys.id/ni','NI-104').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['contract', () => new Contract().setId('contract-1').addIdentifier('http://sys.id/ni','NI-105').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['device_definition', () => new DeviceDefinition().setId('device-definition-1').addIdentifier('http://sys.id/ni','NI-106').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['device_request', () => new DeviceRequest().setId('device-request-1').addIdentifier('http://sys.id/ni','NI-107').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['device_use_statement', () => new DeviceUseStatement().setId('device-use-statement-1').addIdentifier('http://sys.id/ni','NI-108').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['effect_evidence_synthesis', () => new EffectEvidenceSynthesis().setId('effect-evidence-synthesis-1').addIdentifier('http://sys.id/ni','NI-109').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['enrollment_request', () => new EnrollmentRequest().setId('enrollment-request-1').addIdentifier('http://sys.id/ni','NI-110').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['event_definition', () => new EventDefinition().setId('event-definition-1').addIdentifier('http://sys.id/ni','NI-111').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['evidence', () => new Evidence().setId('evidence-1').addIdentifier('http://sys.id/ni','NI-112').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['evidence_variable', () => new EvidenceVariable().setId('evidence-variable-1').addIdentifier('http://sys.id/ni','NI-113').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['example_scenario', () => new ExampleScenario().setId('example-scenario-1').addIdentifier('http://sys.id/ni','NI-114').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['flag', () => new Flag().setId('flag-1').addIdentifier('http://sys.id/ni','NI-115').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['guidance_response', () => new GuidanceResponse().setId('guidance-response-1').addIdentifier('http://sys.id/ni','NI-116').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['imaging_manifest', () => new ImagingManifest().setId('imaging-manifest-1').addIdentifier('http://sys.id/ni','NI-117').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['imaging_selection', () => new ImagingSelection().setId('imaging-selection-1').addIdentifier('http://sys.id/ni','NI-118').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['immunization_evaluation', () => new ImmunizationEvaluation().setId('immunization-evaluation-1').addIdentifier('http://sys.id/ni','NI-119').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['immunization_recommendation', () => new ImmunizationRecommendation().setId('immunization-recommendation-1').addIdentifier('http://sys.id/ni','NI-120').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['library', () => new Library().setId('library-1').addIdentifier('http://sys.id/ni','NI-121').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['linkage', () => new Linkage().setId('linkage-1').addIdentifier('http://sys.id/ni','NI-122').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['measure', () => new Measure().setId('measure-1').addIdentifier('http://sys.id/ni','NI-123').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['measure_report', () => new MeasureReport().setId('measure-report-1').addIdentifier('http://sys.id/ni','NI-124').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['media', () => new Media().setId('media-1').addIdentifier('http://sys.id/ni','NI-125').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['message_definition', () => new MessageDefinition().setId('message-definition-1').addIdentifier('http://sys.id/ni','NI-126').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['message_header', () => new MessageHeader().setId('message-header-1').addIdentifier('http://sys.id/ni','NI-127').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['operation_outcome', () => new OperationOutcome().setId('operation-outcome-1').addIdentifier('http://sys.id/ni','NI-128').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['person', () => new Person().setId('person-1').addIdentifier('http://sys.id/ni','NI-129').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['plan_definition', () => new PlanDefinition().setId('plan-definition-1').addIdentifier('http://sys.id/ni','NI-130').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['provenance', () => new Provenance().setId('provenance-1').addIdentifier('http://sys.id/ni','NI-131').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['questionnaire', () => new Questionnaire().setId('questionnaire-1').addIdentifier('http://sys.id/ni','NI-132').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['request_group', () => new RequestGroup().setId('request-group-1').addIdentifier('http://sys.id/ni','NI-133').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['research_definition', () => new ResearchDefinition().setId('research-definition-1').addIdentifier('http://sys.id/ni','NI-134').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['research_element_definition', () => new ResearchElementDefinition().setId('research-element-definition-1').addIdentifier('http://sys.id/ni','NI-135').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['research_subject', () => new ResearchSubject().setId('research-subject-1').addIdentifier('http://sys.id/ni','NI-136').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['risk_evidence_synthesis', () => new RiskEvidenceSynthesis().setId('risk-evidence-synthesis-1').addIdentifier('http://sys.id/ni','NI-137').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['schedule', () => new Schedule().setId('schedule-1').addIdentifier('http://sys.id/ni','NI-138').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['search_parameter', () => new SearchParameter().setId('search-parameter-1').addIdentifier('http://sys.id/ni','NI-139').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['slot', () => new Slot().setId('slot-1').addIdentifier('http://sys.id/ni','NI-140').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['subscription', () => new Subscription().setId('subscription-1').addIdentifier('http://sys.id/ni','NI-141').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['substance_nucleic_acid', () => new SubstanceNucleicAcid().setId('substance-nucleic-acid-1').addIdentifier('http://sys.id/ni','NI-142').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['substance_polymer', () => new SubstancePolymer().setId('substance-polymer-1').addIdentifier('http://sys.id/ni','NI-143').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['substance_protein', () => new SubstanceProtein().setId('substance-protein-1').addIdentifier('http://sys.id/ni','NI-144').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['substance_source_material', () => new SubstanceSourceMaterial().setId('substance-source-material-1').addIdentifier('http://sys.id/ni','NI-145').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['substance_specification', () => new SubstanceSpecification().setId('substance-specification-1').addIdentifier('http://sys.id/ni','NI-146').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['supply_delivery', () => new SupplyDelivery().setId('supply-delivery-1').addIdentifier('http://sys.id/ni','NI-147').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['supply_request', () => new SupplyRequest().setId('supply-request-1').addIdentifier('http://sys.id/ni','NI-148').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['test_report', () => new TestReport().setId('test-report-1').addIdentifier('http://sys.id/ni','NI-149').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['test_script', () => new TestScript().setId('test-script-1').addIdentifier('http://sys.id/ni','NI-150').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['verification_result', () => new VerificationResult().setId('verification-result-1').addIdentifier('http://sys.id/ni','NI-151').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
  ['vision_prescription', () => new VisionPrescription().setId('vision-prescription-1').addIdentifier('http://sys.id/ni','NI-152').setStatus('active').setSubject('Patient/1000000001','Budi Santoso').setCode('http://terminology.kemkes.go.id/CodeSystem/activity','ACT-1','Konsultasi').setEncounter('Encounter/enc-1').build()],
];

describe('parity permukaan generik', () => {
  it.each(kasus)('%s sama dengan golden PHP', (nama, buat) => {
    expect(buat()).toEqual(golden(nama));
  });
});
