export interface BundleRequestEntry {
  index?: number;
  method?: string;
  url?: string;
  fullUrl?: string;
  request?: {
    method?: string;
    url?: string;
  };
}

export interface BundleParsedEntry {
  index?: number;
  status: string;
  location: string;
  etag: string;
  lastModified: string;
  outcome: Record<string, any> | null;
  fullUrl: string;
}

export interface BundleMethodEntry {
  index: number;
  method: string;
  url: string;
  fullUrl: string;
  status: string;
  statusCode: number;
  location: string;
  resourceId: string | null;
  etag: string;
  lastModified: string;
  outcome: Record<string, any> | null;
  errors: string[];
  isSuccess: boolean;
  resource: Record<string, any> | null;
}

/**
 * BundleResponse — parses FHIR Bundle responses (batch-response / transaction-response).
 */
export class BundleResponse {
  private readonly bundle: Record<string, any>;
  private readonly httpCode: number;
  private readonly requestEntries: BundleRequestEntry[];

  constructor(
    httpCode: number,
    bundle: Record<string, any> = {},
    requestEntries: BundleRequestEntry[] = []
  ) {
    this.httpCode = httpCode;
    this.bundle = bundle ?? {};
    this.requestEntries = requestEntries ?? [];
  }

  getHttpCode(): number {
    return this.httpCode;
  }

  getBundle(): Record<string, any> {
    return this.bundle;
  }

  isSuccess(): boolean {
    return this.httpCode >= 200 && this.httpCode < 300;
  }

  getTotal(): number {
    return Number(this.bundle?.total ?? 0);
  }

  getEntries(): BundleParsedEntry[] {
    const entries: BundleParsedEntry[] = [];

    if (!Array.isArray(this.bundle?.entry)) {
      return entries;
    }

    for (const entry of this.bundle.entry) {
      const response = entry?.response ?? {};

      entries.push({
        status: response.status ?? '',
        location: response.location ?? '',
        etag: response.etag ?? '',
        lastModified: response.lastModified ?? '',
        outcome: response.outcome ?? null,
        fullUrl: entry?.fullUrl ?? '',
      });
    }

    return entries;
  }

  getEntryStatuses(): string[] {
    return this.getEntries().map((e) => e.status);
  }

  getSuccessEntries(): BundleParsedEntry[] {
    const success: BundleParsedEntry[] = [];
    const entries = this.getEntries();

    entries.forEach((entry, index) => {
      const code = parseInt(String(entry.status).split(' ')[0] ?? '0', 10) || 0;
      if (code >= 200 && code < 300) {
        success.push({ index, ...entry });
      }
    });

    return success;
  }

  getFailedEntries(): BundleParsedEntry[] {
    const failed: BundleParsedEntry[] = [];
    const entries = this.getEntries();

    entries.forEach((entry, index) => {
      const code = parseInt(String(entry.status).split(' ')[0] ?? '0', 10) || 0;
      if (code >= 400 || code === 0) {
        failed.push({ index, ...entry });
      }
    });

    return failed;
  }

  getEntryResourceId(index: number): string | null {
    const entries = this.bundle?.entry ?? [];
    if (!entries[index]) {
      return null;
    }

    const location = String(entries[index]?.response?.location ?? '');
    if (location === '') {
      return null;
    }

    const parts = location.split('/');
    const lastPart = parts[parts.length - 1] ?? '';
    const idPart = lastPart.split('?')[0];

    return idPart !== '' ? idPart : null;
  }

  getEntryErrors(index: number): string[] {
    const entries = this.bundle?.entry ?? [];
    if (!entries[index]) {
      return [];
    }

    const outcome = entries[index]?.response?.outcome ?? null;
    if (!outcome || outcome.resourceType !== 'OperationOutcome') {
      return [];
    }

    const messages: string[] = [];
    if (!Array.isArray(outcome.issue)) {
      return messages;
    }

    for (const issue of outcome.issue) {
      const text =
        issue?.details?.text ??
        issue?.diagnostics ??
        issue?.details?.coding?.[0]?.display ??
        null;

      if (text) {
        messages.push(String(text));
      }
    }

    return messages;
  }

  getResourceIds(): Array<{ fullUrl: string; id: string; location: string }> {
    const ids: Array<{ fullUrl: string; id: string; location: string }> = [];
    const entries = this.getEntries();

    entries.forEach((entry, index) => {
      const id = this.getEntryResourceId(index);
      if (id) {
        ids.push({
          fullUrl: entry.fullUrl,
          id,
          location: entry.location,
        });
      }
    });

    return ids;
  }

