# IMPLEMENTATION_PLAN.md

**Project:** Personal portfolio for Prashant Adhikari, Pokhara, Nepal
**Source of truth:** `context/PORTFOLIO_BRIEF.md` (Draft v1, 31 Oct 2026) and `context/Prashant Latest CV 2026 (1).pdf`
**Stack:** Next.js (App Router), TypeScript (strict), Tailwind CSS v4, Motion for React
**Plan date:** 1 November 2026
**Status:** Implemented 2 November 2026 through Phase 6. See "Build log" at the end for what changed during implementation.

This document is the build contract. Every later coding session should read it first and follow it. Where this plan deviates from the brief, the deviation is stated and the reason given.

---

## 1. Audit of available materials

### 1.1 What exists

| Path | Contents | Usable for |
| --- | --- | --- |
| `context/PORTFOLIO_BRIEF.md` | 48 KB brief: positioning, sitemap, section-by-section copy, fact sheet, visual tokens, typography scale, layout tokens, motion spec, asset list, SEO and accessibility requirements, list of unverified claims | Everything. This is the only design and content specification. |
| `context/Prashant Latest CV 2026 (1).pdf` | 1-page CV. Text extracted and cross-checked against the brief. | Fact verification only. Every role, date, number and skill in the brief's Section 6 matches the CV. No new facts were found that the brief omits. |
| `public/images/communities/` | Empty | Destination for real community photos |
| `public/images/personal/` | Empty | Destination for real portraits |
| `public/images/projects/` | Empty | Destination for real project photos |
| `reference/desktop-screenshots/` | Empty | Intended reference layout captures. None supplied. |
| `reference/mobile-screenshots/` | Empty | Intended mobile captures. None supplied. |
| `reference/animations/` | Empty | Intended motion captures. None supplied. |

### 1.2 Consequences of the audit

1. **No reference screenshots exist.** The only description of the reference site is the brief's Section 7 (adapted tokens, type scale, layout tokens, component behaviours) and Section 9.3 (responsive table). Visual fidelity therefore means fidelity to those written specs. If screenshots arrive later, the plan's layout section should be re-checked against them before Phase 3.
2. **No photographs, logos or monogram exist.** Per the user's follow-up instruction, the build uses clearly labelled temporary placeholder photographs from Unsplash, centralised in one file, so that layout, hierarchy, motion and responsiveness can be built now and real assets swapped in by changing a path. See Section 6.
3. **The CV and brief agree.** No fact needs to be reconciled. The brief's [UNVERIFIED] flags still stand and are carried into Section 12.
4. **Several pieces of personal information are missing** (public email, phone decision, domain, exact Zenox orange, personal "why", event dates). These are never invented. Section 12 lists how each gap is handled in the UI.

### 1.3 Local toolchain

Node 26.12.0, npm 11.20.0, git 2.54.0 are installed. The project is not yet a git repository and has no `package.json`. Phase 0 initialises both.

---

## 2. Constraints that override the brief

The user's instructions take precedence over the brief where they conflict. Each is recorded here so the reason behind a deviation is never lost.

| # | User constraint | Effect on the build |
| --- | --- | --- |
| 1 | Only fonts named in the brief; never Inter, Geist or Space Grotesk | Display: **Bebas Neue**. Body and UI: **Manrope**. (The brief offered Inter as an option for body; it is excluded.) |
| 2 | Three feature cards in a row, no bento or asymmetric grids | The "What I do" section becomes a uniform 3-column grid instead of the brief's 4-card asymmetric grid. Card content is regrouped (Section 5.1). H2 becomes `THREE KINDS / OF WORK.` (that copy is tagged SUGGESTED in the brief, so it may change). |
| 3 | Stick to the colours in the brief; no purple, no generic dark theme | Only the Section 7.2 tokens are used, with contrast corrections (Section 4.2). The brief's own palette includes black surfaces for header, hero, community band and footer; those stay because the brief specifies them. If the user wants no black surfaces at all, the single token `--color-black` is remapped to `--color-ink` (#0F1418). No other change is needed. This is listed as an open question in Section 12. |
| 4 | No obvious hover animations, no animated arrows, no sparkle icons | The brief's "lift 2px with glow" button hover and the "zoom to 102.5%" photo-card hover are **dropped**. Hover states are colour and underline changes only (0.2s). Header hide-on-scroll and section reveal stay because they are scroll behaviours, not hover effects. |
| 5 | No lucide icons, no emojis | Icons are a tiny set of hand-written inline SVGs (`menu`, `close`, `external`) in one component. Social links are text, as the brief's footer already specifies. No emoji anywhere in copy, code comments or commit messages. |
| 6 | No terminal windows, radial orbs, dot grids, liquid glass, rainbow colouring | None are designed. Backgrounds are flat token colours and photographs only. |
| 7 | No em dashes | Copy and code comments use commas, full stops or the word "to" for ranges (the brief already does this). A lint check in `scripts/check-copy.mjs` fails the build if U+2014 appears in `src/data` or `src/app`. |
| 8 | No fake demos, only real content | No invented testimonials, posts, stats, logos or client names. Testimonials and Notes sections are not rendered at launch (data arrays empty, components gated on length). Placeholder photographs are labelled as placeholders on the page and in alt text. |
| 9 | Minimalism and breathing room | Section padding and gaps follow the brief's tokens (84/70/48px). Nothing decorative is added beyond photographs, type and rules. |
| 10 | Do not write "it is not X, it is Y" phrasing | Applies to any new copy written during the build. Brief copy is used as written. |
| 11 | Clear call to action | Every page ends with a CTA band. The header carries a persistent `Get in touch` pill. The hero has one primary button and one text link. |

---

## 3. Component architecture

### 3.1 Directory structure

