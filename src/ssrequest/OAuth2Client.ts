import axios, { AxiosInstance } from 'axios';

export class OAuth2ClientException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OAuth2ClientException';
  }
}

export interface OAuth2ClientConfig {
  env?: 'DEV' | 'STG' | 'PROD' | string;
  baseUrl?: string;
  authEndpoint?: string;
  fhirEndpoint?: string;
  clientId?: string;
  clientSecret?: string;
  organizationId?: string;
  override?: boolean;
  autoRefresh?: boolean;
  tokenTtlSeconds?: number;
  http?: AxiosInstance;
  transport?: (
    method: string,
    url: string,
    headers: Record<string, string>,
    body?: string | URLSearchParams
  ) => Promise<{ status: number; data: any; headers?: Record<string, string> }> | { status: number; data: any; headers?: Record<string, string> };
}

export class OAuth2Client {
  public patient_dev: string[] = [
    'P02478375538',
    'P02428473601',
    'P03647103112',
    'P01058967035',
    'P01836748436',
    'P01654557057',
    'P00805884304',
    'P00883356749',
    'P00912894463',
  ];

  public practitioner_dev: string[] = [
    '10009880728',
    '10006926841',
    '10001354453',
    '10010910332',
    '10018180913',
    '10002074224',
    '10012572188',
    '10018452434',
    '10014058550',
    '10001915884',
  ];

  public base_url: string;
  public auth_url: string;
  public fhir_url: string;
  public client_id: string;
  public client_secret: string;
  public organization_id: string;
  public override: boolean;
  public satusehat_env: string;
  public oauth2_error = {
    statusCode: 401,
    res: 'Unauthorized. Token not found',
  };

  private autoRefresh: boolean;
  private tokenTtlSeconds: number;
  private cachedToken: string | null = null;
  private tokenExpiresAt: number = 0;
  private http: AxiosInstance;
  private transport?: OAuth2ClientConfig['transport'];

  constructor(config: OAuth2ClientConfig = {}) {
    this.override = config.override ?? (process.env.SATUSEHAT_PARAMETER_OVERRIDE === 'true');
    this.autoRefresh = config.autoRefresh ?? true;
    this.tokenTtlSeconds = config.tokenTtlSeconds ?? 50 * 60; // 50 minutes default like PHP
    this.transport = config.transport;

    const envFromProcess = process.env.SATUSEHAT_ENV ?? '';
    this.satusehat_env = config.env ?? (this.override ? (process.env.SATUSEHAT_ENVIRONMENT ?? '') : envFromProcess);

    let baseUrl = config.baseUrl ?? '';
    let clientId = config.clientId ?? '';
    let clientSecret = config.clientSecret ?? '';
    let orgId = config.organizationId ?? '';

    if (this.satusehat_env === 'PROD') {
      baseUrl = baseUrl || process.env.SATUSEHAT_BASE_URL_PROD || 'https://api-satusehat.kemkes.go.id';
      clientId = clientId || process.env.CLIENTID_PROD || '';
      clientSecret = clientSecret || process.env.CLIENTSECRET_PROD || '';
      orgId = orgId || process.env.ORGID_PROD || '';
    } else if (this.satusehat_env === 'STG') {
      baseUrl = baseUrl || process.env.SATUSEHAT_BASE_URL_STG || 'https://api-satusehat-stg.dto.kemkes.go.id';
      clientId = clientId || process.env.CLIENTID_STG || '';
      clientSecret = clientSecret || process.env.CLIENTSECRET_STG || '';
      orgId = orgId || process.env.ORGID_STG || '';
    } else if (this.satusehat_env === 'DEV') {
      baseUrl = baseUrl || process.env.SATUSEHAT_BASE_URL_DEV || 'https://api-satusehat-dev.dto.kemkes.go.id';
      clientId = clientId || process.env.CLIENTID_DEV || '';
      clientSecret = clientSecret || process.env.CLIENTSECRET_DEV || '';
      orgId = orgId || process.env.ORGID_DEV || '';
    }

    if (!this.satusehat_env && !this.override) {
      throw new OAuth2ClientException('SATUSEHAT environment is missing');
    }

    if (!['DEV', 'STG', 'PROD'].includes(this.satusehat_env) && !this.override) {
      throw new OAuth2ClientException(
        `SATUSEHAT environment invalid, supported (DEV, STG, PROD). ${this.satusehat_env} given.`
      );
    }

    if (
      this.satusehat_env === 'DEV' &&
      (!clientId || !clientSecret || !orgId) &&
      !this.override
    ) {
      throw new OAuth2ClientException(
        'SATUSEHAT environment defined as DEV, but CLIENTID_DEV / CLIENTSECRET_DEV / ORGID_DEV not set'
      );
    }

    if (
      this.satusehat_env === 'STG' &&
      (!clientId || !clientSecret || !orgId) &&
      !this.override
    ) {
      throw new OAuth2ClientException(
        'SATUSEHAT environment defined as STG, but CLIENTID_STG / CLIENTSECRET_STG / ORGID_STG not set'
      );
    }

    if (
      this.satusehat_env === 'PROD' &&
      (!clientId || !clientSecret || !orgId) &&
      !this.override
    ) {
      throw new OAuth2ClientException(
        'SATUSEHAT environment defined as PROD, but CLIENTID_PROD / CLIENTSECRET_PROD / ORGID_PROD not set'
      );
    }

    this.base_url = (this.override && !config.baseUrl ? '' : baseUrl).replace(/\/+$/, '');
    this.client_id = clientId;
    this.client_secret = clientSecret;
    this.organization_id = orgId;

    const authEndpoint = config.authEndpoint ?? process.env.SATUSEHAT_AUTH_ENDPOINT ?? '/oauth2/v1';
    const fhirEndpoint = config.fhirEndpoint ?? process.env.SATUSEHAT_FHIR_ENDPOINT ?? '/fhir-r4/v1';

    this.auth_url = `${this.base_url}${authEndpoint}`;
    this.fhir_url = `${this.base_url}${fhirEndpoint}`;

    this.http = config.http ?? axios.create({ timeout: 30000, validateStatus: () => true });
  }

