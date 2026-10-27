# SRD — satusehat-integration-node (SDK SATUSEHAT FHIR R4 · Node.js/TypeScript)

Status: v1.0 · 2026-10-27 · Pendamping: `docs/PRD-SDK-ECOSYSTEM.md` (repo PHP) + `README.md`
Versi paket terpasang: **4.14.2** (`package.json`).

Seluruh angka di dokumen ini **diukur** dari checkout ini pada 2026-10-27, bukan dari ingatan.
Perintah pengukuran ditulis di sebelah setiap angka supaya bisa diulang saat kode berubah.
Bila kode berubah, perbarui dokumen ini di commit yang sama.

## 1. Ruang Lingkup

Menjelaskan cara kerja internal SDK: lapisan, kontrak publik, selisih nyata terhadap SDK PHP,
pemetaan galat, aturan kompatibilitas, dan cara mengujinya. Tidak menjelaskan pemakaian SATUSEHAT
(lihat `README.md`) dan tidak menjelaskan produk yang memakainya.

## 2. Prinsip Arsitektur

1. **Bangun dulu, kirim kemudian.** Pembangun payload (`src/builder`, `src/datatype`) tidak menyentuh
   jaringan. Di SDK ini lapisan pengiriman FHIR **belum ada** (lihat §5) — jadi satu-satunya jalur
   jaringan adalah `TerminologyClient`.
2. **Barrel digenerate, bukan disunting tangan.** `src/index.ts` dihasilkan
   `scripts/generate_index.py`; menambah resource berarti menjalankan ulang generator, bukan menambah
   baris ekspor manual (sebelum 4.14.2 barrel tidak ada sehingga `dist/index.js` tidak pernah terbit).
3. **Rahasia hanya dari lingkungan.** PAT/OIDC client dibaca dari konfigurasi pemanggil; tidak ada
   kredensial di kode maupun log.
4. **Satu perilaku, empat bahasa.** Perubahan bentuk payload wajib punya padanan di PHP/Python/Go pada
   nomor rilis yang sama; parity diukur dengan angka, bukan diklaim.

## 3. Inventaris Terukur

| Bagian | Jumlah | Cara mengukur |
|---|---|---|
| Berkas builder | 143 | `ls src/builder/*.ts \| wc -l` |
| Kelas builder diekspor | 142 | `grep -rhoE "export class [A-Za-z0-9_]+" src/builder/*.ts \| wc -l` |
| Kelas DataType diekspor | 31 | idem pada `src/datatype/{datatype,datatypes}.ts` |
| Berkas terminology | 20 | `ls src/terminology/*.ts \| wc -l` |
| Berkas queue | 3 | `rate_limiter.ts`, `monitor.ts`, `error_classifier.ts` |
| Berkas uji | 3 | `src/index.test.ts`, `src/terminology/terminology_client.test.ts`, +1 |
| Blok uji (`it`/`test`) | 75 | `grep -rhoE "(^\|\s)(it\|test)\(" src --include="*.test.ts" \| wc -l` |

## 4. Kontrak Publik

- Titik masuk paket: `main: dist/index.js`, `types: dist/index.d.ts`, `files: [dist, README.md]`.
- Ekspor berasal dari `src/index.ts` (digenerate): seluruh `datatype`, seluruh `terminology`, dan
  builder per resource. Nama kelas builder = nama resource FHIR (`Account`, `Bundle`,
  `MedicationRequest`, …) tanpa awalan `PayloadBuilder` — berbeda dari PHP tetapi bentuk payload sama.
- Versi dinaikkan bersama tiga SDK lain (lihat `docs/PRD-SDK-ECOSYSTEM.md` §3 aturan rilis).
- `npm test` = `vitest`; `npm run build` = `tsc`; `prepack` memastikan `dist/index.js` dan
  `dist/index.d.ts` benar-benar ada sebelum terbit (pelajaran dari 4.14.2).

## 5. Selisih Nyata terhadap SDK PHP (diukur, bukan diklaim)

