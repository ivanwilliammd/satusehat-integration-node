/**
 * Per-process rate limiter using sliding window.
 */
export class RateLimiter {
  private rpm: number;
  private interval: number; // ms
  private lastRequestAt: number | null = null;

  constructor(rpm: number = 300) {
    this.rpm = Math.max(1, rpm);
    this.interval = (60 * 1000) / this.rpm;
  }

  public async wait(): Promise<void> {
    if (this.lastRequestAt !== null) {
      const elapsed = Date.now() - this.lastRequestAt;
      const remaining = this.interval - elapsed;
      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }
    }
    this.lastRequestAt = Date.now();
  }

  /**
   * Seconds to wait based on Retry-After header value.
   */
  public static parseRetryAfter(header?: string | null): number | null {
    if (header === null || header === undefined || header === '') {
      return null;
    }

    const trimmed = header.trim();
    if (trimmed === '') {
      return null;
    }

    // HTTP-date format: "Wed, 31 Oct 2026 12:00:00 GMT"
    if (/^[A-Z][a-z]{2},/.test(trimmed)) {
      const ts = Date.parse(trimmed);
      if (!isNaN(ts)) {
        return Math.max(0, Math.floor((ts - Date.now()) / 1000));
      }
      return null;
    }

    // Integer seconds
    if (/^-?\d+$/.test(trimmed)) {
      const seconds = parseInt(trimmed, 10);
      return !isNaN(seconds) ? seconds : null;
    }

    return null;
  }
}