  isAllSuccess(): boolean {
    const entries = this.getEntries();
    if (entries.length === 0) {
      return false;
    }

    for (const entry of entries) {
      const code = parseInt(String(entry.status).split(' ')[0] ?? '0', 10) || 0;
      if (code < 200 || code >= 300) {
        return false;
      }
    }

    return true;
  }

  byMethod(methods: string[]): BundleMethodEntry[] {
    if (!this.requestEntries || this.requestEntries.length === 0) {
      return [];
    }

    const normalizedMethods = methods.map((m) => m.toUpperCase());
    const results: BundleMethodEntry[] = [];
    const responseEntries = this.bundle?.entry ?? [];

    this.requestEntries.forEach((reqEntry, reqIndex) => {
      const rawMethod = reqEntry.method ?? reqEntry.request?.method ?? '';
      const method = String(rawMethod).toUpperCase();

      if (!normalizedMethods.includes(method)) {
        return;
      }

      const respEntry = responseEntries[reqIndex] ?? {};
      const response = respEntry.response ?? {};
      const status = String(response.status ?? '');
      const statusCode = parseInt(status.split(' ')[0] ?? '0', 10) || 0;
      const location = String(response.location ?? '');

      let resourceId: string | null = null;
      if (location !== '') {
        const parts = location.split('/');
        const lastPart = parts[parts.length - 1] ?? '';
        const idPart = lastPart.split('?')[0];
        if (idPart !== '') {
          resourceId = idPart;
        }
      }

      const errors: string[] = [];
      const outcome = response.outcome ?? null;
      if (outcome && outcome.resourceType === 'OperationOutcome' && Array.isArray(outcome.issue)) {
        for (const issue of outcome.issue) {
          const text =
            issue?.details?.text ??
            issue?.diagnostics ??
            issue?.details?.coding?.[0]?.display ??
            null;
          if (text) {
            errors.push(String(text));
          }
        }
      }

      let resource: Record<string, any> | null = null;
      if (method === 'GET' && respEntry.resource) {
        resource = respEntry.resource;
      }

      const url = reqEntry.url ?? reqEntry.request?.url ?? '';

      results.push({
        index: reqIndex,
        method,
        url,
        fullUrl: reqEntry.fullUrl ?? '',
        status,
        statusCode,
        location,
        resourceId,
        etag: response.etag ?? '',
        lastModified: response.lastModified ?? '',
        outcome,
        errors,
        isSuccess: statusCode >= 200 && statusCode < 300,
        resource,
      });
    });

    return results;
  }

  created(): BundleMethodEntry[] {
    return this.byMethod(['POST']);
  }

  updated(): BundleMethodEntry[] {
    return this.byMethod(['PUT']);
  }

  patched(): BundleMethodEntry[] {
    return this.byMethod(['PATCH']);
  }

  read(): BundleMethodEntry[] {
    return this.byMethod(['GET']);
  }

  deleted(): BundleMethodEntry[] {
    return this.byMethod(['DELETE']);
  }

  idMap(): Record<string, string> {
    const map: Record<string, string> = {};
    for (const entry of this.created()) {
      if (entry.fullUrl && entry.resourceId) {
        map[entry.fullUrl] = entry.resourceId;
      }
    }
    return map;
  }

  find(resourceType: string, resourceId: string): {
    index: number;
    method: string;
    status: string;
    statusCode: number;
    location: string;
    resourceId: string | null;
    isSuccess: boolean;
  } | null {
    const rtLower = resourceType.toLowerCase();
    const idLower = resourceId.toLowerCase();

    for (let reqIndex = 0; reqIndex < this.requestEntries.length; reqIndex++) {
      const reqEntry = this.requestEntries[reqIndex];
      const url = String(reqEntry.url ?? reqEntry.request?.url ?? '');
      const urlLower = url.toLowerCase();
      if (urlLower.includes(rtLower) && urlLower.includes(idLower)) {
        const respEntries = this.bundle?.entry ?? [];
        const respEntry = respEntries[reqIndex]?.response ?? {};
        const status = String(respEntry.status ?? '');
        const statusCode = parseInt(status.split(' ')[0] ?? '0', 10) || 0;

        return {
          index: reqIndex,
          method: String(reqEntry.method ?? reqEntry.request?.method ?? ''),
          status,
          statusCode,
          location: String(respEntry.location ?? ''),
          resourceId: this.getEntryResourceId(reqIndex),
          isSuccess: statusCode >= 200,
        };
      }
    }

    return null;
  }
}
