import type { Publication } from "@/content/site";

type PublicationCardProps = {
  publication: Publication;
};

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <article className="grid gap-4 rounded border border-warmGray bg-paper p-6 transition hover:border-oxblood/35">
      <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-slate/65">
        <span>{publication.year}</span>
        <span className="h-1 w-1 rounded-full bg-oxblood/60" aria-hidden="true" />
        <span>{publication.topic}</span>
      </div>
      <div>
        <h3 className="text-xl font-semibold leading-snug text-slate">
          {publication.title}
        </h3>
        <p className="mt-2 text-sm font-semibold text-oxblood">{publication.journal}</p>
      </div>
      <p className="leading-7 text-charcoal/75">{publication.description}</p>
      <div className="flex flex-wrap gap-3 text-sm font-semibold text-oxblood">
        <a
          href={publication.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxblood"
        >
          PubMed
        </a>
        {publication.doi ? (
          <a
            href={`https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxblood"
          >
            DOI
          </a>
        ) : null}
      </div>
    </article>
  );
}
