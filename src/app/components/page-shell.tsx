import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </header>
      {children}
    </div>
  );
}

export function Schedule({
  title,
  rows,
  emphasizeDay = false,
}: {
  title: string;
  rows: { name: string; time: string; detail?: string }[];
  emphasizeDay?: boolean;
}) {
  return (
    <section className="schedule-panel" aria-label={title}>
      <div className="panel-heading">
        <h2>{title}</h2>
        <span className={`day-label${emphasizeDay ? " is-prominent" : ""}`}>
          {emphasizeDay && <CalendarDays size={24} aria-hidden="true" />}
          Every Saturday
        </span>
      </div>
      <dl className="schedule-list">
        {rows.map((row) => (
          <div className="schedule-row" key={row.name}>
            <dt>
              {row.name}
              {row.detail && <span className="row-detail">{row.detail}</span>}
            </dt>
            <dd>{row.time}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function HelpNote({ children }: { children?: ReactNode }) {
  return (
    <div className="help-note">
      <span className="note-symbol" aria-hidden="true">
        ✦
      </span>
      <p>
        {children ||
          "Have a question? A mandir volunteer will be happy to help you."}
      </p>
      <Link href="/registration">
        Stay connected <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </div>
  );
}
