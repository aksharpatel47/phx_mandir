import { describe, expect, test } from "bun:test";
import { KioskCycle, nextKioskRoute } from "../src/lib/kiosk-cycle";

describe("kiosk countdown", () => {
  test("advances after a minute and starts a fresh minute on arrival", () => {
    const cycle = new KioskCycle(0);
    expect(cycle.read(30_000).progress).toBe(0.5);
    expect(cycle.read(59_999).due).toBe(false);
    expect(cycle.read(60_000).due).toBe(true);
    cycle.arrive(60_300);
    expect(cycle.read(60_300).remaining).toBe(60_000);
  });

  test("interaction hides the bar for four minutes, then counts down the fifth", () => {
    const cycle = new KioskCycle(0);
    cycle.interact(20_000);
    expect(cycle.read(259_999).visible).toBe(false);
    expect(cycle.read(260_000)).toEqual({
      remaining: 60_000,
      visible: true,
      progress: 0,
      due: false,
    });
    expect(cycle.read(290_000).progress).toBe(0.5);
    expect(cycle.read(319_999).due).toBe(false);
    expect(cycle.read(320_000).due).toBe(true);
  });

  test("every new interaction restarts all five minutes, including during the warning", () => {
    const cycle = new KioskCycle(0);
    cycle.interact(10_000);
    cycle.interact(270_000);
    expect(cycle.read(310_000).visible).toBe(false);
    expect(cycle.read(509_999).visible).toBe(false);
    expect(cycle.read(510_000).visible).toBe(true);
    expect(cycle.read(570_000).due).toBe(true);
  });

  test("manual navigation preserves the interaction pause", () => {
    const cycle = new KioskCycle(0);
    cycle.interact(10_000);
    cycle.arrive(10_500);
    expect(cycle.read(70_500).visible).toBe(false);
    expect(cycle.read(310_000).due).toBe(true);
  });

  test("late timer callbacks clamp progress and resume with a full page interval", () => {
    const cycle = new KioskCycle(0);
    expect(cycle.read(600_000)).toEqual({
      remaining: 0,
      visible: true,
      progress: 1,
      due: true,
    });
    cycle.arrive(600_000);
    expect(cycle.read(600_000).remaining).toBe(60_000);
  });

  test("follows navbar order, wraps home, and recovers from an unknown route", () => {
    const routes = ["/", "/timings", "/events", "/registration"];
    expect(nextKioskRoute("/timings", routes)).toBe("/events");
    expect(nextKioskRoute("/registration", routes)).toBe("/");
    expect(nextKioskRoute("/missing", routes)).toBe("/");
  });
});
