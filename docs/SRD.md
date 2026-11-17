# SRD — satusehat-integration-node (SATUSEHAT FHIR R4 SDK · Node.js/TypeScript)

Status: v2.1 · 2026-11-17 · Companions: `docs/PRD-SDK-ECOSYSTEM.md` (PHP repository) + `README.md`
Installed package version: **4.19.0** (`package.json`).

Every number in this document is **measured** from this checkout; the command that produces each
number is written beside it so it can be repeated when the code changes. Canonical counts come from
`scripts/parity-manifest.sh` in the PHP repository, which applies the same de-duplication rule to all
five ports. When code changes, update this document in the same commit.

## 1. Scope

How the SDK works internally: layers, public contract, capability parity with the PHP SDK, error
mapping, compatibility rules, and how the suite is run. SATUSEHAT usage belongs in `README.md`; the
products that consume this package are out of scope.

## 2. Architecture principles

1. **Build first, send later.** Payload builders (`src/builder`, `src/datatype`) are separate from the
   HTTP layer (`src/ssrequest`, `src/ssresponse`, `src/queue`).
2. **Barrels are generated, never hand-edited.** `src/index.ts` is produced by
   `scripts/generate_index.py`; adding a resource or module means re-running the generator.
3. **Secrets come from the environment only.** SATUSEHAT OAuth2 credentials and SmarTerm PAT/OIDC
   credentials are read from caller configuration or `process.env`; no credential is written to code
   or to logs.
4. **One behaviour, five languages.** The same payload shape, HTTP retry/refresh semantics, validation
   rule set, and queue semantics as the other ports. Where a capability is missing, `docs/PARITY.md`
   says so instead of implying parity.

## 3. Measured inventory

| Item | Count | Measurement |
|---|---|---|
| Builder source files | 142 | `ls src/builder/*.ts \| grep -v .test.ts \| wc -l` |
| Canonical builder classes | 141 | `scripts/parity-manifest.sh` (de-duplicates aliases) |
| Datatype classes | 33 | `grep -rhoE "export class [A-Za-z0-9_]+" src/datatype/*.ts \| wc -l` |
| Terminology modules | 22 | `scripts/parity-manifest.sh` |
| `ssrequest` modules | 2 (+ index) | `OAuth2Client.ts`, `SSRequest.ts` |
| `ssresponse` modules | 3 (+ index) | `SSResponse.ts`, `BundleResponse.ts`, `SSValidationError.ts` |
| Parser files | 142 (+ index) | `ls src/parser/*.ts \| grep -v .test.ts \| wc -l` |
| Queue modules | 8 (+ index) | `ls src/queue/*.ts \| grep -v .test.ts \| wc -l` |
| R5 builder modules | 141 | `ls src/r5/builder/*.ts \| wc -l` |
| Test files | 214 | `find src -name "*.test.ts" \| wc -l` |
| Test cases | 1.279 | `vitest run` |

## 4. Public contract

- Package entry points: `main: dist/index.js`, `types: dist/index.d.ts`, `files: [dist, README.md]`.
- Exports come from the generated `src/index.ts`: all of `datatype`, `terminology`, `ssrequest`,
  `ssresponse`, `parser`, `queue`, and `builder`.
- `npm test` runs `vitest`; `npm run build` runs `tsc`; `prepack` asserts that `dist/index.js` and
  `dist/index.d.ts` exist before publication.

## 5. Capability parity with the PHP SDK

| Capability | PHP | Node | Evidence in this repository |
|---|---|---|---|
| Payload builders | 141 | 141 | `src/builder` |
| Datatypes | 33 | 33 | `src/datatype` |
| FHIR parsers | 142 | 142 | `src/parser` |
| R5 namespace | 142 | 141 | `src/r5/builder` |
| Queue modules | 8 | 8 | `src/queue` |
| Terminology modules | 23 | 22 | `src/terminology` |
| SATUSEHAT required rules | yes | yes | `src/data/satusehat/required-rules.json` + fingerprint test |
| Non-standard SATUSEHAT objects | yes | yes | `src/terminology/SatusehatNonStandard.ts` |
| R4 element guard (opt-in) | yes | yes | `src/conformance/R4ElementGuard.ts` |

Differences that remain are listed with their reason in `docs/PARITY.md`; none of them is a missing
capability.

## 6. Error mapping (`SSRequest`, `SSValidationError`, `ErrorClassifier`, `TerminologyClient`)

- **`SSRequest`**
  - **401** → when `oauth2.isTokenAutoRefresh()` is enabled, call `refreshToken()` and retry with
    exponential backoff (`2^n` seconds, capped at 60).
  - **429** → read `Retry-After` first; fall back to exponential backoff.
  - **5xx** → retry up to the configured attempt limit, then surface the last error.
- **`SSValidationError`** maps SATUSEHAT rule codes (558 rules, 14 response types) to human-readable
  messages; callers branch on `code`, never on message text.
- **`ErrorClassifier`** decides whether a queue item is retryable or belongs in the dead-letter queue.
- **`TerminologyClient`** treats `401` as a token problem: refresh once, then surface the error.

## 7. Compatibility rules

- Node 18+ (global `fetch`); no framework dependency.
- The package ships TypeScript declarations; breaking type changes require a major version.
- Adding a builder, parser, or queue module is a minor change; changing an exported signature is not.
