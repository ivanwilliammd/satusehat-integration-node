/**
 * ImagingStudy FHIR R4 Resource Builder
 * Setara PayloadBuilderImagingStudy.php. Nama method camelCase, semantik sama.
 *
 * Beberapa setter menulis ke elemen bersarang lewat jalur (`series/0/started`),
 * meniru `Builder::set` PHP. `setPath`/`pushPath` di bawah ini melakukan itu;
 * segmen numerik menunjuk elemen daftar yang sudah ada.
 */
export class ImagingStudyBuilder {
  private data: Record<string, any> = { resourceType: 'ImagingStudy' };

  private set(key: string, value: any): void { this.data[key] = value; }
  private push(key: string, value: any): void {
    if (!this.data[key]) this.data[key] = [];
    this.data[key].push(value);
  }

  private static isIndex(seg: string): boolean { return /^\d+$/.test(seg); }

  private jalur(path: string): any {
    const segs = path.split('/');
    let cur: any = this.data;
    segs.forEach((seg, i) => {
      const akhir = i === segs.length - 1;
      const kunci: string | number = ImagingStudyBuilder.isIndex(seg) ? Number(seg) : seg;
      if (akhir) return;
      if (cur[kunci] === undefined || cur[kunci] === null) {
        cur[kunci] = ImagingStudyBuilder.isIndex(segs[i + 1]) ? [] : {};
      }
      cur = cur[kunci];
    });
    const terakhir = segs[segs.length - 1];
    return { induk: cur, kunci: ImagingStudyBuilder.isIndex(terakhir) ? Number(terakhir) : terakhir };
  }

  private setPath(path: string, value: any): void {
    const { induk, kunci } = this.jalur(path);
    induk[kunci] = value;
  }

  private pushPath(path: string, value: any): void {
    const { induk, kunci } = this.jalur(path);
    if (!Array.isArray(induk[kunci])) induk[kunci] = [];
    induk[kunci].push(value);
  }

  setId(id: string): this { this.set('id', id); return this; }

  addIdentifier(system: string, value: string): this { this.push('identifier', { system, value }); return this; }

  setStatus(status: string): this { this.set('status', status); return this; }

  /** FHIR R4: modality bertipe Coding, jadi ditulis rata tanpa pembungkus `coding`. */
  addModality(system: string, code: string, display: string = ''): this {
    this.push('modality', { system, code, display });
    return this;
  }

  setSubject(reference: string): this { this.set('subject', { reference }); return this; }

  setEncounter(reference: string): this { this.set('encounter', { reference }); return this; }

  setStarted(dateTime: string): this { this.set('started', dateTime); return this; }

  setEnded(dateTime: string): this { this.set('ended', dateTime); return this; }

  setLocation(reference: string): this { this.set('location', { reference }); return this; }

  /** Quirk PHP: dinamai `addReferrer` tetapi menimpa, bukan menumpuk. Ditiru apa adanya. */
  addReferrer(reference: string): this { this.set('referrer', { reference }); return this; }

  addPartOf(reference: string): this { this.push('partOf', { reference }); return this; }

  addSeries(
    uid: string,
    system: string,
    code: string,
    display: string,
    status: string | null = null,
    description: string | null = null,
    number: number | null = null
  ): this {
    const series: Record<string, any> = { uid, modality: { system, code, display } };
    if (status !== null) series['status'] = status;
    if (description !== null) series['description'] = description;
    if (number !== null) series['number'] = number;
    this.push('series', series);
    return this;
  }

  setSeriesStarted(seriesIdx: number, dateTime: string): this {
    this.setPath(`series/${seriesIdx}/started`, dateTime);
    return this;
  }

  /** series.bodySite bertipe CodeableConcept, jadi kode DIBUNGKUS di dalam `coding`. */
  setSeriesBodySite(seriesIdx: number, system: string, code: string, display: string = ''): this {
    const coding: Record<string, any> = { system, code };
    if (display !== '') coding['display'] = display;
    this.setPath(`series/${seriesIdx}/bodySite`, { coding: [coding] });
    return this;
  }

  addSeriesInstance(
    seriesIdx: number,
    uid: string,
    dicomClassSystem: string,
    dicomClassCode: string,
    dicomClassDisplay: string
  ): this {
    this.pushPath(`series/${seriesIdx}/instance`, {
      uid,
      sopClass: { system: dicomClassSystem, code: dicomClassCode, display: dicomClassDisplay },
    });
    return this;
  }

  addSeriesInstanceNumber(seriesIdx: number, instanceIdx: number, number: number): this {
    this.setPath(`series/${seriesIdx}/instance/${instanceIdx}/number`, number);
    return this;
  }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }
}

/** Nama kanon `ImagingStudy`: seragam dengan modul lain. `ImagingStudyBuilder` dipertahankan untuk pemanggil lama. */
export { ImagingStudyBuilder as ImagingStudy };