```
prashant_portfolio/
  context/                      Brief and CV (read only)
  reference/                    Reference captures (currently empty)
  public/
    images/                     Real photographs go here when supplied (webp)
      personal/ projects/ communities/
    og/                         Static OG fallbacks if generated ones are replaced later
  scripts/
    check-placeholders.mjs      Lists every "[ADD: ...]" and placeholder:true still in src/data
    check-copy.mjs              Fails on em dashes, emoji code points, banned words (brief 1.6)
    verify-images.mjs           HEAD-requests every remote image URL in images.ts, fails on non-200
    optimize-images.mjs         Converts supplied JPG/PNG in public/images to webp with sharp
  src/
    app/
      layout.tsx                Root layout: fonts, skip link, Header, Footer, GA, JSON-LD (Person, WebSite)
      page.tsx                  Home
      globals.css               Tailwind import, all design tokens, typography classes, base styles
      not-found.tsx             Custom 404 ("LOST / IN POKHARA?")
      robots.ts                 robots.txt
      sitemap.ts                sitemap.xml
      icon.tsx                  Favicon from the PA monogram (ImageResponse)
      opengraph-image.tsx       Home OG image (1200 x 630)
      about/      page.tsx  opengraph-image.tsx
      work/       page.tsx  opengraph-image.tsx
      community/  page.tsx  opengraph-image.tsx
      contact/    page.tsx  opengraph-image.tsx  actions.ts (server action)
      privacy/    page.tsx  opengraph-image.tsx
    components/
      layout/
        Header.tsx              Client. Sticky, hides on scroll down (Motion)
        MobileMenu.tsx          Client. Floating dark panel, focus trap, Escape closes
        Footer.tsx              Server. Heading, CTA, three link columns, bottom line, photo credits when placeholders are in use
        SkipLink.tsx            First focusable element
        Container.tsx           Width and gutter wrapper
        Section.tsx             Vertical rhythm and surface colour (black | white | grey | warm)
        SectionHead.tsx         Eyebrow + H2 + intro in the 1.5fr/1fr grid
        Breadcrumbs.tsx         Visible breadcrumb nav + BreadcrumbList JSON-LD
        CtaBand.tsx             Reusable end-of-page call to action
      ui/
        Button.tsx              Variants: primary (accent pill), outline, ghost. Renders <a> or <button>
        TextLink.tsx            Underlined inline link, internal or external (external gets rel and marker)
        Eyebrow.tsx             Small uppercase tracked label
        Heading.tsx             Display heading with optional accent line (H1 or H2, level is a prop)
        Monogram.tsx            PA lettermark SVG, light and dark
        SmartImage.tsx          Client. next/image + error fallback + placeholder badge
        Icon.tsx                menu | close | external
        Reveal.tsx              Client. Motion whileInView fade-up, honours reduced motion
        Stat.tsx                Number + label for the proof strip
        Pillar.tsx              Numbered pillar row (01 / title / body)
        TimelineRow.tsx         Year + beats row for About
        RoleCard.tsx            Organisation, role, dates, bullets (Work and Community)
        FormField.tsx           Label, input/select/textarea, error, hint, aria wiring
      sections/
        home/   Hero.tsx ProofStrip.tsx WhatIDo.tsx FeatureCard.tsx StoryShort.tsx CommunityBand.tsx ZenoxFeature.tsx
        about/  AboutHero.tsx StoryChapters.tsx Timeline.tsx HowIWork.tsx Education.tsx Skills.tsx Bios.tsx
        work/   WorkHero.tsx VentureBlock.tsx EarlierRoles.tsx
        community/ CommunityHero.tsx RolesCurrent.tsx RolesPast.tsx EventsList.tsx
        contact/ ContactHero.tsx ContactForm.tsx DirectContact.tsx
      seo/
        JsonLd.tsx              Renders a <script type="application/ld+json"> safely
        GoogleAnalytics.tsx     Thin wrapper over @next/third-parties, renders nothing without an ID
    data/                       ALL copy and facts live here. Components contain no prose.
      site.ts                   Name, domain, locale, social URLs, contact details (from env where sensitive)
      nav.ts                    Header and footer link lists
      images.ts                 Every image reference (Section 6)
      home.ts about.ts work.ts community.ts contact.ts privacy.ts notFound.ts
      seo.ts                    Per-page titles, descriptions, canonical paths
    lib/
      metadata.ts               buildMetadata(page) helper: title, description, canonical, OG, Twitter
      schema.ts                 Builders for Person, Organization, WebSite, BreadcrumbList JSON-LD
      contact-schema.ts         Zod schema shared by client and server
      rate-limit.ts             Small in-memory sliding window keyed by IP
      cn.ts                     clsx + tailwind-merge
      motion.ts                 Shared variants and easing; reduced-motion aware
      env.ts                    Typed, validated access to environment variables
    types/
      content.ts                ImageAsset, Role, Event, Stat, Pillar, NavLink, PageSeo
  .env.example
  next.config.ts                images.remotePatterns, redirects, headers
  IMPLEMENTATION_PLAN.md
```

### 3.2 Rendering strategy

- All pages are React Server Components rendered on the server. Pages with no dynamic input are statically generated at build time and served as HTML, which satisfies the server-side rendering requirement and gives the best LCP.
- Client components are limited to: `Header`, `MobileMenu`, `Reveal`, `SmartImage`, `ContactForm`, `GoogleAnalytics`. Each is marked `"use client"` at the leaf so the rest of the tree stays server-only.
- The contact form posts to a server action, so no API route is exposed and no client fetch code is needed.

### 3.3 Reusability rules

1. **No prose in components.** Every string comes from `src/data/*.ts`. This is what lets Prashant edit copy without touching JSX and lets the placeholder checker find gaps.
2. **One image file.** Components receive an `ImageAsset` object; they never hard-code a `src`. Replacing a photo means editing one line in `src/data/images.ts`.
3. **Typography through global classes**, not ad hoc Tailwind size stacks. `.text-display-1`, `.text-display-2`, `.text-stat`, `.text-h3`, `.text-body`, `.text-eyebrow`, `.text-button` are defined once in `globals.css` with the brief's clamp values.
4. **Surfaces through `Section`**. A section declares `surface="black" | "white" | "grey" | "warm"` and the component sets background plus the correct text, muted, eyebrow and rule tokens via CSS variables scoped to that surface. Child components never choose light/dark colours themselves.
5. **Every component file starts with a short header comment**: purpose, where it is used, the data it expects. Non-obvious logic gets an inline comment. No comment restates what the code plainly says.
6. **Accessibility is in the primitive**, not in the page: `Button` always has a focus ring, `SmartImage` always requires `alt`, `FormField` always wires `aria-describedby`.

---

## 4. Design tokens and typography

### 4.1 Token source

Tailwind v4 is configured in CSS, not in a JS config. `globals.css` begins:

```css
@import "tailwindcss";

@theme {
  /* Colour tokens from PORTFOLIO_BRIEF.md 7.2, with contrast corrections (see plan 4.2) */
  --color-black: #000000;
  --color-ink: #0f1418;
  ...
  /* Typography */
  --font-display: var(--font-bebas), "Arial Narrow", sans-serif;
  --font-body: var(--font-manrope), system-ui, sans-serif;
  /* Spacing and layout */
  --container-max: 1320px;
  --radius-pill: 999px;
}
```

Every token is also available as a Tailwind utility (`bg-black`, `text-ink`, `border-line-light`) because `@theme` registers them. Raw hex values never appear in components.

### 4.2 Colour tokens and contrast corrections

The user asked for a highly contrasting site. The brief's palette was measured with the WCAG 2.x relative luminance formula. Results and corrections:

| Token | Brief value | Measured | Decision | Final value |
| --- | --- | --- | --- | --- |
| `--color-black` | #000000 | n/a | Keep | #000000 |
| `--color-ink` (headings on light) | #0F1418 | 18.5:1 on white | Keep | #0F1418 |
| `--color-muted` (body on light) | #5A636B | 6.1:1 on white, 5.6:1 on grey and warm | **Darken** to reach AAA (7:1) on every light surface | #454E56 (7.8:1 on white, 7.8:1 on warm) |
| `--color-eyebrow` | #3C4650 | 9.6:1 | Keep | #3C4650 |
| `--color-grey` | #F4F5F6 | surface | Keep | #F4F5F6 |
| `--color-warm` | #FBF4EE | surface | Keep | #FBF4EE |
| `--color-on-dark` | #E3E6E9 | 16.8:1 on black | Keep | #E3E6E9 |
| `--color-on-dark-muted` | #B4BCC3 | 10.9:1 on black | Keep | #B4BCC3 |
| `--color-line-dark` | #2E3439 | decorative | Keep for rules | #2E3439 |
| `--color-line-light` | #E1E4E7 | decorative | Keep for rules | #E1E4E7 |
| `--color-line-strong` | (new) | 6.1:1 | **Add** for form input borders, which must meet 3:1 as UI components | #5A636B |
| `--color-accent` | #FF6A00 | 7.3:1 on black, **2.9:1 on white** | Keep for the hero accent word on black and for button fills. **Never use as text on light surfaces.** | #FF6A00 |
| `--color-accent-text` | (new) | 5.3:1 on white, 4.9:1 on grey | **Add** for accent words, links and hover states on light surfaces | #B84800 |
| `--color-accent-light` | #FF8A33 | 8.1:1 with on-accent | Keep (reserved, not used by default) | #FF8A33 |
| `--color-accent-dark` | #E05A00 | 5.1:1 with on-accent | Keep for primary button hover fill and focus rings on light surfaces | #E05A00 |
| `--color-on-accent` | #1A0D00 | 6.6:1 on accent | Keep | #1A0D00 |
| `--grad-cta` | 135deg accent-light to accent-dark | | **Not used by default.** Primary buttons are solid `--color-accent` for a flatter, more minimal look and a single guaranteed contrast ratio. The token is kept so the gradient can be switched on in one line if Prashant prefers the brief's look. | kept |

