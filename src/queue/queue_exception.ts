/**
 * Thrown by queue operations on unrecoverable errors.
 */
export class QueueException extends Error {
  public static readonly E_CONNECTION = 1;
  public static readonly E_ENQUEUE = 2;
  public static readonly E_DEQUEUE = 3;
  public static readonly E_UPDATE = 4;

  public readonly code: number;
  public readonly cause?: unknown;

  constructor(message: string, code: number = 0, cause?: unknown) {
    super(message);
    this.name = 'QueueException';
    this.code = code;
    this.cause = cause;
  }

  public static connection(msg: string, prev?: unknown): QueueException {
    return new QueueException(`Queue connection error: ${msg}`, QueueException.E_CONNECTION, prev);
  }

  public static enqueue(msg: string, prev?: unknown): QueueException {
    return new QueueException(`Failed to enqueue: ${msg}`, QueueException.E_ENQUEUE, prev);
  }

  public static dequeue(msg: string, prev?: unknown): QueueException {
    return new QueueException(`Failed to dequeue: ${msg}`, QueueException.E_DEQUEUE, prev);
  }

  public static update(msg: string, prev?: unknown): QueueException {
    return new QueueException(`Failed to update job: ${msg}`, QueueException.E_UPDATE, prev);
  }
}
