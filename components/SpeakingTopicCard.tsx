type SpeakingTopicCardProps = {
  title: string;
  body: string;
};

export function SpeakingTopicCard({ title, body }: SpeakingTopicCardProps) {
  return (
    <article className="rounded border border-warmGray bg-ivory p-6">
      <h3 className="text-lg font-semibold text-slate">{title}</h3>
      <p className="mt-3 leading-7 text-charcoal/72">{body}</p>
    </article>
  );
}