Additional contrast rules enforced in components:

- **Text over photographs** (feature cards, community band, hero on mobile): the overlay gradient ends at `rgba(0,0,0,0.82)` behind any text, so white text is at least 4.5:1 regardless of the photo. The text region also has a minimum solid band on mobile.
- **Focus ring:** 3px outline, 2px offset. `--color-accent-dark` on light surfaces, `--color-accent` on dark surfaces.
- **Placeholder badge:** `--color-on-dark` text on `rgba(0,0,0,0.75)`.
- **Accent word in H1 on the black hero:** `--color-accent` (7.3:1). Accent word in H2 on white or grey: `--color-accent-text` (5.3:1).

### 4.3 Typography

Fonts load through `next/font/google`, which downloads at build time and self-hosts the WOFF2 files, subsets to Latin, sets `font-display: swap`, and preloads. This satisfies the brief's self-hosting requirement with no manual font files.

| Role | Family | Weights | CSS variable |
| --- | --- | --- | --- |
| Display (H1, H2, stat numbers, monogram) | Bebas Neue | 400 (only weight available) | `--font-bebas` |
| Body, H3, eyebrow, buttons, forms | Manrope | 400, 600, 700 | `--font-manrope` |

Type scale, copied from the brief and exposed as global classes:

| Class | Family | Desktop / mobile size | Line height | Tracking | Case |
| --- | --- | --- | --- | --- | --- |
| `.text-display-1` | Bebas Neue | clamp(64px, min(7.8vw, 13.6svh), 112px) / clamp(50px, 15vw, 88px) | 1.0 | -0.02em | upper |
| `.text-display-2` | Bebas Neue | clamp(44px, 5.45vw, 78px) / clamp(36px, 9.8vw, 56px) | 1.06 | -0.02em | upper |
| `.text-stat` | Bebas Neue | 44px / 34px | 1 | -0.01em | as typed |
| `.text-h3` | Manrope 600 | 26px / 22px | 1.2 | -0.5px | sentence |
| `.text-body` | Manrope 400 | 17px / 16px | 1.65 | normal | sentence |
| `.text-eyebrow` | Manrope 600 | 12px / 11px | 1.5 | 2.2px / 1.6px | upper |
| `.text-button` | Manrope 600 | 15px / 14px | 1.4 | normal | sentence |

Bebas Neue has no bold, so the brief's "400 to 600" display weight resolves to 400. Headlines rely on size and uppercase, not weight.

### 4.4 Layout and spacing tokens

| Token | Value (from brief 7.4) |
| --- | --- |
| Container | `min(1320px, 100% - 112px)`; gutters 36px under 1100px, 20px under 768px, 16px under 360px |
| Section padding | 84px desktop, 70px under 992px, 48px under 768px |
| Section head | grid `1.5fr 1fr`, gap 64px, items end-aligned, 44px margin below |
| Card grid gap | 22px |
| Card padding | 34px; 27px under 1100px; 23px under 360px |
| Radius | 0 on cards, photos, inputs. 999px on buttons only |
| Header height | 76px |
| Button height | 54px (primary and outline), min tap target 44px everywhere |
| Breakpoints | 360, 380, 768, 992, 1100 (custom Tailwind screens in `@theme`) |

---

## 5. Section-to-content-and-asset map

Every string below already exists in the brief. Section numbers in brackets point to the brief.

### 5.1 Home `/`

| # | Section | Surface | Content source | Images (key in images.ts) | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Header | black | nav.ts | `monogram` (SVG component, not a photo) | Links Work, Community, About. Pill `Get in touch` to `/contact`. Hides on scroll down. |
| 2 | Hero | black, full-bleed portrait | brief 5.1 Hero: eyebrow, H1 `BUILDING POKHARA'S / NEXT BUILDERS.` (line 2 accent), sub-line, `Work with me` button, `Read my story` link | `heroPortraitDesktop`, `heroPortraitMobile` | H1 is the only H1 on the page. `priority` image. |
| 3 | Proof strip | black | brief 5.1 Proof strip, 4 stats | none | All four are CV-stated. Evidence status in Section 12. Swap-in alternatives already in data file as a commented second array. |
| 4 | What I do | white | brief 5.1 cards, regrouped into three | `cardZenox`, `cardDiorite`, `cardCommunity` | **Three cards in one row.** Card 1 Zenox Academy (Founder and CEO). Card 2 Diorite Innovation (Technical Project Manager). Card 3 Community and events (merges brief cards 3 and 4: AICN lead, NIC advisor, hackathons; action `My community work` to `/community`, second text link `See events` to `/community#events`). H2 `THREE KINDS / OF WORK.` |
| 5 | My story (short) | grey | brief 5.1 My story, 3 paragraphs, button to `/about` | `storyPortrait` | Photo left, text right on desktop. |
| 6 | Community and events | black | brief 5.1 Community band, 3 numbered pillars, button to `/community` | `communityBand` | Photo left, pillars right. |
| 7 | In their words | white | brief 5.1 | avatars | **Not rendered.** `testimonials: []` in data. Component is built only when real quotes with permission exist. |
| 8 | Zenox Academy feature | warm | brief 5.1 Zenox feature, body, optional cohort line, outbound button, text link to `/about#zenox` | `zenoxFeature` | Light card variant: text left, photo right 58%. |
| 9 | Notes | white | brief 5.1 | none | **Not rendered** until three posts exist. Nav item hidden. |
| 10 | Contact CTA + footer | black | brief 5.1 footer: heading, line, button, three columns, bottom line | none | Footer column "Elsewhere": LinkedIn and GitHub only (CV-confirmed). Other socials appear only when added to `site.ts`. |

### 5.2 About `/about`

| Section | Content source | Images |
| --- | --- | --- |
| Breadcrumbs | Home / About | |
| Hero (short) | H1 `HI, I'M / PRASHANT.`, line | none (typographic hero) |
| Story, 3 chapters with alternating photos | brief 2.1 split at chapter marks in 5.2; chapter 3 has `id="zenox"` | `aboutChapterNewsroom`, `aboutChapterOrganising`, `aboutChapterZenox` |
| Timeline (dark band) | brief 2.2 table | none |
| How I work (3 pillars) | brief 5.2 item 4 | none |
| Education | brief 5.2 item 5 | none |
| Skills and tools | brief 5.2 item 6, four groups | none |
| Short bios | brief 3.4, 3.5, 3.6 rendered as three expandable text blocks with a "Copy text" button. Headshot pack download link appears only when `headshotPack` files exist. | none |
| CTA band | `Want to work together?` to `/contact` | |

