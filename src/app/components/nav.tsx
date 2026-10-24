"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  BookOpen,
  CalendarDays,
  Clock3,
  ContactRound,
  HeartHandshake,
  Landmark,
  Piano,
  UsersRound,
} from "lucide-react";
import { TempleMark } from "./temple-mark";
import { CycleProgress } from "./cycle-progress";

const destinations = [
  { href: "/registration", label: "Stay Connected", icon: ContactRound },
  { href: "/timings", label: "Mandir timings", icon: Clock3 },
  { href: "/assembly-timings", label: "Assemblies", icon: UsersRound },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/gujarati-class", label: "Gujarati class", icon: BookOpen },
  { href: "/keyboard", label: "Keyboard class", icon: Piano },
  { href: "/about-baps", label: "About BAPS", icon: HeartHandshake },
  { href: "/about-phx", label: "Our mandir", icon: Landmark },
];
const cycleRoutes = ["/", ...destinations.map(({ href }) => href)];

export function Nav() {
  const pathname = usePathname();
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = nav.current;
    if (!element) return;
    const resize = new ResizeObserver(() => {
      document.documentElement.style.setProperty(
        "--kiosk-nav-height",
        `${element.getBoundingClientRect().height}px`,
      );
    });
    resize.observe(element);
    return () => resize.disconnect();
  }, []);
  return (
    <nav ref={nav} className="kiosk-nav" aria-label="Main navigation">
      <CycleProgress routes={cycleRoutes} />
      <div className="nav-inner">
        <Link
          href="/"
          className={`nav-home ${pathname === "/" ? "is-active" : ""}`}
          aria-label="BAPS Phoenix Mandir home"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <TempleMark className="brand-mark" />
          <span className="brand-name">
            BAPS Shri
            <br />
            Swaminarayan Mandir
          </span>
          <span className="brand-location">PHOENIX, ARIZONA</span>
        </Link>
        {destinations.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`nav-item ${pathname === href ? "is-active" : ""}`}
            aria-current={pathname === href ? "page" : undefined}
          >
            <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
