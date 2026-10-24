export const CYCLE_INTERVAL = 60_000;
export const INTERACTION_PAUSE = 5 * CYCLE_INTERVAL;

// Absolute deadlines keep the countdown accurate even when Chrome throttles timers.
export class KioskCycle {
  private pauseUntil = 0;
  private deadline: number;

  constructor(now: number) {
    this.deadline = now + CYCLE_INTERVAL;
  }

  interact(now: number) {
    this.pauseUntil = now + INTERACTION_PAUSE;
    this.deadline = this.pauseUntil;
  }

  arrive(now: number) {
    this.deadline = Math.max(now + CYCLE_INTERVAL, this.pauseUntil);
  }

  read(now: number) {
    const remaining = Math.max(0, this.deadline - now);
    return {
      remaining,
      visible: remaining <= CYCLE_INTERVAL,
      progress: Math.max(0, 1 - remaining / CYCLE_INTERVAL),
      due: remaining === 0,
    };
  }
}

export function nextKioskRoute(pathname: string, routes: readonly string[]) {
  return routes[(routes.indexOf(pathname) + 1) % routes.length] ?? "/";
}
