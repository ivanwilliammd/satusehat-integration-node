#!/usr/bin/env python3
"""Siapkan namespace R5 sebagai lapisan tipis di atas kelas kanon R4 (TypeScript).

Memakai R5 cukup dengan mengganti baris import:

    import { PatientBuilder } from './builder/Patient';       // R4
    import { PatientBuilder } from './r5/builder/Patient';    // R5 — hanya baris ini

Bila satu resource memang berbeda di R5, hapus penanda @generated pada berkas itu; generator
berhenti menyentuhnya.

Jalankan: python3 scripts/generate_r5_namespace.py [--check]
"""
import pathlib
import re
import sys

AKAR = pathlib.Path(__file__).resolve().parents[1]
# Hanya builder. Datatype di port TypeScript adalah `type` struktural di satu berkas barrel
# (src/datatype/datatypes.ts), bukan kelas — membuat "kelas R5" turunan untuk mereka mustahil dan
# tidak perlu: bentuk struktural yang sama dipakai apa adanya oleh R4 maupun R5.
SUMBER = {"builder": AKAR / "src" / "builder"}
TUJUAN = AKAR / "src" / "r5"

TEMPLATE = """/**
 * @generated oleh scripts/generate_r5_namespace.py — jangan disunting tangan.
 *
 * Lapisan R5: turunan apa adanya dari kelas kanon (R4). Selama R5 tidak mengubah resource ini,
 * memakai R5 cukup dengan mengganti baris import. Bila R5 memang berbeda, hapus penanda
 * @generated dan tulis implementasinya di sini.
 */
import { NAMA as NAMA_R4 } from '../../RUANG/MODUL';

export class NAMA extends NAMA_R4 {}
"""


def kelas_dari(teks: str) -> str | None:
    m = re.search(r"^export class (\w+)", teks, re.M)
    return m.group(1) if m else None


def isi(ruang: str, modul: str, nama: str) -> str:
    return (
        TEMPLATE.replace("RUANG", ruang)
        .replace("MODUL", modul)
        .replace("NAMA_R4", nama + "R4")
        .replace("NAMA", nama)
    )


def sinkronkan() -> list[str]:
    berubah: list[str] = []
    for ruang, direktori in SUMBER.items():
        (TUJUAN / ruang).mkdir(parents=True, exist_ok=True)
        for berkas in sorted(direktori.glob("*.ts")):
            if berkas.name.endswith(".test.ts") or berkas.name == "index.ts":
                continue
            nama = kelas_dari(berkas.read_text())
            if not nama:
                continue
            tujuan = TUJUAN / ruang / berkas.name
            baru = isi(ruang, berkas.stem, nama)
            if not tujuan.exists():
                tujuan.write_text(baru, encoding="utf-8", newline="\n")
                berubah.append(f"baru   r5/{ruang}/{berkas.name}")
                continue
            lama = tujuan.read_text(encoding="utf-8").replace("\r\n", "\n")
            if "@generated" not in lama:
                continue
            if lama != baru:
                tujuan.write_text(baru, encoding="utf-8", newline="\n")
                berubah.append(f"ubah   r5/{ruang}/{berkas.name}")
    return berubah


def main() -> int:
    n = sinkronkan()
    if "--check" in sys.argv:
        if n:
            print("namespace R5 belum sinkron:")
            print("\n".join(n[:20]))
            return 1
        print("namespace R5 sinkron")
        return 0
    print(f"{len(n)} berkas diubah")
    print("\n".join(n[:8]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
