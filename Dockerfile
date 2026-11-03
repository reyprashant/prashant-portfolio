# syntax=docker/dockerfile:1.7
#
# Production image for the portfolio (Next.js 16, standalone output).
#
#   docker build -t prashant-portfolio \
#     --build-arg NEXT_PUBLIC_SITE_URL=https://example.com .
#   docker run -p 3000:3000 --env-file .env prashant-portfolio
#
# NEXT_PUBLIC_* values are baked into the static pages and client bundles at
# build time, so they are passed as --build-arg. Server-only secrets (Resend,
# Turnstile, CONTACT_*) are read at runtime and are passed with --env-file.
# See .env.example for the full list.

ARG NODE_VERSION=24

# ---------------------------------------------------------------- deps -----
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app
# libc6-compat is recommended by Next.js for Alpine (sharp and Turbopack binaries).
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# -------------------------------------------------------------- builder ----
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public values compiled into the build. Override with --build-arg.
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID=
ARG NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
ARG NEXT_PUBLIC_CONTACT_EMAIL=
ARG NEXT_PUBLIC_CONTACT_PHONE=
ARG TURNSTILE_SITE_KEY=
ARG SHOW_DRAFT_POSTS=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID \
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=$NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION \
    NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL \
    NEXT_PUBLIC_CONTACT_PHONE=$NEXT_PUBLIC_CONTACT_PHONE \
    TURNSTILE_SITE_KEY=$TURNSTILE_SITE_KEY \
    SHOW_DRAFT_POSTS=$SHOW_DRAFT_POSTS \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

# `npm run build` runs the copy lint first, then `next build`.
RUN npm run build

# -------------------------------------------------------------- runner -----
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Standalone server, traced node_modules, static assets and public files.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# Read from disk at runtime (process.cwd()): blog post list and OG image fonts.
COPY --from=builder --chown=nextjs:nodejs /app/src/content/blog ./src/content/blog
COPY --from=builder --chown=nextjs:nodejs /app/src/assets/fonts ./src/assets/fonts

# The image optimiser writes its cache here; keep it writable for the app user.
RUN mkdir -p .next/cache/images && chown -R nextjs:nodejs .next/cache

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/robots.txt').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
