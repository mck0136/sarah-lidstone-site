import { DesignPage } from "@/components/DesignPage";
import { designMetadata, designPages } from "@/lib/design";

export const metadata = designMetadata("Accessibility");
export default function AccessibilityPage() { return <DesignPage page={designPages.Accessibility} />; }