The personal "why" paragraph is missing from the story. It is **omitted** from the rendered page rather than shown as `[ADD]`, and tracked in `scripts/check-placeholders.mjs` output through a `TODO_CONTENT` constant in `about.ts`.

### 5.3 Work `/work`

| Section | Content source | Images |
| --- | --- | --- |
| Breadcrumbs | Home / Work | |
| Hero | H1 `I MAKE THINGS / HAPPEN.`, intro | none |
| Zenox Academy `#zenox` | brief 5.3 | `workZenox` |
| Diorite Innovation `#diorite` | brief 5.3 | `workDiorite` |
| AI/ML Micro Degree Program `#aiml` | brief 5.3, "Program Lead" only; no "first" or "university-certified" wording | none |
| Earlier roles | brief 5.3 table, four rows; the 20% figure is **not shown** | none |
| CTA band | `Need a project manager?` (new SUGGESTED line, editable) to `/contact` | |

### 5.4 Community `/community`

| Section | Content source | Images |
| --- | --- | --- |
| Breadcrumbs | Home / Community | |
| Hero | H1 `COMMUNITY / FIRST.`, intro | `communityHero` |
| Current roles | brief 5.4 Current table + AICN context line (no "largest" claim) | none |
| Past roles | brief 5.4 Past table | none |
| Events `#events` | brief 5.4 Events table; CodeFest described as "national-level hackathon"; date and location fields omitted until supplied | `eventHackathon`, `eventWorkshop` |
| Gallery | **Not rendered** until real photos with consent exist | |
| CTA band | `Running an event or community? Let's talk.` to `/contact` | |

`/events` is a permanent redirect to `/community#events` (Section 9.6).

### 5.5 Contact `/contact`

| Section | Content source |
| --- | --- |
| Breadcrumbs | Home / Contact |
| Hero | H1 `SAY / NAMASTE.`, intro |
| Form | fields from brief 5.5; see Section 8 |
| Direct contact | LinkedIn and location always shown. Email and phone lines render only when `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_CONTACT_PHONE` are set, because neither has been approved for publication. |

### 5.6 Privacy `/privacy`

New page required by the user. Plain-language policy covering: what the contact form collects and why, that messages are emailed to Prashant and not stored in a database, Google Analytics 4 usage and how to opt out, no sale of data, contact route for questions. Linked from the footer bottom line. Breadcrumbs Home / Privacy.

### 5.7 404

`not-found.tsx` with H1 `LOST / IN POKHARA?`, line, `Go home` button, black surface, header and footer intact. Returns HTTP 404.

---

## 6. Image strategy

### 6.1 Principles

1. **Temporary placeholders now, real photos later**, exactly as the user requested. The layout is built to the brief's aspect ratios and crops so real photographs drop in without layout changes.
2. **Placeholders are never presented as Prashant, his team or his events.** Each placeholder renders a small `Placeholder image` badge in the corner, its alt text begins with "Placeholder image:", and the footer shows a photo credit line while any placeholder is in use. When Prashant's photos replace them, the badge, prefix and credit line disappear automatically because the data flag changes.
3. **One file controls everything:** `src/data/images.ts`. Components import by key and never see a URL.
4. **Fallbacks:** `SmartImage` catches `onError` and renders a flat surface (`--color-ink` on dark sections, `--color-grey` on light) with the alt text visible in small type, so a failed remote fetch never leaves a blank hole or a broken-image icon.

### 6.2 Data shape

```ts
// src/types/content.ts
export type ImageAsset = {
  /** Local path under /public (preferred) or an absolute https URL */
  src: string;
  /** Meaningful description. Required. Empty string only for purely decorative images. */
  alt: string;
  /** Intrinsic dimensions so next/image can reserve space (CLS 0) */
  width: number;
  height: number;
  /** true while this is a stock stand-in. Drives the badge, alt prefix and credits line. */
  placeholder: boolean;
  /** Shown in the footer credits while placeholder is true */
  credit?: { name: string; source: "Unsplash"; url: string };
  /** CSS object-position for art direction, e.g. "70% 30%" */
  position?: string;
};
```

`src/data/images.ts` exports a single `images` object keyed by descriptive names. Replacing a photo is a one-line change of `src` (and setting `placeholder: false`, which also removes the badge).

### 6.3 Placeholder slot plan

Source: Unsplash (free licence, attribution recorded in `credit`). Specific photo URLs are chosen during Phase 2 by searching the subjects below, and every URL is checked by `scripts/verify-images.mjs` (HTTP 200, correct content type) before it is committed. URLs are not written into this plan because they cannot be verified from here.

| Key | Used in | Aspect / size requested | Subject to search for | Position |
| --- | --- | --- | --- | --- |
| `heroPortraitDesktop` | Home hero, 1100px and up | 16:9 landscape, 2880 x 1600 | Single person at a desk or in a workshop space, low-key lighting, subject on the right third, dark background | `75% 50%` |
| `heroPortraitMobile` | Home hero, under 768px | 3:4 portrait, 1200 x 1600 | Same mood, tighter, subject in upper 60% | `50% 30%` |
| `cardZenox` | What I do card 1 | 9:10 portrait, 900 x 1000 | Small group learning at laptops in a classroom | `50% 50%` |
| `cardDiorite` | What I do card 2 | 9:10, 900 x 1000 | Planning session at a whiteboard or sticky-note wall | `50% 50%` |
| `cardCommunity` | What I do card 3 | 9:10, 900 x 1000 | Audience at a tech meetup or hackathon, from behind | `50% 50%` |
| `storyPortrait` | Home story split | 4:5, 1250 x 1560 | Natural-light workspace or city street, candid | `50% 50%` |
| `communityBand` | Home community band | 10:7, 2200 x 1540, dark tones | Crowd at a hackathon or conference, low light | `50% 50%` |
| `zenoxFeature` | Zenox feature block | 5:6, 1000 x 1200 | Classroom with projector or mentor and learner | `50% 50%` |
| `aboutChapterNewsroom` | About chapter 1 | 4:5 | Video editing or camera workstation | |
| `aboutChapterOrganising` | About chapter 2 | 3:2 | Students collaborating on campus | |
| `aboutChapterZenox` | About chapter 3 | 4:5 | Small cohort around a table with laptops | |
| `communityHero` | Community page hero | 16:9 | Workshop room, people at tables | |
| `eventHackathon` | Community events list | 3:2 | Hackathon floor | |
| `eventWorkshop` | Community events list | 3:2 | Workshop or panel discussion | |
| `workZenox` | Work page block | 3:2 | Teaching or classroom | |
| `workDiorite` | Work page block | 3:2 | Software team at work | |

Not placeholdered (would misrepresent real people or brands): testimonial avatars, Zenox and Diorite logos, community and partner logos, event gallery, headshot pack. Those slots do not render until real files arrive.

### 6.4 Open Graph images

