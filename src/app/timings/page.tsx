import type { Metadata } from "next";
import { Clock3, Flame, Droplets, Info } from "lucide-react";
import { HelpNote, PageShell } from "../components/page-shell";

export const metadata: Metadata = { title: "Mandir timings" };

export default function Page() {
  return (
    <PageShell
      eyebrow="A MOMENT OF PEACE"
      title="Mandir visiting timings"
      description="Make time for darshan, prayer, and reflection. The mandir welcomes you every day."
    >
      <div className="daily-label">
        <span /> Monday – Sunday{" "}
        <span className="time-zone">All times are local to Phoenix</span>
      </div>
      <div className="timings-grid">
        <section className="timing-card">
          <Clock3 className="timing-icon" size={29} strokeWidth={1.4} />
          <h2>Darshan</h2>
          <p>Visit the sacred murtis</p>
          <dl>
            <div>
              <dt>Morning</dt>
              <dd>8:00 am – 12:00 pm</dd>
            </div>
            <div>
              <dt>Evening</dt>
              <dd>4:00 pm – 7:00 pm</dd>
            </div>
          </dl>
        </section>
        <section className="timing-card arti-card">
          <Flame className="timing-icon" size={29} strokeWidth={1.4} />
          <h2>Arti</h2>
          <p>Join us in devotional prayer</p>
          <div className="arti-time">
            6:30 <span>pm</span>
          </div>
          <span className="arti-caption">Every evening</span>
          <div className="arti-ornament" aria-hidden="true">
            ✦
          </div>
        </section>
        <section className="timing-card">
          <Droplets className="timing-icon" size={29} strokeWidth={1.4} />
          <h2>Nilkanth Varni Abhishek</h2>
          <p>A sacred offering of devotion</p>
          <dl>
            <div>
              <dt>Morning</dt>
              <dd>8:00 am – 12:00 pm</dd>
            </div>
            <div>
              <dt>Evening</dt>
              <dd>4:00 pm – 7:00 pm</dd>
            </div>
          </dl>
        </section>
      </div>
      <div className="notice">
        <Info size={21} aria-hidden="true" />
        <p>
          <strong>Please note:</strong> Darshan closes for 30 minutes during
          thaal at 11:00 am and 6:00 pm.
        </p>
      </div>
      <HelpNote />
    </PageShell>
  );
}
