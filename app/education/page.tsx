import { DesignPage } from "@/components/DesignPage";
import { designMetadata, designPages } from "@/lib/design";

export const metadata = designMetadata("Education");
export default function EducationPage() { return <DesignPage page={designPages.Education} />; }
