"use client";

import { useState } from "react";
import { contactEmail, inquiryRoutes } from "@/content/site";

type Errors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [mailToHref, setMailToHref] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const organization = String(data.get("organization") ?? "").trim();
    const route = String(data.get("route") ?? "Professional inquiry").trim();
    const message = String(data.get("message") ?? "").trim();
    const consent = data.get("consent");

    if (!name) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (message.length < 20) {
      nextErrors.message = "Please include a brief professional inquiry.";
    }
    if (!consent) {
      nextErrors.consent = "Please confirm this inquiry does not include health details.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      const subject = `${route} from ${name}`;
      const body = [
        `Inquiry type: ${route}`,
        `Name: ${name}`,
        `Email: ${email}`,
        organization ? `Organization: ${organization}` : null,
        "",
        "Message:",
        message,
        "",
        "Privacy confirmation: Sender confirmed this is not a patient intake request and did not include personal health information or urgent medical details."
      ]
        .filter((line): line is string => line !== null)
        .join("\n");
      const mailTo = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      setMailToHref(mailTo);
      setSubmitted(true);
      event.currentTarget.reset();
      window.location.href = mailTo;
    }
  }

  return (
    <form
      className="rounded border border-warmGray bg-paper p-6 shadow-sm"
      onSubmit={handleSubmit}
      noValidate
    >
      {submitted ? (
        <div
          className="mb-6 rounded border border-oxblood/25 bg-blush/20 p-4 text-sm leading-7 text-charcoal"
          role="status"
        >
          Your email app should open a draft addressed to{" "}
          <a className="font-semibold text-oxblood underline" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          . If it does not open, use the button below.
          {mailToHref ? (
            <a
              className="mt-3 inline-flex rounded border border-oxblood px-4 py-2 font-semibold text-oxblood"
              href={mailToHref}
            >
              Open Email Draft
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate">Inquiry type</span>
          <select
            name="route"
            className="min-h-12 rounded border border-warmGray bg-ivory px-3 text-charcoal focus:border-oxblood focus:outline-none focus:ring-2 focus:ring-oxblood/20"
          >
            {inquiryRoutes.map((route) => (
              <option key={route.title}>{route.title}</option>
            ))}
          </select>
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate">Name</span>
            <input
              name="name"
              className="min-h-12 rounded border border-warmGray bg-ivory px-3 text-charcoal focus:border-oxblood focus:outline-none focus:ring-2 focus:ring-oxblood/20"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name ? (
              <span id="name-error" className="text-sm text-oxblood">
                {errors.name}
              </span>
            ) : null}
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate">Email</span>
            <input
              name="email"
              type="email"
              className="min-h-12 rounded border border-warmGray bg-ivory px-3 text-charcoal focus:border-oxblood focus:outline-none focus:ring-2 focus:ring-oxblood/20"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email ? (
              <span id="email-error" className="text-sm text-oxblood">
                {errors.email}
              </span>
            ) : null}
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate">Organization</span>
          <input
            name="organization"
            className="min-h-12 rounded border border-warmGray bg-ivory px-3 text-charcoal focus:border-oxblood focus:outline-none focus:ring-2 focus:ring-oxblood/20"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate">Professional inquiry</span>
          <textarea
            name="message"
            rows={6}
            className="rounded border border-warmGray bg-ivory px-3 py-3 text-charcoal focus:border-oxblood focus:outline-none focus:ring-2 focus:ring-oxblood/20"
            placeholder="Please do not include personal health information, symptoms, medical history, or urgent clinical details."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message ? (
            <span id="message-error" className="text-sm text-oxblood">
              {errors.message}
            </span>
          ) : null}
        </label>

        <label className="flex gap-3 text-sm leading-6 text-charcoal/78">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 h-4 w-4 rounded border-warmGray text-oxblood focus:ring-oxblood"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            I understand this is not a patient intake form and I have not included
            personal health information or urgent medical details.
          </span>
        </label>
        {errors.consent ? (
          <span id="consent-error" className="text-sm text-oxblood">
            {errors.consent}
          </span>
        ) : null}

        <button
          type="submit"
          className="min-h-12 rounded border border-oxblood bg-oxblood px-5 py-3 text-sm font-bold text-white transition hover:bg-[#5b1d20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxblood"
        >
          Prepare Inquiry
        </button>
      </div>
    </form>
  );
}
