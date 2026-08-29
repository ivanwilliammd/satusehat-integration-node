# satusehat-integration-node

> **Open-source Node.js SDK for integrating with SATUSEHAT** — Indonesia's national health data platform powered by FHIR R4. Pure JavaScript/TypeScript, no framework dependency.

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-blue)](https://nodejs.org)
[![FHIR R4](https://img.shields.io/badge/FHIR-R4-orange)](https://hl7.org/fhir/R4/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![CI](https://github.com/ivanwilliammd/satusehat-integration-node/actions/workflows/ci.yml/badge.svg)](https://github.com/ivanwilliammd/satusehat-integration-node/actions)

---

## Overview

`satusehat-integration-node` is an **open-source** Node.js SDK for integrating with **SATUSEHAT** — Indonesia's national health data platform powered by FHIR R4.

Built on the official [SATUSEHAT Platform Guidelines](https://satusehat.kemkes.go.id/platform/docs). Ships with:
- **50 DataType** interfaces — composable FHIR R4 value objects with `toJSON()` serialization
- **50 PayloadBuilder** classes — fluent builders for all FHIR resources (Patient, Practitioner, Organization, etc.)
- **Queue + Rate Limiter** — in-memory queue with configurable RPM rate limiting

Zero dependencies beyond TypeScript runtime. Works with any JS framework or plain Node.js.

---

## Requirements

- Node.js 20 or later (LTS recommended)
- npm 9+ or yarn 1.22+

---

## Quick Install

```bash
npm install @ivanwilliammd/satusehat-integration-node
# or
yarn add @ivanwilliammd/satusehat-integration-node
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
import { HumanName } from '@ivanwilliammd/satusehat-integration-node';

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
import { PatientBuilder, HumanName } from '@ivanwilliammd/satusehat-integration-node';

const patient = new PatientBuilder()
    .setId('12345678-1234-1234-1234-123456789012')
    .addName({ family: 'Doe', given: ['John'], use: 'official' })
    .setGender('male')
    .setBirthDate('1990-01-15');

const payload = patient.toJSON();
```

---

## Supported FHIR Resources

All 51 resources fully implemented via PayloadBuilder classes. Core (✅) + Non-Core (💼):

| # | Resource | Notes |
|---|----------|-------|
| 1 | Patient | ✅ MPI |
| 2 | Practitioner | ✅ SDMK |
| 3 | PractitionerRole | ✅ |
| 4 | Organization | ✅ MSI |
| 5 | Location | ✅ |
| 6 | Encounter | ✅ |
| 7 | Condition | ✅ |
| 8 | Observation | ✅ |
| 9 | Procedure | ✅ |
| 10 | MedicationRequest | ✅ |
| 11 | Bundle | ✅ batch/transaction |
| 12–37 | CarePlan through Task | ✅ |
| 38–50 | Account through Invoice | 💼 Billing/Claim resources |

---

## Usage Examples

### Patient

```typescript
import { PatientBuilder } from '@ivanwilliammd/satusehat-integration-node';

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
import { ClaimBuilder } from '@ivanwilliammd/satusehat-integration-node';

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
| [Wiki Home](https://github.com/ivanwilliammd/satusehat-integration-node.wiki.git) | Full documentation |
| [Getting Started](https://github.com/ivanwilliammd/satusehat-integration-node/wiki/Getting-Started) | Installation, configuration |
| [DataTypes](https://github.com/ivanwilliammd/satusehat-integration-node/wiki/DataTypes) | Complete type reference |
| [Builders](https://github.com/ivanwilliammd/satusehat-integration-node/wiki/Builders) | Builder usage guide |
| [Resources](https://github.com/ivanwilliammd/satusehat-integration-node/wiki/Resources) | All FHIR resources |
| [Claim Module](https://github.com/ivanwilliammd/satusehat-integration-node/wiki/Claim-Module) | BPJS Klaim integration |

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
