"use server";

import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "That name is a bit long."),
  email: z.email("Please enter a valid email address.").trim().max(200),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more (at least 10 characters).")
    .max(5000, "Please keep it under 5,000 characters."),
});

type Field = keyof z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<Field, string[]>>;
  values?: Partial<Record<Field, string>>;
  /** Changes on every successful send so the form can reset itself. */
  sentAt?: number;
};

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real people never see or fill the "company" field; bots usually do.
  if (String(formData.get("company") ?? "").length > 0) {
    return { status: "success", message: "Thanks, your message is on its way." };
  }

  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  const { name, email, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Email is not configured; logging message instead:", { name, email, message });
      return {
        status: "success",
        message: "Thanks! (Dev mode: email isn't configured yet, so this was logged to the server console.)",
        sentAt: Date.now(),
      };
    }
    return {
      status: "error",
      message: "The form is temporarily unavailable. Please email me directly.",
      values,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again or email me directly.",
      values,
    };
  }

  return {
    status: "success",
    message: "Thanks, your message is on its way. I'll get back to you soon.",
    sentAt: Date.now(),
  };
}
