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
- **142 PayloadBuilder** classes — fluent builders for all FHIR R4 resources (Patient, Practitioner, Organization, Encounter, Observation, Procedure, etc.)
- **31 DataType** classes — composable FHIR R4 value objects with `toJSON()` serialization
- **OAuth2Client & SSRequest** — HTTP client with automatic OAuth2 token caching/refresh on 401 and exponential backoff / `Retry-After` on 429 & 5xx
- **SSResponse, BundleResponse & SSValidationError** — response wrappers with full 558 SATUSEHAT validation rule dictionary (`RULE_MAP`) and 14 response categories
- **18 FHIR Resource Parsers** — `PatientParser`, `EncounterParser`, `ObservationParser`, `DiagnosticReportParser`, `PractitionerParser`, etc.
- **TerminologyResolver & TerminologyClient** — castable terminology strings (`"ICD10:A00"`, `"LOINC:2951-2"`, `"SNOMED:38341003"`) and SmarTerm API client
- **3 SATUSEHAT-specific** resources: BillingStatus (NON-FHIR JSON), PurificationDecision (NON-FHIR JSON), Endpoint (FHIR R4)
- **Full SQLite Queue + Worker + Monitor + Rate Limiter** — persistent `better-sqlite3` queue (`SqliteQueue`), `Worker`, `QueueMonitor`, `ErrorClassifier`, and `RateLimiter`
- **Vitest** test suite — comprehensive unit tests across all modules

Works with any JS framework or plain Node.js.

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

const name = new HumanName({
    family: 'Doe',
    given: ['John', 'Michael'],
    use: 'official',
});
// name.toJSON() → { family: 'Doe', given: ['John', 'Michael'], use: 'official' }
```

### PayloadBuilder Pattern (`src/builder/`)

Fluent builder for each FHIR resource. Each builder exposes chainable methods and returns the resource payload via `build()`.
DataType (value object) memakai `toJSON()`; builder memakai `build()` — dua nama berbeda, jangan tertukar.
`BundleBuilder` menerima keduanya (`build()` = alias `toJSON()`).

```typescript
import { PatientBuilder, HumanName } from '@ivanwilliammd/satusehat-integration';

const patient = new PatientBuilder()
    .setId('12345678-1234-1234-1234-123456789012')
    .addName(new HumanName({ family: 'Doe', given: ['John'], use: 'official' }))
    .setGender('male')
    .setBirthDate('1990-01-15');

const payload = patient.build();
```

---

## Supported FHIR Resources

**142 PayloadBuilder classes** covering all FHIR R4 resources used in SATUSEHAT interoperability, plus 3 SATUSEHAT-specific resources.

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

### TerminologyClient — SmarTerm (terminology.ivanmd.id)

`TerminologyClient` menghubungkan aplikasi ke **SmarTerm** — layanan kamus terpadu
terminologi kesehatan Indonesia (ICD-10, ICD-9-CM, SNOMED CT, LOINC, KPTL, KFA
obat/alkes/BZA).

```typescript
import { TerminologyClient } from '@ivanwilliammd/satusehat-integration';

const term = new TerminologyClient({ baseUrl: 'https://terminology.ivanmd.id', token: 'sanctum-pat-...' });
const result = await term.query('pemasangan kateter').on('kptl').limit(10).get();
```

---

### Sending FHIR Requests (`OAuth2Client`, `SSRequest`, `SSResponse`, `BundleResponse`, `SSValidationError`)

```typescript
import {
  OAuth2Client,
  SSRequest,
  BundleResponse,
  SSValidationError,
  EncounterParser,
} from '@ivanwilliammd/satusehat-integration';

const oauth = new OAuth2Client({
  env: 'DEV',
  clientId: process.env.CLIENTID_DEV,
  clientSecret: process.env.CLIENTSECRET_DEV,
  organizationId: process.env.ORGID_DEV,
});

const request = new SSRequest(oauth);
const res = await request.post('Encounter', encounterPayload);

if (res.isSuccess()) {
  console.log('Created Encounter ID:', res.getResourceId());
  const parser = new EncounterParser(res.getBody());
  console.log('Subject:', parser.getSubjectReference());
} else {
  const validation = SSValidationError.fromResponse(res);
  console.error(validation.getSummary());
}

// Transaction Bundle response parsing
const bundleRes = await request.postBundle('Bundle', bundlePayload);
const br = new BundleResponse(bundleRes.getHttpCode(), bundleRes.getBody(), bundlePayload.entry);
console.log('Created IDs map:', br.idMap());
```

### Persistent SQLite Queue & Worker (`SqliteQueue`, `Worker`, `QueueMonitor`)

```typescript
import { SqliteQueue, Worker, QueueMonitor, RateLimiter } from '@ivanwilliammd/satusehat-integration';

const queue = new SqliteQueue('./satusehat_queue.sqlite');
queue.enqueue('POST', 'Observation', 'Observation', observationPayload);

const worker = new Worker(
  queue,
  {
    client_id: process.env.CLIENTID_DEV!,
    client_secret: process.env.CLIENTSECRET_DEV!,
    base_url: 'https://api-satusehat-dev.dto.kemkes.go.id',
    fhir_url: 'https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1',
  },
  new RateLimiter(300)
);

const result = await worker.process(50);
const monitor = new QueueMonitor(queue);
console.log(monitor.healthCheck());
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

## License

MIT — see [LICENSE](LICENSE).
