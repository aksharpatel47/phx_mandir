import type { Metadata } from "next";
import { HelpNote, PageShell, Schedule } from "../components/page-shell";
export const metadata: Metadata = { title: "Weekly assemblies" };
export default function Page() {
  return (
    <PageShell
      eyebrow="FAITH & FELLOWSHIP"
      title="Together, every Saturday"
      description="Weekly sabhas bring our community together through satsang, shared learning, and devotion."
    >
      <Schedule
        title="Weekly assemblies"
        emphasizeDay
        rows={[
          { name: "Satsang Sabha", time: "4:00 pm – 6:00 pm" },
          { name: "Bal Sabha", time: "4:00 pm – 5:30 pm" },
          { name: "Balika Sabha", time: "4:30 pm – 5:30 pm" },
          { name: "Kishore Sabha", time: "2:00 pm – 3:30 pm" },
          { name: "Kishori Sabha", time: "4:30 pm – 5:30 pm" },
          { name: "Yuvak Sabha", time: "2:00 pm – 3:30 pm" },
          { name: "Yuvati Sabha", time: "3:30 pm – 4:30 pm" },
          { name: "Mahila Sabha", time: "2:30 pm – 3:30 pm" },
        ]}
      />
      <HelpNote>
        Not sure which assembly to attend? Please ask a mandir volunteer.
      </HelpNote>
    </PageShell>
  );
}
