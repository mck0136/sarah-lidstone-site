import { affiliations } from "@/content/site";

export function AffiliationStrip() {
  return (
    <section className="border-y border-warmGray bg-paper" aria-label="Verified affiliations">
      <div className="mx-auto grid max-w-7xl gap-px px-5 py-4 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        {affiliations.map((affiliation) => (
          <div
            key={affiliation}
            className="flex min-h-16 items-center justify-center rounded bg-ivory px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-slate/70"
          >
            {affiliation}
          </div>
        ))}
      </div>
    </section>
  );
}
