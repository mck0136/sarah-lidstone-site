import { DesignPage } from "@/components/DesignPage";
import { designMetadata, designPages } from "@/lib/design";

export const metadata = designMetadata("Research");
export default function ResearchPage() { return <DesignPage page={designPages.Research} />; }
