import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import { QueueException } from './queue_exception';
import {
  DEFAULT_MAX_ATTEMPTS,
  QueueInterface,
  QueueJobRecord,
  QueueStatusStats,
  STATUS_DLQ,
  STATUS_FAILED,
  STATUS_PENDING,
  STATUS_PROCESSING,
  STATUS_SUCCESS,
} from './queue_interface';

/**
 * Standalone SQLite queue backed by better-sqlite3.
 */
export class SqliteQueue implements QueueInterface {
  public static readonly STATUS_PENDING = STATUS_PENDING;
  public static readonly STATUS_PROCESSING = STATUS_PROCESSING;
  public static readonly STATUS_SUCCESS = STATUS_SUCCESS;
  public static readonly STATUS_FAILED = STATUS_FAILED;
  public static readonly STATUS_DLQ = STATUS_DLQ;
  public static readonly DEFAULT_MAX_ATTEMPTS = DEFAULT_MAX_ATTEMPTS;

  private database: Database.Database;

  constructor(dbOrPath: string | Database.Database = ':memory:') {
    try {
      this.database = typeof dbOrPath === 'string' ? new Database(dbOrPath) : dbOrPath;
      this.ensureTable();
    } catch (err: any) {
      throw QueueException.connection(err?.message ?? String(err), err);
    }
  }

  private ensureTable(): void {
    const sql = `
      CREATE TABLE IF NOT EXISTS satusehat_queue (
        id                  INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid                TEXT    UNIQUE NOT NULL,
        bundle_type         TEXT    DEFAULT 'single',
        bundle_payload      TEXT,
        resource_type       TEXT,
        method              TEXT    NOT NULL DEFAULT 'POST',
        url                 TEXT,
        status              TEXT    NOT NULL DEFAULT 'pending',
        attempts            INTEGER NOT NULL DEFAULT 0,
        max_attempts        INTEGER NOT NULL DEFAULT 5,
        last_error          TEXT,
        last_response       TEXT,
        etag                TEXT,
        idempotency_key     TEXT,
        scheduled_at        TEXT,
        completed_at        TEXT,
        dlq_reason          TEXT,
        user_id             TEXT,
        metadata            TEXT,
        created_at          TEXT    NOT NULL DEFAULT (datetime('now')),
        updated_at          TEXT    NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_queue_status ON satusehat_queue(status);
      CREATE INDEX IF NOT EXISTS idx_queue_scheduled ON satusehat_queue(scheduled_at);
      CREATE INDEX IF NOT EXISTS idx_queue_uuid ON satusehat_queue(uuid);
    `;
    this.database.exec(sql);
  }

  public enqueueBundle(
    bundlePayload: Record<string, any>,
    bundleType: string = 'transaction',
    userId: string = 'system',
    maxAttempts: number = DEFAULT_MAX_ATTEMPTS,
    metadata: Record<string, any> = {}
  ): QueueJobRecord {
    try {
      const uuid = uuidv4();
      const hasMeta = metadata && Object.keys(metadata).length > 0;
      const stmt = this.database.prepare(`
        INSERT INTO satusehat_queue
          (uuid, bundle_type, bundle_payload, resource_type, method, url,
           status, attempts, max_attempts, user_id, metadata, created_at, updated_at)
        VALUES
          (@uuid, @bundle_type, @bundle_payload, @resource_type, @method, @url,
           @status, 0, @max_attempts, @user_id, @metadata, datetime('now'), datetime('now'))
      `);
      const info = stmt.run({
        uuid,
        bundle_type: bundleType,
        bundle_payload: JSON.stringify(bundlePayload),
        resource_type: 'Bundle',
        method: 'POST',
        url: 'Bundle',
        status: STATUS_PENDING,
        max_attempts: maxAttempts,
        user_id: userId,
        metadata: hasMeta ? JSON.stringify(metadata) : null,
      });
      return this.get(Number(info.lastInsertRowid))!;
    } catch (err: any) {
      throw QueueException.enqueue(err?.message ?? String(err), err);
    }
  }

