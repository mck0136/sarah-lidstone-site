import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { EditorialHeading } from "@/components/EditorialHeading";
import { SectionLabel } from "@/components/SectionLabel";
import { aboutPortrait } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Dr. Sarah Lidstone, her verified public research themes, integrated-care approach, and confirmation-needed launch items."
};

const interests = [
  "Functional neurological disorder",
  "Functional movement disorder",
  "Parkinson's disease",
  "Integrated rehabilitation",
  "Multidisciplinary care",
  "Patient education and self-management",
  "Placebo science and expectation",
  "Brain, mind, and body integration"
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <div>
        <EditorialHeading
          eyebrow="About"
          title="About Dr. Sarah Lidstone"
          body="Movement disorders neurologist, researcher, educator, and advocate for integrated neurological care."
          level="h1"
        />

        <div className="mt-10 grid gap-8 text-lg leading-9 text-charcoal/78">
          <p>
            Dr. Lidstone is a movement disorders neurologist and the Director of
            the Integrated Movement Disorders Program at the Toronto Rehabilitation
            Institute. She is an Assistant Professor of Neurology at the University
            of Toronto.
          </p>
          <p>
            Dr. Lidstone's research focuses on developing and testing rehabilitation
            therapies using the integration of physical and mental health. Her work
            brings together movement disorders, functional neurological disorder,
            rehabilitation, education, and patient experience.
          </p>
          <p>
            She recently gave the TEDx talk "It's All in Your Head," about
            mind-body integration in medicine.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <section className="rounded border border-warmGray bg-paper p-6">
            <SectionLabel>About</SectionLabel>
            <ul className="grid gap-3 leading-7 text-charcoal/78">
              <li>Movement disorders neurologist.</li>
              <li>Director, Integrated Movement Disorders Program.</li>
              <li>Assistant Professor of Neurology, University of Toronto.</li>
              <li>Co-Chair, Functional Neurological Disorders Society Education Committee.</li>
              <li>Researcher focused on integrated physical and mental health rehabilitation.</li>
            </ul>
          </section>

          <section className="rounded border border-warmGray bg-paper p-6">
            <SectionLabel>Education &amp; Training</SectionLabel>
            <ul className="grid gap-3 leading-7 text-charcoal/78">
              <li>Neurology residency, University of Toronto.</li>
              <li>Movement disorders fellowship, University of Toronto.</li>
              <li>
                PhD in Neuroscience, University of British Columbia, studying the
                placebo effect in Parkinson's disease.
              </li>
            </ul>
          </section>
        </div>

        <figure className="mt-12 overflow-hidden rounded border border-oxblood/16 bg-paper shadow-editorial">
          <Image
            src={aboutPortrait.src}
            alt={aboutPortrait.alt}
            width={896}
            height={1088}
            className="max-h-[640px] w-full object-cover object-[center_28%]"
            sizes="(min-width: 1024px) 760px, 100vw"
          />
        </figure>

        <section className="mt-12">
          <EditorialHeading
            eyebrow="Clinical and Research Interests"
            title="A practice of careful integration."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-oxblood/20 bg-blush/18 px-4 py-2 text-sm font-semibold text-slate"
              >
                {interest}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded border border-oxblood/18 bg-slate p-8 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blush">
            Approach
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight">
            Evidence-led compassion is not soft. It is disciplined care.
          </h2>
          <p className="mt-5 max-w-3xl leading-8 text-white/74">
            Dr. Lidstone's approach is scientifically grounded, non-dismissive, and
            oriented toward practical understanding: symptoms are real, patients are
            partners, and recovery requires more than one silo.
          </p>
          <ButtonLink href="/integrated-care" variant="light" className="mt-7">
            Read About Brain, Mind, Body
          </ButtonLink>
        </section>
      </div>
    </section>
  );
}
