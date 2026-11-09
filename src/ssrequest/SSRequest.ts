import axios, { AxiosInstance } from 'axios';
import { OAuth2Client } from './OAuth2Client';
import { SSResponse } from '../ssresponse/SSResponse';

export interface SSRequestTransportResponse {
  status: number;
  data?: any;
  body?: string;
  headers?: Record<string, string | undefined>;
}

export type SSRequestTransport = (
  method: string,
  url: string,
  headers: Record<string, string>,
  body?: string | null
) => Promise<SSRequestTransportResponse> | SSRequestTransportResponse;

export interface SSRequestConfig {
  timeout?: number;
  maxRetries?: number;
  headers?: Record<string, string>;
  verify?: boolean;
  log_enabled?: boolean;
  http?: AxiosInstance;
  transport?: SSRequestTransport;
  sleepFn?: (seconds: number) => Promise<void> | void;
}

/**
 * SSRequest — FHIR R4 HTTP client with automatic OAuth2 token refresh on 401
 * and exponential backoff / Retry-After handling on 429 and 5xx.
 */
export class SSRequest {
  private oauth2: OAuth2Client | null;
  private token: string | null;
  private baseUrl: string;
  private config: SSRequestConfig;
  private http: AxiosInstance;
  private defaultHeaders: Record<string, string>;
  private timeout: number;
  private maxRetries: number;
  private retryCount = 0;

  constructor(
    oauth2: OAuth2Client | null = null,
    token: string | null = null,
    baseUrl: string | null = null,
    config: SSRequestConfig = {}
  ) {
    this.oauth2 = oauth2;
    this.token = token;
    this.config = { log_enabled: true, ...config };

    this.timeout = Number(config.timeout ?? 30);
    this.maxRetries = Number(config.maxRetries ?? 5);

    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/fhir+json',
      ...(config.headers ?? {}),
    };

    if (baseUrl !== null && baseUrl !== undefined) {
      this.baseUrl = baseUrl.replace(/\/+$/, '');
    } else if (oauth2 !== null && oauth2 !== undefined) {
      this.baseUrl = (oauth2.fhir_url ?? '').replace(/\/+$/, '');
    } else {
      this.baseUrl = '';
    }

