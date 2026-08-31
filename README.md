# satusehat-integration

> **Open-source Node.js SDK for integrating with SATUSEHAT** — Indonesia's national health data platform powered by FHIR R4. Pure JavaScript/TypeScript, no framework dependency.

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-blue)](https://nodejs.org)
[![FHIR R4](https://img.shields.io/badge/FHIR-R4-orange)](https://hl7.org/fhir/R4/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![CI](https://github.com/ivanwilliammd/satusehat-integration-node/actions/workflows/ci.yml/badge.svg)](https://github.com/ivanwilliammd/satusehat-integration-node/actions)
[![npm](https://img.shields.io/npm/v/@ivanwilliammd/satusehat-integration)](https://www.npmjs.com/package/@ivanwilliammd/satusehat-integration)
[![npm](https://img.shields.io/npm/dm/@ivanwilliammd/satusehat-integration)](https://www.npmjs.com/package/@ivanwilliammd/satusehat-integration)

---

## Overview

`satusehat-integration` is an **open-source** Node.js SDK for integrating with **SATUSEHAT** — Indonesia's national health data platform powered by FHIR R4.

Built on the official [SATUSEHAT Platform Guidelines](https://satusehat.kemkes.go.id/platform/docs). Ships with:
- **115+ PayloadBuilder** classes — fluent builders for all FHIR R4 resources (Patient, Practitioner, Organization, Encounter, Observation, Procedure, etc.)
- **50 DataType** interfaces — composable FHIR R4 value objects with `toJSON()` serialization
- **TerminologyResolver** — castable terminology strings (`"ICD10:A00"`, `"LOINC:2951-2"`, `"SNOMED:38341003"`) directly to CodeableConcept
- **3 SATUSEHAT-specific** resources: BillingStatus (NON-FHIR JSON), PurificationDecision (NON-FHIR JSON), Endpoint (FHIR R4)
- **Queue + Rate Limiter** — in-memory queue with configurable RPM rate limiting
- **Vitest** test suite — all builders have comprehensive unit tests

Zero dependencies beyond TypeScript runtime. Works with any JS framework or plain Node.js.

---

## Requirements

- Node.js 20 or later (LTS recommended)
- npm 9+ or yarn 1.22+

---

## Quick Install

```bash
npm install @ivanwilliammd/satusehat-integration
# or
yarn add @ivanwilliammd/satusehat-integration
```

```env
# .env
SATUSEHAT_ENV=DEV          # DEV | STG | PROD
SATUSEHAT_BASE_URL_DEV=https://api-satusehat-dev.dto.kemkes.go.id
CLIENTID_DEV=your_client_id
CLIENTSECRET_DEV=your_client_secret
ORGID_DEV=your_org_id
```

---

## Architecture

### DataType Interfaces (`src/datatype/`)

Atomic FHIR R4 value interfaces. All provide a `toJSON()` method — nested types serialize to clean FHIR JSON automatically.

| Category | Types |
|----------|-------|
| Core | `Coding`, `CodeableConcept`, `Identifier`, `ContactPoint`, `Address`, `HumanName`, `Reference` |
| Quantity | `Age`, `Quantity` |
| Utility | `Period`, `ParameterComponent` |

Example — `HumanName`:

```typescript
import { HumanName } from '@ivanwilliammd/satusehat-integration';

const name: HumanName = {
    family: 'Doe',
    given: ['John', 'Michael'],
    use: 'official',
};
// name.toJSON() → { family: 'Doe', given: ['John', 'Michael'], use: 'official' }
```

### PayloadBuilder Pattern (`src/builder/`)

Fluent builder for each FHIR resource. Each builder exposes chainable methods and returns the resource payload via `toJSON()`.

```typescript
import { PatientBuilder, HumanName } from '@ivanwilliammd/satusehat-integration';

const patient = new PatientBuilder()
    .setId('12345678-1234-1234-1234-123456789012')
    .addName({ family: 'Doe', given: ['John'], use: 'official' })
    .setGender('male')
    .setBirthDate('1990-01-15');

const payload = patient.toJSON();
```

---

## Supported FHIR Resources

**115+ PayloadBuilder classes** covering all FHIR R4 resources used in SATUSEHAT interoperability, plus 3 SATUSEHAT-specific resources.

### SATUSEHAT Interoperability Resources (47)

| # | Resource | Builder |
|---|----------|---------|
| 1 | Account | `AccountBuilder` |
| 2 | AllergyIntolerance | `AllergyIntoleranceBuilder` |
| 3 | BillingStatus ⚡NON-FHIR | `BillingStatusBuilder` |
| 4 | CarePlan | `CarePlanBuilder` |
| 5–7 | ChargeItem, ChargeItemDefinition, ChargeItemResponse | `ChargeItemBuilder`, `ChargeItemDefinitionBuilder`, `ChargeItemResponseBuilder` |
| 8–9 | Claim, ClaimResponse | `ClaimBuilder`, `ClaimResponseBuilder` |
| 10 | ClinicalImpression | `ClinicalImpressionBuilder` |
| 11 | Composition | `CompositionBuilder` |
| 12 | Condition | `ConditionBuilder` |
| 13 | Coverage | `CoverageBuilder` |
| 14–15 | CoverageEligibilityRequest, CoverageEligibilityResponse | `CoverageEligibilityRequestBuilder`, `CoverageEligibilityResponseBuilder` |
| 16 | DiagnosticReport | `DiagnosticReportBuilder` |
| 17 | DocumentReference | `DocumentReferenceBuilder` |
| 18 | Encounter | `EncounterBuilder` |
| 19 | Endpoint | `EndpointBuilder` |
| 20 | EpisodeOfCare | `EpisodeOfCareBuilder` |
| 21 | FamilyMemberHistory | `FamilyMemberHistoryBuilder` |
| 22 | Goal | `GoalBuilder` |
| 23 | ImagingStudy | `ImagingStudyBuilder` |
| 24 | Immunization | `ImmunizationBuilder` |
| 25 | Invoice | `InvoiceBuilder` |
| 26 | Location | `LocationBuilder` |
| 27–31 | Medication, MedicationAdministration, MedicationDispense, MedicationRequest, **MedicationStatement** | `MedicationBuilder`, `MedicationAdministrationBuilder`, `MedicationDispenseBuilder`, `MedicationRequestBuilder`, `MedicationStatementBuilder` |
| 32 | NutritionOrder | `NutritionOrderBuilder` |
| 33 | Observation | `ObservationBuilder` |
| 34 | Organization | `OrganizationBuilder` |
| 35 | Patient | `PatientBuilder` |
| 36–37 | PaymentNotice, PaymentReconciliation | `PaymentNoticeBuilder`, `PaymentReconciliationBuilder` |
| 38 | Practitioner | `PractitionerBuilder` |
| 39 | Procedure | `ProcedureBuilder` |
| 40 | QuestionnaireResponse | `QuestionnaireResponseBuilder` |
| 41 | RelatedPerson | `RelatedPersonBuilder` |
| 42 | RiskAssessment | `RiskAssessmentBuilder` |
| 43 | ServiceRequest | `ServiceRequestBuilder` |
| 44 | Specimen | `SpecimenBuilder` |
| 45 | Substance | `SubstanceBuilder` |
| 46 | **Task** | `TaskBuilder` |
| 47 | **PurificationDecision** ⚡NON-FHIR | `PurificationDecisionBuilder` |

⚡ = NON-FHIR JSON (SATUSEHAT-specific extension)

### BillingStatus (NON-FHIR JSON)
```typescript
import { BillingStatusBuilder } from '@ivanwilliammd/satusehat-integration';

const billing = new BillingStatusBuilder()
  .setId('bs-001')
  .addIdentifier('http://sys-ids.kemkes.go.id/billing/org-001', 'BILL-12345')
  .setStatus('active')
  .setInsurer('Organization/org-bpjs', 'BPJS Kesehatan')
  .setSubject('100000030009', 'Budi Santoso')
  .setRequest('cer-001');
```

### Endpoint (FHIR R4)
```typescript
import { EndpointBuilder } from '@ivanwilliammd/satusehat-integration';

const endpoint = new EndpointBuilder()
  .setId('ep-001')
  .setStatus('active')
  .setConnectionType('ihe-xcpd', 'IHE XCPD')
  .setName('SATUSEHAT FHIR Endpoint')
  .setManagingOrganization('Organization/org-ihs')
  .setAddress('https://satusehat-api.example.com/fhir/r4');
```

### PurificationDecision (NON-FHIR JSON)
```typescript
import { PurificationDecisionBuilder } from '@ivanwilliammd/satusehat-integration';

const pd = new PurificationDecisionBuilder()
  .setId('pd-001')
  .addIdentifier('http://sys-ids.kemkes.go.id/purification/org-001', 'PD-12345')
  .setStatus('approved', 'Approved')
  .setInsurer('Organization/org-bpjs', 'BPJS Kesehatan')
  .setProvider('Organization/hos-001', 'Rumah Sakit Sehat')
  .setClaimResponse('cr-001')
  .setCreated('2024-01-15T10:35:00+00:00');
```

### TerminologyResolver — castable codes
```typescript
import { TerminologyResolver } from '@ivanwilliammd/satusehat-integration';

// Cast terminology strings directly to CodeableConcept
TerminologyResolver.resolve('ICD10:A00');
// → { coding: [{ system: 'http://hl7.org/fhir/sid/icd-10', code: 'A00', display: 'A00' }], text: 'A00' }

TerminologyResolver.resolve('LOINC:2951-2');
// → { coding: [{ system: 'http://loinc.org', code: '2951-2', display: '2951-2' }], text: '2951-2' }

// Batch expand
TerminologyResolver.expandArray(['ICD10:A00', 'ICD10:J18.9']);
```

---

## Usage Examples

### Patient

```typescript
import { PatientBuilder } from '@ivanwilliammd/satusehat-integration';

const patient = new PatientBuilder()
    .setId('12345678-1234-1234-1234-123456789012')
    .setName({ family: 'Doe', given: ['John'], use: 'official' })
    .setGender('male')
    .setBirthDate('1990-01-15')
    .addTelecom({ system: 'phone', value: '081234567890', use: 'mobile' });

const payload = patient.toJSON();
console.log(JSON.stringify(payload, null, 2));
```

### Claim (BPJS Klaim)

```typescript
import { ClaimBuilder } from '@ivanwilliammd/satusehat-integration';

const claim = new ClaimBuilder()
    .setStatus('active')
    .setUse('claim')
    .setType('institutional')
    .setPatient('pat-123', 'enc-456')
    .addItem(1, 'PROCID001', 150000, 'IDR')
    .setTotal(150000, 'IDR');

const payload = claim.toJSON();
```

---

## Documentation

| Page | Description |
|------|-------------|
| [Wiki Home](https://github.com/ivanwilliammd/satusehat-integration.wiki.git) | Full documentation |
| [Getting Started](https://github.com/ivanwilliammd/satusehat-integration/wiki/Getting-Started) | Installation, configuration |
| [DataTypes](https://github.com/ivanwilliammd/satusehat-integration/wiki/DataTypes) | Complete type reference |
| [Builders](https://github.com/ivanwilliammd/satusehat-integration/wiki/Builders) | Builder usage guide |
| [Resources](https://github.com/ivanwilliammd/satusehat-integration/wiki/Resources) | All FHIR resources |
| [Claim Module](https://github.com/ivanwilliammd/satusehat-integration/wiki/Claim-Module) | BPJS Klaim integration |

---

## External Resources

- [HL7 FHIR R4 Specification](https://hl7.org/fhir/R4/)
- [SATUSEHAT Platform Docs](https://satusehat.kemkes.go.id/platform/docs)
- [Main PHP SDK](https://github.com/ivanwilliammd/satusehat-integration)
- [SATUSEHAT Sandbox API](https://api-satusehat-dev.dto.kemkes.go.id)

---

## Contributing

Contributions are welcome. Please ensure tests pass and follow existing code conventions.

---

## License

MIT — see [LICENSE](LICENSE).
