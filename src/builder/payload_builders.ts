export class BaseBuilder {

  protected data: any = {};

  constructor(protected resourceType: string) {}

  getResourceType(): string { return this.resourceType; }

  toJSON(): any { return this.data; }

  setId(id: string): this { this.data.id = id; return this; }

  addMeta(meta: any): this { this.data.meta = meta; return this; }

  addExtension(ext: string, val: any): this { this.data[ext] = val; return this; }

}


export class AccountBuilder extends BaseBuilder {

  constructor() { super("Account"); }

}


export class AllergyIntoleranceBuilder extends BaseBuilder {

  constructor() { super("AllergyIntolerance"); }

}


export class BundleBuilder extends BaseBuilder {

  constructor() { super("Bundle"); }

}


export class CarePlanBuilder extends BaseBuilder {

  constructor() { super("CarePlan"); }

}


export class ChargeItemBuilder extends BaseBuilder {

  constructor() { super("ChargeItem"); }

}


export class ChargeItemDefinitionBuilder extends BaseBuilder {

  constructor() { super("ChargeItemDefinition"); }

}


export class ChargeItemResponseBuilder extends BaseBuilder {

  constructor() { super("ChargeItemResponse"); }

}


export class ClaimBuilder extends BaseBuilder {

  constructor() { super("Claim"); }

}


export class ClaimResponseBuilder extends BaseBuilder {

  constructor() { super("ClaimResponse"); }

}


export class ClinicalImpressionBuilder extends BaseBuilder {

  constructor() { super("ClinicalImpression"); }

}


export class CompositionBuilder extends BaseBuilder {

  constructor() { super("Composition"); }

}


export class ConditionBuilder extends BaseBuilder {

  constructor() { super("Condition"); }

}


export class CoverageBuilder extends BaseBuilder {

  constructor() { super("Coverage"); }

}


export class CoverageEligibilityRequestBuilder extends BaseBuilder {

  constructor() { super("CoverageEligibilityRequest"); }

}


export class CoverageEligibilityResponseBuilder extends BaseBuilder {

  constructor() { super("CoverageEligibilityResponse"); }

}


export class DeviceBuilder extends BaseBuilder {

  constructor() { super("Device"); }

}


export class DiagnosticReportBuilder extends BaseBuilder {

  constructor() { super("DiagnosticReport"); }

}


export class DocumentReferenceBuilder extends BaseBuilder {

  constructor() { super("DocumentReference"); }

}


export class EncounterBuilder extends BaseBuilder {

  constructor() { super("Encounter"); }

}


export class EpisodeOfCareBuilder extends BaseBuilder {

  constructor() { super("EpisodeOfCare"); }

}


export class FamilyMemberHistoryBuilder extends BaseBuilder {

  constructor() { super("FamilyMemberHistory"); }

}


export class GenomicStudyBuilder extends BaseBuilder {

  constructor() { super("GenomicStudy"); }

}


export class GoalBuilder extends BaseBuilder {

  constructor() { super("Goal"); }

}


export class GroupBuilder extends BaseBuilder {

  constructor() { super("Group"); }

}


export class ImagingStudyBuilder extends BaseBuilder {

  constructor() { super("ImagingStudy"); }

}


export class ImmunizationBuilder extends BaseBuilder {

  constructor() { super("Immunization"); }

}


export class InvoiceBuilder extends BaseBuilder {

  constructor() { super("Invoice"); }

}


export class LocationBuilder extends BaseBuilder {

  constructor() { super("Location"); }

}


export class MedicationBuilder extends BaseBuilder {

  constructor() { super("Medication"); }

}


export class MedicationAdministrationBuilder extends BaseBuilder {

  constructor() { super("MedicationAdministration"); }

}


export class MedicationDispenseBuilder extends BaseBuilder {

  constructor() { super("MedicationDispense"); }

}


export class MedicationRequestBuilder extends BaseBuilder {

  constructor() { super("MedicationRequest"); }

}


export class MedicationStatementBuilder extends BaseBuilder {

  constructor() { super("MedicationStatement"); }

}


export class MolecularSequenceBuilder extends BaseBuilder {

  constructor() { super("MolecularSequence"); }

}


export class NutritionOrderBuilder extends BaseBuilder {

  constructor() { super("NutritionOrder"); }

}


export class ObservationBuilder extends BaseBuilder {

  constructor() { super("Observation"); }

}


export class OrganizationBuilder extends BaseBuilder {

  constructor() { super("Organization"); }

}


export class PatientBuilder extends BaseBuilder {

  constructor() { super("Patient"); }

}


export class PaymentNoticeBuilder extends BaseBuilder {

  constructor() { super("PaymentNotice"); }

}


export class PaymentReconciliationBuilder extends BaseBuilder {

  constructor() { super("PaymentReconciliation"); }

}


export class PractitionerBuilder extends BaseBuilder {

  constructor() { super("Practitioner"); }

}


export class PractitionerRoleBuilder extends BaseBuilder {

  constructor() { super("PractitionerRole"); }

}


export class ProcedureBuilder extends BaseBuilder {

  constructor() { super("Procedure"); }

}


export class QuestionnaireResponseBuilder extends BaseBuilder {

  constructor() { super("QuestionnaireResponse"); }

}


export class RelatedPersonBuilder extends BaseBuilder {

  constructor() { super("RelatedPerson"); }

}


export class RiskAssessmentBuilder extends BaseBuilder {

  constructor() { super("RiskAssessment"); }

}


export class ServiceRequestBuilder extends BaseBuilder {

  constructor() { super("ServiceRequest"); }

}


export class SpecimenBuilder extends BaseBuilder {

  constructor() { super("Specimen"); }

}


export class SubstanceBuilder extends BaseBuilder {

  constructor() { super("Substance"); }

}


export class TaskBuilder extends BaseBuilder {

  constructor() { super("Task"); }

}
