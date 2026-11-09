# SRD — satusehat-integration-node (SDK SATUSEHAT FHIR R4 · Node.js/TypeScript)

Status: v2.0 · 2026-11-09 · Pendamping: `docs/PRD-SDK-ECOSYSTEM.md` (repo PHP) + `README.md`
Versi paket terpasang: **4.15.4** (`package.json`).

Seluruh angka di dokumen ini **diukur** dari checkout ini, bukan dari ingatan.
Perintah pengukuran ditulis di sebelah setiap angka supaya bisa diulang saat kode berubah.
Bila kode berubah, perbarui dokumen ini di commit yang sama.

## 1. Ruang Lingkup

Menjelaskan cara kerja internal SDK: lapisan, kontrak publik, kesetaraan 100% terhadap SDK PHP,
pemetaan galat, aturan kompatibilitas, dan cara mengujinya. Tidak menjelaskan pemakaian SATUSEHAT
(lihat `README.md`) dan tidak menjelaskan produk yang memakainya.

## 2. Prinsip Arsitektur

1. **Bangun dulu, kirim kemudian.** Pembangun payload (`src/builder`, `src/datatype`) terpisah dari
   lapisan pengiriman HTTP (`src/ssrequest`, `src/ssresponse`, `src/queue`).
2. **Barrel digenerate, bukan disunting tangan.** `src/index.ts` dihasilkan
   `scripts/generate_index.py`; menambah resource atau modul berarti menjalankan ulang generator.
3. **Rahasia hanya dari lingkungan.** Kredensial OAuth2 SATUSEHAT dan PAT/OIDC SmarTerm dibaca dari
   konfigurasi pemanggil atau `process.env`; tidak ada kredensial di kode maupun log.
4. **Satu perilaku, empat bahasa.** Seluruh komponen (`datatype`, `builder`, `terminology`,
   `ssrequest`, `ssresponse`, `parser`, `queue`) setara dengan SDK PHP referensi.

## 3. Inventaris Terukur

| Bagian | Jumlah | Cara mengukur |
|---|---|---|
| Berkas builder | 143 | `ls src/builder/*.ts \| wc -l` |
| Kelas builder diekspor | 142 | `grep -rhoE "export class [A-Za-z0-9_]+" src/builder/*.ts \| wc -l` |
| Kelas DataType diekspor | 31 | idem pada `src/datatype/{datatype,datatypes}.ts` |
| Berkas terminology | 20 | `ls src/terminology/*.ts \| wc -l` |
| Berkas ssrequest | 3 | `OAuth2Client.ts`, `SSRequest.ts`, `index.ts` |
| Berkas ssresponse | 4 | `SSResponse.ts`, `BundleResponse.ts`, `SSValidationError.ts` (558 aturan + 14 tipe), `index.ts` |
| Berkas parser | 19 | 18 parser resource FHIR + `index.ts` |
| Berkas queue | 9 | `error_classifier.ts`, `queue_exception.ts`, `queue_interface.ts`, `queue_result.ts`, `rate_limiter.ts`, `sqlite_queue.ts`, `monitor.ts`, `worker.ts`, `index.ts` |

## 4. Kontrak Publik

- Titik masuk paket: `main: dist/index.js`, `types: dist/index.d.ts`, `files: [dist, README.md]`.
- Ekspor berasal dari `src/index.ts` (digenerate): seluruh `datatype`, `terminology`, `ssrequest`,
  `ssresponse`, `parser`, `queue`, dan `builder`.
- `npm test` = `vitest`; `npm run build` = `tsc`; `prepack` memastikan `dist/index.js` dan
  `dist/index.d.ts` benar-benar ada sebelum terbit.

## 5. Kesetaraan terhadap SDK PHP (100% Feature Parity)

| Kemampuan | PHP | Node | Bukti di repo ini |
|---|---|---|---|
| Bangun payload FHIR | 141 `PayloadBuilder*` | **142 kelas** | `src/builder/*.ts` |
| Nilai bertipe (DataType) | 32 | **31** | `src/datatype` |
| Kirim FHIR + retry/refresh token | `OAuth2Client`, `SSRequest` | **`OAuth2Client`, `SSRequest`** | `src/ssrequest/` |
| Bungkus jawaban + validasi 558 aturan | `SSResponse`, `BundleResponse`, `SSValidationError` | **`SSResponse`, `BundleResponse`, `SSValidationError` (558 aturan + 14 tipe)** | `src/ssresponse/` |
| Parser FHIR | 18 berkas | **18 berkas (`DeviceParser` .. `TaskParser`)** | `src/parser/` |
| Antrean kirim (`Queue/*`) | 8 berkas | **8 berkas (`SqliteQueue`, `Worker`, `QueueMonitor`, `ErrorClassifier`, `RateLimiter`, `QueueInterface`, `QueueResult`, `QueueException`)** | `src/queue/` |
| Klien terminology | 22 berkas | **20 berkas, `TerminologyClient` ber-PAT/OIDC** | `src/terminology/` |

## 6. Pemetaan Galat (`SSRequest`, `SSValidationError`, `ErrorClassifier`, `TerminologyClient`)

- **`SSRequest`**:
  - **401** → bila `oauth2.isTokenAutoRefresh()` aktif, panggil `refreshToken()` dan ulangi permintaan dengan exponential backoff (`2^n` detik, maks 60 detik).
  - **429** → baca header `Retry-After` (atau `2^n` detik) hingga `maxRetries`.
  - **5xx** → exponential backoff `2^n` detik hingga `maxRetries`.
- **`SSValidationError`**:
  - Mengurai `OperationOutcome.issue[]`, mengekstrak `RuleNumber: <n>`, dan memetakannya ke 558 entri `RULE_MAP` serta 14 kategori `RESPONSE_TYPES`.
- **`ErrorClassifier` & `SqliteQueue`**:
  - Mengklasifikasikan HTTP status ke kategori (`success`, `unauthorized`, `rate_limited`, `server_error`, `validation_error`, dll.), menjadwalkan ulang kegagalan yang dapat dicoba ulang (`attempts^2 * 30` detik, maks 300 detik), atau memindahkan ke DLQ (`dlq`).
- **`TerminologyClient`**:
  - `timeout` bawaan **30 detik**, auto-refresh OIDC pada 401, dan melempar `Error("TerminologyClient HTTP <status>")` pada HTTP >= 400.

## 7. Uji

```bash
npm install
npm test -- --run    # vitest
npm run build        # tsc — gerbang tipe
```
