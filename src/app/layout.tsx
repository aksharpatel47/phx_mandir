import type { Metadata } from "next";
import "./globals.css";
import { KioskGuard } from "@/app/components/kiosk-guard";
import { Nav } from "@/app/components/nav";

export const metadata: Metadata = {
  title: {
    default: "Welcome | BAPS Phoenix Mandir",
    template: "%s | BAPS Phoenix Mandir",
  },
  description:
    "Welcome to BAPS Shri Swaminarayan Mandir, Phoenix. Explore darshan timings, weekly assemblies, events, and cultural classes.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <KioskGuard />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="site-frame">
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <footer className="site-footer">
            <span>BAPS Shri Swaminarayan Mandir · Phoenix</span>
            <span>
              In the joy of others lies our own.{" "}
              <span className="quote-author">— Pramukh Swami Maharaj</span>
            </span>
          </footer>
        </div>
        <Nav />
      </body>
    </html>
  );
}
