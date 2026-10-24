import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { HelpNote, PageShell, Schedule } from "../components/page-shell";
export const metadata: Metadata = { title: "Gujarati class" };
export default function Page() {
  return (
    <PageShell
      eyebrow="LANGUAGE & HERITAGE"
      title="A connection to our roots"
      description="Gujarati classes offer children a space to learn the language and connect with their cultural heritage."
    >
      <div className="class-layout">
        <div className="class-intro">
          <BookOpen size={32} strokeWidth={1.3} />
          <span className="gujarati-letter" lang="gu" aria-hidden="true">
            અ
          </span>
          <h2>Gujarati classes</h2>
          <p>
            A language shared.
            <br />A tradition carried forward.
          </p>
        </div>
        <Schedule
          title="Class timings"
          rows={[
            { name: "Bal Gujarati Classes", time: "2:15 pm – 3:00 pm" },
            { name: "Balika Gujarati Classes", time: "2:15 pm – 3:00 pm" },
          ]}
        />
      </div>
      <HelpNote>
        For class details and how to join, please speak with a mandir volunteer.
      </HelpNote>
    </PageShell>
  );
}