Generated per page with `opengraph-image.tsx` and `ImageResponse` (1200 x 630): black background, name in Bebas Neue, page title, accent word in `--color-accent`, "Pokhara, Nepal" line. **No placeholder photo is used in OG images**, since a stock face next to Prashant's name on a social card would present it as him. When a real portrait exists, it is added to the OG template.

### 6.5 Optimisation and loading

- `next/image` everywhere with `formats: ['image/avif', 'image/webp']` in `next.config.ts`, so remote JPEGs are served as AVIF or WebP. Supplied files are additionally converted to WebP at source by `scripts/optimize-images.mjs` (sharp), sized to the table above.
- `remotePatterns` allows `images.unsplash.com` only. The entry is removed once all placeholders are gone.
- Hero image: `priority`, `fetchPriority="high"`, `sizes="100vw"`. Everything else: default lazy loading with accurate `sizes`.
- Explicit `width` and `height` on every image (from `ImageAsset`) so layout never shifts.
- A neutral background colour on every image wrapper prevents a white flash on dark sections while the image decodes.

---

## 7. Animation approach

Motion for React (`motion` package, imported from `motion/react`) handles the three behaviours that need JavaScript. Everything else is CSS.

| Behaviour | Implementation | Reduced motion |
| --- | --- | --- |
| Section reveal | `Reveal` wraps section content. `initial={{ opacity: 0, y: 12 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.2 }}`, duration 0.5s, ease `[0.22, 1, 0.36, 1]`. Children render immediately on the server, so content is visible without JS. | `useReducedMotion()` returns true: no initial offset, no transition. |
| Header hide on scroll | `useScroll` + `useMotionValueEvent` compares current and previous `scrollY`. Scrolling down past 76px animates `y` to `-100%`; scrolling up returns to `0`. Duration 0.3s. The header is always shown when the mobile menu is open or when a focusable element inside it has focus. | Header stays fixed and visible. |
| Mobile menu | `AnimatePresence` fade and 8px slide, 0.2s. Focus moves into the panel on open, returns to the toggle on close. Escape and backdrop click close it. Body scroll locked while open. | Instant show and hide. |

CSS-only behaviours:

- Button hover: background from `--color-accent` to `--color-accent-dark`, 0.2s. Outline button hover: border and text to accent-text on light, accent on dark. No translation, no shadow, no glow.
- Text link hover: underline opacity 50% to 100% and colour to accent-text, 0.2s.
- Photo cards: no hover effect on the image. The card's action link underlines on hover like any text link.
- Stats: static. No count-up.
- Global: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 0.01ms !important; animation: none !important; } }`.

Bundle discipline: `LazyMotion` with the `domAnimation` feature set and `m` components instead of `motion` components, which keeps the Motion runtime small. Motion is imported only in the three client components above.

No marquee is built at launch because there are no testimonials. If and when it is, it follows the brief's spec (about 120s loop, masked edges, pauses on hover and focus, visible pause button, starts only in view, snap-scroll row under reduced motion).

---

## 8. Contact form, validation and spam protection

### 8.1 Behaviour

- Fields: Name, Email, Organisation (optional), What's this about (select: Event or community, Project management, Zenox Academy, Mentorship, Other), Message.
- Submit button `Send message`. Success message from the brief; the response-time phrase is omitted until Prashant supplies it.
- Progressive enhancement: the form is a plain `<form action={sendMessage}>` bound to a server action. It works without JavaScript. With JavaScript, `useActionState` shows field-level errors and the success state without a page reload, and the submit button is disabled while pending.

### 8.2 Validation

- One Zod schema in `lib/contact-schema.ts` is used on both client and server. Name 2 to 80 chars, valid email, organisation up to 120 chars, topic from the fixed list, message 20 to 2000 chars.
- Native constraints (`required`, `type="email"`, `minLength`, `maxLength`) give immediate browser feedback. Server validation is authoritative.
- Errors render under the field, linked with `aria-describedby`, and the first invalid field receives focus. The success message is in an `aria-live="polite"` region.

### 8.3 Spam protection (layered, no third-party dependency required)

1. **Honeypot**: a visually hidden text field with `tabIndex={-1}` and `autoComplete="off"`. Any value rejects silently with a generic success response.
2. **Minimum fill time**: a hidden field carries an HMAC-signed server timestamp. Submissions under 3 seconds or over 2 hours are rejected.
3. **Rate limit**: 5 submissions per IP per 15 minutes via `lib/rate-limit.ts`. Returns a polite "please try again later" error.
4. **Content checks**: reject messages consisting mostly of URLs (more than 3 links) and strip control characters.
5. **Optional Cloudflare Turnstile**: enabled automatically when `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` are set. Off by default.

### 8.4 Delivery

- Email via Resend's API from the server action. Required env: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (a verified sender on the chosen domain).
- If the keys are **absent in production**, the form is not rendered at all. The contact page shows direct contact methods only. This avoids a form that looks like it works but does not.
- In development without keys, the action logs the payload to the console and returns success, and a visible notice on the page says delivery is disabled in development.

---

## 9. SEO and technical requirements checklist

Each requested item, mapped to its implementation.

| Requirement | Implementation |
| --- | --- |
| Server-side rendering | App Router server components. Static generation at build for all pages, server action for the form. |
| robots.txt | `app/robots.ts`: allow all, disallow nothing public, `sitemap` points to the canonical domain. |
| sitemap.xml | `app/sitemap.ts`: `/`, `/about`, `/work`, `/community`, `/contact`, `/privacy` with `lastModified` and priorities. |
| Unique title tags | `data/seo.ts` holds the brief's titles (9.2). Root layout uses `title.template = "%s | Prashant Adhikari"` only for pages whose brief title does not already include the name. Home uses `title.absolute`. |
| Meta descriptions | 140 to 160 characters each, containing "Prashant Adhikari" and "Pokhara", written in `data/seo.ts`. Phase 1 includes a script check on length. |
| One H1 per page | `Heading` component takes `as="h1"`; each page file renders exactly one. ESLint rule (`jsx-a11y/heading-has-content`) plus a Playwright check that counts H1s. |
| Canonical tags | `metadataBase` from `NEXT_PUBLIC_SITE_URL`; `alternates.canonical` per page via `lib/metadata.ts`. |
| Open Graph images | `opengraph-image.tsx` per route (Section 6.4). `twitter.card = "summary_large_image"`. |
| Custom 404 page | `app/not-found.tsx` (Section 5.7). |
| 301 redirects | `next.config.ts` `redirects()` with `permanent: true` (Section 9.6). |
| Alt text | Required string on `ImageAsset`; `SmartImage` has no default. ESLint `jsx-a11y/alt-text`. |
| WebP images | `next/image` serves AVIF/WebP; supplied originals converted by `scripts/optimize-images.mjs`. |
| Lazy loading | Default for all images except the hero. Below-fold client components are small enough not to need `next/dynamic`. |
| Organization schema | `lib/schema.ts` emits `Organization` for Zenox Academy with `founder` pointing at the `Person` node (`@id` linked). `Person` on Home and About with name, jobTitle, worksFor (Zenox Academy, Diorite Innovation), alumniOf (Pokhara University), address (Pokhara, Nepal), sameAs (LinkedIn, GitHub). `WebSite` on Home. `image` is added only when a real portrait exists. |
| Breadcrumbs | `Breadcrumbs` component on every inner page, visible nav with `aria-label="Breadcrumb"`, plus `BreadcrumbList` JSON-LD. |
| Internal links | Hero to About and Contact; cards to Work anchors and Community; story to About; band to Community; Zenox block to About#zenox; footer to every page; every page CTA to Contact; Work and Community cross-link where the same organisation appears. |
| Google Analytics | GA4 via `@next/third-parties/google` `GoogleAnalytics`, loaded `afterInteractive`, only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. Disclosed in the privacy policy. |
| Search Console | `verification.google` in root metadata from `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. Launch checklist includes submitting the sitemap. |
| Privacy policy | `/privacy` (Section 5.6). |
| Working contact form | Section 8. |
| Spam protection and validation | Section 8.2 and 8.3. |
| Broken links | `scripts/verify-images.mjs` covers images. A Playwright crawl in Phase 6 checks every internal `href` resolves to 200 and every external link in `site.ts` responds. Outbound links: zenoxacademy.com, dioriteinnovation.com, aicommunitynepal.org, linkedin.com/in/reyprashant, github.com/reyprashant. |
| Clear call to action | Header pill, hero primary button, end-of-page CTA band on every page. |
| Colour contrast | Section 4.2. Automated check with axe in Playwright for every page at 390px and 1440px. |

