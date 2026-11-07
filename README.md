# BAPS Phoenix Mandir kiosk

A Next.js touchscreen visitor guide for the mandir foyer, with a warm ivory and maroon design, locally served devotional imagery, and persistent touch navigation. All nine existing routes are preserved; deploying this version to the existing host updates the experience at the same URLs.

## Development

Use Bun 1.4.4 and Node.js 20.9 or newer (Node 22 is used in CI).

```sh
bun install --frozen-lockfile
bun run dev
```

Open http://localhost:3000. The app uses Next.js 16.4.3 and React 19.3.1. It does not fetch web fonts during a build.

```sh
bun run lint
bun run build
bun run typecheck
bun run test:ci
bun run start
```

Turbopack is the default bundler. Environments that prohibit its local worker sockets can use `bun run build --webpack` and `bun run dev --webpack`.

## Routes and content

| URL                 | Content                                     |
| ------------------- | ------------------------------------------- |
| `/`                 | Welcome and visit overview                  |
| `/timings`          | Darshan, arti, and abhishek                 |
| `/assembly-timings` | Saturday sabhas                             |
| `/events`           | Native event listings with a saved fallback |
| `/gujarati-class`   | Gujarati class times                        |
| `/keyboard`         | Keyboard class times                        |
| `/about-baps`       | BAPS background                             |
| `/about-phx`        | Mandir introduction and contact information |
| `/registration`     | Stay Connected contact form                 |

Schedules remain the values from the original site. Times are local to Phoenix. Update the page files under `src/app` when schedules change; the home page also summarizes darshan and arti times. The Events page parses upcoming listings from the public BAPS Phoenix page into native cards with dates, descriptions, and images. It requests a refresh hourly on page access and falls back to the checked snapshot in `src/data/events.json` if BAPS blocks access, times out, or returns unrecognized markup. The initial snapshot contains all five listings checked on October 24, 2026, with concise descriptions and locally downloaded thumbnails. A local correction moves Sharad Purnima – Akshar Jayanti to Sunday, October 25, 2026 at 4 PM; `applyEventCorrections` preserves this date when refreshing from BAPS. The supplied 2026 Diwali & Grand Annakut flyer updates the November 8 and November 14 listings with pujan times, hourly arti, activities, and free food; these details are also preserved during BAPS refreshes. Past dates are excluded using Phoenix time. A dated source note makes the snapshot's age visible; an expired snapshot shows an explanatory empty state.

Direct requests currently receive a Cloudflare challenge, so live parsing of BAPS's raw HTML remains unverified. The parser recognizes the Upcoming Events heading, dated event headings, descriptions, and image URLs, stopping before Latest News. Parser and failure handling tests use representative HTML. Only text and approved BAPS image URLs are extracted; remote HTML, scripts, forms, and outbound links are never embedded. Refreshing the local snapshot manually is possible by updating `src/data/events.json` and its images under `public/images/events`.

The shared navigation, kiosk guards, and page layouts live in `src/app/components`. Colors, responsive layouts, and touch target sizes are in `src/app/globals.css`. The layout adapts to landscape kiosks, portrait screens, and phones, with keyboard focus styles and reduced-motion support.

## Kiosk navigation

The circular mandir badge in the bottom navigation returns visitors home. Page links stay in the current tab. The app blocks modified link clicks, middle clicks, context menus, dragging, and `window.open`; event cards contain no outbound navigation.

Pages advance in navbar order after one minute, with a thin countdown bar above the navbar and a brief blur transition (disabled for reduced-motion preferences). Touch, pointer movement, typing, and scrolling input reset a five-minute pause across page changes. The bar stays hidden for the first four minutes, then fills during the final minute. Automatic navigation replaces history entries.

Events uses one scrollable list above the navbar, with no iframe or outer scrollbar. It follows the same one-minute cycle and five-minute interaction pause as every other page. The progress bar passes behind the raised home badge.

These are page-level protections, not a browser lockdown. Run Chrome with the Raspberry Pi's kiosk restrictions: ordinary fullscreen alone does not prevent browser or operating-system shortcuts.

## Stay Connected

Set these environment variables on the server, or in `.env.local` for local development:

```dotenv
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

Registration requires a name and at least one contact method. The existing Telegram delivery integration is retained. Success appears only after Telegram confirms delivery; errors keep the entered values available for retry. Input is not stored in browser storage. Tests mock Telegram and never send real messages.

## Deployment

The Dockerfile retains the existing Bun deployment approach. The PR workflow installs from `bun.lock`, lints, builds, and runs registration tests. The existing Docker publishing workflow remains in place. No route redirects or hosting changes are needed.

## Content sources

- [Existing devotional photograph, BAPS](https://www.baps.org/Data/Sites/1/Media/GalleryImages/9742/WebImages/Aksharpurshottam_Maharaj_f.jpg), now served from `public/images/akshar-purushottam.jpg`.
- [BAPS Phoenix contact information](https://www.baps.org/phoenix/).
- About-page background and all schedules are adapted from this repository's original content.
- [Next.js upgrade guidance](https://nextjs.org/docs/app/guides/upgrading/version-16).
