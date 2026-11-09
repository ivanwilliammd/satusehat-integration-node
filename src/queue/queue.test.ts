import { describe, expect, it } from 'vitest';
import {
  ErrorClassifier,
  QueueException,
  QueueMonitor,
  QueueResult,
  RateLimiter,
  SqliteQueue,
  Worker,
  classifyError,
} from './index';

describe('ErrorClassifier & RateLimiter & QueueResult', () => {
  it('classifies HTTP status codes into proper categories', () => {
    expect(ErrorClassifier.classify(200).category).toBe(ErrorClassifier.CAT_SUCCESS);
    expect(ErrorClassifier.classify(400).category).toBe(ErrorClassifier.CAT_INVALID_REQUEST);
    expect(ErrorClassifier.classify(401).retryable).toBe(true);
    expect(ErrorClassifier.classify(403).retryable).toBe(false);
    expect(ErrorClassifier.classify(404).category).toBe(ErrorClassifier.CAT_NOT_FOUND);
    expect(ErrorClassifier.classify(408).retryable).toBe(true);
    expect(ErrorClassifier.classify(409).category).toBe(ErrorClassifier.CAT_CONFLICT);
    expect(ErrorClassifier.classify(412).category).toBe(ErrorClassifier.CAT_CONFLICT);
    expect(
      ErrorClassifier.classify(422, {
        issue: [{ severity: 'error', diagnostics: 'Invalid code' }],
      }).detail
    ).toContain('[ERROR] Invalid code');
    expect(ErrorClassifier.classify(429).category).toBe(ErrorClassifier.CAT_RATE_LIMITED);
    expect(ErrorClassifier.classify(502).category).toBe(ErrorClassifier.CAT_SERVER_ERROR);
    expect(classifyError(201).status).toBe('success');
  });

  it('parses Retry-After headers', () => {
    expect(RateLimiter.parseRetryAfter(null)).toBeNull();
    expect(RateLimiter.parseRetryAfter('15')).toBe(15);
    const futureDate = new Date(Date.now() + 10000).toUTCString();
    const parsed = RateLimiter.parseRetryAfter(futureDate);
    expect(parsed).not.toBeNull();
    expect(parsed!).toBeGreaterThanOrEqual(5);
  });

  it('constructs immutable QueueResult instances', () => {
    const s = QueueResult.success(1, { id: 'P1' }, 1);
    expect(s.isSuccess()).toBe(true);
    expect(s.isFailed()).toBe(false);

    const f = QueueResult.failed(2, 'Server error', {}, 2);
    expect(f.isFailed()).toBe(true);
    expect(f.isRetriable()).toBe(true);

    const d = QueueResult.dlq(3, 'Validation failed', {}, 1);
    expect(d.isDlq()).toBe(true);
    expect(d.isRetriable()).toBe(false);
  });

  it('creates QueueException with proper codes', () => {
    expect(QueueException.connection('db err').code).toBe(QueueException.E_CONNECTION);
    expect(QueueException.enqueue('enq err').code).toBe(QueueException.E_ENQUEUE);
    expect(QueueException.dequeue('deq err').code).toBe(QueueException.E_DEQUEUE);
    expect(QueueException.update('upd err').code).toBe(QueueException.E_UPDATE);
  });
});

describe('SqliteQueue, QueueMonitor & Worker', () => {
  it('enqueues, dequeues, updates status, and computes monitor stats', () => {
    const queue = new SqliteQueue(':memory:');

    const job1 = queue.enqueue('POST', 'Patient', 'Patient', { resourceType: 'Patient' });
    const job2 = queue.enqueueBundle({ resourceType: 'Bundle', type: 'transaction' });

    expect(queue.pendingCount()).toBe(2);
    expect(queue.pendingJobs().length).toBe(2);

    const claimed1 = queue.dequeue();
    expect(claimed1?.id).toBe(job1.id);
    expect(claimed1?.status).toBe('processing');
    expect(claimed1?.attempts).toBe(1);

    queue.markSuccess(job1.id, { id: 'pat-1' }, 'Patient/pat-1');
    expect(queue.get(job1.id)?.status).toBe('success');

    const claimed2 = queue.dequeue();
    expect(claimed2?.id).toBe(job2.id);
    queue.markDlq(job2.id, 'Invalid bundle entry');
    expect(queue.dlqCount()).toBe(1);
    expect(queue.dlqJobs().length).toBe(1);

    const monitor = new QueueMonitor(queue);
    const summary = monitor.summary();
    expect(summary.total).toBe(2);
    expect(summary.success).toBe(1);
    expect(summary.dlq).toBe(1);
    expect(summary.success_rate).toBe(50);

    const health = monitor.healthCheck();
    expect(health.status).toBe('critical');
    expect(monitor.topErrors().length).toBe(1);

    expect(queue.resetAll()).toBe(1);
    expect(queue.dlqCount()).toBe(0);
    expect(queue.pendingCount()).toBe(1);

    queue.close();
  });

  it('processes jobs end-to-end with Worker', async () => {
    const queue = new SqliteQueue(':memory:');
    queue.enqueue('POST', 'Observation', 'Observation', { resourceType: 'Observation' });
    queue.enqueue('POST', 'Condition', 'Condition', { resourceType: 'Condition' });

    const worker = new Worker(
      queue,
      {
        client_id: 'cid',
        client_secret: 'csec',
        base_url: 'https://example.com',
        fhir_url: 'https://example.com/fhir-r4/v1',
        tokenFetcher: () => ({ access_token: 'worker-tok', expires_in: 3600 }),
        transport: (job) => {
          if (job.resource_type === 'Observation') {
            return {
              http_code: 201,
              body: JSON.stringify({ resource: { resourceType: 'Observation', id: 'obs-1' } }),
              location: 'Observation/obs-1',
              retry_after: null,
              response: { id: 'obs-1' },
            };
          }
          return {
            http_code: 422,
            body: JSON.stringify({
              resourceType: 'OperationOutcome',
              issue: [{ severity: 'error', diagnostics: 'Invalid ICD-10 code' }],
            }),
            location: '',
            retry_after: null,
            response: null,
          };
        },
      },
      new RateLimiter(60000)
    );

    const result = await worker.process(10);
    expect(result).toEqual({
      processed: 2,
      succeeded: 1,
      failed: 0,
      dlq: 1,
    });

    queue.close();
  });
});