  public isTokenAutoRefresh(): boolean {
    return this.autoRefresh;
  }

  public setCachedToken(token: string | null, ttlSeconds?: number): void {
    this.cachedToken = token;
    this.tokenExpiresAt = token ? Date.now() + (ttlSeconds ?? this.tokenTtlSeconds) * 1000 : 0;
  }

  public getCachedToken(): string | null {
    if (this.cachedToken && Date.now() < this.tokenExpiresAt) {
      return this.cachedToken;
    }
    return null;
  }

  public async token(): Promise<string | null> {
    if (this.cachedToken && Date.now() < this.tokenExpiresAt) {
      return this.cachedToken;
    }

    const url = `${this.auth_url}/accesstoken?grant_type=client_credentials`;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const formParams = new URLSearchParams({
      client_id: this.client_id,
      client_secret: this.client_secret,
    });

    try {
      const res = await this.sendHttp('POST', url, headers, formParams);
      const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

      if (res.status >= 200 && res.status < 300 && data?.access_token) {
        this.cachedToken = String(data.access_token);
        const ttl = data.expires_in ? Math.min(Number(data.expires_in) - 60, this.tokenTtlSeconds) : this.tokenTtlSeconds;
        this.tokenExpiresAt = Date.now() + Math.max(1, ttl) * 1000;
        return this.cachedToken;
      }

      return null;
    } catch {
      return null;
    }
  }

  public async refreshToken(): Promise<string | null> {
    this.cachedToken = null;
    this.tokenExpiresAt = 0;
    return this.token();
  }

  public respondError(message: { statusCode: number; res: string } = this.oauth2_error): [number, any] {
    return [message.statusCode, message.res];
  }

  public async getById(resource: string, id: string): Promise<[number, any]> {
    const accessToken = await this.token();
    if (!accessToken) {
      return this.respondError(this.oauth2_error);
    }

    const url = `${this.fhir_url}/${resource}/${id}`;
    const headers = { Authorization: `Bearer ${accessToken}` };

    try {
      const res = await this.sendHttp('GET', url, headers);
      const parsed = typeof res.data === 'string' && res.data ? JSON.parse(res.data) : res.data;
      return [res.status, parsed];
    } catch (err: any) {
      const status = err?.response?.status ?? 500;
      const data = err?.response?.data ?? { message: err?.message };
      return [status, data];
    }
  }

