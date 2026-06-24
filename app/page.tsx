import Link from "next/link";
import Image from "next/image";
import { AffiliationStrip } from "@/components/AffiliationStrip";
import { BrandLogo } from "@/components/BrandLogo";
import { ButtonLink } from "@/components/ButtonLink";
import { EditorialHeading } from "@/components/EditorialHeading";
import { PublicationCard } from "@/components/PublicationCard";
import { SectionLabel } from "@/components/SectionLabel";
import { SpeakingTopicCard } from "@/components/SpeakingTopicCard";
import { StructuredData } from "@/components/StructuredData";
import { TedxVideo } from "@/components/TedxVideo";
import { philosophy, portrait, publications, speakingTopics, tedxTalk } from "@/content/site";

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: tedxTalk.title,
  description: tedxTalk.summary,
  thumbnailUrl: tedxTalk.thumbnail,
  uploadDate: tedxTalk.published,
  embedUrl: tedxTalk.embedUrl
};

export default function Home() {
  const featuredPublications = publications.filter((publication) => publication.featured).slice(0, 4);

  return (
    <>
      <StructuredData data={videoSchema} />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[0.96fr_1.04fr] md:py-20 lg:px-8">
        <div className="relative flex flex-col justify-center border-l-8 border-blush pl-6 md:pl-10">
          <BrandLogo variant="hero" priority className="mb-4" />
          <SectionLabel>Neurologist &middot; Researcher &middot; Speaker</SectionLabel>
          <h1 className="serif-balance max-w-3xl font-serif text-5xl font-semibold leading-[0.98] text-slate md:text-7xl">
            Neurology that sees the whole person.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-charcoal/76">
            Dr. Sarah Lidstone is a Toronto neurologist, neuroscientist, researcher,
            and speaker advancing a more integrated understanding of brain health,
            rehabilitation, and patient care.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={tedxTalk.url} external>
              Watch the TEDx Talk
            </ButtonLink>
            <ButtonLink href="/speaking-media" variant="secondary">
              Speaking &amp; Media
            </ButtonLink>
          </div>
        </div>

        <figure className="relative overflow-hidden rounded border border-oxblood/16 bg-blush/20 shadow-editorial">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={896}
            height={1088}
            priority
            className="h-full min-h-[420px] w-full object-cover object-[center_30%] md:min-h-[560px]"
            sizes="(min-width: 1024px) 590px, 100vw"
          />
          <figcaption className="absolute bottom-6 left-6 right-6 max-w-sm rounded border border-oxblood/12 bg-ivory p-5 shadow-editorial">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-oxblood">
              Dr. Sarah Lidstone
            </p>
            <p className="mt-2 text-sm leading-6 text-charcoal/72">
              Neurologist, researcher, educator, and speaker based in Toronto.
            </p>
          </figcaption>
        </figure>
      </section>

      <AffiliationStrip />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <EditorialHeading
          eyebrow="Core Philosophy"
          title="The brain, mind, and body were never separate. Healthcare should not treat them that way."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {philosophy.map((item) => (
            <article key={item.title} className="rounded border border-warmGray bg-paper p-6">
              <span className="text-sm font-bold uppercase tracking-[0.16em] text-oxblood">
                {item.title}
              </span>
              <p className="mt-4 leading-8 text-charcoal/76">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <TedxVideo compact />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <EditorialHeading
            eyebrow="Selected Research"
            title="Research that moves care forward."
          />
          <ButtonLink href="/research" variant="secondary" className="w-fit">
            View Research &amp; Publications
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {featuredPublications.map((publication) => (
            <PublicationCard key={publication.title} publication={publication} />
          ))}
        </div>
      </section>

      <section className="border-y border-warmGray bg-blush/18 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <EditorialHeading
            eyebrow="Speaking"
            title="A clear voice for more human healthcare."
            body="For healthcare conferences, academic institutions, leadership teams, patient organizations, media, podcasts, and medical education programs."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {speakingTopics.slice(0, 4).map((topic) => (
              <SpeakingTopicCard key={topic.title} title={topic.title} body={topic.body} />
            ))}
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl px-5 lg:px-8">
          <ButtonLink href="/contact">Invite Dr. Lidstone to Speak</ButtonLink>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-8 rounded border border-oxblood/18 bg-slate p-8 text-white md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blush">
              Integrated Care
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight md:text-5xl">
              Better care begins when symptoms are treated seriously without false divisions.
            </h2>
          </div>
          <div className="self-end">
            <p className="leading-8 text-white/75">
              Explore the accessible guide to brain, mind, body, multidisciplinary
              care, rehabilitation, education, and self-management.
            </p>
            <Link
              href="/integrated-care"
              className="mt-5 inline-flex font-semibold text-blush underline-offset-4 hover:underline"
            >
              Read the integrated care page
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
