import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StructuredData } from "@/components/StructuredData";
import { portrait, siteConfig, tedxTalk } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Dr. Sarah Lidstone"
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [portrait.src]
  },
  robots: {
    index: true,
    follow: true
  }
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": ["Person", "Physician"],
  name: "Dr. Sarah Lidstone",
  jobTitle: "Neurologist, researcher, and speaker",
  medicalSpecialty: "Neurology",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA"
  },
  affiliation: [
    { "@type": "Organization", name: "University Health Network" },
    { "@type": "Organization", name: "University of Toronto" },
    { "@type": "Organization", name: "Toronto Western Hospital" },
    { "@type": "Organization", name: "Toronto Rehabilitation Institute" }
  ],
  sameAs: [tedxTalk.url, "https://pubmed.ncbi.nlm.nih.gov/?term=Lidstone+SC%5BAuthor%5D"],
  image: `${siteConfig.url}${portrait.src}`
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <StructuredData data={personSchema} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
