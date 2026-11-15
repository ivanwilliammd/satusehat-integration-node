/**
 * GenomicStudy FHIR R4 Resource Builder
 * Setara PayloadBuilderGenomicStudy.php.
 *
 * Tiga cacat di versi Node sebelumnya ikut diperbaiki di sini, karena golden PHP
 * yang membuktikannya:
 * - setStatus tidak memvalidasi lima nilai sah (PHP melempar InvalidArgumentException);
 * - setType menimpa satu objek, padahal PHP `addType` menumpuk (type 0..*);
 * - setStarted menulis elemen `started`, padahal PHP menulis `startDate` — nama
 *   elemen yang salah berarti datanya tidak pernah terbaca.
 */
import { konsep, ident, rujuk } from './datatypeInput';

export class GenomicStudyBuilder {
  private data: Record<string, any> = { resourceType: 'GenomicStudy' };

  private set(k: string, v: any): void { this.data[k] = v; }
  private push(k: string, v: any): void {
    if (!Array.isArray(this.data[k])) this.data[k] = [];
    this.data[k].push(v);
  }

  /** PHP menulis lewat jalur `meta/profile`, jadi profile menumpuk di dalam objek meta. */
  setMetaProfile(profile: string): this {
    const meta = (this.data['meta'] ??= {});
    if (!Array.isArray(meta.profile)) meta.profile = [];
    meta.profile.push(profile);
    return this;
  }

  setId(id: string): this { this.set('id', id); return this; }

  addIdentifier(identifier: any, value?: string): this { this.push('identifier', ident(identifier, value)); return this; }

  setStatus(status: string): this {
    const sah = ['registered', 'available', 'cancelled', 'entered-in-error', 'unknown'];
    if (!sah.includes(status)) {
      throw new Error(`Invalid status '${status}'. Valid values: ${sah.join(', ')}`);
    }
    this.set('status', status);
    return this;
  }

  /** type 0..*: menumpuk, mengikuti `addType` di PHP. */
  addType(type: any, code?: string, display?: string): this {
    this.push('type', konsep(type, code, display));
    return this;
  }

  setSubject(subject: any, display?: string): this { this.set('subject', rujuk(subject, display)); return this; }

  setEncounter(encounter: any): this { this.set('encounter', rujuk(encounter)); return this; }

  setStartDate(startDate: string): this { this.set('startDate', startDate); return this; }

  addBasedOn(basedOn: any): this { this.push('basedOn', rujuk(basedOn)); return this; }

  setReferrer(referrer: any): this { this.set('referrer', rujuk(referrer)); return this; }

  addInterpreter(interpreter: any): this { this.push('interpreter', rujuk(interpreter)); return this; }

  /** FHIR R4: GenomicStudy.reason bertipe CodeableReference, jadi kode dibungkus `concept`. */
  addReason(reason: any, code?: string, display?: string): this {
    this.push('reason', { concept: konsep(reason, code, display) });
    return this;
  }

  addNote(note: any): this { this.push('note', typeof note === 'string' ? { text: note } : note); return this; }

  setDescription(description: string): this { this.set('description', description); return this; }

  /** PHP menerima array apa adanya; di sini objek/array diteruskan tanpa diubah. */
  addAnalysis(analysis: Record<string, any>): this { this.push('analysis', analysis); return this; }

  /**
   * Role default 'PERF'. Sistem kode ditulis persis seperti PHP, termasuk bentuk
   * URL 3.1.0 yang bukan kanon resmi — ditiru, bukan diperbaiki.
   */
  addPerformer(actor: any, role: string = 'PERF'): this {
    this.push('performer', {
      actor: rujuk(actor),
      role: { coding: [{ system: 'http://terminology.hl7.org/3.1.0/CodeSystem-v3-ParticipationType.html', code: role, display: 'Performer' }] },
    });
    return this;
  }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}

/** Nama kanon `GenomicStudy`: seragam dengan modul lain. `GenomicStudyBuilder` dipertahankan untuk pemanggil lama. */
export { GenomicStudyBuilder as GenomicStudy };
