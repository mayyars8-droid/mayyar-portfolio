---
name: testing-mayyar-portfolio
description: Test the Astro lead-magnet portfolio end-to-end. Use whenever you change copy, CTAs, the lead form, the case-study collection, the services pricing, or anything in src/components/ or src/pages/. Combines static-HTML grep checks against the built output with Playwright over CDP for interactivity.
---

# Testing the lead-magnet portfolio

This project is **static HTML at runtime** (Astro SSG). The fastest, most reliable test loop is:

1. Verify content/structure/CTAs against the **built HTML** with `curl` + regex (covers ≈70% of the test plan in seconds).
2. Drive **interactive behavior** (filter clicks, form submission, console errors, reveal-on-scroll, responsive) with Playwright connected to the existing Chrome via CDP.
3. Always submit a **tagged email** when testing the form so the user can identify and delete the entry from Netlify Forms.

Run static checks first — they catch regressions in copy, CTAs, badges, and SEO meta faster than any browser drive.

## Adversarial test framing

For every assertion, ask: **"would this look identical if the change were broken?"** If yes, tighten it.

Examples of weak vs strong:
- Weak: "Hero shows H1" → ANY heading would pass.
- Strong: "H1 contains literal text `Product visuals & video ads, built with AI.` and `with AI.` is wrapped in a span with the coral text color class."
- Weak: "Filter buttons work" → hover effects alone would pass.
- Strong: "After clicking `Design`, exactly N cards remain visible AND all visible cards have `data-category=\"design\"`."

## Layer 1 — static HTML checks (built output)

The Netlify preview URL pattern is `https://deploy-preview-<N>--mayyarz.netlify.app/`. Download the built HTML for each page and grep:

```bash
BASE="https://deploy-preview-5--mayyarz.netlify.app"
mkdir -p /tmp/test_pages
for path in / /services/ /about/ /thanks/ /case-studies/skincare-glowco/; do
  fname=$(echo "$path" | tr '/' '_' | sed 's/^_//; s/_$//')
  [ -z "$fname" ] && fname="home"
  curl -sL "$BASE$path" -o "/tmp/test_pages/$fname.html"
done
```

Then run targeted greps. Typical assertions to verify:

- **Positioning (T1):** `Product visuals & video ads, built with AI.` in `/`.
- **CTAs to Calendly (T2, T7, T16, T17, T23, T25, T28):** `href="https://calendly.com[^"]*"[^>]*target="_blank"`.
- **Zero Linktree anywhere (T18):** `grep -i linktr /tmp/test_pages/*.html` must return nothing.
- **Services prices (T5):** `$400`, `$700`, `$500` + `/month` cadence + `Most popular` badge string.
- **Process renumber (T10):** `// 05 · PROCESS` (not `// 04`).
- **Work filter (T11):** filter buttons present for `ai`, `design`, `motion`, `editing`, `content` but NOT `film`.
- **Form attributes (T14):** `name="free-ai-mock"`, `data-netlify="true"`, `netlify-honeypot="bot-field"`, `action="/thanks"`, hidden `<input name="form-name" value="free-ai-mock">`, and a honeypot wrapper marked `hidden`.
- **SEO meta (T29, T30):** canonical, og:title, og:description, og:image, twitter:card per page — and each page's `<title>` should differ.

## Layer 2 — Playwright over CDP

Devin's Chrome exposes CDP at `http://localhost:29229`. Connect, drive a new page in the existing context, and capture screenshots + interactive results in one script. **Use `wait_until="domcontentloaded"` — `networkidle` is unreliable on this site because of the R3F (`Three.js`) hero and the looping marquee.**

Minimal driver template:

```python
from playwright.sync_api import sync_playwright
import time

BASE = "https://deploy-preview-5--mayyarz.netlify.app"

with sync_playwright() as pw:
    browser = pw.chromium.connect_over_cdp("http://localhost:29229")
    ctx = browser.contexts[0] if browser.contexts else browser.new_context()
    page = ctx.new_page()
    page.set_viewport_size({"width": 1280, "height": 800})

    # Console listeners BEFORE navigation
    console_msgs = []
    page.on("console", lambda m: console_msgs.append((m.type, m.text)))
    page.on("pageerror", lambda e: console_msgs.append(("pageerror", str(e))))

    page.goto(f"{BASE}/", wait_until="domcontentloaded", timeout=45000)
    try: page.wait_for_load_state("load", timeout=15000)
    except: pass
    time.sleep(0.6)
    page.screenshot(path="/home/ubuntu/test_artifacts/hero.png")
```

### Interactive checks worth scripting

