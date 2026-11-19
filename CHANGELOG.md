# Changelog

## Unreleased

### Added

- **HL7 v2 + MLLP**: `Message`/`Segment` (ER7 parse, path access, escape decode/encode, byte-for-byte
  round trip), `Mllp` framing with a stateful `MllpReader`, `Ack` (AA/AE/AR with MSA-2 echo), `Client`
  with `send()` and `session()` (one socket, one result per message), and declarative `Profile`s
  (`Profiles.adtA01()`, `adtA08()`, `oruR01()`).
- **Shared corpus**: the 20 fixtures are copied byte-for-byte from the PHP SDK so behaviour parity is
  tested with the same messages, not re-described in prose.


## v4.19.1 - 2026-11-18

### Fixed

- README status table was in Indonesian on four of the five SDKs; this package's version line and test
  count (973) were stale. The table now reads English and reports the measured 1.279 tests.

### Docs

- `docs/PARITY.md` regenerated: the Rust crate reaches 141/141 builder names, 33 datatypes, 142
  parsers and 538 terminology keys, so all five ports now carry the same version line.

## v4.19.0 - 2026-11-17

### Added

- `terminology/SatusehatRules`: SATUSEHAT required rules are executed from data
  (`src/data/satusehat/required-rules.json`, 8 resources / 26 rules) instead of one method per
  resource. A new rule is a data change, not a code change.
- Rules fingerprint test: byte count plus per-resource rule counts, so the shared rules file cannot
  drift silently. Byte count is computed after CRLF normalisation, so Windows and Linux CI agree.

### Changed

- Removed `yarn.lock`. The repository had two lockfiles that disagreed (and the yarn one pinned a
  Windows-only optional dependency). CI uses npm; `npm ci` is now the only locked path.

### Tests

- 1.268 tests, `tsc --noEmit` clean.