### 9.6 Redirects

| From | To | Reason |
| --- | --- | --- |
| `/events` | `/community#events` | Events merged into Community at launch (brief 4.1) |
| `/notes` | `/` | Notes hidden until three posts exist |
| `/home`, `/index.html`, `/index` | `/` | Common legacy paths |
| `www.<domain>` | apex domain | Configured at the host (Vercel or Cloudflare), not in Next |

All use `permanent: true` (HTTP 308 in Next.js, which is the method-preserving equivalent of 301 and is treated identically by search engines). If a strict 301 status is required by the host, the same rules are set in the host's redirect configuration.

---

## 10. Layouts

### 10.1 Breakpoints

`sm` 360px, `xs` 380px, `md` 768px, `lg` 992px, `xl` 1100px. Mobile first.

### 10.2 Per-area behaviour

| Area | Desktop (1100px and up) | Tablet (768 to 991px) | Mobile (under 768px) |
| --- | --- | --- | --- |
| Header | 76px, monogram left, links centre-right, pill CTA right | Monogram, pill CTA, 40px menu toggle | Monogram, small pill CTA, 40px toggle; floating dark panel below header |
| Hero | `min-height: min(100svh, 920px)`. Portrait fills the right 60% with a left-to-right black gradient. Text block bottom-left, max-width 640px. | Height 72svh. H1 60 to 84px. Portrait right 55%. | Portrait fills top 66% with a heavy bottom fade into black; text block below the fold line with 48px padding. Mobile crop image is swapped in with `<picture>`-style art direction through two `SmartImage`s and `hidden md:block`. |
| Proof strip | 4 columns, top rule, 32px padding | 2 x 2 | 2 x 2, 24px padding |
| What I do | 3 equal columns, gap 22px, each card 9:10 photo with overlay and text at the bottom | 3 equal columns, card padding 27px | 1 column, cards 4:5 |
| Story split | 2 columns `5fr 7fr`, photo left | 2 columns `1fr 1fr` | Stacked, photo first |
| Community band | Photo left 45%, pillars right | Heading, photo, pillars stacked | Same as tablet |
| Zenox feature | Light card, text left 42%, photo right 58% | Same | Stacked, photo first, 4:3 |
| About chapters | Alternating photo and text, 2 columns | Same | Stacked, photo first |
| Timeline | Year column 120px + beats | Same | Year above beats |
| Work and Community role lists | Two columns `1fr 2fr` (meta / detail) | Same | Stacked |
| Contact | Form left 7fr, direct contact right 5fr | Same | Stacked, form first |
| Footer | Heading + CTA row, then 3 columns, then bottom line | 3 columns | Stacked |

### 10.3 Global rules

- `svh` units for hero height.
- No horizontal scroll from 320px up. `overflow-x: clip` on `html` as a safety net, but the cause is always fixed.
- Test widths: 1440, 1280, 1100, 991, 768, 390, 375, 360, 320.

---

## 11. Coding standards

- **TypeScript strict**, `noUncheckedIndexedAccess` on. No `any`.
- **ESLint**: `next/core-web-vitals`, `next/typescript`, `jsx-a11y` strict. **Prettier** with the Tailwind class sorter.
- **Naming**: components PascalCase, files match component names, data files camelCase, CSS variables kebab-case.
- **Comments**: file header comment on every component and data file (purpose, used by, expects). Inline comments only for non-obvious decisions, each stating why.
- **No magic values**: sizes, colours and durations reference tokens or named constants in `lib/motion.ts` and `globals.css`.
- **Accessibility built into primitives** (Section 3.3, rule 6).
- **Environment variables** accessed only through `lib/env.ts`, which validates presence at startup and documents each key. `.env.example` lists every key with a comment.
- **Scripts run in CI and before build**: `check-copy`, `check-placeholders` (warn only until launch, then fail), `verify-images`, `lint`, `typecheck`.
- **Git**: initialise repository in Phase 0; conventional commit messages; one commit per phase milestone.

---

## 12. Missing assets, uncertain details and decisions taken

### 12.1 Information missing (never invented)

| Item | Handling until supplied |
| --- | --- |
| Public email address | Email line hidden on Contact and in footer; `mailto` not rendered; schema omits `email`. Key: `NEXT_PUBLIC_CONTACT_EMAIL`. |
| Whether phone number may be published | Hidden. Key: `NEXT_PUBLIC_CONTACT_PHONE`. |
| Domain | `NEXT_PUBLIC_SITE_URL` defaults to `http://localhost:3000` in dev. Canonicals, sitemap, robots and OG URLs all derive from it. |
| Exact Zenox orange hex | Brief placeholder `#FF6A00` family used. All three accent tokens plus `--color-accent-text` are re-derived and re-measured when the real value arrives. |
| Personal "why" paragraph and life outside work | Omitted from About. Tracked by placeholder script. |
| Pokhara Grandest Hackathon date and venue | Omitted fields in the events table. |
| CodeFest 2025 location and specific responsibilities | Omitted; CV responsibilities used. |
| AI/ML Micro Degree partner institution | Not named. Phrase "university-certified" and "Nepal's first" not used. |
| Preferred reply time | Success message ends after "I read every message." |
| Other social profiles | Only LinkedIn and GitHub shown. |
| Testimonials | Section not rendered. |
| Notes posts | Section and nav item not rendered; `/notes` redirects home. |
| "How I work" confirmation | Rendered as written in the brief (tagged SUGGESTED); flagged for review. |
| Headline choice | Brief's recommendation (Option 2) used on Home; Option 1 variant on Work. |
| Press coverage, speaking | No "Featured in" or Speaking page. |

### 12.2 Assets missing

All items from brief Section 8. Placeholders cover the photo slots listed in Section 6.3 of this plan. Not covered by placeholders: PA monogram (a typographic Bebas Neue lettermark is used and marked temporary in code), Zenox and Diorite logos, community and partner logos, testimonial avatars, event gallery, headshot pack, real OG portrait.

### 12.3 Unverified claims (from brief 10.1) and how the build treats them

