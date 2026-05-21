# ADI Ireland — Driving Instructor Website

A modern, mobile-first single-page website for an RSA Approved Driving Instructor (ADI) in Ireland. Built to attract students, convey trust, and make it easy to book lessons online.

## Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS 3** — dark/slate premium theme (`#0F172A` background, `#FACC15` yellow accent)
- **react-hook-form + Zod** — contact form validation
- **Formspree** — zero-config form submissions (free tier)
- **Calendly** — inline booking widget via `useEffect` script injection
- **Playwright** — end-to-end test suite (183 tests)

## Sections

| Section | ID | Description |
|---|---|---|
| Hero | — | Full-viewport headline, two CTAs, trust bar |
| About | `#about` | Photo, bio, ADI badge, 3 stats |
| Why Choose Me | `#why` | 4 USP cards |
| Services | `#services` | Manual, Automatic, EDT, Pre-Test |
| Pricing | `#pricing` | 4 packages with transparent pricing |
| Testimonials | `#reviews` | 6 Google reviews with star ratings |
| Booking | `#booking` | Calendly inline embed |
| Contact | `#contact` | react-hook-form + Formspree |

## Personalisation

All editable content lives in one file — **`src/lib/constants.ts`**:

```ts
export const SITE = {
  instructorName: '[Your Name]',
  area: '[Your Area, Ireland]',
  phone: '[Your Phone Number]',
  email: '[your@email.com]',
  calendlyUrl: 'https://calendly.com/YOUR-USERNAME',
  adiLicenceNumber: '[ADI Licence No.]',
  pricing: { ... },
  socials: { facebook: '...', instagram: '...' },
}
```

Replace all placeholder values, then update the SEO meta tags in `index.html`.

## Development

```bash
npm install
npm run dev        # → http://localhost:5173
```

## Build

```bash
npm run build      # TypeScript check + Vite bundle → dist/
npm run preview    # Serve the production build locally
```

## Testing

```bash
npm test                  # Run all 183 Playwright tests (headless)
npm run test:headed       # Run with browser visible
npm run test:ui           # Open Playwright UI
npm run test:report       # Show last HTML report
```

Tests cover: navigation (desktop + mobile), hero, about, why-choose, services, pricing, testimonials, booking, contact form, footer, accessibility (landmarks, headings, alt text, ARIA, keyboard nav, focus styles), and responsive layout (375px / 768px / 1280px).

Playwright uses system Chrome (`channel: 'chrome'`) — ensure Google Chrome is installed.

## Environment Variables

Create a `.env` file (never commit it):

```
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

See `.env.example` for the template. Get a free endpoint at [formspree.io](https://formspree.io).

## Deployment

The `dist/` folder is a fully static site. Deploy for free to:

- **Netlify** — drag-and-drop `dist/`, or connect the Git repo for auto-deploy on push
- **Vercel** — `npx vercel` from the project root
- **GitHub Pages** — use the `gh-pages` npm package
