# Prashant Adhikari, personal portfolio

Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion for React.
Build contract and decisions: [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md).
Content source of truth: `context/PORTFOLIO_BRIEF.md`.

## Run

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything is optional in development
npm run dev                  # http://localhost:3000
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Copy lint, then production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint with the accessibility rules raised |
| `npm run typecheck` | Route type generation plus `tsc --noEmit` |
| `npm run check:copy` | Fails on em dashes, emoji or banned marketing words in `src` |
| `npm run check:placeholders` | Guards against `[ADD:]` markers or stand-in images creeping back in (`--strict` fails) |
| `npm run verify:images` | HEAD-requests every image in `src/data/images.ts` |
| `npm run optimize:images` | Converts JPG and PNG under `public/images` to WebP |
| `npm run test:e2e` | Playwright suite: metadata, one H1, breadcrumbs, redirects, 404, robots, sitemap, OG images, link crawl, axe, contact form, header dropdowns, blog |

## Where things live

- `src/data/` holds every word of copy and every fact. Components contain no prose.
- `src/data/images.ts` holds every image. Swap a photo by editing one entry (see the file header).
- `src/app/globals.css` holds every design token and the type scale.
- `src/components/ui` are primitives, `src/components/layout` the shell, `src/components/sections` the page sections.
- `src/app/contact/actions.ts` is the contact form server action (honeypot, timing token, rate limit, Zod, Resend).
- `src/content/blog/` holds blog posts as MDX files; `src/lib/blog.ts` loads them.
- `src/data/nav.ts` holds the header links, including the Work and Community dropdown children.

## Writing a blog post

1. Copy an existing file in `src/content/blog/` to a new name. The file name is the URL slug (`/blog/<file-name>`).
2. Fill in the `meta` export: `title`, `description` (140 to 160 characters), `date` (`YYYY-MM-DD`), optional `updated`, `category`, `tags`, `cover` (an entry from `images.ts`), `originallyPublished` (for pieces that first ran elsewhere) and `draft`.
3. Write the post in markdown below the meta block. Images go under `public/images/blog/` (run `npm run optimize:images`), get an entry in `src/data/images.ts`, and are placed with `<Figure image="entryName" caption="..." />`. Plain `<img src width height alt />` also works.
4. `npm run dev` shows drafts; production builds hide any post with `draft: true` unless the build runs with `SHOW_DRAFT_POSTS=true`. Markdown covers headings, lists, quotes, code and links; the full guide used to live in a draft post and is now this section.
5. Each post gets its own title, description, canonical URL, Open Graph image, Article JSON-LD, breadcrumbs, author bio, related posts and sitemap entry automatically.
6. Two published posts exist: the quantum computing article (March 2025) and the community leadership essay (June 2025), both first printed in CFC Pokhara's Periodical. Both use typographic covers under `public/images/blog/`, set in the site's own type; swap either for a photograph by replacing the file and the `images.ts` entry.

## Testimonials and organisations

- `src/data/testimonials.ts` holds the three quotes (names and roles from Prashant, wording drafted for launch). Confirm the wording with each person, edit there, and optionally add a square `photo` from `images.ts`.
- `src/data/organisations.ts` lists every organisation with Prashant's role. Add a `logo` (monochrome SVG as an `ImageAsset`) to any entry to replace the wordmark.

## Photographs

- Every image on the site is a local WebP under `public/images/<home|about|community|work|blog>/`, cropped to its slot's aspect ratio and registered in `src/data/images.ts`.
- The original photos Prashant supplied are kept in `context/source-images/` (never served). To change a photo, crop the new one to the same aspect ratio, save it as WebP at the same path (or a new one), and update `width`, `height` and `alt` in `images.ts`. `npm run verify:images` confirms every path exists.
- Slots still showing the closest available photo rather than a dedicated one: the Diorite card (portrait), the "Learning to run things early" chapter (portrait), and the Zenox card and feature block (both from the same classroom photo). Replace them when better photos exist.

## Environment

See `.env.example`. In production the contact form renders only when `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` are set, or when `CONTACT_DELIVERY_MODE=log` (QA only). Set `NEXT_PUBLIC_SITE_URL` to the final domain before deploying so canonicals, sitemap, robots and Open Graph URLs are correct.

## Launch checklist

Section 14 of [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md).
