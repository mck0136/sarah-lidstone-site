import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { EditorialHeading } from "@/components/EditorialHeading";
import { PublicationCard } from "@/components/PublicationCard";
import { researchThemes, publications } from "@/content/site";

export const metadata: Metadata = {
  title: "Research & Publications",
  description:
    "Selected peer-reviewed publications by Dr. Sarah Lidstone on functional movement disorder, integrated care, rehabilitation, Parkinson's disease, and placebo science."
};

export default function ResearchPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <EditorialHeading
        eyebrow="Research & Publications"
        title="Research & Publications"
        body="Dr. Lidstone's selected PubMed-indexed work spans functional neurological disorder, functional movement disorder, rehabilitation, Parkinson's disease, placebo science, patient education, and integrated care."
        level="h1"
      />

      <div className="mt-8 flex flex-wrap gap-3">
        {researchThemes.map((theme) => (
          <span
            key={theme}
            className="rounded-full border border-warmGray bg-paper px-4 py-2 text-sm font-semibold text-slate"
          >
            {theme}
          </span>
        ))}
      </div>

      <section className="mt-12 grid gap-6 rounded border border-oxblood/18 bg-blush/16 p-6 md:grid-cols-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-oxblood">
            Featured Areas
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-slate">
            Brain, mind, body, and care pathways.
          </h2>
        </div>
        <div className="md:col-span-2">
          <p className="leading-8 text-charcoal/76">
            The research story is not limited to a single diagnosis. It connects
            movement disorders, functional neurological symptoms, rehabilitation,
            mental health-informed care, expectation, and the practical design of
            clinical services.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink
              href="https://pubmed.ncbi.nlm.nih.gov/?term=Lidstone+SC%5BAuthor%5D"
              external
              variant="secondary"
            >
              PubMed Author Search
            </ButtonLink>
            <ButtonLink
              href="https://orcid.org/0000-0002-0147-0202"
              external
              variant="secondary"
            >
              ORCID
            </ButtonLink>
          </div>
        </div>
      </section>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {publications.map((publication) => (
          <PublicationCard key={publication.title} publication={publication} />
        ))}
      </div>

      <section className="mt-12 rounded border border-warmGray bg-paper p-6">
        <h2 className="font-serif text-3xl font-semibold text-slate">
          Notes on citation data
        </h2>
        <p className="mt-4 leading-8 text-charcoal/76">
          Citation counts are not displayed because reliable Google Scholar citation
          data was not available through a stable public source during this build.
          The source log records citation-data verification as a launch item.
        </p>
      </section>
    </section>
  );
}