    this.http =
      config.http ??
      axios.create({
        timeout: this.timeout * 1000,
        validateStatus: () => true,
      });
  }

  public async get(url: string, params: Record<string, any> = {}): Promise<SSResponse> {
    const fullUrl = this.buildUrl(url, params);
    return this.request('GET', fullUrl);
  }

  public async post(url: string, body: Record<string, any>): Promise<SSResponse> {
    const fullUrl = this.buildUrl(url);
    return this.request('POST', fullUrl, body);
  }

  public async put(url: string, body: Record<string, any>): Promise<SSResponse> {
    const fullUrl = this.buildUrl(url);
    return this.request('PUT', fullUrl, body);
  }

  public async delete(url: string, body: Record<string, any> = {}): Promise<SSResponse> {
    const fullUrl = this.buildUrl(url);
    return this.request('DELETE', fullUrl, body);
  }

  public async patch(url: string, patchPayload: Record<string, any> | Array<Record<string, any>>): Promise<SSResponse> {
    const fullUrl = this.buildUrl(url);
    return this.request('PATCH', fullUrl, patchPayload);
  }

  public async patchFhirPath(url: string, fhirPathPayload: Record<string, any>): Promise<SSResponse> {
    const fullUrl = this.buildUrl(url);
    this.retryCount = 0;
    return this.doRequest('PATCH', fullUrl, fhirPathPayload, 'application/fhir+json');
  }

  public async postBundle(url: string, bundlePayload: Record<string, any>): Promise<SSResponse> {
    return this.post(url, bundlePayload);
  }

  private async getToken(): Promise<string | null> {
    if (this.token !== null) {
      return this.token;
    }

    if (this.oauth2 !== null) {
      return await this.oauth2.token();
    }

    return null;
  }

  private isTokenAutoRefresh(): boolean {
    if (this.oauth2 !== null && typeof this.oauth2.isTokenAutoRefresh === 'function') {
      return this.oauth2.isTokenAutoRefresh();
    }
    return false;
  }

  private async request(
    method: string,
    url: string,
    body: Record<string, any> | Array<Record<string, any>> | null = null
  ): Promise<SSResponse> {
    this.retryCount = 0;
    return this.doRequest(method, url, body);
  }

  private async doRequest(
    method: string,
    url: string,
    body: Record<string, any> | Array<Record<string, any>> | null = null,
    contentType: string | null = null
  ): Promise<SSResponse> {
    const token = await this.getToken();

    const headers: Record<string, string> = { ...this.defaultHeaders };
    if (token !== null) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (method === 'PATCH') {
      headers['Content-Type'] = contentType ?? 'application/json-patch+json';
    } else if (contentType !== null) {
      headers['Content-Type'] = contentType;
    }

    const serializedBody =
      body !== null && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)
        ? JSON.stringify(body)
        : null;

    try {
      const response = await this.executeTransport(method, url, headers, serializedBody);
      if (response.status >= 400) {
        return await this.handleFailure(method, url, response, body, contentType);
      }
      return this.buildResponse(response);
    } catch (err: any) {
      if (err?.response) {
        const resp: SSRequestTransportResponse = {
          status: err.response.status,
          data: err.response.data,
          headers: err.response.headers,
        };
        return await this.handleFailure(method, url, resp, body, contentType);
      }
      const message = err instanceof Error ? err.message : String(err);
      return new SSResponse(
        0,
        { resourceType: 'OperationOutcome', issue: [{ details: { text: message } }] },
        message
      );
    }
  }

  private async executeTransport(
    method: string,
    url: string,
    headers: Record<string, string>,
    body: string | null
  ): Promise<SSRequestTransportResponse> {
    if (this.config.transport) {
      return await this.config.transport(method, url, headers, body);
    }

    const res = await this.http.request({
      method,
      url,
      headers,
      data: body ?? undefined,
    });

    return {
      status: res.status,
      data: res.data,
      headers: res.headers as Record<string, string | undefined>,
    };
  }

  private async handleFailure(
    method: string,
    url: string,
    response: SSRequestTransportResponse,
    body: Record<string, any> | Array<Record<string, any>> | null = null,
    contentType: string | null = null
  ): Promise<SSResponse> {
    const statusCode = response.status;
    const { bodyObj, contentStr } = this.parseResponsePayload(response);

    // 429 — rate limited: read Retry-After header
    if (statusCode === 429) {
      this.retryCount++;

      if (this.retryCount > this.maxRetries) {
        return new SSResponse(statusCode, bodyObj, contentStr);
      }

      const retryAfterHeader = this.getHeaderCaseInsensitive(response.headers, 'Retry-After');
      const sleepSec =
        retryAfterHeader !== '' && !isNaN(parseInt(retryAfterHeader, 10))
          ? parseInt(retryAfterHeader, 10)
          : 2 ** this.retryCount;

      await this.sleep(sleepSec);

      return this.doRequest(method, url, body, contentType);
    }

    // 401 — unauthorized: attempt token refresh
    if (statusCode === 401) {
      if (this.isTokenAutoRefresh() && this.oauth2 !== null) {
        this.retryCount++;

        if (this.retryCount > this.maxRetries) {
          return new SSResponse(statusCode, bodyObj, contentStr);
        }

        if (typeof this.oauth2.refreshToken === 'function') {
          await this.oauth2.refreshToken();
        }
        this.token = null;

        await this.sleep(2 ** this.retryCount);

        return this.doRequest(method, url, body, contentType);
      }

      return new SSResponse(statusCode, bodyObj, contentStr);
    }

    // 5xx — server error: exponential backoff
    if (statusCode >= 500) {
      this.retryCount++;

      if (this.retryCount > this.maxRetries) {
        return new SSResponse(statusCode, bodyObj, contentStr);
      }

      await this.sleep(2 ** this.retryCount);

      return this.doRequest(method, url, body, contentType);
    }

    return new SSResponse(statusCode, bodyObj, contentStr);
  }

  private buildUrl(url: string, params: Record<string, any> = {}): string {
    let full: string;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      full = url;
    } else {
      const trimmedPath = url.replace(/^\/+/, '');
      full = this.baseUrl ? `${this.baseUrl}/${trimmedPath}` : trimmedPath;
    }

    const keys = Object.keys(params).filter((k) => params[k] !== undefined && params[k] !== null);
    if (keys.length === 0) {
      return full;
    }

    const searchParams = new URLSearchParams();
    for (const key of keys) {
      searchParams.append(key, String(params[key]));
    }

    return `${full}${full.includes('?') ? '&' : '?'}${searchParams.toString()}`;
  }

  private buildResponse(response: SSRequestTransportResponse): SSResponse {
    const statusCode = response.status;
    const { bodyObj, contentStr } = this.parseResponsePayload(response);
    return new SSResponse(statusCode, bodyObj, contentStr);
  }

  private parseResponsePayload(response: SSRequestTransportResponse): {
    bodyObj: Record<string, any>;
    contentStr: string;
  } {
    if (typeof response.body === 'string') {
      try {
        const parsed = JSON.parse(response.body);
        return {
          bodyObj: parsed && typeof parsed === 'object' ? parsed : {},
          contentStr: response.body,
        };
      } catch {
        return { bodyObj: {}, contentStr: response.body };
      }
    }

    if (typeof response.data === 'string') {
      try {
        const parsed = JSON.parse(response.data);
        return {
          bodyObj: parsed && typeof parsed === 'object' ? parsed : {},
          contentStr: response.data,
        };
      } catch {
        return { bodyObj: {}, contentStr: response.data };
      }
    }

    if (response.data && typeof response.data === 'object') {
      return {
        bodyObj: response.data,
        contentStr: JSON.stringify(response.data),
      };
    }

    return { bodyObj: {}, contentStr: '' };
  }

  private getHeaderCaseInsensitive(
    headers: Record<string, string | undefined> | undefined,
    name: string
  ): string {
    if (!headers) return '';
    const lower = name.toLowerCase();
    for (const [k, v] of Object.entries(headers)) {
      if (k.toLowerCase() === lower && v !== undefined) {
        return String(v);
      }
    }
    return '';
  }

  private async sleep(seconds: number): Promise<void> {
    if (seconds <= 0) {
      return;
    }

    const cappedSeconds = Math.min(seconds, 60);

    if (this.config.sleepFn) {
      await this.config.sleepFn(cappedSeconds);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, cappedSeconds * 1000));
  }
}