  public async get_by_id(resource: string, id: string): Promise<[number, any]> {
    return this.getById(resource, id);
  }

  public async getByNik(resource: string, nik: string): Promise<[number, any]> {
    const accessToken = await this.token();
    if (!accessToken) {
      return this.respondError(this.oauth2_error);
    }

    const url = `${this.fhir_url}/${resource}?identifier=https://fhir.kemkes.go.id/id/nik|${nik}`;
    const headers = { Authorization: `Bearer ${accessToken}` };

    try {
      const res = await this.sendHttp('GET', url, headers);
      const parsed = typeof res.data === 'string' && res.data ? JSON.parse(res.data) : res.data;
      return [res.status, parsed];
    } catch (err: any) {
      const status = err?.response?.status ?? 500;
      const data = err?.response?.data ?? { message: err?.message };
      return [status, data];
    }
  }

  public async get_by_nik(resource: string, nik: string): Promise<[number, any]> {
    return this.getByNik(resource, nik);
  }

  public async kfaGet(resource: string, queryString: string): Promise<[number, any]> {
    const accessToken = await this.token();
    if (!accessToken) {
      return this.respondError(this.oauth2_error);
    }

    const url = `${this.base_url}/kfa-v2/${resource}${queryString}`;
    const headers = { Authorization: `Bearer ${accessToken}` };

    try {
      const res = await this.sendHttp('GET', url, headers);
      const parsed = typeof res.data === 'string' && res.data ? JSON.parse(res.data) : res.data;
      return [res.status, parsed];
    } catch (err: any) {
      const status = err?.response?.status ?? 500;
      const data = err?.response?.data ?? { message: err?.message };
      return [status, data];
    }
  }

  public async ss_kfa_get(resource: string, queryString: string): Promise<[number, any]> {
    return this.kfaGet(resource, queryString);
  }

  public async post(resource: string, body: string | Record<string, any>): Promise<[number, any]> {
    const accessToken = await this.token();
    if (!accessToken) {
      return this.respondError(this.oauth2_error);
    }

    const url = `${this.fhir_url}${resource === 'Bundle' ? '' : '/' + resource}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const payloadStr = typeof body === 'string' ? body : JSON.stringify(body);

    try {
      const res = await this.sendHttp('POST', url, headers, payloadStr);
      const parsed = typeof res.data === 'string' && res.data ? JSON.parse(res.data) : res.data;
      return [res.status, parsed];
    } catch (err: any) {
      const status = err?.response?.status ?? 500;
      const data = err?.response?.data ?? { message: err?.message };
      return [status, data];
    }
  }

  public async ss_post(resource: string, body: string | Record<string, any>): Promise<[number, any]> {
    return this.post(resource, body);
  }

  public async put(resource: string, id: string, body: string | Record<string, any>): Promise<[number, any]> {
    const accessToken = await this.token();
    if (!accessToken) {
      return this.respondError(this.oauth2_error);
    }

    const url = `${this.fhir_url}/${resource}/${id}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const payloadStr = typeof body === 'string' ? body : JSON.stringify(body);

    try {
      const res = await this.sendHttp('PUT', url, headers, payloadStr);
      const parsed = typeof res.data === 'string' && res.data ? JSON.parse(res.data) : res.data;
      return [res.status, parsed];
    } catch (err: any) {
      const status = err?.response?.status ?? 500;
      const data = err?.response?.data ?? { message: err?.message };
      return [status, data];
    }
  }

  public async ss_put(resource: string, id: string, body: string | Record<string, any>): Promise<[number, any]> {
    return this.put(resource, id, body);
  }

  private async sendHttp(
    method: string,
    url: string,
    headers: Record<string, string>,
    body?: string | URLSearchParams
  ): Promise<{ status: number; data: any; headers?: Record<string, string> }> {
    if (this.transport) {
      return await this.transport(method, url, headers, body);
    }

    const response = await this.http.request({
      method,
      url,
      headers,
      data: body,
    });

    return {
      status: response.status,
      data: response.data,
      headers: response.headers as Record<string, string>,
    };
  }
}
