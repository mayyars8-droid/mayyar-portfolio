---
name: testing-mayyar-portfolio
description: End-to-end testing playbook for the Mayyar Al-Sharqawi portfolio (Astro 5 + Tailwind v4 + small vanilla JS). Use when verifying Work filters, lightbox, Reel, AI Lab, Process, Experience, Contact, CV download, SEO/OG/JSON-LD, no-console-errors, responsive 375/768/1100/1440, and accessibility spot checks.
---

# Testing the Mayyar portfolio (Astro)

A single-page Astro site rebuilt as a cinematic creative portfolio. This skill assumes the dev environment is up (`pnpm install` already done by the env config). The flow below is the same one that successfully caught and patched four real bugs in PR #3.

## 1. Boot the dev server
```bash
# In a dedicated background shell — do NOT pipe through head, the pipe gets closed
# and creates a busy shell artefact:
pnpm dev --port 4321 --host 0.0.0.0
# Wait until you see “Local: http://localhost:4321/”, then verify:
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:4321/   # → HTTP 200
```
The Chrome instance Devin uses already exposes CDP at `http://localhost:29229`. Open `localhost:4321` in it before kicking off interaction tests.

## 2. Drive structural checks via the CDP harness
`/home/ubuntu/cdp-eval.mjs` is a tiny `Runtime.evaluate` runner that takes JS on stdin and returns the result. Use it for assertions that would be flaky from screenshots alone (lightbox attributes, work filter counts, JSON-LD shape, console errors):

```bash
echo 'return document.querySelectorAll(".work-cell").length' | node /home/ubuntu/cdp-eval.mjs
```

For console / network capture during a full reload, use `/home/ubuntu/cdp-collect-errors.mjs`. For viewport-emulated responsive screenshots use `/home/ubuntu/cdp-responsive.mjs` (writes `/home/ubuntu/screenshots/responsive/{375,768,1100,1440}.png`).

## 3. Twenty-group test plan

| Group | What to check | How |
|-------|---------------|-----|
| T1 Preloader | Rotator cycles `Filmmaker → Visual Designer → AI Specialist → Motion Designer` | Watch hero on first load |
| T2 Hero | Headline, sub-copy, 3 CTAs (View Work / Contact / Download CV), stat strip | Visual + DOM spot-check |
| T3 Scroll progress | Bar visible at top, sits below header | Scroll, screenshot |
| T4 Active nav | Highlights as you scroll across all 9 sections | Scroll, observe header |
| T5 Mobile menu | Toggle, Esc, body-overflow restored on close | DevTools mobile or CDP `Emulation.setDeviceMetricsOverride` |
| T6 Theme | Light → Dark via toggle, persisted via `localStorage` across reload | Click toggle, reload |
| T7 Content sections | Marquee / Vision / About / Expertise render real content (no Lorem) | Visual scroll |
| T8 Work filters | All=21 / Film=4 / Editing=3 / Motion=2 / Content=3 / Design=9 | Click each tab; counter updates with `aria-selected` |
| T9 Lightbox image | Esc / X / backdrop close + close-then-reopen race regression | Use `/home/ubuntu/test-scripts/t9-reopen-race.js` |
| T10 YouTube lightbox | `?autoplay=1&rel=0`, `allow` carries `accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share`, iframe is removed on close | `t10-lightbox-iframe.js` then `t10-cleanup.js` |
| T11 Vertical lightbox | `.lightbox-frame.vertical` applied for 9:16 entries | Click a vertical-film card, inspect class |
| T12 Reel | Hero stage clickable, supporting strip ≥ 1, no premature empty state | `t12-reel.js` then `t12-reel-fresh.js` (use ≥ 250 ms wait after click) |
| T13 AI Lab | 4-card grid + prompt panel + working lightbox | Click first card, inspect via `t10-lightbox-iframe.js` |
| T14 Process / Experience / Why-Me / Footer | All sections render; Experience shows body copy under each role + education entry | Visual + assert presence of "Overseeing the institution" / "Top Student of the Batch" text |
| T15 Contact | Form `mailto:`, required fields, all socials | `t15-contact-form.js` |
| T16 CV PDF | `GET /Mayyar-Al-Sharqawi-CV.pdf` → `200 application/pdf` | `curl -sI http://localhost:4321/Mayyar-Al-Sharqawi-CV.pdf` |
| T17 SEO | Title, description, canonical, full og:* + twitter:*, valid `Person` JSON-LD — **run against `pnpm build` output (`dist/index.html`)**, not the dev server | `grep -oE '<meta property="og:[^"]+"[^>]*>' dist/index.html` and parse the JSON-LD `<script>` block |
| T18 Console / network | 0 errors, 0 exceptions, 0 network failures (Vite HMR debug noise OK) | `/home/ubuntu/cdp-collect-errors.mjs` |
| T19 Responsive | No horizontal overflow at 375/768/1100/1440 | `/home/ubuntu/cdp-responsive.mjs` |
| T20 A11y | 1 `<h1>`, 35/35 imgs alt-tagged, 0 unnamed buttons/links, skip-link → `#top`, `<main>` / `<nav>` / `<footer>` landmarks | `t20-a11y.js` |

## 4. Gotchas worth remembering

### Astro component-scoped scripts are async ESM in dev mode
Files like `src/components/Work.astro` ship a `<script>` block. In dev mode Vite serves it as a separate ESM module, so an IIFE inside that script may attach handlers AFTER the user can already click. If a button looks correct in the DOM but real user clicks do nothing while CDP-dispatched clicks work, switch to `<script is:inline>`:

```astro
<script is:inline>
  (function () { /* runs synchronously after the markup */ })();
</script>
```

### YouTube bot interstitial
The headless Chrome shows "Sign in to confirm you're not a bot" inside YouTube embeds. That is YouTube's anti-automation behaviour, not a portfolio bug. Verify the iframe attributes (`src`, `allow`, `title`, `allowfullscreen`) via CDP rather than relying on a screenshot of the player.

### Lightbox cleanup race
If you change the close logic, re-run `t9-reopen-race.js`. The fix lives in `BaseLayout.astro` and uses a `lightboxGen` counter so a deferred cleanup from the previous close can't wipe newly-mounted content. Failure mode: open A → close A → reopen B within 400 ms (the fade) → 700 ms later `frame.firstElementChild` is null. Pass: still `is-open` with B's content.

### Reel stage click takes ≥ 250 ms to register `is-open`
The Reel hero opens the lightbox via the same delegated handler as Work cards, but the `requestAnimationFrame` adding `.is-open` plus the CSS transition means a 50-80 ms wait can race. Always wait ≥ 250 ms before reading `lightbox.classList`.

### SEO checks must use the build output
The dev server serves a different `<head>`. Run `pnpm build` first, then grep `dist/index.html` for `<meta property="og:*">`, `<meta name="twitter:*">`, and the `application/ld+json` block.

### Cloudflare Workers Builds is non-required and consistently failing
Ignore that check on PRs. Only Devin Review is required for this repo.

## 5. Authentication / data

- **No login required.** Site is fully static.
- **No secrets needed** for testing; the contact form uses `mailto:`.
- Real CV PDF lives at `public/Mayyar-Al-Sharqawi-CV.pdf` (≈ 198 KB, served as `application/pdf`).

## Devin Secrets Needed
- None.