  public enqueue(
    method: string,
    resourceType: string,
    url: string,
    payload: Record<string, any> | null = null,
    etag: string | null = null,
    idempotencyKey: string | null = null,
    userId: string = 'system',
    maxAttempts: number = DEFAULT_MAX_ATTEMPTS,
    metadata: Record<string, any> = {}
  ): QueueJobRecord {
    try {
      const uuid = idempotencyKey ?? uuidv4();
      const hasMeta = metadata && Object.keys(metadata).length > 0;
      const stmt = this.database.prepare(`
        INSERT INTO satusehat_queue
          (uuid, bundle_type, bundle_payload, resource_type, method, url,
           status, attempts, max_attempts, etag, idempotency_key, user_id, metadata,
           created_at, updated_at)
        VALUES
          (@uuid, 'single', @bundle_payload, @resource_type, @method, @url,
           @status, 0, @max_attempts, @etag, @idempotency_key, @user_id, @metadata,
           datetime('now'), datetime('now'))
      `);
      const info = stmt.run({
        uuid,
        bundle_payload: payload ? JSON.stringify(payload) : null,
        resource_type: resourceType,
        method: method.toUpperCase(),
        url,
        status: STATUS_PENDING,
        max_attempts: maxAttempts,
        etag,
        idempotency_key: idempotencyKey,
        user_id: userId,
        metadata: hasMeta ? JSON.stringify(metadata) : null,
      });
      return this.get(Number(info.lastInsertRowid))!;
    } catch (err: any) {
      throw QueueException.enqueue(err?.message ?? String(err), err);
    }
  }

  public dequeue(): QueueJobRecord | null {
    try {
      const tx = this.database.transaction((): QueueJobRecord | null => {
        const selectStmt = this.database.prepare(`
          SELECT * FROM satusehat_queue
          WHERE status = @pending
            AND (scheduled_at IS NULL OR scheduled_at <= datetime('now'))
          ORDER BY id ASC
          LIMIT 1
        `);
        const row = selectStmt.get({ pending: STATUS_PENDING }) as Record<string, any> | undefined;
        if (!row) {
          return null;
        }

        const updateStmt = this.database.prepare(`
          UPDATE satusehat_queue
          SET status = @status, attempts = attempts + 1, updated_at = datetime('now')
          WHERE id = @id AND status = @pending
        `);
        const res = updateStmt.run({
          status: STATUS_PROCESSING,
          id: row.id,
          pending: STATUS_PENDING,
        });

        if (res.changes === 0) {
          return null;
        }

        const updatedRow = this.database
          .prepare('SELECT * FROM satusehat_queue WHERE id = @id')
          .get({ id: row.id }) as Record<string, any>;

        return this.decode(updatedRow);
      });

      return tx();
    } catch (err: any) {
      throw QueueException.dequeue(err?.message ?? String(err), err);
    }
  }

  public markSuccess(
    id: number,
    response: Record<string, any> = {},
    location: string | null = ''
  ): boolean {
    try {
      const respCopy = { ...response, location };
      const stmt = this.database.prepare(`
        UPDATE satusehat_queue
        SET status = @status, last_response = @response,
            completed_at = datetime('now'), last_error = NULL, updated_at = datetime('now')
        WHERE id = @id
      `);
      const res = stmt.run({
        status: STATUS_SUCCESS,
        response: JSON.stringify(respCopy),
        id,
      });
      return res.changes > 0;
    } catch (err: any) {
      throw QueueException.update(err?.message ?? String(err), err);
    }
  }

  public markFailed(id: number, error: string, response: Record<string, any> = {}): boolean {
    const row = this.get(id);
    if (!row) {
      return false;
    }

    if (row.attempts >= row.max_attempts) {
      return this.markDlq(id, error, response);
    }

    // Exponential backoff: attempts^2 * 30 seconds, max 5 min
    const backoffSeconds = Math.min(300, Math.pow(row.attempts, 2) * 30);

    try {
      const stmt = this.database.prepare(`
        UPDATE satusehat_queue
        SET status = @status, last_error = @error,
            last_response = @response,
            scheduled_at = datetime('now', @backoff || ' seconds'),
            updated_at = datetime('now')
        WHERE id = @id
      `);
      const res = stmt.run({
        status: STATUS_PENDING,
        error,
        response: JSON.stringify(response),
        backoff: String(backoffSeconds),
        id,
      });
      return res.changes > 0;
    } catch (err: any) {
      throw QueueException.update(err?.message ?? String(err), err);
    }
  }

  public markDlq(id: number, reason: string, response: Record<string, any> = {}): boolean {
    try {
      const stmt = this.database.prepare(`
        UPDATE satusehat_queue
        SET status = @status, dlq_reason = @reason,
            last_error = @reason, last_response = @response,
            updated_at = datetime('now')
        WHERE id = @id
      `);
      const res = stmt.run({
        status: STATUS_DLQ,
        reason,
        response: JSON.stringify(response),
        id,
      });
      return res.changes > 0;
    } catch (err: any) {
      throw QueueException.update(err?.message ?? String(err), err);
    }
  }

