export * from './datatypes';

import * as semua from './datatypes';

/**
 * `toJSON()` untuk semua DataType.
 *
 * README memakai `name.toJSON()`, kode hanya punya `toArray()`. Menambah metode di 50 kelas
 * satu per satu berarti 50 tempat yang bisa tertinggal; menambalnya di sini sekali membuat
 * seluruh DataType konsisten, termasuk kelas baru yang ditambahkan nanti.
 *
 * `toJSON` juga dipakai `JSON.stringify`, jadi objek DataType bisa diserialisasi langsung.
 */
for (const nilai of Object.values(semua)) {
  const proto = (nilai as any)?.prototype;
  if (proto && typeof proto.toArray === 'function' && typeof proto.toJSON !== 'function') {
    proto.toJSON = function () {
      return this.toArray();
    };
  }
}
