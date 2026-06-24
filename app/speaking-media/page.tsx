import type { Metadata } from "next";
import Image from "next/image";
import { BlushPanel } from "@/components/BlushPanel";
import { ButtonLink } from "@/components/ButtonLink";
import { EditorialHeading } from "@/components/EditorialHeading";
import { SectionLabel } from "@/components/SectionLabel";
import { SpeakingTopicCard } from "@/components/SpeakingTopicCard";
import { TedxVideo } from "@/components/TedxVideo";
import { mediaPortrait, speakingTopics, tedxTalk } from "@/content/site";

export const metadata: Metadata = {
  title: "Speaking & Media",
  description:
    "Speaking and media profile for Dr. Sarah Lidstone, including TEDxUofT, topics, audiences, bios, and inquiry routes."
};

const audiences = [
  "Healthcare conferences",
  "Academic institutions",
  "Leadership teams",
  "Patient organizations",
  "Media and podcasts",
  "Medical education programs"
];

export default function SpeakingMediaPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <EditorialHeading
          eyebrow="Speaking & Media"
          title="For organizations ready to rethink the divide between physical and mental health."
          body="Dr. Lidstone's public profile is strongest where specialist rigor needs to meet human clarity: medical audiences, interdisciplinary teams, leaders, and the public."
          level="h1"
        />
        <BlushPanel className="self-start">
          <SectionLabel>Media Assets</SectionLabel>
          <div className="grid gap-4">
            <div className="overflow-hidden rounded border border-oxblood/20 bg-ivory">
              <Image
                src={mediaPortrait.src}
                alt={mediaPortrait.alt}
                width={896}
                height={1088}
                className="aspect-square w-full object-cover"
                sizes="(min-width: 1024px) 420px, 100vw"
              />
              <div className="p-5">
                <h2 className="font-semibold text-slate">Approved headshot</h2>
                <p className="mt-2 text-sm leading-6 text-charcoal/70">
                  Current portrait placed for preview. Confirm usage rights and final
                  approved crop before launch.
                </p>
              </div>
            </div>
            <a
              href={mediaPortrait.src}
              download
              className="inline-flex min-h-11 items-center justify-center rounded border border-oxblood/35 bg-transparent px-5 py-3 text-sm font-semibold text-oxblood transition hover:bg-blush/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxblood"
            >
              Download Headshot
            </a>
            <ButtonLink
              href="/downloads/speaker-one-sheet-placeholder.html"
              external
              variant="secondary"
            >
              Download Speaker One-Sheet Placeholder
            </ButtonLink>
          </div>
        </BlushPanel>
      </div>

      <div className="mt-12">
        <TedxVideo />
      </div>

      <section className="mt-16">
        <EditorialHeading
          eyebrow="Speaking Topics"
          title="Authority with enough humanity for people to actually hear it."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {speakingTopics.map((topic) => (
            <SpeakingTopicCard key={topic.title} title={topic.title} body={topic.body} />
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionLabel>Ideal Audiences</SectionLabel>
          <h2 className="font-serif text-4xl font-semibold leading-tight text-slate">
            Built for both specialist rooms and broader public audiences.
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {audiences.map((audience) => (
            <div key={audience} className="rounded border border-warmGray bg-paper p-4 font-semibold text-slate">
              {audience}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded border border-warmGray bg-paper p-8">
        <SectionLabel>Verified Past Appearance</SectionLabel>
        <h2 className="font-serif text-4xl font-semibold text-slate">
          TEDxUofT
        </h2>
        <p className="mt-4 max-w-3xl leading-8 text-charcoal/76">
          Official TEDx Talks video: <span className="font-semibold">{tedxTalk.title}</span>.
          Published December 20, 2024.
        </p>
        <ButtonLink href={tedxTalk.url} external variant="quiet" className="mt-5">
          View on YouTube
        </ButtonLink>
      </section>

      <section className="mt-16 grid gap-5 lg:grid-cols-3">
        <article className="rounded border border-warmGray bg-paper p-6">
          <SectionLabel>Short Bio</SectionLabel>
          <p className="leading-8 text-charcoal/76">
            Dr. Sarah Lidstone is a Toronto neurologist, neuroscientist, researcher,
            and speaker focused on brain, mind, body, rehabilitation, and integrated
            neurological care.
          </p>
        </article>
        <article className="rounded border border-warmGray bg-paper p-6">
          <SectionLabel>Medium Bio</SectionLabel>
          <p className="leading-8 text-charcoal/76">
            Dr. Sarah Lidstone is a Toronto neurologist and neuroscientist whose
            research and speaking focus on functional neurological disorder,
            movement disorders, rehabilitation, patient education, and the need to
            move beyond false divides in healthcare.
          </p>
        </article>
        <article className="rounded border border-warmGray bg-paper p-6">
          <SectionLabel>Extended Bio</SectionLabel>
          <p className="leading-8 text-charcoal/76">
            Dr. Sarah Lidstone brings together clinical neurology, neuroscience,
            rehabilitation, and public education to advocate for more integrated
            care. Her PubMed-indexed work includes functional movement disorder,
            Parkinson's disease, placebo science, multidisciplinary care, and
            functional neurological disorder service models. Her TEDxUofT talk
            challenges the health-care split between physical and mental health.
          </p>
        </article>
      </section>

      <section className="mt-16 rounded border border-oxblood/18 bg-slate p-8 text-white">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blush">
              Inquiries
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold">
              Invite Dr. Lidstone to speak.
            </h2>
            <p className="mt-4 leading-8 text-white/74">
              Use the professional inquiry route for speaking, media, research, and
              institutional conversations. Do not submit patient health information.
            </p>
          </div>
          <ButtonLink href="/contact" variant="light">
            Speaking &amp; Media Inquiry
          </ButtonLink>
        </div>
      </section>
    </section>
  );
}
