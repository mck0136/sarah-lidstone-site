import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { navigation } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-warmGray bg-slate text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <BrandLogo variant="footer" />
          <p className="mt-5 max-w-md font-serif text-3xl leading-tight">
            Neurology that sees the whole person.
          </p>
          <p className="mt-4 max-w-lg leading-7 text-white/70">
            A personal-professional site for research, speaking, public education,
            and professional collaboration. This website is not a patient intake
            channel.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-blush">
            Explore
          </h2>
          <ul className="mt-4 grid gap-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link className="text-white/76 hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-blush">
            Site Notes
          </h2>
          <ul className="mt-4 grid gap-2 text-white/76">
            <li>
              <Link className="hover:text-white" href="/privacy">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/accessibility">
                Accessibility statement
              </Link>
            </li>
            <li>No analytics or advertising cookies are configured.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/55">
        <p>
          Copyright {new Date().getFullYear()} Dr. Sarah Lidstone. Content requires
          final approval before publication.
        </p>
      </div>
    </footer>
  );
}
