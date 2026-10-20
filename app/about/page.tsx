import { DesignPage } from "@/components/DesignPage";
import { designMetadata, designPages } from "@/lib/design";

export const metadata = designMetadata("About");
export default function AboutPage() { return <DesignPage page={designPages.About} />; }
