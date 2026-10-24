import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  UsersRound,
} from "lucide-react";

export default function Home() {
  return (
    <div className="home-page">
      <section className="welcome-hero" aria-labelledby="welcome-title">
        <div className="welcome-copy">
          <h1 id="welcome-title">Welcome to BAPS Phoenix</h1>
          <p className="welcome-tagline">
            A place of faith.
            <br />
            <em>A feeling of home.</em>
          </p>
          <div className="ornament" aria-hidden="true">
            <span />✦<span />
          </div>
          <p className="hero-description">
            A sacred space to find peace, deepen your faith,
            <br className="desktop-break" /> and grow together as a community.
          </p>
          <div className="hero-actions">
            <Link href="/timings" className="button button-primary">
              Darshan & arti timings <ArrowRight size={19} aria-hidden="true" />
            </Link>
            <Link href="/about-phx" className="button button-text">
              Discover our mandir <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="welcome-note">
            <span className="welcome-note-icon" aria-hidden="true">
              ✦
            </span>
            <div>
              <strong>Jai Swaminarayan</strong>
              <p>We’re glad you’re here. Touch a section below to explore.</p>
            </div>
          </div>
        </div>
        <figure className="devotional-figure">
          <div className="arch-halo" aria-hidden="true" />
          <div className="devotional-arch">
            <Image
              src="/images/akshar-purushottam.jpg"
              alt="The murtis of Bhagwan Swaminarayan and Gunatitanand Swami, adorned with flowers and traditional garments"
              width={600}
              height={800}
              preload
              sizes="(max-width: 700px) 80vw, 360px"
            />
          </div>
          <figcaption>
            <span>Akshar Purushottam Maharaj</span>
            <span>FAITH · DEVOTION · HARMONY</span>
          </figcaption>
        </figure>
      </section>
      <section className="visit-overview" aria-labelledby="at-a-glance">
        <div className="section-heading">
          <h2 id="at-a-glance">Your mandir, at a glance</h2>
          <span>A little guidance for your visit</span>
        </div>
        <div className="overview-grid">
          <Link href="/timings" className="overview-card">
            <span className="card-icon">
              <Clock3 size={23} strokeWidth={1.5} />
            </span>
            <div>
              <p className="card-kicker">DAILY DARSHAN</p>
              <h3>
                8 am – 12 pm <span>&</span> 4 – 7 pm
              </h3>
              <p>Arti at 6:30 pm · View full timings</p>
            </div>
            <ArrowUpRight className="card-arrow" size={19} />
          </Link>
          <Link href="/assembly-timings" className="overview-card">
            <span className="card-icon">
              <UsersRound size={24} strokeWidth={1.5} />
            </span>
            <div>
              <p className="card-kicker">GROW TOGETHER</p>
              <h3>Saturday assemblies</h3>
              <p>Satsang and learning for every generation</p>
            </div>
            <ArrowUpRight className="card-arrow" size={19} />
          </Link>
          <Link href="/events" className="overview-card">
            <span className="card-icon">
              <CalendarDays size={23} strokeWidth={1.5} />
            </span>
            <div>
              <p className="card-kicker">CELEBRATE WITH US</p>
              <h3>What’s happening</h3>
              <p>Explore mandir festivals and events</p>
            </div>
            <ArrowUpRight className="card-arrow" size={19} />
          </Link>
        </div>
      </section>
    </div>
  );
}
