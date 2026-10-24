import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";
import { loadEvents } from "@/lib/load-events";
import { upcomingEvents } from "@/lib/events";
import { EventImage } from "./event-image";

export const metadata: Metadata = { title: "Mandir events" };
export const revalidate = 3600;

export default async function Page() {
  const listings = await loadEvents();
  const events = upcomingEvents(listings.events);
  const checkedAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "America/Phoenix",
  }).format(new Date(listings.checkedAt));
  return (
    <section
      className="events-page"
      aria-labelledby="events-title"
      tabIndex={0}
    >
      <div className="events-content">
        <header className="page-heading">
          <p className="eyebrow">CELEBRATE & CONNECT</p>
          <h1 id="events-title">Upcoming events</h1>
          <p className="page-description">
            Festivals, celebrations, and moments to come together.
          </p>
          <p className="events-location">
            <MapPin size={16} aria-hidden="true" /> BAPS Phoenix Mandir · All
            times are local to Phoenix
          </p>
        </header>
        <p className="events-source">
          Event information from BAPS Phoenix · Last checked {checkedAt}.
          {listings.saved &&
            " Please confirm the latest details with a mandir volunteer."}
        </p>
        {events.length ? (
          <div className="events-list">
            {events.map((event) => (
              <article
                className="event-card"
                key={event.id}
                aria-labelledby={`${event.id}-title`}
              >
                <EventImage
                  key={event.image}
                  src={event.image}
                  title={event.title}
                />
                <div className="event-copy">
                  <p className="event-schedule">
                    <CalendarDays size={18} aria-hidden="true" />
                    <time dateTime={event.date}>{event.schedule}</time>
                  </p>
                  <h2 id={`${event.id}-title`}>{event.title}</h2>
                  {event.paragraphs.map((paragraph, index) => (
                    <p className="event-description" key={index}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="events-empty">
            <CalendarDays size={32} aria-hidden="true" />
            <h2>More moments together are on the way</h2>
            <p>
              {listings.saved
                ? "Our saved listings have ended. Ask a mandir volunteer about upcoming celebrations."
                : "Please check back for upcoming celebrations, or ask a mandir volunteer."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