| Kemampuan | PHP | Node | Bukti di repo ini |
|---|---|---|---|
| Bangun payload FHIR | 141 `PayloadBuilder*` | **142 kelas** | `grep -c "export class"` |
| Nilai bertipe (DataType) | 32 | **31** | `src/datatype` |
| Kirim FHIR + retry/refresh token | `src/SSRequest/SSRequest.php` | **TIDAK ADA** | `find src -iname "*ssrequest*"` → kosong |
| Bungkus jawaban + validasi 558 aturan | `SSResponse`, `SSValidationError` | **TIDAK ADA** | idem |
| Parser FHIR | 18 berkas | **TIDAK ADA** | `find src -iname "*parser*"` → kosong |
| Lapisan kompatibilitas 3.x | 49 berkas `src/FHIR` | tidak relevan (paket baru) | — |
| Antrean kirim (`Queue/*`) | 8 berkas | 3 penyusun (`rate_limiter`, `monitor`, `error_classifier`) | `ls src/queue` |
| Klien terminology | 22 berkas | 20 berkas, `TerminologyClient` ber-PAT/OIDC | `src/terminology` |

**Kesimpulan yang harus dibaca apa adanya:** SDK Node saat ini adalah **pembangun payload + klien
terminology**, bukan SDK pengiriman FHIR. Aplikasi yang memakai paket ini harus mengirim HTTP sendiri.
Menyebut paket ini setara PHP adalah klaim yang tidak didukung kode.

## 6. Pemetaan Galat (`TerminologyClient`)

- `timeout` bawaan **30 detik**, dapat diubah lewat `TerminologyClientConfig.timeout`.
- **401** → bila PAT kosong dan kredensial OIDC ada, token diambil sekali lalu permintaan diulang
  satu kali; token disimpan sampai kedaluwarsa. Tanpa kredensial, 401 diteruskan sebagai galat.
- **>= 400** → dilempar sebagai `Error("TerminologyClient HTTP <status>")`; badan jawaban tidak
  diurai menjadi tipe galat tersendiri (berbeda dari PHP yang punya `SSValidationError`).
- Kegagalan jaringan tidak dibedakan dari kegagalan HTTP oleh pemanggil — keduanya muncul sebagai
  `Error`. Ini utang teknis T-03.

## 7. Uji

```bash
npm install          # belum dijalankan di mesin ini
npm test             # vitest
npm run build        # tsc — gerbang tipe, bukan hanya lint
```

**Keadaan nyata 2026-10-27:** `node_modules` **tidak ada** di mesin ini (`ls node_modules | wc -l` → 0),
sedangkan `better-sqlite3` adalah dependensi native. Karena itu `npm test` **belum pernah dijalankan**
dan TIDAK boleh diklaim hijau. Yang bisa diukur tanpa dependensi: 3 berkas uji, 75 blok `it`/`test`.
Gerbang tipe wajib `npm run build` (tsc) — lint saja tidak membuktikan tipe, dan kegagalan tipe
memblokir deploy sama seperti di repo Vercel.

## 8. Utang Teknis & Langkah Berikut

- **T-01** `SYNC_MANIFEST.json` menyatakan seluruh komponen `pending` dengan `total` builder 51,
  padahal nyata 142. Alat parity karena itu tidak mengukur apa pun. Diperbaiki pada commit yang sama
  dengan dokumen ini (angka diambil dari `scripts/parity-manifest.sh` di repo PHP).
- **T-02** Tidak ada lapisan pengiriman FHIR (`SSRequest`/`SSResponse`). Pilihan: port dari PHP, atau
  nyatakan resmi SDK ini "payload builder only" di README + PRD. Keduanya keputusan pemilik produk;
  jangan diam-diam dianggap sudah ada.
- **T-03** Galat `TerminologyClient` belum bertipe; pemanggil tidak bisa membedakan jaringan vs 4xx.
- **T-04** `node_modules` tidak pernah dipasang di mesin ini → uji tidak pernah jalan. Perlu satu
  putaran `npm install && npm test` untuk mengubah status "belum diukur" menjadi angka.
- **Berikutnya (butir antrean):** SRD sama untuk `-python` dan `-go`, lalu perbaiki manifest di ketiga repo.
