import type { Metadata } from "next";
import { DisclaimerBlock } from "@/components/DisclaimerBlock";
import { EditorialHeading } from "@/components/EditorialHeading";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Brain. Mind. Body.",
  description:
    "Accessible educational page explaining integrated neurological care, multidisciplinary rehabilitation, patient education, and evidence-led non-dismissive care."
};

const sections = [
  {
    title: "Why healthcare silos can fail patients",
    body: "Patients with complex neurological symptoms can be harmed when care treats physical and mental health as separate worlds. Integrated care starts from a different premise: symptoms are real, experience matters, and different disciplines often need to work together."
  },
  {
    title: "The role of multidisciplinary care",
    body: "Neurology, psychiatry, psychology, physiotherapy, rehabilitation, nursing, and education can each hold part of the picture. The goal is not more appointments for their own sake. It is clearer shared understanding and coordinated action."
  },
  {
    title: "Rehabilitation and functional recovery",
    body: "Rehabilitation can help translate diagnosis into practical change: movement, confidence, function, pacing, and everyday goals. For functional movement disorders, rehabilitation is often most useful when it is linked with education and mental health-informed care."
  },
  {
    title: "Patient education and self-management",
    body: "Good education does not minimize symptoms. It gives people a framework for understanding what is happening, why treatment can work, and how self-management can support clinical care."
  },
  {
    title: "Treating symptoms seriously without false divisions",
    body: "Integrated care rejects the harmful idea that symptoms are either physical or imagined. A brain-mind-body model can recognize real symptoms while still using the best available evidence for recovery."
  },
  {
    title: "Evidence-led, non-dismissive care",
    body: "Compassion and rigor belong together. The strongest care is careful about diagnosis, honest about uncertainty, and respectful of the person living with illness."
  }
];

export default function IntegratedCarePage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <EditorialHeading
        eyebrow="Integrated Care"
        title="Brain. Mind. Body."
        body="A clear, evidence-based approach to neurological care that considers the full person—not just the diagnosis."
        level="h1"
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className="rounded border border-warmGray bg-paper p-6">
            <h2 className="font-serif text-3xl font-semibold leading-tight text-slate">
              {section.title}
            </h2>
            <p className="mt-4 leading-8 text-charcoal/76">{section.body}</p>
          </article>
        ))}
      </div>

      <section className="mt-12 rounded border border-oxblood/18 bg-blush/18 p-8">
        <SectionLabel>Plain Language Summary</SectionLabel>
        <h2 className="font-serif text-4xl font-semibold leading-tight text-slate">
          More integrated care is not less scientific. It is more complete.
        </h2>
        <p className="mt-5 max-w-4xl leading-8 text-charcoal/76">
          The practical meaning of brain-body connection in evidence-led medicine is
          that clinicians do not have to choose between biology and lived experience.
          A person can have real neurological symptoms, real distress, real physical
          limitations, and real potential for learning, rehabilitation, and change.
        </p>
      </section>

      <div className="mt-10">
        <DisclaimerBlock />
      </div>
    </section>
  );
}
