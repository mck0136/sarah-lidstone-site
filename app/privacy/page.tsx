import type { Metadata } from "next";
import { EditorialHeading } from "@/components/EditorialHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy placeholder for Dr. Sarah Lidstone's personal-professional website."
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
      <EditorialHeading
        eyebrow="Privacy"
        title="Privacy Policy"
        body="Draft launch policy. Review with legal/privacy counsel before publishing."
        level="h1"
      />
      <div className="mt-10 grid gap-8 leading-8 text-charcoal/76">
        <section>
          <h2 className="font-serif text-3xl font-semibold text-slate">
            No patient intake
          </h2>
          <p className="mt-3">
            This website is for professional inquiries, speaking, media, research,
            and general educational information. It is not designed to collect
            personal health information or provide medical advice.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl font-semibold text-slate">
            Contact form data
          </h2>
          <p className="mt-3">
            The contact form validates required fields in the browser and then opens
            an email draft addressed to the approved recipient. The website does not
            store form submissions. Email is handled by the sender's email client and
            provider, and visitors should not include personal health information.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl font-semibold text-slate">
            Cookies and analytics
          </h2>
          <p className="mt-3">
            No analytics, advertising pixels, or cookie-based tracking are configured
            in this build. Add consent controls before enabling analytics or any
            non-essential cookies.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl font-semibold text-slate">
            External links
          </h2>
          <p className="mt-3">
            The site links to external sources such as PubMed, DOI records, ORCID,
            and YouTube. External websites have their own privacy practices.
          </p>
        </section>
      </div>
    </section>
  );
}
