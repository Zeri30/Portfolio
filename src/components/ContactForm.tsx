"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/app/actions";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "min-h-12 w-full border-0 border-b border-hairline-dark bg-transparent p-0 text-[17px] text-oat placeholder:text-soft outline-none transition-colors focus:border-caramel aria-[invalid=true]:border-[#e88f7a]";

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="text-xs text-[#f0a493]">
      {errors[0]}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const errors = state.errors ?? {};
  // After a successful send the form re-renders empty; on errors it keeps what was typed.
  const values = state.status === "error" ? state.values ?? {} : {};
  const formKey = state.sentAt ?? "draft";

  return (
    <form key={formKey} action={formAction} noValidate className="reveal flex min-w-0 flex-[1_1_420px] flex-col gap-7">
      <div className="flex flex-wrap gap-7">
        <div className="flex flex-[1_1_180px] flex-col gap-1.5">
          <label htmlFor="name" className="text-sm text-dim">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            defaultValue={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
          />
          <FieldError id="name-error" errors={errors.name} />
        </div>
        <div className="flex flex-[1_1_180px] flex-col gap-1.5">
          <label htmlFor="email" className="text-sm text-dim">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            defaultValue={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
          <FieldError id="email-error" errors={errors.email} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm text-dim">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Tell me about the role or project"
          defaultValue={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass} resize-y py-3`}
        />
        <FieldError id="message-error" errors={errors.message} />
      </div>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-13 cursor-pointer items-center gap-3 rounded-full bg-oat px-6.5 text-[15px] font-medium text-roast disabled:cursor-wait disabled:opacity-60"
        >
          <span className="swap">
            <span>{pending ? "Sending…" : "Send message"}</span>
          </span>
          <span aria-hidden="true">→</span>
        </button>
        <p
          role="status"
          aria-live="polite"
          className={`text-sm ${state.status === "error" ? "text-[#f0a493]" : "text-caramel"}`}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
