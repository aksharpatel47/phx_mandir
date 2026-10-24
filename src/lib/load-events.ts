import saved from "@/data/events.json";
import {
  EVENTS_URL,
  parseEvents,
  applyEventCorrections,
  type MandirEvent,
} from "./events";

export type EventListings = {
  events: MandirEvent[];
  checkedAt: string;
  saved: boolean;
};

export async function loadEvents(
  fetchPage: (
    ...args: Parameters<typeof fetch>
  ) => ReturnType<typeof fetch> = fetch,
): Promise<EventListings> {
  try {
    const response = await fetchPage(EVENTS_URL, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
      headers: { Accept: "text/html" },
    });
    if (!response.ok) throw new Error(`BAPS returned HTTP ${response.status}`);
    const events = applyEventCorrections(parseEvents(await response.text()));
    const responseDate = response.headers.get("date");
    const checkedAt =
      responseDate && Number.isFinite(Date.parse(responseDate))
        ? new Date(responseDate).toISOString()
        : new Date().toISOString();
    return { events, checkedAt, saved: false };
  } catch {
    // Includes Cloudflare challenges, outages, and unrecognized markup.
    // A checked local snapshot keeps the kiosk useful without an external tab.
    return { events: saved.events, checkedAt: saved.checkedAt, saved: true };
  }
}
