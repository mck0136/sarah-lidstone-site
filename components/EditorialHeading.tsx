import { SectionLabel } from "@/components/SectionLabel";
import { cn } from "@/lib/utils";

type EditorialHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  className?: string;
  center?: boolean;
  level?: "h1" | "h2";
};

export function EditorialHeading({
  eyebrow,
  title,
  body,
  className,
  center = false,
  level = "h2"
}: EditorialHeadingProps) {
  const HeadingTag = level;

  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center", className)}>
      {eyebrow ? <SectionLabel>{eyebrow}</SectionLabel> : null}
      <HeadingTag className="font-serif text-4xl font-semibold leading-[1.02] text-slate md:text-5xl">
        {title}
      </HeadingTag>
      {body ? <p className="mt-5 text-lg leading-8 text-charcoal/75">{body}</p> : null}
    </div>
  );
}
