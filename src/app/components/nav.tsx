"use client";

import { DashboardLink } from "@/app/components/dashboard_link";
import {
  BookOpen,
  CalendarDays,
  Clock3,
  Home,
  Info,
  KeyboardMusic,
  Send,
} from "lucide-react";
import { usePathname } from "next/navigation";

export function Nav() {
  const color = "black";
  const size = 48;
  const currentUrl = usePathname();
  return (
    <nav className="flex gap-4 justify-evenly h-24">
      <DashboardLink name={"Home"} href={"/"} currentUrl={currentUrl}>
        <Home color={color} size={size} />
      </DashboardLink>
      <DashboardLink
        name={"Registration"}
        href={"/registration"}
        currentUrl={currentUrl}
      >
        <Send color={color} size={size} />
      </DashboardLink>
      <DashboardLink name={"Events"} href={"/events"} currentUrl={currentUrl}>
        <CalendarDays color={color} size={size} />
      </DashboardLink>
      <DashboardLink
        name={"Mandir Timings"}
        href={"/timings"}
        currentUrl={currentUrl}
      >
        <Clock3 color={color} size={size} />
      </DashboardLink>
      <DashboardLink
        name={"Assembly Timings"}
        href={"/assembly-timings"}
        currentUrl={currentUrl}
      >
        <Clock3 color={color} size={size} />
      </DashboardLink>
      <DashboardLink
        name={"Gujarati Class"}
        href={"/gujarati-class"}
        currentUrl={currentUrl}
      >
        <BookOpen color={color} size={size} />
      </DashboardLink>
      <DashboardLink
        name={"Keyboard Class"}
        href={"/keyboard"}
        currentUrl={currentUrl}
      >
        <KeyboardMusic color={color} size={size} />
      </DashboardLink>
      <DashboardLink
        name={"About BAPS"}
        href={"/about-baps"}
        currentUrl={currentUrl}
      >
        <Info color={color} size={size} />
      </DashboardLink>
      <DashboardLink
        name={"About Phoenix Mandir"}
        href={"/about-phx"}
        currentUrl={currentUrl}
      >
        <Info color={color} size={size} />
      </DashboardLink>
    </nav>
  );
}
