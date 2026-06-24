import { cn } from "@/lib/utils";

type MonogramProps = {
  className?: string;
  small?: boolean;
};

export function Monogram({ className, small = false }: MonogramProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border border-oxblood/45 bg-ivory text-oxblood shadow-sm",
        small ? "h-10 w-10 text-base" : "h-16 w-16 text-2xl",
        className
      )}
      aria-hidden="true"
    >
      <span className="font-serif italic tracking-[0.08em]">SL</span>
    </span>
  );
}
