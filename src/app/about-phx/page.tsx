import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { PageShell } from "../components/page-shell";
import { TempleMark } from "../components/temple-mark";
export const metadata: Metadata = { title: "Our Phoenix mandir" };
export default function Page() {
  return (
    <PageShell
      eyebrow="OUR MANDIR, OUR COMMUNITY"
      title="A sacred space in Phoenix"
      description="A place to pause, to pray, and to feel a sense of belonging."
    >
      <div className="mandir-layout">
        <article className="prose-panel">
          <p className="eyebrow">WELCOME TO YOUR MANDIR</p>
          <h2>
            Rooted in tradition.
            <br />
            <em>Open to the community.</em>
          </h2>
          <p>
            A mandir is a sacred Hindu place of worship: the earthly home of
            Bhagwan, where visitors can quiet the mind and experience
            spirituality.
          </p>
          <p>
            At BAPS Shri Swaminarayan Mandir in Phoenix, devotees come to offer
            prayers before the murtis, attend sabhas, and participate in
            cultural classes. Inspired by Pramukh Swami Maharaj’s vision, BAPS
            mandirs help cultivate peace and connect individuals to Bhagwan.
          </p>
          <p>
            Through language, music, spiritual learning, and service, the mandir
            connects generations with the traditions of Hinduism and with one
            another.
          </p>
          <Link href="/assembly-timings" className="button button-primary">
            Explore weekly assemblies <ArrowRight size={18} />
          </Link>
        </article>
        <aside className="visit-card">
          <TempleMark className="visit-mark" />
          <h2>
            BAPS Shri
            <br />
            Swaminarayan Mandir
          </h2>
          <span className="eyebrow">PHOENIX, ARIZONA</span>
          <div className="visit-detail">
            <MapPin size={21} />
            <p>
              3620 N Black Canyon Highway
              <br />
              Phoenix, AZ 85017
            </p>
          </div>
          <div className="visit-detail">
            <Phone size={20} />
            <p>+1 (480) 357-9922</p>
          </div>
          <Link href="/timings" className="button button-outline">
            View visiting timings <ArrowRight size={17} />
          </Link>
        </aside>
      </div>
    </PageShell>
  );
}