- **Filter (T12):** `page.click("button[data-filter='design']")`, then `page.evaluate` to count visible cards by `data-category`.
- **Form submission (T15):** fill `input[name='name']`, `input[name='email']` (use a `devin-test+<unix_ts>@example.com` tag), `textarea[name='product']`, then `page.expect_navigation()` while clicking submit. Verify `page.url` ends with `/thanks` and the H1 text. See "Form testing gotcha" below.
- **Reveal-on-scroll (T33):** scroll to bottom, count `[data-reveal].is-visible` over total `[data-reveal]`. Ratio should be >0.7.
- **Console errors (T32):** filter `console_msgs` by `('error', 'pageerror')`. Expected env warnings (NOT regressions): `THREE.Clock` deprecation, `Automatic fallback to software WebGL`.
- **Responsive (T34/T35):** `set_viewport_size({width: 375, height: 812})` and `{width: 1440, height: 900}`; then `page.evaluate("({sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth})")` — the two should be equal (no horizontal scroll).

## Form testing gotcha — Netlify Forms on deploy previews

**Netlify Forms can return HTTP 404 to POST submissions on deploy-preview URLs even when the form HTML is wired correctly.** This is a Netlify-side detection/config issue, not a code defect. If you see a 404:

1. **First, verify the HTML is correct** (Layer 1 grep for `data-netlify`, hidden `form-name` input, `action="/thanks"`). If those pass, the code is correct.
2. **Then escalate to the user:** ask them to check Netlify dashboard → Site → **Forms** tab and confirm `free-ai-mock` is listed. If it's not listed, form detection may need to be re-enabled in Site settings → Build & deploy → Post processing.
3. Forms detection may also behave differently between **deploy previews vs production** depending on plan/site config — don't assume preview behavior matches production.

Report this finding as **inconclusive (Netlify-side config)**, not as a code bug. Suggest a short remediation list rather than trying to "fix" the codebase.

## File map (where to look when something breaks)

- **Positioning copy:** <ref_file file="/home/ubuntu/repos/mayyar-portfolio/src/components/Hero.astro" />, <ref_file file="/home/ubuntu/repos/mayyar-portfolio/src/components/Marquee.astro" />
- **Services data:** <ref_file file="/home/ubuntu/repos/mayyar-portfolio/src/lib/site.ts" /> (`SERVICES` array). Display: <ref_file file="/home/ubuntu/repos/mayyar-portfolio/src/components/Services.astro" />.
- **Case studies:** <ref_file file="/home/ubuntu/repos/mayyar-portfolio/src/content/case-studies/" /> + schema in <ref_file file="/home/ubuntu/repos/mayyar-portfolio/src/content.config.ts" />. Slug page: <ref_file file="/home/ubuntu/repos/mayyar-portfolio/src/pages/case-studies/[...slug].astro" />.
- **Calendly URL (one place):** <ref_file file="/home/ubuntu/repos/mayyar-portfolio/src/lib/site.ts" /> — `SITE.calendly`. Changing this once updates every CTA on the site.
- **Lead form:** <ref_file file="/home/ubuntu/repos/mayyar-portfolio/src/components/LeadMagnet.astro" />.
- **SEO meta:** <ref_file file="/home/ubuntu/repos/mayyar-portfolio/src/layouts/BaseLayout.astro" />.
- **Work filter logic:** <ref_file file="/home/ubuntu/repos/mayyar-portfolio/src/components/Work.astro" />. `data-category` lives on each project card.

## Common false-positive sources

- HTML entity encoding: search for `&amp;` (not just `&`) when grepping for ampersands. Same for `&#39;` (single quote in rendered HTML).
- Astro's `slug`-based collection routing: `entry.id` (e.g. `skincare-glowco`) is the URL slug — filename (`skincare-glowco.md`) must match.
- Netlify trailing-slash 301: `/about` redirects to `/about/`. When checking response codes, follow redirects (`curl -L`) or expect a `301` then `200`.
- The Three.js hero re-runs on viewport resize — give a brief sleep after `set_viewport_size` before screenshotting.

## Local build sanity (before pushing)

```bash
pnpm install            # uses pnpm 9.x
pnpm exec astro check   # 0 errors, 0 warnings expected
pnpm build              # writes ./dist; 8 static pages currently
```

Node version: **>=22.12.0**.

## Devin secrets needed

None for testing. The preview deploy is public.

## Deliverables to leave behind

- Screenshots in `/home/ubuntu/test_artifacts/` (viewport + full-page for the secondary pages and responsive checks).
- A `test_report_*.md` with embedded screenshot URLs, organized by surface (home flow / secondary pages / responsive / SEO / interactive).
- **One** PR comment with collapsed `<details>` sections so the comment isn't a wall of images.
