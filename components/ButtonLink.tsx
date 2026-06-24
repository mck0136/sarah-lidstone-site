import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "quiet" | "light";
  external?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center rounded px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxblood",
    variant === "primary" &&
      "border border-oxblood bg-oxblood text-white hover:bg-[#5b1d20]",
    variant === "secondary" &&
      "border border-oxblood/35 bg-transparent text-oxblood hover:bg-blush/25",
    variant === "quiet" &&
      "border border-transparent bg-transparent px-0 text-oxblood underline-offset-4 hover:underline",
    variant === "light" &&
      "border border-white bg-white text-oxblood hover:bg-ivory",
    className
  );

  if (external) {
    return (
      <a className={classes} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
