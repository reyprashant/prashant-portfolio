"use client";

/**
 * ContactForm: progressively enhanced form bound to the sendMessage server
 * action. Works without JavaScript; with it, errors and success render in
 * place and the first invalid field receives focus.
 */
import Script from "next/script";
import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { InputField, SelectField, TextareaField } from "@/components/ui/FormField";
import { TextLink } from "@/components/ui/TextLink";
import { sendMessage } from "@/app/contact/actions";
import { contactForm, topicOptions } from "@/data/contact";
import { initialContactState, type ContactField } from "@/lib/contact-schema";

type ContactFormProps = {
  /** Signed timestamp issued on the server when the page rendered. */
  formToken: string;
  /** Shown in development when email delivery is not configured. */
  deliveryDisabled: boolean;
  /** Cloudflare Turnstile site key, when enabled. */
  turnstileSiteKey?: string;
};

const fieldOrder: ContactField[] = ["name", "email", "organisation", "topic", "message"];

export function ContactForm({
  formToken,
  deliveryDisabled,
  turnstileSiteKey,
}: ContactFormProps) {
  const [state, formAction, pending] = useActionState(sendMessage, initialContactState);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // After a server response, move focus to the first invalid field or the status message.
  useEffect(() => {
    if (state.status === "idle") return;
    const firstInvalid = fieldOrder.find((name) => state.fieldErrors?.[name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#contact-${firstInvalid}`)?.focus();
    } else {
      statusRef.current?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="border border-line p-8"
      >
        <h3 className="type-h3 text-fg">Message sent</h3>
        <p className="type-body mt-3 text-fg-muted">{state.message}</p>
      </div>
    );
  }

  const values = state.values ?? {};
  const errors = state.fieldErrors ?? {};

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate={false}
      className="flex flex-col gap-6"
    >
      {deliveryDisabled && (
        <p className="type-small border border-line p-4 text-fg-muted">
          {contactForm.devNotice}
        </p>
      )}

      {/* Spam protection: signed timestamp and honeypot. */}
      <input type="hidden" name="formToken" value={formToken} />
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputField
          id="contact-name"
          name="name"
          label={contactForm.fields.name.label}
          placeholder={contactForm.fields.name.placeholder}
          autoComplete="name"
          required
          minLength={2}
          maxLength={80}
          defaultValue={values.name}
          error={errors.name}
        />
        <InputField
          id="contact-email"
          name="email"
          type="email"
          label={contactForm.fields.email.label}
          placeholder={contactForm.fields.email.placeholder}
          autoComplete="email"
          required
          maxLength={254}
          defaultValue={values.email}
          error={errors.email}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputField
          id="contact-organisation"
          name="organisation"
          label={contactForm.fields.organisation.label}
          hint={contactForm.fields.organisation.hint}
          placeholder={contactForm.fields.organisation.placeholder}
          autoComplete="organization"
          maxLength={120}
          defaultValue={values.organisation}
          error={errors.organisation}
        />
        <SelectField
          id="contact-topic"
          name="topic"
          label={contactForm.fields.topic.label}
          placeholder={contactForm.fields.topic.placeholder}
          options={topicOptions}
          required
          defaultValue={values.topic ?? ""}
          error={errors.topic}
        />
      </div>

      <TextareaField
        id="contact-message"
        name="message"
        label={contactForm.fields.message.label}
        placeholder={contactForm.fields.message.placeholder}
        required
        minLength={20}
        maxLength={2000}
        rows={7}
        defaultValue={values.message}
        error={errors.message}
      />

      {turnstileSiteKey && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="lazyOnload"
          />
          <div
            className="cf-turnstile"
            data-sitekey={turnstileSiteKey}
            data-theme="light"
          />
        </>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={pending} aria-disabled={pending}>
          {pending ? contactForm.sending : contactForm.submit}
        </Button>
        <p className="type-small text-fg-muted">
          {contactForm.privacyNote.replace("See the privacy policy.", "")}
          <TextLink href="/privacy">See the privacy policy.</TextLink>
        </p>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" role="status">
        {state.status === "error" && state.message && (
          <p className="type-body text-accent-text">{state.message}</p>
        )}
      </div>
    </form>
  );
}
