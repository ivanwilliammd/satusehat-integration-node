/**
 * Immutable result of a queue job processed by Worker.
 */
export class QueueResult {
  public static readonly STATUS_SUCCESS = 'success';
  public static readonly STATUS_FAILED = 'failed';
  public static readonly STATUS_DLQ = 'dlq';

  public readonly id: number;
  public readonly status: string;
  public readonly error: string | null;
  public readonly response: Record<string, any> | null;
  public readonly attempts: number;

  private constructor(
    id: number,
    status: string,
    error: string | null,
    response: Record<string, any> | null,
    attempts: number
  ) {
    this.id = id;
    this.status = status;
    this.error = error;
    this.response = response;
    this.attempts = attempts;
  }

  public static success(id: number, response: Record<string, any> = {}, attempts: number = 1): QueueResult {
    return new QueueResult(id, QueueResult.STATUS_SUCCESS, null, response, attempts);
  }

  public static failed(
    id: number,
    error: string,
    response: Record<string, any> = {},
    attempts: number = 1
  ): QueueResult {
    return new QueueResult(id, QueueResult.STATUS_FAILED, error, response, attempts);
  }

  public static dlq(
    id: number,
    reason: string,
    response: Record<string, any> = {},
    attempts: number = 0
  ): QueueResult {
    return new QueueResult(id, QueueResult.STATUS_DLQ, reason, response, attempts);
  }

  public isSuccess(): boolean {
    return this.status === QueueResult.STATUS_SUCCESS;
  }

  public isFailed(): boolean {
    return this.status === QueueResult.STATUS_FAILED;
  }

  public isDlq(): boolean {
    return this.status === QueueResult.STATUS_DLQ;
  }

  public isRetriable(): boolean {
    return this.isFailed() && this.attempts < 5;
  }
}
