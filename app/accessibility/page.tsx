import type { Metadata } from "next";
import { EditorialHeading } from "@/components/EditorialHeading";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Accessibility statement for Dr. Sarah Lidstone's personal-professional website."
};

export default function AccessibilityPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
      <EditorialHeading
        eyebrow="Accessibility"
        title="Accessibility Statement"
        body="This site is designed to be usable, readable, and keyboard accessible across modern devices."
        level="h1"
      />
      <div className="mt-10 grid gap-8 leading-8 text-charcoal/76">
        <section>
          <h2 className="font-serif text-3xl font-semibold text-slate">
            Current accessibility measures
          </h2>
          <p className="mt-3">
            The build uses semantic HTML, visible focus states, high-contrast text,
            responsive layouts, descriptive link text, form labels, error messages,
            and reduced visual clutter.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl font-semibold text-slate">
            Media
          </h2>
          <p className="mt-3">
            The TEDx video is embedded from YouTube. Confirm captions and transcript
            availability before launch, and provide alternate text for any approved
            portrait or downloadable media.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl font-semibold text-slate">
            Feedback
          </h2>
          <p className="mt-3">
            Add an approved accessibility feedback route before publishing. The final
            site should include a monitored email or contact method for accessibility
            issues.
          </p>
        </section>
      </div>
    </section>
  );
}
