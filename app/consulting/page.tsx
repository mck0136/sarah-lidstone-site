import { DesignPage } from "@/components/DesignPage";
import { designMetadata, designPages } from "@/lib/design";

export const metadata = designMetadata("Consulting");
export default function ConsultingPage() { return <DesignPage page={designPages.Consulting} />; }
