import type { Metadata } from "next";
import { HeartHandshake, Mail, CalendarDays } from "lucide-react";
import { Form } from "./form";
import { PageShell } from "../components/page-shell";
export const metadata: Metadata = { title: "Stay Connected" };
export default function Page() {
  return (
    <PageShell
      eyebrow="YOU ARE PART OF THE FAMILY"
      title="Stay Connected"
      description="Share your contact details to receive updates about our mandir and upcoming events."
    >
      <div className="registration-layout">
        <aside className="registration-aside">
          <HeartHandshake size={36} strokeWidth={1.3} />
          <h2>
            A community
            <br />
            <em>to grow with.</em>
          </h2>
          <p>
            From weekly satsang to festival celebrations, stay close to the
            moments that bring us together.
          </p>
          <div>
            <CalendarDays size={21} />
            <span>Mandir events and celebrations</span>
          </div>
          <div>
            <Mail size={21} />
            <span>Updates from your community</span>
          </div>
          <p className="registration-privacy">
            Your details will be shared with the mandir team for community
            updates.
          </p>
        </aside>
        <Form />
      </div>
    </PageShell>
  );
}
