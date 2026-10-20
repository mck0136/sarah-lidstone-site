import { DesignPage } from "@/components/DesignPage";
import { designMetadata, designPages } from "@/lib/design";

export const metadata = designMetadata("Creative");
export default function CreativePage() { return <DesignPage page={designPages.Creative} />; }
