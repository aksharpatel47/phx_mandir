import { HTMLElement, Node, NodeType, parse } from "node-html-parser";

export const EVENTS_URL =
  "https://www.baps.org/Global-Network/North-America/Phoenix/Upcoming-Events.aspx";

export type MandirEvent = {
  id: string;
  title: string;
  date: string;
  schedule: string;
  paragraphs: string[];
  image: string | null;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const datePattern =
  /^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s+(\w+)\s+(\d{1,2}),\s+(\d{4})(?:\s|$)/;
const clean = (text: string) => text.replace(/\s+/g, " ").trim();

export function eventDate(schedule: string) {
  const match = schedule.match(datePattern);
  if (!match) return null;
  const month = months.indexOf(match[1]);
  const day = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(Date.UTC(year, month, day));
  if (month < 0 || date.getUTCMonth() !== month || date.getUTCDate() !== day)
    return null;
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function safeEventImage(src: string | undefined) {
  if (!src) return null;
  try {
    const url = new URL(src, EVENTS_URL);
    return url.protocol === "https:" &&
      url.hostname === "www.baps.org" &&
      url.pathname.startsWith("/Data/")
      ? url.href
      : null;
  } catch {
    return null;
  }
}

type Token = { kind: "heading" | "text" | "image"; value: string };

// Parse content, never execute or embed the source HTML. Heading boundaries
// avoid depending on ASP.NET's generated element IDs and exclude Latest News.
export function parseEvents(html: string): MandirEvent[] {
  const root = parse(html);
  root
    .querySelectorAll(
      "script, style, noscript, nav, footer, iframe, form input",
    )
    .forEach((node) => node.remove());
  const tokens: Token[] = [];
  let text = "";
  const flush = () => {
    if (clean(text)) tokens.push({ kind: "text", value: clean(text) });
    text = "";
  };
  const visit = (node: Node) => {
    if (node.nodeType === NodeType.TEXT_NODE) {
      text += node.textContent;
      return;
    }
    if (!(node instanceof HTMLElement)) return;
    if (/^H[1-6]$/.test(node.tagName)) {
      flush();
      tokens.push({ kind: "heading", value: clean(node.textContent) });
      return;
    }
    if (node.tagName === "IMG") {
      flush();
      const src = safeEventImage(
        node.getAttribute("data-src") || node.getAttribute("src"),
      );
      if (src) tokens.push({ kind: "image", value: src });
      return;
    }
    const block = /^(DIV|SECTION|ARTICLE|P|LI|BR|UL|OL|TABLE|TR|TD)$/.test(
      node.tagName,
    );
    if (block) flush();
    node.childNodes.forEach(visit);
    if (block) flush();
  };
  visit(root);
  flush();

  const start = tokens.findIndex(
    (token) =>
      token.kind === "heading" && /^upcoming events$/i.test(token.value),
  );
  if (start < 0)
    throw new Error(
      "BAPS event heading missing; refusing to replace saved listings.",
    );
  const events: MandirEvent[] = [];
  let current: MandirEvent | undefined;
  let pendingImage: string | null = null;
  const finish = () => {
    if (!current) return;
    if (!current.date || !current.paragraphs.length)
      throw new Error("Incomplete BAPS event listing.");
    current.id = `${current.date}-${current.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-$/, "")}`;
    if (!events.some((event) => event.id === current!.id)) events.push(current);
  };
  for (const token of tokens.slice(start + 1)) {
    if (token.kind === "heading") {
      finish();
      if (/^(latest news|recent news|contact|footer)$/i.test(token.value))
        break;
      current = {
        id: "",
        title: token.value,
        date: "",
        schedule: "",
        paragraphs: [],
        image: pendingImage,
      };
      pendingImage = null;
    } else if (token.kind === "image") {
      if (current && !current.date && !current.image)
        current.image = token.value;
      else pendingImage = token.value;
    } else if (current) {
      const date = eventDate(token.value);
      if (date && !current.date) {
        current.date = date;
        current.schedule = token.value;
      } else if (current.date) current.paragraphs.push(token.value);
    }
  }
  finish();
  // Zero results may mean the remote markup changed. Preserve the saved data
  // rather than silently reporting that there are no events.
  if (!events.length) throw new Error("No BAPS event listings found.");
  return events;
}

export function upcomingEvents(events: MandirEvent[], now = new Date()) {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Phoenix",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  return events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

// Local schedule correction supplied by the mandir. Scope it to this event
// occurrence so subsequent years and unrelated events are not changed.
export function applyEventCorrections(events: MandirEvent[]): MandirEvent[] {
  return events.map((event) => {
    if (
      event.date !== "2026-10-24" ||
      event.title !== "Sharad Purnima - Akshar Jayanti"
    )
      return event;
    return {
      ...event,
      id: event.id.replace("2026-10-24", "2026-10-25"),
      date: "2026-10-25",
      schedule: event.schedule
        .replace(datePattern, "Sunday, October 25, 2026 ")
        .trim(),
    };
  });
}
