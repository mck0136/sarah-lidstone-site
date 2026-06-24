import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { ButtonLink } from "@/components/ButtonLink";
import { navigation } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-warmGray bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <Link
          href="/"
          className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxblood"
          aria-label="Dr. Sarah Lidstone home"
        >
          <BrandLogo priority />
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-1 text-sm font-semibold text-slate/78">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-3 py-2 underline-offset-4 hover:text-oxblood hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxblood"
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/contact" className="ml-1 hidden sm:inline-flex">
            Inquire
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
