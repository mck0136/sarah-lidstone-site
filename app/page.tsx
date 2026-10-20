import { DesignPage } from "@/components/DesignPage";
import { designMetadata, designPages } from "@/lib/design";

export const metadata = designMetadata("Home");
export default function HomePage() { return <DesignPage page={designPages.Home} />; }
