import type { Metadata } from "next";
import Image from "next/image";
import { HeartHandshake, Leaf, UsersRound } from "lucide-react";
import { HelpNote, PageShell } from "../components/page-shell";
export const metadata: Metadata = { title: "About BAPS" };
export default function Page() {
  return (
    <PageShell
      eyebrow="SPIRITUALITY IN EVERYDAY LIFE"
      title="Faith that inspires service"
      description="Bochasanwasi Shri Akshar Purushottam Swaminarayan Sanstha"
    >
      <div className="about-layout">
        <div className="about-image">
          <Image
            src="/images/akshar-purushottam.jpg"
            alt="Akshar Purushottam Maharaj"
            width={600}
            height={800}
            loading="eager"
            sizes="(max-width: 700px) 90vw, 320px"
          />
          <span>Akshar Purushottam Maharaj</span>
        </div>
        <article className="prose-panel">
          <p className="eyebrow">OUR FOUNDATION</p>
          <h2>
            Caring for the world,
            <br />
            <em>one person at a time.</em>
          </h2>
          <p>
            BAPS is a socio-spiritual Hindu fellowship with its roots in the
            Vedas. Revealed by Bhagwan Swaminarayan (1781–1830) and established
            in 1907 by Shastriji Maharaj (1865–1951), its teachings bring
            practical spirituality into everyday life.
          </p>
          <p>
            BAPS strives to care for the world by caring for societies,
            families, and individuals. Prayer, honest living, and service to
            others form the foundation of its spiritual and humanitarian
            activities.
          </p>
          <p>
            Devotees nurture their faith through daily puja and meditation, a
            commitment to moral living, and time spent serving their
            communities.
          </p>
          <div className="values-row">
            <span>
              <Leaf size={21} /> Spirituality
            </span>
            <span>
              <UsersRound size={21} /> Community
            </span>
            <span>
              <HeartHandshake size={21} /> Service
            </span>
          </div>
        </article>
      </div>
      <HelpNote />
    </PageShell>
  );
}
