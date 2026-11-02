/**
 * Signed timestamp used for the minimum-fill-time check. The token is a
 * base64url payload "issuedAt.signature". A bot that posts the form in under
 * MIN_FILL_MS, or replays a token older than MAX_AGE_MS, is rejected.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { serverEnv } from "@/lib/env";

export const MIN_FILL_MS = 3_000;
export const MAX_AGE_MS = 2 * 60 * 60 * 1000;

function secret(): string {
  // A fallback keeps development working; production should set the secret.
  return serverEnv.contactFormSecret || "development-only-secret-change-me";
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function issueFormToken(now = Date.now()): string {
  const issued = String(now);
  return `${issued}.${sign(issued)}`;
}

export function verifyFormToken(
  token: string | null,
  now = Date.now(),
): { ok: true } | { ok: false; reason: "missing" | "invalid" | "too_fast" | "expired" } {
  if (!token) return { ok: false, reason: "missing" };
  const [issued, signature] = token.split(".");
  if (!issued || !signature) return { ok: false, reason: "invalid" };

  const expected = sign(issued);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b))
    return { ok: false, reason: "invalid" };

  const age = now - Number(issued);
  if (Number.isNaN(age) || age > MAX_AGE_MS) return { ok: false, reason: "expired" };
  if (age < MIN_FILL_MS) return { ok: false, reason: "too_fast" };
  return { ok: true };
}
