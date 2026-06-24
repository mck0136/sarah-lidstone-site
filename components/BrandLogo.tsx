import Image from "next/image";
import { logoMonogram } from "@/content/site";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "header" | "hero" | "footer";
};

const variantClasses = {
  header: {
    wrapper: "w-[7.75rem] sm:w-[8.75rem]",
    mark: "h-11 w-[3.1rem] sm:h-12 sm:w-[3.4rem]",
    text: "mt-2 text-[0.39rem] tracking-[0.38em] sm:text-[0.42rem]"
  },
  hero: {
    wrapper: "w-[10.5rem] sm:w-[11.5rem]",
    mark: "h-[5.5rem] w-[6.2rem] sm:h-24 sm:w-[6.75rem]",
    text: "mt-3 text-[0.48rem] tracking-[0.46em] sm:text-[0.52rem]"
  },
  footer: {
    wrapper: "w-[8.75rem]",
    mark: "h-16 w-[4.5rem]",
    text: "mt-3 text-[0.42rem] tracking-[0.4em]"
  }
};

export function BrandLogo({
  className,
  priority = false,
  variant = "header"
}: BrandLogoProps) {
  const classes = variantClasses[variant];

  return (
    <span
      className={cn("inline-flex shrink-0 flex-col items-center text-[#C58B94]", classes.wrapper, className)}
      aria-hidden="true"
    >
      <span className={cn("relative block", classes.mark)}>
        <Image
          src={logoMonogram.src}
          alt=""
          width={logoMonogram.width}
          height={logoMonogram.height}
          priority={priority}
          className="h-full w-full object-contain"
          sizes={
            variant === "hero"
              ? "(min-width: 640px) 108px, 99px"
              : variant === "footer"
                ? "72px"
                : "(min-width: 640px) 54px, 50px"
          }
        />
      </span>
      <span className={cn("block whitespace-nowrap font-sans font-semibold uppercase leading-none", classes.text)}>
        Sarah Lidstone <span aria-hidden="true">&middot;</span> MD
      </span>
    </span>
  );
}
