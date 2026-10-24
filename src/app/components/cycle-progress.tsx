"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CYCLE_INTERVAL, KioskCycle, nextKioskRoute } from "@/lib/kiosk-cycle";

const BLUR_DURATION = 300;

export function CycleProgress({ routes }: { routes: readonly string[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const clock = useRef<KioskCycle | null>(null);
  const previousPath = useRef(pathname);
  const [countdown, setCountdown] = useState({
    remaining: CYCLE_INTERVAL,
    visible: true,
    progress: 0,
    due: false,
  });

  useEffect(() => {
    const cycle = (clock.current ??= new KioskCycle(Date.now()));
    cycle.arrive(Date.now());
    const frame = document.querySelector<HTMLElement>(".site-frame");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let transition: ReturnType<typeof setTimeout> | undefined;
    let navigating = false;
    let navigationStarted = 0;
    let arrival: Animation | undefined;

    if (previousPath.current !== pathname && frame && !reduceMotion.matches) {
      arrival = frame.animate(
        [
          { filter: "blur(8px)", opacity: 0.45 },
          { filter: "blur(0px)", opacity: 1 },
        ],
        { duration: BLUR_DURATION, easing: "ease-out" },
      );
    }
    previousPath.current = pathname;

    const cancelTransition = () => {
      clearTimeout(transition);
      transition = undefined;
      frame?.removeAttribute("data-cycle-transition");
    };
    const interact = () => {
      cycle.interact(Date.now());
      cancelTransition();
      arrival?.cancel();
      setCountdown(cycle.read(Date.now()));
    };
    const tick = () => {
      const state = cycle.read(Date.now());
      setCountdown(state);

      // Recover if a route fails to commit, rather than leaving the page blurred.
      if (navigating && Date.now() - navigationStarted > 15_000) {
        navigating = false;
        cancelTransition();
        cycle.arrive(Date.now());
        return;
      }
      if (
        !state.due ||
        transition !== undefined ||
        navigating ||
        document.hidden
      )
        return;

      frame?.setAttribute("data-cycle-transition", "out");
      transition = setTimeout(
        () => {
          transition = undefined;
          navigating = true;
          navigationStarted = Date.now();
          router.replace(nextKioskRoute(pathname, routes));
        },
        reduceMotion.matches ? 0 : BLUR_DURATION,
      );
    };

    // Capture input before navigation handlers, so manual page changes retain
    // the same five-minute pause. Do not count programmatic scroll/focus changes.
    const events = [
      "pointerdown",
      "pointermove",
      "touchstart",
      "touchmove",
      "click",
      "keydown",
      "input",
      "wheel",
    ] as const;
    events.forEach((event) =>
      document.addEventListener(event, interact, {
        capture: true,
        passive: true,
      }),
    );
    const onVisibility = () => {
      if (!document.hidden) tick();
    };
    document.addEventListener("visibilitychange", onVisibility);
    const interval = setInterval(tick, 250);

    return () => {
      clearInterval(interval);
      cancelTransition();
      arrival?.cancel();
      events.forEach((event) =>
        document.removeEventListener(event, interact, true),
      );
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [pathname, router, routes]);

  return (
    <div
      className="cycle-progress"
      hidden={!countdown.visible}
      role="progressbar"
      aria-label="Time until the next page"
      aria-valuemin={0}
      aria-valuemax={60}
      aria-valuenow={Math.floor(countdown.progress * 60)}
      aria-valuetext={`Next page in ${Math.ceil(countdown.remaining / 1000)} seconds`}
    >
      <span style={{ transform: `scaleX(${countdown.progress})` }} />
    </div>
  );
}
