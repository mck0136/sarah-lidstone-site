type DisclaimerBlockProps = {
  title?: string;
  children?: React.ReactNode;
};

export function DisclaimerBlock({
  title = "Educational disclaimer",
  children
}: DisclaimerBlockProps) {
  return (
    <div className="rounded border border-oxblood/20 bg-blush/20 p-5 text-sm leading-7 text-charcoal/80">
      <p className="font-bold uppercase tracking-[0.12em] text-oxblood">{title}</p>
      <div className="mt-2">
        {children ?? (
          <p>
            This website provides general educational information and does not replace
            personalized medical advice, diagnosis, or treatment.
          </p>
        )}
      </div>
    </div>
  );
}
