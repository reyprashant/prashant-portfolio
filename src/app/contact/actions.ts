"use server";

/**
 * Contact form server action.
 *
 * Order of checks (plan section 8.3):
 *   1. honeypot field filled: pretend success, send nothing
 *   2. signed timestamp: missing, invalid, too fast or expired: reject
 *   3. rate limit per IP: 5 per 15 minutes
 *   4. optional Turnstile verification when keys are configured
 *   5. Zod validation: field-level errors returned to the form
 *   6. deliver via Resend, or log in development when not configured
 */
import { headers } from "next/headers";
import { Resend } from "resend";
import { contactForm } from "@/data/contact";
import { isContactLogMode, isTurnstileEnabled, serverEnv } from "@/lib/env";
import {
  contactSchema,
  type ContactField,
  type ContactFormState,
} from "@/lib/contact-schema";
import { verifyFormToken } from "@/lib/form-token";
import { pruneRateLimits, rateLimit } from "@/lib/rate-limit";

const RATE_LIMIT = { limit: 5, windowMs: 15 * 60 * 1000 };

function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function echoValues(formData: FormData): ContactFormState["values"] {
  return {
    name: field(formData, "name"),
    email: field(formData, "email"),
    organisation: field(formData, "organisation"),
    topic: field(formData, "topic"),
    message: field(formData, "message"),
  };
}

async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  return (forwarded?.split(",")[0] ?? h.get("x-real-ip") ?? "unknown").trim();
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const body = new URLSearchParams({
    secret: serverEnv.turnstileSecretKey,
    response: token,
    remoteip: ip,
  });
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  if (!res.ok) return false;
  const json = (await res.json()) as { success?: boolean };
  return json.success === true;
}

export async function sendMessage(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // 1. Honeypot. Real visitors never see or fill the "website" field.
  if (field(formData, "website")) {
    return { status: "success", message: contactForm.success };
  }

  // 2. Minimum fill time and token integrity.
  const tokenCheck = verifyFormToken(field(formData, "formToken") || null);
  if (!tokenCheck.ok) {
    const message =
      tokenCheck.reason === "expired"
        ? "This form sat open for a while. Please reload the page and try again."
        : contactForm.genericError;
    return { status: "error", message, values: echoValues(formData) };
  }

  // 3. Rate limit.
  const ip = await clientIp();
  pruneRateLimits();
  const limit = rateLimit(`contact:${ip}`, RATE_LIMIT);
  if (!limit.allowed) {
    const minutes = Math.max(1, Math.ceil(limit.retryAfterMs / 60_000));
    return {
      status: "error",
      message: `Too many messages from this connection. Please try again in about ${minutes} minute${minutes === 1 ? "" : "s"}.`,
      values: echoValues(formData),
    };
  }

  // 4. Optional Turnstile.
  if (isTurnstileEnabled()) {
    const ok = await verifyTurnstile(field(formData, "cf-turnstile-response"), ip);
    if (!ok) {
      return {
        status: "error",
        message: "The anti-spam check did not pass. Please try again.",
        values: echoValues(formData),
      };
    }
  }

  // 5. Validation.
  const parsed = contactSchema.safeParse({
    name: field(formData, "name"),
    email: field(formData, "email"),
    organisation: field(formData, "organisation"),
    topic: field(formData, "topic"),
    message: field(formData, "message"),
  });
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
      values: echoValues(formData),
    };
  }

  const data = parsed.data;

  // 6. Delivery. Log mode is used in development and QA deployments.
  if (isContactLogMode()) {
    console.info("[contact] log mode; message not emailed:", { ...data, ip });
    return { status: "success", message: contactForm.success };
  }

  try {
    const resend = new Resend(serverEnv.resendApiKey);
    const result = await resend.emails.send({
      from: serverEnv.contactFromEmail,
      to: serverEnv.contactToEmail,
      replyTo: data.email,
      subject: `[Site] ${data.topic}: ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Organisation: ${data.organisation || "(not given)"}`,
        `Topic: ${data.topic}`,
        "",
        data.message,
      ].join("\n"),
    });
    if (result.error) {
      console.error("[contact] resend error", result.error);
      return {
        status: "error",
        message: contactForm.genericError,
        values: echoValues(formData),
      };
    }
    return { status: "success", message: contactForm.success };
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return {
      status: "error",
      message: contactForm.genericError,
      values: echoValues(formData),
    };
  }
}
