"use client";

import { useEffect } from "react";

// Page-level protection complements the Raspberry Pi's browser kiosk settings.
// Cross-origin content has its own iframe sandbox; its events cannot bubble here.
export function KioskGuard() {
  useEffect(() => {
    const preventDefault = (event: Event) => event.preventDefault();
    const protectLink = (event: MouseEvent) => {
      const link =
        event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;

      if (
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        // Keep any future targeted links in this browsing context as well.
        link.removeAttribute("target");
      }
    };
    const protectShortcut = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        ["t", "n"].includes(event.key.toLowerCase())
      ) {
        event.preventDefault();
      }
    };
    const originalOpen = window.open;
    window.open = () => null;
    document.addEventListener("click", protectLink, true);
    document.addEventListener("auxclick", protectLink, true);
    document.addEventListener("contextmenu", preventDefault, true);
    document.addEventListener("dragstart", preventDefault, true);
    document.addEventListener("keydown", protectShortcut, true);

    return () => {
      window.open = originalOpen;
      document.removeEventListener("click", protectLink, true);
      document.removeEventListener("auxclick", protectLink, true);
      document.removeEventListener("contextmenu", preventDefault, true);
      document.removeEventListener("dragstart", preventDefault, true);
      document.removeEventListener("keydown", protectShortcut, true);
    };
  }, []);

  return null;
}
