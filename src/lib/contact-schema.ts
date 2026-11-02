/**
 * Contact form validation, shared by the client form and the server action.
 * Limits: name 2 to 80, message 20 to 2000, organisation up to 120.
 */
import { z } from "zod";
import { topicOptions } from "@/data/contact";

const MAX_LINKS = 3;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "Name is too long."),
  email: z.email("Please enter a valid email address.").max(254),
  organisation: z
    .string()
    .trim()
    .max(120, "Organisation is too long.")
    .optional()
    .or(z.literal("")),
  topic: z.enum(topicOptions, { error: "Please choose what this is about." }),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters so I know how to help.")
    .max(2000, "Message is too long. Please keep it under 2000 characters.")
    .refine((value) => (value.match(/https?:\/\//gi) ?? []).length <= MAX_LINKS, {
      message: "Please include no more than three links.",
    }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  /** Echoed values so the form keeps what was typed after a server error. */
  values?: Partial<Record<ContactField, string>>;
};

export const initialContactState: ContactFormState = { status: "idle" };
