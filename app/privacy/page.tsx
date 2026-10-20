import { DesignPage } from "@/components/DesignPage";
import { designMetadata, designPages } from "@/lib/design";

export const metadata = designMetadata("Privacy");
export default function PrivacyPage() { return <DesignPage page={designPages.Privacy} />; }
