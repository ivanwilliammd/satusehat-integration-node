import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * TerminologyClient — HTTP client mandiri untuk SmarTerm (terminology.ivanmd.id).
 *
 * ⚠️ TERPISAH dari ekosistem SATUSEHAT: jangan reuse OAuth2Client SATUSEHAT.
 * SmarTerm punya auth sendiri, dual-mode:
 *
 *   1. Sanctum Personal Access Token (PAT) — token statis, header `Bearer`.
 *      Env: TERMINOLOGY_API_TOKEN (atau argumen token).
 *   2. OIDC client_credentials ke auth.ivanmd.id (Passport) — client fetch JWT
 *      sendiri, cache sampai expire, auto-refresh saat 401.
 *      Env: TERMINOLOGY_CLIENT_ID / TERMINOLOGY_CLIENT_SECRET /
 *           TERMINOLOGY_TOKEN_URL (default https://auth.ivanmd.id/oauth/token)
 *
 * Jika keduanya diberikan, PAT menang (lebih sederhana). OIDC dipakai saat
 * token kosong dan kredensial client tersedia.
 *
 * Fluent chaining:
 *   const term = new TerminologyClient();
 *   await term.query('pemasangan kateter').on('kptl').limit(10).get();
 *   await term.query('paracetamol').all().first();
 */
export interface TerminologyClientConfig {
  baseUrl?: string;
  token?: string;
  clientId?: string;
  clientSecret?: string;
  tokenUrl?: string;
  timeout?: number;
}

export type TerminologySystem = 'icd10' | 'icd9cm' | 'snomed' | 'loinc' | 'kfa' | 'kfa_alkes' | 'kfa_bza' | 'kptl';

export type TerminologyEnvelope = Record<string, unknown>;

const DEFAULT_BASE_URL = 'https://terminology.ivanmd.id';
const DEFAULT_TOKEN_URL = 'https://auth.ivanmd.id/oauth/token';

export class TerminologyClient {
  readonly baseUrl: string;
  readonly token?: string;
  readonly clientId: string;
  readonly clientSecret: string;
  readonly tokenUrl: string;
  readonly timeout: number;

  /** OIDC cached token. */
  private oidcToken?: string;
  private oidcExpiresAt = 0;

  private readonly http: AxiosInstance;

  constructor(config: TerminologyClientConfig = {}) {
    this.baseUrl = (config.baseUrl ?? process.env.TERMINOLOGY_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/+$/, '');
    this.token = config.token ?? process.env.TERMINOLOGY_API_TOKEN ?? undefined;
    this.clientId = config.clientId ?? process.env.TERMINOLOGY_CLIENT_ID ?? '';
    this.clientSecret = config.clientSecret ?? process.env.TERMINOLOGY_CLIENT_SECRET ?? '';
    this.tokenUrl = config.tokenUrl ?? process.env.TERMINOLOGY_TOKEN_URL ?? DEFAULT_TOKEN_URL;
    this.timeout = config.timeout ?? 30;

    this.http = axios.create({
      baseURL: `${this.baseUrl}/`,
      timeout: this.timeout * 1000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'satusehat-integration/terminology-client',
      },
    });
  }

  /** Fluent query builder — entry: query('istilah').on('kfa').limit(5).get() */
  query(text: string): TerminologyQueryBuilder {
    return new TerminologyQueryBuilder(this, text);
  }

  /** Raw HTTP helper — auto auth header; OIDC refresh-once on 401. Throws Error on HTTP >= 400. */
  async request(method: string, path: string, query: Record<string, unknown> = {}, body?: Record<string, unknown> | null): Promise<TerminologyEnvelope> {
    const options: AxiosRequestConfig = {};
    if (Object.keys(query).length > 0) {
      options.params = query;
    }
    if (body !== undefined && body !== null) {
      options.data = body;
    }

    const token = await this.resolveToken();
    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }

    let res = await this.http.request<TerminologyEnvelope>({ method, url: path, ...options });

    // OIDC mode: token expire → refresh sekali lalu retry.
    if (res.status === 401 && !this.token && this.clientId) {
      this.oidcToken = undefined;
      this.oidcExpiresAt = 0;
      const fresh = await this.fetchOidcToken();
      if (fresh) {
        res = await this.http.request<TerminologyEnvelope>({
          method,
          url: path,
          ...options,
          headers: { ...options.headers, Authorization: `Bearer ${fresh}` },
        });
      }
    }

    if (res.status >= 400) {
      throw new Error(`TerminologyClient HTTP ${res.status}`);
    }
    return res.data ?? {};
  }

  /** GET /api/v1/terminology/search?q=&category=&limit= */
  async search(query: string, category = 'all', limit = 20): Promise<TerminologyEnvelope> {
    return this.request('GET', 'api/v1/terminology/search', { q: query, category, limit: this.clampLimit(limit) });
  }

  /** GET /api/v1/terminology/{system}/search?q= — system: icd10|icd9cm|snomed|loinc|kfa|kfa_alkes|kfa_bza|kptl */
  async searchSystem(system: TerminologySystem, query: string, limit = 20): Promise<TerminologyEnvelope> {
    return this.request('GET', `api/v1/terminology/${system}/search`, { q: query, limit: this.clampLimit(limit) });
  }

  /** GET /api/v1/terminology/kptl/combine?base_code=&modifiers= — multi-layer KPTL */
  async kptlCombine(baseCode: string, modifiers: string[] = []): Promise<TerminologyEnvelope> {
    return this.request('GET', 'api/v1/terminology/kptl/combine', { base_code: baseCode, modifiers: modifiers.join(',') });
  }

  /** GET /api/v1/terminology/mapping?source=&target=&code= — cross-terminology mapping */
  async map(source: string, target: string, code: string): Promise<TerminologyEnvelope> {
    return this.request('GET', 'api/v1/terminology/mapping', { source, target, code });
  }

  /** POST /api/v1/terminology/validate — { system, code } */
  async validate(system: string, code: string): Promise<TerminologyEnvelope> {
    return this.request('POST', 'api/v1/terminology/validate', {}, { system, code });
  }

  /** POST /api/v1/terminology/auto-map — { source_system, source_code } → SNOMED */
  async autoMap(sourceSystem: string, sourceCode: string): Promise<TerminologyEnvelope> {
    return this.request('POST', 'api/v1/terminology/auto-map', {}, { source_system: sourceSystem, source_code: sourceCode });
  }

  // ─── Context-aware FHIR resolution ────────────────────────────────────────

  async resolveCondition(code: string, systemHint?: string | null, category = 'encounter-diagnosis'): Promise<TerminologyEnvelope> {
    return this.resolve('condition', { code, system_hint: systemHint, category });
  }

  async resolveChiefComplaint(code: string): Promise<TerminologyEnvelope> {
    return this.resolve('chief-complaint', { code });
  }

  async resolveObservation(code: string, systemHint?: string | null): Promise<TerminologyEnvelope> {
    return this.resolve('observation', { code, system_hint: systemHint });
  }

  async resolveMedication(code: string): Promise<TerminologyEnvelope> {
    return this.resolve('medication', { code });
  }

  async resolveServiceRequest(code: string, category = 'lab'): Promise<TerminologyEnvelope> {
    return this.resolve('service-request', { code, category });
  }

  // ─── Value sets ───────────────────────────────────────────────────────────

  /** GET /api/value-sets */
  async valueSets(): Promise<TerminologyEnvelope> {
    return this.request('GET', 'api/value-sets');
  }

  /** GET /api/value-sets/{bundleId} */
  async valueSet(bundleId: string): Promise<TerminologyEnvelope> {
    return this.request('GET', `api/value-sets/${encodeURIComponent(bundleId)}`);
  }

  // ─── Internals ────────────────────────────────────────────────────────────

  /** Static PAT menang; kalau kosong dan ada OIDC creds → lazy fetch + cache. */
  private async resolveToken(): Promise<string | null> {
    if (this.token) {
      return this.token;
    }
    if (!this.clientId) {
      return null;
    }
    if (this.oidcToken && Math.floor(Date.now() / 1000) < this.oidcExpiresAt - 30) {
      return this.oidcToken;
    }
    if (!this.oidcToken) {
      this.oidcToken = (await this.fetchOidcToken()) ?? undefined;
    }
    return this.oidcToken ?? null;
  }

  /** POST {tokenUrl} grant_type=client_credentials → access_token. */
  private async fetchOidcToken(): Promise<string | null> {
    let data: TerminologyEnvelope;
    try {
      const res = await axios.post<{ access_token?: unknown; expires_in?: unknown }>(this.tokenUrl, new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
      if (res.status >= 400) {
        return null;
      }
      data = res.data as TerminologyEnvelope;
    } catch {
      return null;
    }
    const accessToken = data.access_token;
    if (typeof accessToken !== 'string' || accessToken === '') {
      return null;
    }
    const expiresIn = typeof data.expires_in === 'number' ? data.expires_in : 3600;
    this.oidcToken = accessToken;
    this.oidcExpiresAt = Math.floor(Date.now() / 1000) + expiresIn;
    return accessToken;
  }

  private async resolve(kind: string, payload: Record<string, unknown>): Promise<TerminologyEnvelope> {
    const clean: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(payload)) {
      if (value !== undefined && value !== null) {
        clean[key] = value;
      }
    }
    return this.request('POST', `api/v1/terminology/resolve/${kind}`, {}, clean);
  }

  private clampLimit(limit: number): number {
    return Math.max(1, Math.min(limit, 100));
  }
}

