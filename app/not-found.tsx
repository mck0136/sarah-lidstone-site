import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-oxblood">
        Page not found
      </p>
      <h1 className="mt-4 font-serif text-5xl font-semibold text-slate">
        This page is not available.
      </h1>
      <p className="mt-5 leading-8 text-charcoal/75">
        The site may still be in launch preparation. Return home or use the main
        navigation to continue.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded border border-oxblood bg-oxblood px-5 py-3 text-sm font-bold text-white"
      >
        Return Home
      </Link>
    </section>
  );
}
