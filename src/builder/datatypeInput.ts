/**
 * Penyesuai masukan untuk builder yang di PHP menerima nilai berskala
 * (system, code, display) tetapi di Node sempat hanya menerima objek datatype.
 *
 * Kanon adalah PHP: setter yang di sana berskala harus bisa dipanggil berskala.
 * Objek datatype tetap diterima supaya pemanggil lama tidak rusak.
 */
export function konsep(arg: any, code?: string, display = ''): any {
  if (typeof arg === 'string') {
    if (code === undefined) return { text: arg };
    return { coding: [{ system: arg, code, display }] };
  }
  return typeof arg?.toArray === 'function' ? arg.toArray() : arg;
}

export function rujuk(arg: any, display?: string): any {
  if (typeof arg === 'string') {
    const r: Record<string, any> = { reference: arg };
    if (display !== undefined) r['display'] = display;
    return r;
  }
  return typeof arg?.toArray === 'function' ? arg.toArray() : arg;
}

export function ident(arg: any, value?: string): any {
  if (typeof arg === 'string') return { system: arg, value };
  return typeof arg?.toArray === 'function' ? arg.toArray() : arg;
}
