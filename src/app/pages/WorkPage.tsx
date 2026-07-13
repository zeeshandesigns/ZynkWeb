import { WorkSection } from "../components/WorkSection";
import { PageMeta } from "../components/PageMeta";

export default function WorkPage() {
  return (
    <div className="min-h-full">
      <PageMeta
        title="My Work"
        description="Design portfolio, dev projects, and case studies — UI/UX, branding, full-stack engineering, and more."
        path="/work"
      />
      <WorkSection />
    </div>
  );
}
