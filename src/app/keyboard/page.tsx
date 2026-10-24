import type { Metadata } from "next";
import { Music2 } from "lucide-react";
import { HelpNote, PageShell, Schedule } from "../components/page-shell";
export const metadata: Metadata = { title: "Keyboard class" };
export default function Page() {
  return (
    <PageShell
      eyebrow="MUSIC & DEVOTION"
      title="Let devotion find its melody"
      description="Explore music together through keyboard classes at the mandir."
    >
      <div className="class-layout">
        <div className="class-intro music-intro">
          <Music2 size={32} strokeWidth={1.3} />
          <div className="piano-illustration" aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
          <h2>Keyboard classes</h2>
          <p>
            Learn together.
            <br />
            Express devotion through music.
          </p>
        </div>
        <Schedule
          title="Class timings"
          rows={[
            {
              name: "Balika / Kishori / Premvati",
              detail: "Keyboard classes",
              time: "1:15 pm – 2:30 pm",
            },
          ]}
        />
      </div>
      <HelpNote>
        For class details and how to join, please speak with a mandir volunteer.
      </HelpNote>
    </PageShell>
  );
}