  public reset(id: number): boolean {
    try {
      const stmt = this.database.prepare(`
        UPDATE satusehat_queue
        SET status = @status, attempts = 0, scheduled_at = NULL,
            last_error = NULL, dlq_reason = NULL, updated_at = datetime('now')
        WHERE id = @id
      `);
      const res = stmt.run({
        status: STATUS_PENDING,
        id,
      });
      return res.changes > 0;
    } catch (err: any) {
      throw QueueException.update(err?.message ?? String(err), err);
    }
  }

  public get(id: number): QueueJobRecord | null {
    const stmt = this.database.prepare('SELECT * FROM satusehat_queue WHERE id = @id');
    const row = stmt.get({ id }) as Record<string, any> | undefined;
    return row ? this.decode(row) : null;
  }

  public pendingCount(): number {
    const stmt = this.database.prepare(`
      SELECT COUNT(*) as cnt FROM satusehat_queue
      WHERE status = 'pending'
        AND (scheduled_at IS NULL OR scheduled_at <= datetime('now'))
    `);
    const row = stmt.get() as { cnt: number };
    return Number(row?.cnt ?? 0);
  }

  public dlqCount(): number {
    const stmt = this.database.prepare(
      "SELECT COUNT(*) as cnt FROM satusehat_queue WHERE status = 'dlq'"
    );
    const row = stmt.get() as { cnt: number };
    return Number(row?.cnt ?? 0);
  }

  public stats(): QueueStatusStats {
    const stmt = this.database.prepare(
      'SELECT status, COUNT(*) as cnt FROM satusehat_queue GROUP BY status'
    );
    const rows = stmt.all() as Array<{ status: string; cnt: number }>;
    const out: QueueStatusStats = {
      pending: 0,
      processing: 0,
      success: 0,
      failed: 0,
      dlq: 0,
    };
    for (const row of rows) {
      if (row.status in out) {
        out[row.status as keyof QueueStatusStats] = Number(row.cnt);
      }
    }
    return out;
  }

  public pendingJobs(limit: number = 20): QueueJobRecord[] {
    const stmt = this.database.prepare(`
      SELECT * FROM satusehat_queue
      WHERE status = 'pending'
        AND (scheduled_at IS NULL OR scheduled_at <= datetime('now'))
      ORDER BY id ASC LIMIT @limit
    `);
    const rows = stmt.all({ limit }) as Array<Record<string, any>>;
    return rows.map((r) => this.decode(r));
  }

  public dlqJobs(limit: number = 20): QueueJobRecord[] {
    const stmt = this.database.prepare(`
      SELECT * FROM satusehat_queue WHERE status = 'dlq' ORDER BY id DESC LIMIT @limit
    `);
    const rows = stmt.all({ limit }) as Array<Record<string, any>>;
    return rows.map((r) => this.decode(r));
  }

  public resetAll(): number {
    const stmt = this.database.prepare(`
      UPDATE satusehat_queue
      SET status = 'pending', attempts = 0, scheduled_at = NULL,
          last_error = NULL, dlq_reason = NULL, updated_at = datetime('now')
      WHERE status IN ('failed', 'dlq')
    `);
    const res = stmt.run();
    return res.changes;
  }

  public purgeSuccess(days: number = 7): number {
    const stmt = this.database.prepare(`
      DELETE FROM satusehat_queue
      WHERE status = 'success'
        AND completed_at <= datetime('now', @days || ' days')
    `);
    const res = stmt.run({ days: String(-days) });
    return res.changes;
  }

  public db(): Database.Database {
    return this.database;
  }

  public pdo(): Database.Database {
    return this.database;
  }

  public close(): void {
    this.database.close();
  }

  private decode(row: Record<string, any>): QueueJobRecord {
    const copy = { ...row };
    if (typeof copy.bundle_payload === 'string' && copy.bundle_payload !== '') {
      try {
        copy.bundle_payload = JSON.parse(copy.bundle_payload);
      } catch {
        // leave as-is
      }
    }
    if (typeof copy.last_response === 'string' && copy.last_response !== '') {
      try {
        copy.last_response = JSON.parse(copy.last_response);
      } catch {
        // leave as-is
      }
    }
    if (typeof copy.metadata === 'string' && copy.metadata !== '') {
      try {
        copy.metadata = JSON.parse(copy.metadata);
      } catch {
        // leave as-is
      }
    }
    return copy as QueueJobRecord;
  }
}
