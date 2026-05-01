# mayyar.studio

Portfolio for **Mayyar Al-Sharqawi** — filmmaker, full-stack visual designer, AI specialist.

Built with [Astro 5](https://astro.build) + [Tailwind v4](https://tailwindcss.com) + [React Three Fiber](https://r3f.docs.pmnd.rs).

## Local development

```sh
pnpm install
pnpm dev
```

Site runs at [http://localhost:4321](http://localhost:4321).

## Adding a project

Drop a single Markdown file into [`src/content/projects/`](./src/content/projects):

```yaml
---
title: "My new project"
slug: "my-new-project"
year: 2025
order: 30
category: "film"          # film | editing | motion | content | design | ai
tags: ["Direction", "Editing"]
tagline: "One-line description."
thumbnail: "https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg"
media:
  type: "youtube"         # youtube | image | gallery
  src: "https://www.youtube.com/embed/VIDEO_ID"
featured: false
vertical: false
---

Optional long-form description in Markdown.
```

Frontmatter is validated with Zod via Astro Content Collections — see [`src/content.config.ts`](./src/content.config.ts).

## Build

```sh
pnpm build      # static output -> ./dist
pnpm preview    # preview the production build locally
pnpm exec astro check  # type-check
```

## Stack

| | |
|--|--|
| Framework | Astro 5 (static, zero-JS by default) |
| Styling | Tailwind v4 (`@tailwindcss/vite`) |
| 3D | React Three Fiber + drei |
| Type-check | `astro check` (TypeScript) |
| Content | Astro Content Collections (Markdown + Zod) |

## License

© Mayyar Al-Sharqawi. All rights reserved.