/**
 * Fluent query builder untuk SmarTerm — pencarian berantai ke terminology.ivanmd.id.
 *
 *   const term = new TerminologyClient();
 *   await term.query('pemasangan kateter').on('kptl').limit(10).get();
 *   await term.query('demam').category('diagnosis').first();
 *   await term.query('paracetamol').on('kfa').all();
 *   await term.query('93004944').asCode().get();
 */
export class TerminologyQueryBuilder {
  private client: TerminologyClient;
  private text: string;

  /** null = unified search (/search); string = per-system. */
  private system: TerminologySystem | null = null;
  private categoryValue = 'all';
  private limitValue = 20;
  private asCodeFlag = false;

  constructor(client: TerminologyClient, text: string) {
    this.client = client;
    this.text = text;
  }

  /** Scope ke satu sistem: icd10|icd9cm|snomed|loinc|kfa|kfa_alkes|kfa_bza|kptl */
  on(system: TerminologySystem): this {
    this.system = system;
    return this;
  }

  /** Unified search category: all|diagnosis|procedure|medication|lab|imaging|... */
  category(category: string): this {
    this.categoryValue = category;
    return this;
  }

  limit(limit: number): this {
    this.limitValue = Math.max(1, Math.min(limit, 100));
    return this;
  }

  /** Treat text as exact code → validate (POST /validate). */
  asCode(): this {
    this.asCodeFlag = true;
    return this;
  }

