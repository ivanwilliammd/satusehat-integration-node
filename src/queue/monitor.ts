import { SqliteQueue } from './sqlite_queue';

export interface QueueStats {
  pending: number;
  processing?: number;
  success: number;
  failed?: number;
  dlq: number;
}

export interface QueueMonitorSummary {
  total: number;
  pending: number;
  processing: number;
  success: number;
  failed: number;
  dlq: number;
  success_rate: number;
  oldest_pending_at: string | null;
  dlq_count: number;
}

export interface QueueHealthCheck {
  status: 'healthy' | 'degraded' | 'critical';
  issues: string[];
  summary: QueueMonitorSummary;
}

/**
 * Queue monitoring — stats, health, error analytics.
 */
export class QueueMonitor {
  private queue: SqliteQueue;

  constructor(queue: SqliteQueue) {
    this.queue = queue;
  }

  /**
   * High-level summary: counts, rates, queue depth.
   */
  public summary(): QueueMonitorSummary {
    const stats = this.queue.stats();
    const total = stats.pending + stats.processing + stats.success + stats.failed + stats.dlq;

    const successRate = total > 0 ? Math.round((stats.success / total) * 1000) / 10 : 0.0;
    const oldest = this.oldestPending();

    return {
      total,
      pending: stats.pending,
      processing: stats.processing,
      success: stats.success,
      failed: stats.failed,
      dlq: stats.dlq,
      success_rate: successRate,
      oldest_pending_at: oldest?.created_at ?? null,
      dlq_count: stats.dlq,
    };
  }

  /**
   * Health check — returns status + recommendations.
   */
  public healthCheck(): QueueHealthCheck {
    const stats = this.queue.stats();
    let status: 'healthy' | 'degraded' | 'critical' = 'healthy';
    const issues: string[] = [];

    if (stats.dlq > 0 && stats.dlq >= stats.success) {
      status = 'critical';
      issues.push('DLQ count >= success count — investigate failed jobs');
    } else if (stats.dlq > 20) {
      status = 'degraded';
      issues.push(`${stats.dlq} jobs in DLQ — review and requeue or fix payload`);
    }

    if (stats.pending > 500) {
      status = status === 'healthy' ? 'degraded' : status;
      issues.push(`${stats.pending} pending jobs — worker may be idle or under-provisioned`);
    }

    const oldest = this.oldestPending();
    if (oldest?.created_at) {
      const createdTs = Date.parse(
        oldest.created_at.includes('T') ? oldest.created_at : `${oldest.created_at}Z`
      );
      if (!isNaN(createdTs)) {
        const ageMinutes = (Date.now() - createdTs) / 60000;
        if (ageMinutes > 30 && stats.processing === 0) {
          status = status === 'healthy' ? 'degraded' : status;
          issues.push(`Oldest pending job is ${Math.round(ageMinutes)}min old — worker may be down`);
        }
      }
    }

    return {
      status,
      issues,
      summary: this.summary(),
    };
  }

  /**
   * Top error categories from failed + DLQ jobs.
   */
  public topErrors(limit: number = 10): Array<{ last_error: string; cnt: number }> {
    const db = this.queue.db();
    const stmt = db.prepare(`
      SELECT last_error, COUNT(*) as cnt
      FROM satusehat_queue
      WHERE status IN ('failed','dlq') AND last_error IS NOT NULL
      GROUP BY last_error
      ORDER BY cnt DESC
      LIMIT @limit
    `);
    return stmt.all({ limit }) as Array<{ last_error: string; cnt: number }>;
  }

  private oldestPending(): Record<string, any> | null {
    const db = this.queue.db();
    const stmt = db.prepare(`
      SELECT id, created_at, method, url, status, attempts
      FROM satusehat_queue
      WHERE status IN ('pending','failed')
      ORDER BY created_at ASC
      LIMIT 1
    `);
    const row = stmt.get() as Record<string, any> | undefined;
    return row ?? null;
  }
}
