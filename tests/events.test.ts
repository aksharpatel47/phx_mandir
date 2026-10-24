import { describe, expect, test } from "bun:test";
import {
  eventDate,
  parseEvents,
  safeEventImage,
  upcomingEvents,
} from "../src/lib/events";
import { loadEvents } from "../src/lib/load-events";

const html = `<!doctype html><html><body>
  <nav><h2>Unrelated navigation</h2></nav>
  <h1>Upcoming Events</h1>
  <section>
    <img src="/Data/Sites/1/Media/festival.jpg">
    <div><h2>Festival &amp; Family Gathering</h2>
      <div>Saturday, October 24, 2026 - 4 PM</div>
      <div><p>Join us for <strong>music</strong> and learning.</p>
        <p>Families&nbsp;are welcome.<br>Bring your questions.</p>
        <script>window.open('https://bad.example')</script>
      </div>
    </div>
  </section>
  <section><h2>Community Celebration</h2>
    <img src="https://www.baps.org/Data/Sites/1/Media/celebration.jpg">
    <div>Sunday, November 08, 2026 - 6 PM - 9 PM</div>
    <p>Enjoy an evening together.</p>
  </section>
  <h2><a href="/news">Latest News</a></h2>
  <h3>Older celebration</h3><p>Saturday, September 12, 2026 - 4 PM</p>
  <p>Must not become an upcoming event.</p>
</body></html>`;

describe("BAPS events parser", () => {
  test("extracts all dated events, entities, paragraphs, times, and paired images", () => {
    const events = parseEvents(html);
    expect(events).toHaveLength(2);
    expect(events[0].title).toBe("Festival & Family Gathering");
    expect(events[0].date).toBe("2026-10-24");
    expect(events[0].schedule).toBe("Saturday, October 24, 2026 - 4 PM");
    expect(events[0].paragraphs).toEqual([
      "Join us for music and learning.",
      "Families are welcome.",
      "Bring your questions.",
    ]);
    expect(events[0].image).toBe(
      "https://www.baps.org/Data/Sites/1/Media/festival.jpg",
    );
    expect(events[1].image).toBe(
      "https://www.baps.org/Data/Sites/1/Media/celebration.jpg",
    );
    expect(events[1].schedule).toContain("6 PM - 9 PM");
    expect(JSON.stringify(events)).not.toContain("window.open");
    expect(JSON.stringify(events)).not.toContain("Older celebration");
  });

  test("rejects challenge pages, changed markup, and incomplete listings", () => {
    expect(() => parseEvents("<h1>Just a moment...</h1>")).toThrow();
    expect(() =>
      parseEvents("<h1>Upcoming Events</h1><p>No data</p>"),
    ).toThrow();
    expect(() =>
      parseEvents(
        html.replace("Sunday, November 08, 2026 - 6 PM - 9 PM", "unknown date"),
      ),
    ).toThrow();
  });

  test("permits only BAPS HTTPS images and validates calendar dates", () => {
    for (const url of [
      "javascript:alert(1)",
      "https://evil.example/image.jpg",
      "https://www.baps.org.evil.example/Data/test.jpg",
      "http://www.baps.org/Data/test.jpg",
      "data:image/svg+xml,test",
    ]) {
      expect(safeEventImage(url)).toBeNull();
    }
    expect(eventDate("Saturday, February 30, 2026 - 4 PM")).toBeNull();
    expect(eventDate("Saturday, Unknown 24, 2026 - 4 PM")).toBeNull();
  });

  test("retains today's events through midnight in Phoenix, independent of UTC", () => {
    const events = parseEvents(html);
    expect(
      upcomingEvents(events, new Date("2026-10-25T06:59:00Z")),
    ).toHaveLength(2);
    expect(
      upcomingEvents(events, new Date("2026-10-25T07:00:00Z")),
    ).toHaveLength(1);
    expect(
      upcomingEvents(events, new Date("2027-01-01T00:00:00Z")),
    ).toHaveLength(0);
  });
});

describe("event loading", () => {
  test("returns parsed remote data with the response's check date", async () => {
    const fetchPage = async () =>
      new Response(html, {
        headers: { date: "Sat, 24 Oct 2026 23:00:00 GMT" },
      });
    const data = await loadEvents(fetchPage);
    expect(data.saved).toBe(false);
    expect(data.events).toHaveLength(2);
    expect(data.checkedAt).toBe("2026-10-24T23:00:00.000Z");
  });

  test("preserves the local Sharad Purnima correction when BAPS still lists Saturday", async () => {
    const source = html.replace(
      "Festival &amp; Family Gathering",
      "Sharad Purnima - Akshar Jayanti",
    );
    const data = await loadEvents(async () => new Response(source));
    expect(data.events[0].date).toBe("2026-10-25");
    expect(data.events[0].schedule).toBe("Sunday, October 25, 2026 - 4 PM");
    expect(data.events[0].id).toStartWith("2026-10-25-");
    expect(data.events[1].date).toBe("2026-11-08");
  });

  test("keeps the dated local listings for HTTP errors, challenges, and network failures", async () => {
    const sources = [
      async () => new Response("Forbidden", { status: 403 }),
      async () => new Response("<h1>Just a moment...</h1>"),
      async () => {
        throw new Error("Network unavailable");
      },
    ];
    for (const source of sources) {
      const data = await loadEvents(source);
      expect(data.saved).toBe(true);
      expect(data.events).toHaveLength(5);
      expect(data.events[0].schedule).toBe("Sunday, October 25, 2026 - 4 PM");
      expect(data.checkedAt).toBe("2026-10-24T22:50:00Z");
      expect(
        data.events.every((event) =>
          event.image?.startsWith("/images/events/"),
        ),
      ).toBe(true);
    }
  });
});
