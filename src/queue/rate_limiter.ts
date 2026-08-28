export class RateLimiter {
  private rpm: number;
  private interval: number; // ms
  private lastRequestAt: number | null = null;

  constructor(rpm: number = 300) {
    this.rpm = Math.max(1, rpm);
    this.interval = (60 * 1000) / this.rpm;
  }

  async wait(): Promise<void> {
    if (this.lastRequestAt !== null) {
      const elapsed = Date.now() - this.lastRequestAt;
      const remaining = this.interval - elapsed;
      if (remaining > 0) {
        await new Promise(resolve => setTimeout(resolve, remaining));
      }
    }
    this.lastRequestAt = Date.now();
  }
}