| Claim | Treatment |
| --- | --- |
| 150+ programmes, 8,000+ participants, 1,500+ hackathon attendance | Shown in the proof strip and events list because the brief permits CV-stated figures, with the alternative stat set (`2025 / Founded Zenox Academy`, `3.83 / GPA, Dean's List`) ready in `home.ts` for a one-line swap. **Recommendation:** confirm evidence before launch or switch to the alternative set. |
| 500+ students (Mission Abhiyan), 150+ members (Code For Change) | Shown in the Community role descriptions as per brief copy. Same recommendation. |
| 20% efficiency gain | Not shown. |
| "Nepal's first university-certified" | Not shown. |
| "One of Nepal's largest hackathons" | Replaced with "national-level hackathon". |
| Zenox "4.9/5 from 320+ graduates", AICN "largest" | Never repeated. |

### 12.4 Decisions taken in this plan that Prashant or the user should confirm

1. **Three cards instead of four** in "What I do", with Community and Events merged into one card. The Zenox feature block lower on the page already gives Zenox its second appearance, as the brief wants.
2. **Black surfaces stay** (header, hero, community band, footer, timeline) because the brief specifies them. One token change removes them if that was the intent of "ignore black".
3. **Solid accent buttons** instead of the gradient, for minimalism and consistent contrast. Gradient token kept.
4. **Hover zoom and lift removed** per the "no obvious hover animations" rule.
5. **Muted text darkened** from #5A636B to #454E56 and a new #B84800 accent-text token added so no text falls below 4.5:1.
6. **Form hidden when email delivery is not configured** in production, to avoid a non-working form.
7. **Placeholder photos are badged and credited** on the page itself. If a cleaner look is preferred during review, the badge can be reduced to alt-text-only with one flag, but it should stay on until real photos arrive.

---

## 13. Build phases and acceptance criteria

Work proceeds in this order. Each phase ends with the listed checks passing.

| Phase | Scope | Done when |
| --- | --- | --- |
| 0. Scaffold | `git init`; `create-next-app` with TypeScript, Tailwind v4, App Router, `src/` dir, ESLint; add `motion`, `zod`, `clsx`, `tailwind-merge`, `resend`, `@next/third-parties`, `sharp`, dev deps (prettier, jsx-a11y, Playwright, axe); `.env.example`; `next.config.ts` with images, redirects, security headers; fonts in root layout; `globals.css` with all tokens and type classes | `npm run build` passes; tokens visible in a scratch page; fonts load as Bebas Neue and Manrope |
| 1. Data layer | All `src/data/*.ts` written from the brief; `types/content.ts`; `lib/env.ts`; `scripts/check-copy.mjs`, `check-placeholders.mjs` | Scripts run clean; no em dashes or banned words; placeholder report lists exactly the Section 12.1 items |
| 2. Images | `images.ts` with verified Unsplash URLs and credits; `SmartImage` with fallback and badge; `verify-images.mjs` | All URLs return 200; fallback renders when a URL is deliberately broken in a test |
| 3. Primitives and layout | `Container`, `Section`, `SectionHead`, `Heading`, `Eyebrow`, `Button`, `TextLink`, `Icon`, `Monogram`, `Reveal`, `Header`, `MobileMenu`, `Footer`, `SkipLink`, `Breadcrumbs`, `CtaBand` | Keyboard walk through header and mobile menu; focus rings visible on every interactive element; header hides and returns on scroll; reduced motion respected |
| 4. Home page | Hero, ProofStrip, WhatIDo, StoryShort, CommunityBand, ZenoxFeature, footer CTA | Matches Section 10 layouts at all test widths; LCP element is the hero image with priority; one H1; axe passes |
| 5. Inner pages | About, Work, Community, Contact (with form and server action), Privacy, 404 | Each page: one H1, breadcrumbs, canonical, unique title and description, OG image renders, JSON-LD validates in the Rich Results test; form validates and rejects honeypot and fast submissions; 404 returns status 404 |
| 6. SEO, analytics, QA | robots, sitemap, redirects, GA, Search Console meta, Playwright crawl (links, H1 count, axe at 390 and 1440), Lighthouse mobile run | Lighthouse mobile: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100; CLS under 0.1; no broken internal links; redirects return permanent status |
| 7. Handover | README with how to replace images, edit copy, set env keys, run scripts; launch checklist from brief Section 10 | Prashant can swap one image and one paragraph without touching components |

### 13.1 Environment variables

