#!/usr/bin/env python3
"""Bangun src/index.ts dari isi direktori src/.

Kenapa digenerate: 143 builder + belasan kelas terminologi. Daftar yang ditulis tangan
tertinggal setiap kali ada resource baru, dan yang hilang tidak menimbulkan galat — hanya
`undefined` saat dipakai.

Nama ekspor dibaca dari berkasnya, bukan dari nama berkas: di repo ini sebagian berkas
mengekspor `Patient`, sebagian `PatientBuilder`. Menebak dari nama berkas menghasilkan
`export { Group as GroupBuilder }` pada modul yang tidak punya `Group` — persis galat yang
membuat build gagal.

Dijalankan dari akar repo: python3 scripts/generate_index.py
"""
import pathlib
import re

akar = pathlib.Path(__file__).resolve().parent.parent
src = akar / "src"
pola = re.compile(r"export\s+(?:declare\s+)?(?:abstract\s+)?(?:class|interface|type|const|function|enum)\s+(\w+)")

kepala = [
    "// BERKAS INI DIGENERATE — jangan disunting tangan.",
    "// Sumber: scripts/generate_index.py (dijalankan ulang setiap ada resource baru).",
    "//",
    "// Sebelumnya tidak ada barrel sama sekali, sehingga `tsc` tidak pernah menghasilkan",
    "// dist/index.js padahal package.json menunjuk ke sana: `import { … } from",
    "// '@ivanwilliammd/satusehat-integration'` gagal di paket yang terbit.",
    "",
]
baris = list(kepala)
sudah = set()


def daftar_modul(folder: str):
    direktori = src / folder
    if not direktori.is_dir():
        return []
    return sorted(p for p in direktori.glob("*.ts")
                  if not p.stem.endswith(".test") and p.stem not in ("index", "datatype", "datatypes"))


def ekspor_file(p: pathlib.Path):
    return pola.findall(p.read_text(encoding="utf-8"))


# datatype + terminologi + antrean + konfigurasi lebih dulu: builder memakai DataType.
baris.append("// --- datatype (base + semua DataType) ---")
baris.append("export * from './datatype';")
baris.append("")
baris.append("// --- terminologi, antrean, konfigurasi ---")
baris.append("export * from './terminology/index';")
# Tabel terminologi + resolver + klien tinggal di berkas terpisah; `terminology/index.ts`
# hanya memuat TerminologyDB. Tanpa loop ini, `TerminologyResolver` (dipakai README) dan
# seluruh kelas tabel tidak pernah ikut terekspor dari akar paket.
for p in daftar_modul("terminology"):
    baris.append(f"export * from './terminology/{p.stem}';")
for q in ("queue/rate_limiter", "queue/monitor", "queue/error_classifier"):
    baris.append(f"export * from './{q}';")
# config diekspor sebagai default saja: `TerminologyConfig` di dalamnya bertabrakan dengan
# yang sudah diekspor terminology/index, dan dua antarmuka bernama sama membuat build gagal.
baris.append("export { default as konfigurasi } from './config';")
baris.append("")

baris.append("// --- builder (143 resource) ---")
for p in daftar_modul("builder"):
    nama = ekspor_file(p)
    baris.append(f"export * from './builder/{p.stem}';")
    # README memakai <Resource>Builder. Bila berkas hanya mengekspor <Resource>,
    # tambahkan alias supaya dokumen dan kode tidak bertentangan.
    if p.stem in nama and f"{p.stem}Builder" not in nama and f"{p.stem}Builder" not in sudah:
        baris.append(f"export {{ {p.stem} as {p.stem}Builder }} from './builder/{p.stem}';")
        sudah.add(f"{p.stem}Builder")

(akar / "src/index.ts").write_text("\n".join(baris) + "\n", encoding="utf-8")
print("src/index.ts:", len(baris), "baris")
