import { tedxTalk } from "@/content/site";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionLabel } from "@/components/SectionLabel";

type TedxVideoProps = {
  compact?: boolean;
};

export function TedxVideo({ compact = false }: TedxVideoProps) {
  return (
    <section className="rounded border border-oxblood/16 bg-slate text-white shadow-editorial">
      <div className="grid gap-8 p-6 md:grid-cols-[1.08fr_0.92fr] md:p-8 lg:p-10">
        <div className="min-h-[260px] overflow-hidden rounded bg-black">
          <iframe
            className="h-full min-h-[260px] w-full"
            src={tedxTalk.embedUrl}
            title={tedxTalk.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="self-center">
          <SectionLabel>TEDxUofT</SectionLabel>
          <h2 className="font-serif text-3xl font-semibold leading-tight md:text-4xl">
            {compact ? "Challenging the false divide in healthcare" : tedxTalk.shortTitle}
          </h2>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-blush">
            Published December 20, 2024
          </p>
          <p className="mt-5 leading-8 text-white/78">{tedxTalk.summary}</p>
          <ButtonLink
            href={tedxTalk.url}
            external
            variant="light"
            className="mt-7"
          >
            Watch the Full TEDx Talk
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
