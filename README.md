# satusehat-integration

> **Open-source Node.js SDK for integrating with SATUSEHAT** — Indonesia's national health data platform powered by FHIR R4. Pure JavaScript/TypeScript, no framework dependency.

[![npm](https://img.shields.io/npm/v/@ivanwilliammd/satusehat-integration?label=npm)](https://www.npmjs.com/package/@ivanwilliammd/satusehat-integration)
[![downloads](https://img.shields.io/npm/dm/@ivanwilliammd/satusehat-integration)](https://www.npmjs.com/package/@ivanwilliammd/satusehat-integration)
[![FHIR R4](https://img.shields.io/badge/FHIR-R4-orange)](https://hl7.org/fhir/R4/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## Status and coverage (measured, not claimed)

| Area | Count | Evidence |
| --- | --- | --- |
| Builder | 141 resources | `src/builder` |
| Builder methods | 1,405 | `src/builder/method_surface.test.ts` |
| Parser | 141 classes | `src/parser`, `src/parser/parser_surface.test.ts` |
| R5 namespace | 141 builders | `src/r5/builder`, `src/r5/r5_namespace.test.ts` |
| Golden payloads | 189 | `src/.../testdata` |
| Tests | 1,279 | `npx vitest run`, `tsc` clean |

R4 remains the reference. Using R5 means changing one import line:

```ts
import { PatientBuilder } from './builder/Patient';     // R4
import { PatientBuilder } from './r5/builder/Patient';  // R5 — this line only
```

Every R5 class extends its R4 class directly, and a test asserts that the prototype chain and the
methods are inherited unchanged. Datatypes here are structural `type`s, so they need no separate R5
layer.

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
- **142 FHIR Resource Parsers** — `PatientParser`, `EncounterParser`, `ObservationParser`, `DiagnosticReportParser`, `PractitionerParser`, etc.
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

## HL7 v2 and MLLP

The same install also speaks HL7 v2, because a hospital is rarely a single standard: analyzers and
LIS speak v2 over MLLP while SATUSEHAT speaks FHIR R4.

```ts
import { Message, Mllp, Ack, Client, Profiles } from '@ivanwilliammd/satusehat-integration';

const msg = Message.parse(er7);       // CR, LF or CRLF, encoding characters read from MSH-2
msg.messageType();                    // "ADT"
msg.get('PID.5.1');                   // family name, escapes decoded
msg.set('PID.8', 'F');                // re-escaped on write
msg.toString();                       // ER7, CR-terminated, byte-for-byte round trip
```

```ts
const result = await new Client('10.0.0.21:2575').send(msg);
result.accepted;      // MSA-1 === AA
result.controlId;     // MSA-2, verified against MSH-10

const results = await new Client('10.0.0.21:2575').session(messages); // one socket, one result each
```

Rules that are enforced rather than documented:

- **Transport failures retry, verdicts do not.** `AE`/`AR` is returned to the caller; retrying an
  application rejection turns one bad message into a thousand.
- **MSA-2 must echo MSH-10.** A reply with a different control id is stale or misrouted and throws.
- **Frames carry over.** `MllpReader` keeps bytes that arrive after a complete frame, because one TCP
  read often returns two or three ACKs — a stateless reader would return the first and lose the rest.

Validation is data:

```ts
const issues = Profiles.oruR01().validate(msg);   // ADT_A01, ADT_A08, ORU_R01 built in
const errors = issues.filter(i => i.severity === 'error');   // warnings do not block
```

The test corpus is **shared byte-for-byte with the PHP SDK** (`src/hl7v2/__fixtures__`): ten messages
a hospital actually sends and ten that must be refused. Porting the corpus rather than rewriting the
tests is what makes "same behaviour in five languages" a measurable claim instead of a slogan.

Not implemented yet, and not claimed: batches (FHS/BHS), vendor-specific profiles beyond the three
built in, HL7 v2 table validation, and a supervised MLLP server daemon.

## CDA R2 documents

HL7 CDA R2 is the document format that travels alongside HL7 v2 messages: v2 carries the
transaction, CDA carries the signed document. This SDK reads and writes the part that is actually
used — the header and the sections with narrative text — and leaves everything else alone.

```ts
import { Document } from '@ivanwilliammd/satusehat-integration';

const doc = Document.parse(xml);           // refuses anything whose root is not ClinicalDocument
doc.title();                               // "Resume Medis Rawat Inap"
doc.patient().identifier('2.16.840.1.113883.3.3157.1003.1');   // NIK
doc.patient().name();
doc.authors();                             // ["Ivan HARSONO"]
doc.section('10164-2')?.title;             // section by LOINC, searched depth-first
doc.sectionText('10164-2');                // narrative flattened to text, paragraphs kept
doc.validate();                            // [] means exchangeable, not clinically correct
```

```ts
const doc = Document.build({
  id: 'DOC-1',
  title: 'Resume Medis',
  custodian: 'RS Contoh',
  author: 'Dokter Contoh',
  patientId: '3171234567890001',
  patientName: 'ANGGRAENI',
  gender: 'F',
  birthTime: '19850312',
  sections: [{ loinc: '10164-2', title: 'Riwayat', text: '<paragraph>Demam.</paragraph>' }],
});
console.log(doc.toXml());
```

Two decisions worth stating:

- **Unknown structure survives a round trip.** Parsing keeps the tree (`preserveOrder`) and
  `toXml()` writes it back, so `componentOf/encompassingEncounter`, `participant`,
  `legalAuthenticator` and vendor extensions are preserved even though the SDK does not model them.
  A parser that rebuilds the document from its own model quietly deletes everything it did not
  understand.
- **Identifiers keep their `root`.** A NIK without its assigning-authority root cannot be matched
  against anything, and dropping the root is how a local MRN silently becomes a national NIK.

`fast-xml-parser` is the only new dependency, and it is pure JavaScript with no DTD processing: a
correct XML parser is not something to hand-roll at a trust boundary, and entity expansion from a
hostile document is exactly the bug hand-rolled parsers ship. The HL7 CDA R2 schemas are licensed;
the classes implement the structural rules from the specification and do not redistribute them.

Not implemented: signature verification (`ds:Signature`), templates beyond the generic
`POCD_MT000040` header, `nonXMLBody` attachments, CDA → FHIR mapping.

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
