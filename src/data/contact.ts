/**
 * Contact page copy and form configuration. Source: PORTFOLIO_BRIEF.md 5.5.
 * The reply-time phrase is omitted until Prashant supplies it (brief 10.2 item 13).
 */
export const contactHero = {
  eyebrow: "Contact",
  headingLines: ["SAY", "NAMASTE."] as const,
  accentLine: 1,
  intro:
    "Whether you're planning an event, starting a programme, looking for a project manager, or just want advice on getting into tech, I'd like to hear from you.",
};

export const topicOptions = [
  "Event or community",
  "Project management",
  "Zenox Academy",
  "Mentorship",
  "Other",
] as const;

export type TopicOption = (typeof topicOptions)[number];

export const contactForm = {
  heading: "Send a message",
  fields: {
    name: { label: "Name", placeholder: "Your full name" },
    email: { label: "Email", placeholder: "you@example.com" },
    organisation: {
      label: "Organisation",
      hint: "Optional",
      placeholder: "Company, college or community",
    },
    topic: { label: "What's this about", placeholder: "Choose one" },
    message: { label: "Message", placeholder: "Tell me what you're planning and when." },
  },
  submit: "Send message",
  sending: "Sending",
  success: "Thanks. I read every message.",
  genericError:
    "Something went wrong and your message was not sent. Please try again or use the contact details alongside.",
  devNotice:
    "Email delivery is not configured in this environment. Submissions are logged to the server console only.",
  privacyNote:
    "Your message is emailed to me and not stored anywhere else. See the privacy policy.",
};

export const directContact = {
  heading: "Direct",
  intro: "Prefer to reach out directly?",
  labels: {
    email: "Email",
    phone: "Phone or WhatsApp",
    linkedin: "LinkedIn",
    location: "Location",
  },
};

/** Shown in place of the form when delivery is not configured in production. */
export const formUnavailable = {
  heading: "Message me directly",
  body: "The contact form is being set up. In the meantime, the quickest way to reach me is LinkedIn.",
};
