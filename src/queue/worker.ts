import axios from 'axios';
import { ErrorClassifier } from './error_classifier';
import { QueueInterface, QueueJobRecord } from './queue_interface';
import { QueueResult } from './queue_result';
import { RateLimiter } from './rate_limiter';
import { SqliteQueue } from './sqlite_queue';

export interface WorkerSendResponse {
  body: string;
  http_code: number;
  location: string;
  retry_after: string | null;
  response: Record<string, any> | null;
}

export interface WorkerOAuth2Config {
  client_id: string;
  client_secret: string;
  base_url: string;
  fhir_url: string;
  transport?: (job: QueueJobRecord, token: string) => Promise<WorkerSendResponse> | WorkerSendResponse;
  tokenFetcher?: () => Promise<{ access_token: string; expires_in?: number }> | { access_token: string; expires_in?: number };
}

export interface WorkerProcessSummary {
  processed: number;
  succeeded: number;
  failed: number;
  dlq: number;
}

/**
 * Queue worker — processes pending jobs using an HTTP client.
 */
export class Worker {
  private queue: QueueInterface;
  private oauth2Config: WorkerOAuth2Config;
  private tokenCache: { access_token: string; expires_at: number } | null = null;
  private processed = 0;
  private succeeded = 0;
  private failed = 0;
  private dlq = 0;
  private rateLimiter: RateLimiter;

  constructor(
    queue: QueueInterface,
    oauth2Config: WorkerOAuth2Config,
    rateLimiter: RateLimiter | null = null
  ) {
    this.queue = queue;
    this.oauth2Config = oauth2Config;
    this.rateLimiter = rateLimiter ?? new RateLimiter(300);
  }

  /**
   * Process up to limit pending jobs.
   */
  public async process(limit: number = 50): Promise<WorkerProcessSummary> {
    this.processed = 0;
    this.succeeded = 0;
    this.failed = 0;
    this.dlq = 0;

    for (let i = 0; i < limit; i++) {
      const job = this.queue.dequeue();
      if (job === null) {
        break;
      }

      const result = await this.handleJob(job);
      this.processed++;

      if (result.isSuccess()) {
        this.succeeded++;
      } else if (result.isDlq()) {
        this.dlq++;
      } else {
        this.failed++;
      }
    }

    return {
      processed: this.processed,
      succeeded: this.succeeded,
      failed: this.failed,
      dlq: this.dlq,
    };
  }

  /**
   * Handle a single job end-to-end.
   */
  public async handleJob(job: QueueJobRecord): Promise<QueueResult> {
    try {
      await this.rateLimiter.wait();
      const response = await this.send(job);
      const httpCode = response.http_code ?? 0;
      const body = response.body ?? '';
      const location = response.location ?? '';

      let parsed: unknown = body;
      if (typeof body === 'string' && body !== '') {
        try {
          parsed = JSON.parse(body);
        } catch {
          parsed = body;
        }
      }

      const classified = ErrorClassifier.classify(httpCode, parsed);

      // 2xx -> success
      if (classified.category === ErrorClassifier.CAT_SUCCESS) {
        this.queue.markSuccess(job.id, response, location);
        return QueueResult.success(job.id, response, job.attempts);
      }

      // 401 -> token likely expired — invalidate + let markFailed requeue
      if (classified.category === ErrorClassifier.CAT_UNAUTHORIZED) {
        this.tokenCache = null;
      }

      // 429 with Retry-After -> honor it before requeue
      if (classified.category === ErrorClassifier.CAT_RATE_LIMITED) {
        const retryAfter = RateLimiter.parseRetryAfter(response.retry_after ?? null);
        if (retryAfter !== null && retryAfter > 0) {
          this.queue.markFailed(job.id, classified.detail, response);
          if (this.queue instanceof SqliteQueue) {
            const db = this.queue.db();
            const stmt = db.prepare(`
              UPDATE satusehat_queue
              SET scheduled_at = datetime('now', @sec || ' seconds'),
                  updated_at = datetime('now')
              WHERE id = @id AND status = 'pending'
            `);
            stmt.run({ sec: String(Math.floor(retryAfter)), id: job.id });
          }
          return QueueResult.failed(job.id, classified.detail, response, job.attempts);
        }
      }

      // Non-retryable -> DLQ
      if (!classified.retryable) {
        this.queue.markDlq(job.id, classified.detail, response);
        return QueueResult.dlq(job.id, classified.detail, response, job.attempts);
      }

      // Retryable -> failed (SqliteQueue handles backoff scheduling)
      this.queue.markFailed(job.id, classified.detail, response);
      return QueueResult.failed(job.id, classified.detail, response, job.attempts);
    } catch (err: any) {
      const msg = err?.message ?? String(err);
      this.queue.markFailed(job.id, msg, {});
      return QueueResult.failed(job.id, msg, {}, job.attempts);
    }
  }