  /** Alias dari limit(1). */
  first(): this {
    return this.limit(1);
  }

  /** Maksimal 100 hasil. */
  all(): this {
    return this.limit(100);
  }

  /** Eksekusi — search (GET) atau validate (POST). Returns envelope. */
  async get(): Promise<TerminologyEnvelope> {
    if (this.asCodeFlag) {
      // text = code; butuh system tujuan utk validate. Kalau belum di-scope,
      // coba tebak: kode numerik 93xxxxxx→kfa, 83xxxxxx→kfa_alkes, 91xxxxxx→kfa_bza.
      const system = this.system ?? guessSystemFromCode(this.text);
      return this.client.validate(system, this.text);
    }

    if (this.system !== null) {
      return this.client.searchSystem(this.system, this.text, this.limitValue);
    }

    return this.client.search(this.text, this.categoryValue, this.limitValue);
  }
}

/** Tebak sistem terminologi dari prefix kode. */
export function guessSystemFromCode(code: string): TerminologySystem {
  if (/^93\d+$/.test(code)) {
    return 'kfa';
  }
  if (/^83\d+$/.test(code)) {
    return 'kfa_alkes';
  }
  if (/^91\d+$/.test(code)) {
    return 'kfa_bza';
  }
  if (/^\d{5,7}$/.test(code)) {
    return 'snomed';
  }
  if (/^\d+(\.\d+)?$/.test(code)) {
    return 'icd9cm';
  }
  if (/^[A-Z]\d{2}(\.\d+)?$/.test(code)) {
    return 'icd10';
  }
  if (code.includes('-')) {
    return 'loinc';
  }
  return 'snomed';
}
