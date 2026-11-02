/**
 * Typed access to environment variables.
 *
 * Read every variable through this module so that defaults, trimming and
 * "is this feature configured" checks live in one place. Public values are
 * safe to import in client components; server-only values are not exported
 * to the client because this file is only imported from server code for them.
 */

function read(name: string): string {
  return (process.env[name] ?? "").trim();
}

/** Canonical site origin without a trailing slash. */
export const siteUrl: string = (
  read("NEXT_PUBLIC_SITE_URL") || "http://localhost:3000"
).replace(/\/+$/, "");

export const publicEnv = {
  gaMeasurementId: read("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
  googleSiteVerification: read("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION"),
  contactEmail: read("NEXT_PUBLIC_CONTACT_EMAIL"),
  contactPhone: read("NEXT_PUBLIC_CONTACT_PHONE"),
  turnstileSiteKey: read("TURNSTILE_SITE_KEY"),
};

export const serverEnv = {
  /** "resend" (default) sends email; "log" renders the form and only logs, for QA deployments. */
  contactDeliveryMode: (read("CONTACT_DELIVERY_MODE") || "resend") as "resend" | "log",
  resendApiKey: read("RESEND_API_KEY"),
  contactToEmail: read("CONTACT_TO_EMAIL"),
  contactFromEmail: read("CONTACT_FROM_EMAIL"),
  contactFormSecret: read("CONTACT_FORM_SECRET"),
  turnstileSecretKey: read("TURNSTILE_SECRET_KEY"),
  /** "true" includes draft posts in a production build (QA builds only). */
  showDraftPosts: read("SHOW_DRAFT_POSTS") === "true",
};

export const isProduction = process.env.NODE_ENV === "production";

/** True when the contact form can actually deliver email. */
export function isContactDeliveryConfigured(): boolean {
  return Boolean(
    serverEnv.resendApiKey && serverEnv.contactToEmail && serverEnv.contactFromEmail,
  );
}

/** True when submissions should be logged instead of emailed. */
export function isContactLogMode(): boolean {
  return (
    serverEnv.contactDeliveryMode === "log" ||
    (!isProduction && !isContactDeliveryConfigured())
  );
}

/**
 * The form renders in development even without keys (payload is logged), but
 * in production it is hidden unless delivery is configured, so a visitor
 * never meets a form that silently drops their message.
 */
export function shouldRenderContactForm(): boolean {
  return isContactLogMode() || isContactDeliveryConfigured();
}

export function isTurnstileEnabled(): boolean {
  return Boolean(publicEnv.turnstileSiteKey && serverEnv.turnstileSecretKey);
}

/**
 * Draft posts are listed in development and in QA builds made with
 * SHOW_DRAFT_POSTS=true. The flag is read at build time because every blog
 * page is prerendered.
 */
export function shouldShowDraftPosts(): boolean {
  return !isProduction || serverEnv.showDraftPosts;
}
