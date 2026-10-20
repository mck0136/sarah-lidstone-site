import { DesignPage } from "@/components/DesignPage";
import { designMetadata, designPages } from "@/lib/design";

export const metadata = designMetadata("IntegratedCare");
export default function IntegratedCarePage() { return <DesignPage page={designPages.IntegratedCare} />; }
