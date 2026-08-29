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
}
