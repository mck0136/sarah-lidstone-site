import type { Metadata } from "next";
import data from "@/content/design-pages.json";
import type { DesignPageRecord } from "@/components/DesignPage";

export const designPages = data as Record<string, DesignPageRecord>;

const labels: Record<string, string> = {
  Home: "Neurology that sees the whole person",
  About: "About", Research: "Research", Speaking: "Speaking & Media",
  IntegratedCare: "Integrated Care", Consulting: "Consulting", Creative: "Creative",
  Education: "Education", Contact: "Contact", Privacy: "Privacy Policy", Accessibility: "Accessibility"
};

export function designMetadata(name: string): Metadata {
  const page = designPages[name];
  return {
    title: labels[name] || page.title,
    alternates: { canonical: page.slug || "/" },
    openGraph: { title: labels[name] + " | Dr. Sarah Lidstone", url: page.slug || "/" }
  };
}
