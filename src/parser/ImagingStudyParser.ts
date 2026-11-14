/**
 * ImagingStudyParser — typed accessors over the official SATUSEHAT ImagingStudy payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/ImagingStudy.json, copied unchanged to
 * src/parser/testdata/ImagingStudy.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class ImagingStudyParser {
  private payload: Record<string, any>;

  constructor(payload: Record<string, any> = {}) {
    this.payload = payload ?? {};
  }

  getRaw(): Record<string, any> {
    return this.payload;
  }

  getResourceType(): any {
    return this.payload['resourceType'] ?? null;
  }

  getId(): any {
    return this.payload['id'] ?? null;
  }

  getIdentifier(): any {
    return this.payload['identifier'] ?? null;
  }

  getStatus(): any {
    return this.payload['status'] ?? null;
  }

  getModality(): any {
    return this.payload['modality'] ?? null;
  }

  getSubject(): any {
    return this.payload['subject'] ?? null;
  }

  getStarted(): any {
    return this.payload['started'] ?? null;
  }

  getBasedOn(): any {
    return this.payload['basedOn'] ?? null;
  }

  getNumberOfSeries(): any {
    return this.payload['numberOfSeries'] ?? null;
  }

  getNumberOfInstances(): any {
    return this.payload['numberOfInstances'] ?? null;
  }

  getDescription(): any {
    return this.payload['description'] ?? null;
  }

  getSeries(): any {
    return this.payload['series'] ?? null;
  }
}