  private async send(job: QueueJobRecord): Promise<WorkerSendResponse> {
    const token = await this.getToken();

    if (this.oauth2Config.transport) {
      return await this.oauth2Config.transport(job, token);
    }

    const method = (job.method ?? 'POST').toUpperCase();
    const baseUrl = (this.oauth2Config.fhir_url ?? '').replace(/\/+$/, '');
    const jobUrl = (job.url ?? '').replace(/^\/+/, '');
    const url = `${baseUrl}/${jobUrl}`;
    const payload = job.bundle_payload ?? null;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json',
    };

    if (method === 'POST' && job.idempotency_key) {
      headers['If-None-Exist'] = `uuid=${job.idempotency_key}`;
    }
    if ((method === 'PUT' || method === 'PATCH') && job.etag) {
      headers['If-Match'] = job.etag;
    }

    const res = await axios.request({
      method,
      url,
      headers,
      data:
        payload !== null && ['POST', 'PUT', 'PATCH'].includes(method)
          ? JSON.stringify(payload)
          : undefined,
      timeout: 30000,
      validateStatus: () => true,
    });

    const bodyStr =
      typeof res.data === 'string'
        ? res.data
        : res.data !== undefined && res.data !== null
          ? JSON.stringify(res.data)
          : '';
    const parsedObj =
      typeof res.data === 'object' && res.data !== null
        ? res.data
        : bodyStr !== ''
          ? (() => {
              try {
                return JSON.parse(bodyStr);
              } catch {
                return null;
              }
            })()
          : null;

    let retryAfter: string | null = null;
    if (res.headers) {
      for (const [k, v] of Object.entries(res.headers)) {
        if (k.toLowerCase() === 'retry-after' && v !== undefined) {
          retryAfter = String(v);
          break;
        }
      }
    }

    const location = this.extractLocation(parsedObj);

    return {
      body: bodyStr,
      http_code: res.status,
      location,
      retry_after: retryAfter,
      response: parsedObj,
    };
  }

  private async getToken(): Promise<string> {
    const nowSec = Math.floor(Date.now() / 1000);
    if (this.tokenCache && nowSec < this.tokenCache.expires_at - 60) {
      return this.tokenCache.access_token;
    }

    this.tokenCache = await this.fetchToken();
    return this.tokenCache.access_token;
  }

  private async fetchToken(): Promise<{ access_token: string; expires_at: number }> {
    if (this.oauth2Config.tokenFetcher) {
      const data = await this.oauth2Config.tokenFetcher();
      if (!data || !data.access_token) {
        throw new Error('Invalid OAuth2 token response');
      }
      return {
        access_token: data.access_token,
        expires_at: Math.floor(Date.now() / 1000) + Number(data.expires_in ?? 3600),
      };
    }

    const tokenUrl = `${(this.oauth2Config.base_url ?? '').replace(/\/+$/, '')}/oauth2/v1/accesstoken`;
    const res = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.oauth2Config.client_id,
        client_secret: this.oauth2Config.client_secret,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: 15000,
        validateStatus: () => true,
      }
    );

    if (res.status !== 200 || !res.data) {
      throw new Error(`OAuth2 token fetch failed (HTTP ${res.status})`);
    }

    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
    if (!data || !data.access_token) {
      throw new Error('Invalid OAuth2 token response');
    }

    return {
      access_token: String(data.access_token),
      expires_at: Math.floor(Date.now() / 1000) + Number(data.expires_in ?? 3600),
    };
  }

  private extractLocation(data: Record<string, any> | null): string {
    if (!data || typeof data !== 'object') {
      return '';
    }
    if (data.fullUrl) {
      return String(data.fullUrl);
    }
    if (data.resource?.id) {
      return `${data.resource.resourceType ?? ''}/${data.resource.id}`;
    }
    return '';
  }
}
