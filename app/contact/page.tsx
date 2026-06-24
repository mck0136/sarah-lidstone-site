import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { DisclaimerBlock } from "@/components/DisclaimerBlock";
import { EditorialHeading } from "@/components/EditorialHeading";
import { contactEmail, inquiryRoutes } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Professional inquiry routes for speaking and media, research collaboration, and professional inquiries. This site does not provide patient intake."
};

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div>
        <EditorialHeading
          eyebrow="Contact"
          title="Professional inquiries only."
          level="h1"
        />
        <div className="mt-5 max-w-3xl text-lg leading-8 text-charcoal/75">
          <p>
            Please use this form for speaking engagements, media requests, research
            collaborations, and other professional opportunities. Once submitted,
            your inquiry will open a draft email to {contactEmail}.
          </p>
          <p className="mt-5">
            This contact page is not monitored for clinical questions, appointment
            requests, symptoms, medical history, or urgent health concerns. Please do
            not include personal health information.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {inquiryRoutes.map((route) => (
            <article key={route.title} className="rounded border border-warmGray bg-paper p-5">
              <h2 className="font-semibold text-slate">{route.title}</h2>
              <p className="mt-2 leading-7 text-charcoal/72">{route.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <DisclaimerBlock title="Urgent medical issues">
            <p>
              If you are experiencing a medical emergency, call local emergency
              services or go to the nearest emergency department. For personal
              medical questions, contact your treating healthcare team.
            </p>
          </DisclaimerBlock>
        </div>
      </div>

      <ContactForm />
    </section>
  );
}
