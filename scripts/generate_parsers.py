#!/usr/bin/env python3
"""Hasilkan/rapikan parser TypeScript dari builder.

Alasan yang sama seperti repo PHP: getter yang salah ketik nama elemen tidak melempar apa pun,
hanya mengembalikan null. Daftar elemen karena itu diturunkan dari builder — satu-satunya tempat
yang tahu elemen apa yang bisa ditulis.

Aturan:
- Berkas yang belum ada dibuat utuh; berkas lama tidak ditimpa, hanya ditambah getter yang hilang.
- src/parser/index.ts disinkronkan supaya setiap parser terekspor.
- Jalankan: python3 scripts/generate_parsers.py [--check]
"""
import pathlib
import re
import sys

AKAR = pathlib.Path(__file__).resolve().parents[1]
BUILDER = AKAR / "src" / "builder"
PARSER = AKAR / "src" / "parser"

POLA = (
    re.compile(r"this\.(?:set|push)\(\s*'([^']+)'"),
    re.compile(r"this\.data\[\s*'([A-Za-z0-9_]+)'\s*\]"),
)


def resource_dari(teks: str) -> str | None:
    m = re.search(r"resourceType:\s*'([^']+)'", teks) or re.search(r"resourceType\s*=\s*'([^']+)'", teks)
    return m.group(1) if m else None


def elemen_builder(teks: str) -> list[str]:
    kunci: list[str] = []
    for pola in POLA:
        for m in pola.finditer(teks):
            k = m.group(1).split("/")[0]
            if k and k not in kunci and k != "resourceType" and re.fullmatch(r"[A-Za-z][A-Za-z0-9_]*", k):
                kunci.append(k)
    return kunci


def nama_getter(kunci: str) -> str:
    return "get" + kunci[0].upper() + kunci[1:]


def kepala(resource: str) -> str:
    return f"""/**
 * {resource}Parser — pembaca elemen tingkat atas resource FHIR R4 {resource}.
 *
 * Dihasilkan dari {resource}Builder oleh scripts/generate_parsers.py — jangan disunting tangan.
 * Setiap getter mengembalikan null bila elemen tidak ada, sehingga pemanggil tidak pernah
 * terhenti oleh akses yang meleset.
 */
export class {resource}Parser {{
  private payload: Record<string, any>;

  constructor(payload: Record<string, any> = {{}}) {{
    this.payload = payload ?? {{}};
  }}

  getRaw(): Record<string, any> {{
    return this.payload;
  }}
"""


def nama_field(teks: str) -> str:
    """Parser lama menyimpan payload di properti bernama resource (mis. `private encounter:`).

    Getter tambahan harus memakai properti yang SAMA, kalau tidak hasilnya kode yang tidak
    dikompilasi — persis yang terjadi pada TaskParser sebelum ini.
    """
    m = re.search(r"private\s+(\w+)\s*:", teks)
    return m.group(1) if m else "payload"


def isi_getter(kunci: str, field: str = "payload") -> str:
    return f"""
  {nama_getter(kunci)}(): any {{
    return this.{field}?.['{kunci}'] ?? null;
  }}
"""


def berkas_untuk(resource: str, elemen: list[str]) -> str:
    bagian = [kepala(resource)]
    bagian.extend(isi_getter(k) for k in elemen)
    bagian.append("}\n")
    return "".join(bagian)


def sinkronkan_index(nama_parser: list[str]) -> bool:
    index = PARSER / "index.ts"
    lama = index.read_text() if index.exists() else ""
    baris = [l for l in lama.splitlines() if l.strip()]
    ada = set(re.findall(r"'\./(\w+Parser)'", "\n".join(baris)))
    kurang = [n for n in nama_parser if n not in ada]
    if not kurang:
        return False
    baris.extend(f"export * from './{n}';" for n in sorted(kurang))
    index.write_text("\n".join(sorted(set(baris))) + "\n")
    return True


def sinkronkan() -> list[str]:
    berubah: list[str] = []
    nama_parser: list[str] = []
    for path in sorted(BUILDER.glob("*.ts")):
        if path.name.endswith(".test.ts"):
            continue
        teks = path.read_text()
        resource = resource_dari(teks)
        if not resource:
            continue
        elemen = elemen_builder(teks)
        nama_parser.append(f"{resource}Parser")
        tujuan = PARSER / f"{resource}Parser.ts"
        if not tujuan.exists():
            tujuan.write_text(berkas_untuk(resource, elemen))
            berubah.append(f"baru   {tujuan.name}")
            continue
        lama = tujuan.read_text()
        ada = set(re.findall(r"^\s*(get\w+)\(\)", lama, re.M))
        kurang = [k for k in elemen if nama_getter(k) not in ada]
        if not kurang:
            continue
        field = nama_field(lama)
        sisipan = "".join(isi_getter(k, field) for k in kurang)
        posisi = lama.rstrip().rfind("}")
        tujuan.write_text(lama[:posisi] + sisipan + lama[posisi:])
        berubah.append(f"tambah {tujuan.name} ({len(kurang)} getter)")
    if sinkronkan_index(nama_parser):
        berubah.append("index.ts disinkronkan")
    return berubah


def main() -> int:
    n = sinkronkan()
    if "--check" in sys.argv:
        if n:
            print("parser belum sinkron:")
            print("\n".join(n))
            return 1
        print("parser sinkron")
        return 0
    print(f"{len(n)} berkas diubah")
    print("\n".join(n[:20]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
