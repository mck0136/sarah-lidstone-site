import { DesignPage } from "@/components/DesignPage";
import { designMetadata, designPages } from "@/lib/design";

export const metadata = designMetadata("Contact");
export default function ContactPage() { return <DesignPage page={designPages.Contact} />; }