| Key | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Canonicals, sitemap, robots, OG, schema |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | GA4. Analytics off when absent |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Search Console meta tag |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Shows email on Contact and footer, adds to schema |
| `NEXT_PUBLIC_CONTACT_PHONE` | No | Shows phone or WhatsApp line |
| `RESEND_API_KEY` | For form | Email delivery |
| `CONTACT_TO_EMAIL` | For form | Recipient |
| `CONTACT_FROM_EMAIL` | For form | Verified sender |
| `CONTACT_FORM_SECRET` | For form | HMAC key for the timestamp field |
| `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | No | Optional extra bot check |

---

## 14. Launch checklist (from brief Section 10, condensed)

1. Replace every `placeholder: true` image with Prashant's own photos (webp, sizes from Section 6.3) and set the flag false. Confirm consent for identifiable people.
2. Supply monogram SVG, Zenox and Diorite logos.
3. Set domain, public email, phone decision, reply time, exact Zenox orange. Re-run contrast measurements.
4. Decide on proof-strip figures (evidence on file, or switch to the alternative set).
5. Add the personal "why" paragraph.
6. `npm run check:placeholders` reports zero items; switch the script from warn to fail.
7. Configure Resend, GA4 and Search Console keys on the host; submit the sitemap.
8. Add the site URL to LinkedIn and GitHub profiles; ask Zenox, Diorite and AICN to link back (brief 9.2).
9. Run the Phase 6 QA suite against the production URL.

---

## 15. Build log (2 November 2026)

Deviations and additions discovered while implementing, so the plan stays truthful.

- **Next.js 16.4.3** was installed. It ships Turbopack and Cache Components by default. All six pages prerender as static HTML; the contact form token is minted per request behind a Suspense boundary using `connection()`.
- **Reveal animation** is SSR-safe: server HTML is never hidden. After hydration, only elements below the fold are marked pending and fade up on `useInView` (Motion for React) through a CSS transition. Header hide-on-scroll and the mobile menu use Motion components.
- **Image `preload`** replaces the deprecated `priority` prop in Next 16; `images.qualities` is declared as required.
- **Permanent redirects** emit HTTP 308 (Next.js standard, equivalent to 301 for search engines and method-preserving).
- **Contact delivery modes**: `CONTACT_DELIVERY_MODE=log` renders the form and logs submissions for QA deployments; otherwise production requires Resend keys or the form is replaced by direct contact details. The decision is made per request so runtime environment variables apply.
- **OG images** use OFL font files committed under `src/assets/fonts` (Bebas Neue TTF, Manrope 600 WOFF). The variable Manrope TTF crashed the renderer and was replaced by a static weight.
- **Placeholder images** are 15 Unsplash photographs chosen by visual review (contact sheets), cropped by Unsplash to the brief's aspect ratios, with `crop=faces` on the portrait. Four initial picks were swapped after review (hero, community band, community card, Work Zenox, newsroom chapter).
- **Proof strip** renders as a list (`ul`) rather than a definition list, which axe flagged for structure.
- **Playwright QA** lives in `tests/` and runs against a production server on port 3100 (`npm run test:e2e`). Screenshot and crop helpers live in `scripts/qa/`. Final run: 42 passed (desktop 1440px and Pixel 7 projects).
- **Hero image** is a single art-directed `<picture>` with media-scoped preloads so each viewport downloads one file; Manrope ships in 400 and 600 only.
- **Lighthouse, mobile, simulated slow 4G, local build with remote placeholder images** (2 November 2026): Home 94 / 100 / 100 / 100, About 95 / 100 / 100 / 100, Contact 100 / 100 / 100 / 100 (performance / accessibility / best practices / SEO). CLS 0 everywhere. LCP is 3.1s on Home and 3.0s on About under throttling because the largest element is a remote Unsplash photograph or the web-font headline; local WebP photographs and a CDN host are expected to bring this under the 2.5s target. Re-measure on the production URL at launch.


### Changes requested on 2 November 2026 (second round)

- **Content corrections from Prashant.** Zenox Academy was founded in **August 2026**, not August 2025 as the CV said; every date, bio, timeline entry, schema `foundingDate` and card label was updated. His AICN role is **Founder and Community Lead** (he founded the community in November 2025). His Rapid Khabar role was **Manager**; the content-writing description was dropped everywhere.
- **Home page story block replaced.** The newsroom story ("It started with a newsroom") was removed. In its place, `Programmes` lists the programmes he has run with the figure behind each (hackathon audience, Mission Abhiyan students, Code For Change members, Python learners, Zenox cohorts). The proof strip under the hero is unchanged.
- **Organisations section** (`src/data/organisations.ts`): twelve tiles, name as a wordmark until monochrome logos arrive, with role, years and an outbound link where the organisation has a site.
- **Testimonials section** (`src/data/testimonials.ts`): three quote cards in a row. No quote is invented; the entries are visible `[ADD:]` placeholders with a dashed border and a label until real quotes and written permission exist. `check:placeholders` lists them.
- **Header dropdowns.** Work opens Zenox Academy and Diorite Innovation; Community opens Code For Change, AI Community in Nepal and NIC Student Ambassadors Program. Disclosure pattern: label stays a link, a separate button carries `aria-expanded`, hover and arrow keys open, Escape closes and restores focus, blur closes. The mobile panel lists children indented under each parent. The matching role blocks carry the ids `zenox`, `diorite`, `code-for-change`, `aicn`, `nic`.
- **Blog** at `/blog` and `/blog/[slug]`, built on `@next/mdx`. Posts are MDX files in `src/content/blog` exporting a `meta` object. Each post has a unique title, meta description, canonical, Open Graph image (title set in Bebas Neue), Article JSON-LD, breadcrumbs, reading time and a sitemap entry. Drafts are hidden from production builds unless `SHOW_DRAFT_POSTS=true`. The home page shows the three latest published posts and nothing when there are none. `/notes` and `/notes/:slug` now redirect to the blog. One draft post documents how to publish.
- **Schema.** A second `Organization` entry for AI Community in Nepal with `founder` set to the Person; Person `worksFor` includes it.
- **Tests.** New `tests/nav.spec.ts` (dropdown hover, keyboard, Escape, deep-link targets, mobile children) and `tests/blog.spec.ts` (index, post page, Article schema, OG image, sitemap); page and routing suites cover `/blog` and the new redirects.

- **First two posts** (2 November 2026): "Quantum Computing: The Dawn of a New Computational Era" (dated 1 March 2025, Technology) and "In Trying to Lead, I Learned to Be Led by Community" (dated 1 June 2025, Personal Stories), both first published in CFC Pokhara's Periodical and marked as edited versions. Em dashes in the supplied drafts were replaced to satisfy the copy lint; the essay title lost its em dash for the same reason. Posts carry a category, tags, cover, a first-publication credit, the original periodical page as an attributed figure, an author bio and links to the other posts. The leadership cover is a typographic graphic in the site's own type; the quantum cover is an Unsplash placeholder.

- **Third round, 2 November 2026.** Feature cards show only category and title at rest; the summary and links expand on hover or keyboard focus and are always visible on devices without a hover pointer. Proof strip now reads 150+ events, 8,000+ students, 20+ projects shipped, 50+ placements. The programmes list leads with the AI/ML Micro Degree Program (described, at Prashant's instruction, as Nepal's first university-certified AI/ML Micro Degree, initiated by Code For Change Pokhara with AICN, NIC ICT Lab Pokhara and Gandaki University; this overrides the brief's 10.1 caution) and adds rows for events, Diorite projects (20+ shipped, 75% cost savings) and placements. Organisation links added for NIC, Code For Change, LA GRANDEE, Leo Club (Facebook), Brandbuilders, XAV and Pokhara University; Leo District Council 325I Nepal (Public Relations Officer) added to organisations and the community page. New `LogoMark` (orange notched square with PA) replaces the plain text monogram in header and footer; the name shows as a wordmark from the md breakpoint. The how-to draft post was deleted; its content lives in the README.

- **Fourth round, 3 November 2026: real photographs, testimonials, placeholders removed.** Prashant supplied photos under `public/images/{personal,communities,projects}`. Fourteen crops were made with sharp (WebP, quality 82) to each slot's aspect ratio and registered in `images.ts`; the originals moved to `context/source-images/` so nothing unoptimised is served. Mapping: hero = outdoor portrait (square from 768px, 3:4 below); Zenox card and feature = classroom teaching photo (two crops); Diorite card and "early" chapter = blazer portrait; Community card = speaking at the Leo District Council meeting; community band and "founding" chapter = AICN group photo; about "organising" chapter = Leo award photo; community hero = AICN stage line-up; Pokhara Grandest Hackathon event = CodeFest 2024 collage (CFC Pokhara; confirm this is the same event); work Zenox = classroom photo; work AI/ML Micro Degree = the programme poster. The Unsplash quantum cover was replaced by a typographic cover matching the leadership one. CodeFest 2025 and Diorite have no photo (none supplied). Testimonials: three quotes with names and roles given by Prashant (Indra Bahadur Oli, NIC ICT Lab Pokhara; Ramesh Magar, client; Akriti Dhakal, Marketing Lead); the quote text was drafted at his request and should be confirmed with each person. Removed: the `unsplash()` helper, `credit` field, footer photo-credit line, privacy "Images" paragraph, Unsplash `remotePatterns`, `TODO_CONTENT_PERSONAL_WHY`, and the `[ADD:]` testimonial placeholders. `check:placeholders --strict` passes.

- **Docker, 3 November 2026.** `output: "standalone"` added to the Next config. Multi-stage `Dockerfile` (deps, builder, runner on `node:24-alpine`, non-root `nextjs` user, health check), `.dockerignore` and `docker-compose.yml` with a persistent image-cache volume. `NEXT_PUBLIC_*` values are build args because static pages and client bundles are compiled with them; server secrets are runtime env. Verified without Docker on this machine by running `.next/standalone/server.js` from a copy with `public` and `.next/static` added: home, blog index and post, 404 for an unknown slug, OG images, sitemap, static WebP, `/_next/image` and the `/notes` redirect all answered correctly. Turbopack's file tracing already included `src/content/blog` and `src/assets/fonts`; the Dockerfile copies them explicitly as well.

*End of plan.*
