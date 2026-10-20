import { DesignPage } from "@/components/DesignPage";
import { designMetadata, designPages } from "@/lib/design";

export const metadata = designMetadata("Speaking");
export default function SpeakingPage() { return <DesignPage page={designPages.Speaking} />; }
