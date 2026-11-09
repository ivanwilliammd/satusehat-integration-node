export const STATUS_PENDING = 'pending';
export const STATUS_PROCESSING = 'processing';
export const STATUS_SUCCESS = 'success';
export const STATUS_FAILED = 'failed';
export const STATUS_DLQ = 'dlq';
export const DEFAULT_MAX_ATTEMPTS = 5;

export interface QueueJobRecord {
  id: number;
  uuid: string;
  bundle_type: string;
  bundle_payload: Record<string, any> | null;
  resource_type: string | null;
  method: string;
  url: string | null;
  status: string;
  attempts: number;
  max_attempts: number;
  last_error: string | null;
  last_response: Record<string, any> | null;
  etag: string | null;
  idempotency_key: string | null;
  scheduled_at: string | null;
  completed_at: string | null;
  dlq_reason: string | null;
  user_id: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface QueueStatusStats {
  pending: number;
  processing: number;
  success: number;
  failed: number;
  dlq: number;
}

/**
 * Framework-agnostic contract for the SATUSEHAT queue.
 * Status flow: pending -> processing -> success | failed (retry) | dlq
 */
export interface QueueInterface {
  enqueueBundle(
    bundlePayload: Record<string, any>,
    bundleType?: string,
    userId?: string,
    maxAttempts?: number,
    metadata?: Record<string, any>
  ): QueueJobRecord;

  enqueue(
    method: string,
    resourceType: string,
    url: string,
    payload?: Record<string, any> | null,
    etag?: string | null,
    idempotencyKey?: string | null,
    userId?: string,
    maxAttempts?: number,
    metadata?: Record<string, any>
  ): QueueJobRecord;

  dequeue(): QueueJobRecord | null;

  markSuccess(id: number, response?: Record<string, any>, location?: string | null): boolean;
  markFailed(id: number, error: string, response?: Record<string, any>): boolean;
  markDlq(id: number, reason: string, response?: Record<string, any>): boolean;
  reset(id: number): boolean;

  get(id: number): QueueJobRecord | null;
  pendingCount(): number;
  dlqCount(): number;
  stats(): QueueStatusStats;
  pendingJobs(limit?: number): QueueJobRecord[];
  dlqJobs(limit?: number): QueueJobRecord[];

  resetAll(): number;
  purgeSuccess(days?: number): number;
}
