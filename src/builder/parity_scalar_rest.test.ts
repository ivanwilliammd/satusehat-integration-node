/**
 * 24 modul yang builder-nya sudah berisi tetapi belum pernah dibandingkan PHP.
 *
 * Golden dibuat dari builder PHP lewat runner, dengan permukaan yang bisa
 * dipanggil dari luar tanpa objek datatype: hanya setter berskala. Setter bertipe
 * (Reference, CodeableConcept, Identifier) belum tercakup di sini — itu pekerjaan
 * berikutnya, bukan sesuatu yang boleh dikarang.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { AdverseEvent } from './AdverseEvent';
import { Appointment } from './Appointment';
import { AppointmentResponse } from './AppointmentResponse';
import { CarePlan } from './CarePlan';
import { CareTeam } from './CareTeam';
import { ChargeItemDefinition } from './ChargeItemDefinition';
import { ChargeItemResponse } from './ChargeItemResponse';
import { ClinicalImpression } from './ClinicalImpression';
import { Composition } from './Composition';
import { Coverage } from './Coverage';
import { Device } from './Device';
import { DocumentReference } from './DocumentReference';
import { EpisodeOfCare } from './EpisodeOfCare';
import { FamilyMemberHistory } from './FamilyMemberHistory';
import { Goal } from './Goal';
import { Group } from './Group';
import { ListResource } from './ListResource';
import { NutritionOrder } from './NutritionOrder';
import { PaymentNotice } from './PaymentNotice';
import { PaymentReconciliation } from './PaymentReconciliation';
import { PractitionerRole } from './PractitionerRole';
import { QuestionnaireResponse } from './QuestionnaireResponse';
import { Substance } from './Substance';
import { Task } from './Task';

const golden = (nama: string) =>
  JSON.parse(readFileSync(new URL(`./testdata/${nama}_scalar_php_golden.json`, import.meta.url), 'utf8'));

describe('parity permukaan berskala', () => {
  it('AdverseEvent', () => {
    const b = new AdverseEvent();
    b.setId("adverse_event-1");
    b.setStatus("active");
    b.setSubject("Patient/1000000001");
    b.setEncounter("Patient/1000000001");
    expect(b.build()).toEqual(golden('adverse_event'));
  });
  it('Appointment', () => {
    const b = new Appointment();
    b.setId("appointment-1");
    b.setStatus("active");
    expect(b.build()).toEqual(golden('appointment'));
  });
  it('AppointmentResponse', () => {
    const b = new AppointmentResponse();
    b.setId("appointment_response-1");
    expect(b.build()).toEqual(golden('appointment_response'));
  });
  it('CarePlan', () => {
    const b = new CarePlan();
    b.setId("care_plan-1");
    b.setStatus("active");
    b.setIntent("Nilai");
    b.setTitle("Nilai");
    b.setDescription("Nilai");
    b.addActivity(["A1", "A2"]);
    expect(b.build()).toEqual(golden('care_plan'));
  });
  it('CareTeam', () => {
    const b = new CareTeam();
    b.setId("care_team-1");
    b.addIdentifier("http://sys.id/ni", "Nilai");
    b.setStatus("active");
    b.setCode("http://sys.id/ni", "C1", "Tampilan");
    b.setSubject("Patient/1000000001");
    b.setEncounter("Patient/1000000001");
    expect(b.build()).toEqual(golden('care_team'));
  });
  it('ChargeItemDefinition', () => {
    const b = new ChargeItemDefinition();
    b.setId("charge_item_definition-1");
    b.setUrl("http://example.org/x");
    b.setVersion("Nilai");
    b.setName("Nilai");
    b.setTitle("Nilai");
    b.setStatus("active");
    b.setDate("2026-01-05");
    b.setPublisher("Nilai");
    b.setDescription("Nilai");
    b.setCode("http://sys.id/ni", "C1");
    expect(b.build()).toEqual(golden('charge_item_definition'));
  });
  it('ChargeItemResponse', () => {
    const b = new ChargeItemResponse();
    b.setId("charge_item_response-1");
    b.addIdentifier("http://sys.id/ni", "Nilai");
    b.setStatus("active");
    b.setChargeItem("Patient/1000000001");
    b.setRequest("Patient/1000000001");
    b.setOutcome("http://sys.id/ni", "C1");
    b.setDescription("Nilai");
    b.setCreated("2026-01-05");
    b.setRequestor("Patient/1000000001");
    expect(b.build()).toEqual(golden('charge_item_response'));
  });
  it('ClinicalImpression', () => {
    const b = new ClinicalImpression();
    b.setId("clinical_impression-1");
    b.setStatus("active");
    b.setEffectiveDateTime("2026-01-05");
    b.setDate("2026-01-05");
    b.addInvestigation(["A1", "A2"]);
    expect(b.build()).toEqual(golden('clinical_impression'));
  });
  it('Composition', () => {
    const b = new Composition();
    b.setId("composition-1");
    b.setStatus("active");
    b.setTitle("Nilai");
    b.setDate("2026-01-05");
    b.addSection(["A1", "A2"]);
    expect(b.build()).toEqual(golden('composition'));
  });
  it('Coverage', () => {
    const b = new Coverage();
    b.setId("coverage-1");
    b.addIdentifier("http://sys.id/ni", "Nilai");
    b.setStatus("active");
    b.setType("http://sys.id/ni", "C1");
    b.setPolicyHolder("Patient/1000000001");
    b.setSubscriber("Patient/1000000001");
    b.setSubscriberId("Nilai");
    b.setBeneficiary("Patient/1000000001");
    b.setDependent("Nilai");
    b.setRelationship("http://sys.id/ni", "C1");
    b.addPayor("Patient/1000000001");
    b.setOrder(1);
    b.setNetwork("Nilai");
    b.setPeriod("2026-01-05");
    expect(b.build()).toEqual(golden('coverage'));
  });
  it('Device', () => {
    const b = new Device();
    b.setId("device-1");
    b.setStatus("active");
    b.setManufacturer("Nilai");
    b.addDeviceName("Nilai");
    b.setSerialNumber("Nilai");
    expect(b.build()).toEqual(golden('device'));
  });
  it('DocumentReference', () => {
    const b = new DocumentReference();
    b.setId("document_reference-1");
    b.setStatus("active");
    b.setDocStatus("active");
    b.setDate("2026-01-05");
    b.setDescription("Nilai");
    b.setContext(["A1", "A2"]);
    expect(b.build()).toEqual(golden('document_reference'));
  });
  it('EpisodeOfCare', () => {
    const b = new EpisodeOfCare();
    b.setId("episode_of_care-1");
    b.setStatus("active");
    b.addStatusHistory("active", "2026-01-05");
    expect(b.build()).toEqual(golden('episode_of_care'));
  });
  it('FamilyMemberHistory', () => {
    const b = new FamilyMemberHistory();
    b.setDate("2026-01-05");
    expect(b.build()).toEqual(golden('family_member_history'));
  });
  it('Goal', () => {
    const b = new Goal();
    b.setId("goal-1");
    b.setLifecycleStatus("active");
    b.setStartDateTime("2026-01-05");
    b.setStatusReason("active");
    expect(b.build()).toEqual(golden('goal'));
  });
  it('Group', () => {
    const b = new Group();
    b.setMetaProfile("Nilai");
    b.setId("group-1");
    b.setActive(true);
    b.setType("Nilai");
    b.setActual(true);
    b.setName("Nilai");
    b.setQuantity(1);
    expect(b.build()).toEqual(golden('group'));
  });
  it('ListResource', () => {
    const b = new ListResource();
    b.setId("list_resource-1");
    b.setStatus("active");
    b.setMode("Nilai");
    b.setCode("http://sys.id/ni", "C1", "Tampilan");
    b.setSubject("Patient/1000000001");
    b.setTitle("Nilai");
    expect(b.build()).toEqual(golden('list_resource'));
  });
  it('NutritionOrder', () => {
    const b = new NutritionOrder();
    b.setStatus("active");
    b.setIntent("Nilai");
    b.setDateTime("2026-01-05");
    expect(b.build()).toEqual(golden('nutrition_order'));
  });
  it('PaymentNotice', () => {
    const b = new PaymentNotice();
    b.setStatus("active");
    b.setRequest("Patient/1000000001");
    b.setResponse("Patient/1000000001");
    b.setCreated("2026-01-05");
    b.setProvider("Patient/1000000001");
    expect(b.build()).toEqual(golden('payment_notice'));
  });
  it('PaymentReconciliation', () => {
    const b = new PaymentReconciliation();
    b.setId("payment_reconciliation-1");
    b.addIdentifier("http://sys.id/ni", "Nilai");
    b.setStatus("active");
    b.setType("http://sys.id/ni", "C1");
    b.setCreated("2026-01-05");
    b.setPeriod("2026-01-05");
    b.setRequest("Patient/1000000001");
    b.setRequestProvider("Patient/1000000001");
    b.setOutcome("http://sys.id/ni", "C1");
    b.setDisposition("Nilai");
    b.setInsurer("Patient/1000000001");
    b.setRequestMatchDate("2026-01-05");
    b.setOutcomeCode("http://sys.id/ni", "C1");
    b.addRequestor("Patient/1000000001");
    b.addProcessNote("Nilai");
    b.setPaymentDate("2026-01-05");
    b.setPaymentAmount(1.5);
    b.setPaymentIdentifier("http://sys.id/ni", "Nilai");
    b.addDetail("http://sys.id/ni", "C1");
    b.setTotalAmount(1.5);
    expect(b.build()).toEqual(golden('payment_reconciliation'));
  });
  it('PractitionerRole', () => {
    const b = new PractitionerRole();
    b.setId("practitioner_role-1");
    b.setActive(true);
    b.addAvailableTime(["A1", "A2"]);
    expect(b.build()).toEqual(golden('practitioner_role'));
  });
  it('QuestionnaireResponse', () => {
    const b = new QuestionnaireResponse();
    b.setId("questionnaire_response-1");
    b.setStatus();
    b.setQuestionnaire("Nilai");
    b.setAuthored("2026-01-05");
    expect(b.build()).toEqual(golden('questionnaire_response'));
  });
  it('Substance', () => {
    const b = new Substance();
    b.setStatus("active");
    b.setCode("http://sys.id/ni", "C1", "Tampilan");
    expect(b.build()).toEqual(golden('substance'));
  });
  it('Task', () => {
    const b = new Task();
    b.setId("task-1");
    b.setInstantiatesCanonical("Nilai");
    b.setInstantiatesUri("Nilai");
    b.setPriority("Nilai");
    b.setDescription("Nilai");
    b.setAuthoredOn("Nilai");
    b.setLastModified("Nilai");
    b.addNote("Nilai");
    expect(b.build()).toEqual(golden('task'));
  });
});
