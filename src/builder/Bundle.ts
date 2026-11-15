export class BundleBuilder {
  protected data: Record<string, any> = { resourceType: 'Bundle' };

  static TYPE_DOCUMENT = 'document';
  static TYPE_BATCH = 'batch';
  static TYPE_TRANSACTION = 'transaction';
  static TYPE_HISTORY_COLLECTION = 'history-collection';
  static TYPE_HISTORY_DOCUMENT = 'history-document';
  static TYPE_HISTORY_FEED = 'history-feed';
  static TYPE_SEARCHSET = 'searchset';
  static TYPE_COLLECTION = 'collection';
  static TYPE_FEED = 'feed';
  static TYPE_WRAPPER = 'wrapper';

  private _timestampAutoSet = true;

  constructor(bundleType?: string) {
    this.data = { resourceType: 'Bundle' };
    if (bundleType) this.setType(bundleType);
    if (this._timestampAutoSet) {
      this.setTimestamp(new Date().toISOString());
    }
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  getResourceType(): string { return 'Bundle'; }
  toJSON(): any { return this.data; }

  /** Alias `build()` supaya seragam dengan 142 builder lain (dan dengan PHP `BuilderBundle`).
   *  Sebelumnya `new BundleBuilder().build()` melempar "build is not a function" — satu-satunya
   *  builder di paket ini yang tidak punya `build()`. */
  build(): any { return this.toJSON(); }

  setType(type: string): this {
    this.data['type'] = type;
    return this;
  }

  setTimestamp(timestamp: string): this {
    this._timestampAutoSet = false;
    this.data['timestamp'] = timestamp;
    return this;
  }

  setTotal(total: number): this { this.data['total'] = total; return this; }
  setMeta(meta: Record<string, any>): this { this.data['meta'] = meta; return this; }

  addLink(relation: string, url: string): this {
    if (!this.data['link']) this.data['link'] = [];
    this.data['link'].push({ relation, url });
    return this;
  }

  addEntry(resource: Record<string, any>, fullUrl?: string): this {
    const entry: Record<string, any> = { resource };
    if (fullUrl) entry['fullUrl'] = fullUrl;
    if (!this.data['entry']) this.data['entry'] = [];
    this.data['entry'].push(entry);
    return this;
  }

  addSearchEntry(resource: Record<string, any>, fullUrl?: string, score?: number, searchMode?: string): this {
    const entry: Record<string, any> = { resource };
    if (fullUrl) entry['fullUrl'] = fullUrl;
    const search: Record<string, any> = {};
    if (searchMode) search['mode'] = searchMode;
    if (score !== undefined) search['score'] = score;
    if (Object.keys(search).length > 0) entry['search'] = search;
    if (!this.data['entry']) this.data['entry'] = [];
    this.data['entry'].push(entry);
    return this;
  }

  addBatchEntry(
    resource: Record<string, any> | null,
    fullUrl: string,
    method: string,
    url: string,
    ifMatch?: string,
    ifNoneMatch?: string,
    ifNoneExist?: string,
  ): this {
    const request: Record<string, any> = { method, url };
    if (ifMatch) request['ifMatch'] = ifMatch;
    if (ifNoneMatch) request['ifNoneMatch'] = ifNoneMatch;
    if (ifNoneExist) request['ifNoneExist'] = ifNoneExist;
    const entry: Record<string, any> = { fullUrl, request };
    if (resource !== null) entry['resource'] = resource;
    if (!this.data['entry']) this.data['entry'] = [];
    this.data['entry'].push(entry);
    return this;
  }

  addTransactionEntry(
    resource: Record<string, any> | null,
    fullUrl: string,
    method: string,
    url: string,
    ifMatch?: string,
    ifNoneMatch?: string,
    ifNoneExist?: string,
  ): this {
    this.setType('transaction');
    return this.addBatchEntry(resource, fullUrl, method, url, ifMatch, ifNoneMatch, ifNoneExist);
  }

  addGetEntry(fullUrl: string, url: string, ifNoneMatch?: string): this {
    return this.addBatchEntry(null, fullUrl, 'GET', url, undefined, ifNoneMatch);
  }

  addDeleteEntry(fullUrl: string, url: string, ifMatch?: string): this {
    return this.addBatchEntry(null, fullUrl, 'DELETE', url, ifMatch);
  }

  validate(): string[] {
    const errors: string[] = [];
    if (!this.data['type']) errors.push('Bundle.type is required');
    if (!this.data['timestamp']) errors.push('Bundle.timestamp is required');
    return errors;
  }

  /** Menonaktifkan timestamp otomatis yang dipasang constructor. */
  noAutoTimestamp(): this {
    this._timestampAutoSet = false;
    delete this.data['timestamp'];
    return this;
  }

  addPaginationLinks(baseUrl: string, page: number, count: number, total: number): this {
    const offset = (page - 1) * count;
    this.addLink('self', `${baseUrl}?offset=${offset}&count=${count}`);
    this.addLink('first', `${baseUrl}?offset=0&count=${count}`);
    this.addLink('last', `${baseUrl}?offset=${Math.floor(total / count) * count}&count=${count}`);
    if (page > 1) this.addLink('previous', `${baseUrl}?offset=${(page - 2) * count}&count=${count}`);
    if (offset + count < total) this.addLink('next', `${baseUrl}?offset=${page * count}&count=${count}`);
    return this;
  }

  addBatchOnlyEntry(
    resource: Record<string, any> | null,
    fullUrl: string,
    method: string,
    url: string,
    ifMatch: string | null = null,
    ifNoneMatch: string | null = null,
    ifNoneExist: string | null = null
  ): this {
    const request: Record<string, any> = { method, url };
    if (ifMatch !== null) request['ifMatch'] = ifMatch;
    if (ifNoneMatch !== null) request['ifNoneMatch'] = ifNoneMatch;
    if (ifNoneExist !== null) request['ifNoneExist'] = ifNoneExist;
    const entry: Record<string, any> = { fullUrl, request };
    if (resource !== null) entry['resource'] = resource;
    if (!this.data['entry']) this.data['entry'] = [];
    this.data['entry'].push(entry);
    return this;
  }

  addHistoryEntry(
    resource: Record<string, any>,
    fullUrl: string,
    status: string,
    statusCode: number | null = null,
    etag: string | null = null,
    lastModified: string | null = null,
    location: string | null = null,
    outcome: string | null = null
  ): this {
    const response: Record<string, any> = { status };
    if (statusCode !== null) response['statusCode'] = statusCode;
    if (etag !== null) response['etag'] = etag;
    if (lastModified !== null) response['lastModified'] = lastModified;
    if (location !== null) response['location'] = location;
    if (outcome !== null) response['outcome'] = outcome;
    if (!this.data['entry']) this.data['entry'] = [];
    this.data['entry'].push({ fullUrl, resource, response });
    return this;
  }

  addEntryWithResponse(
    resource: Record<string, any>,
    fullUrl: string,
    status: string,
    etag: string | null = null,
    lastModified: string | null = null
  ): this {
    const response: Record<string, any> = { status };
    if (etag !== null) response['etag'] = etag;
    if (lastModified !== null) response['lastModified'] = lastModified;
    if (!this.data['entry']) this.data['entry'] = [];
    this.data['entry'].push({ fullUrl, resource, response });
    return this;
  }

  /** Entry untuk OperationOutcome: search.mode = outcome. */
  addOutcomeEntry(operationOutcome: Record<string, any>, fullUrl: string): this {
    if (!this.data['entry']) this.data['entry'] = [];
    this.data['entry'].push({ fullUrl, resource: operationOutcome, search: { mode: 'outcome' } });
    return this;
  }

  setSignature(
    type: string,
    sigFormat: string,
    sigBlob: string,
    sigAlg: string | null = null,
    sigCreated: string | null = null,
    sigWho: string | null = null,
    sigOnBehalfOf: string | null = null
  ): this {
    const signature: Record<string, any> = { type: [{ code: type }], format: sigFormat, data: sigBlob };
    if (sigAlg !== null) signature['sigAlg'] = sigAlg;
    if (sigCreated !== null) signature['created'] = sigCreated;
    if (sigWho !== null) signature['who'] = { reference: sigWho };
    if (sigOnBehalfOf !== null) signature['onBehalfOf'] = { reference: sigOnBehalfOf };
    this.data['signature'] = signature;
    return this;
  }
}

/** Nama kanon `Bundle`: seragam dengan modul lain. `BundleBuilder` dipertahankan untuk pemanggil lama. */
export { BundleBuilder as Bundle };
