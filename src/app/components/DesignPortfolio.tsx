import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ProjectModal } from "./ProjectModal";

type DesignFilter = "All" | "Branding" | "UI/UX" | "Graphic";

type DesignProject = {
  name: string;
  category: DesignFilter;
  description: string;
  image: string;
  year: string;
  tags: string[];
  url?: string;
};

const designProjects: DesignProject[] = [
  {
    name: "Nexus",
    category: "Branding" as const,
    description:
      "Complete brand identity & design system for a B2B SaaS startup — logo, colour, type, and component guidelines.",
    image:
      "https://images.unsplash.com/photo-1763705857736-2b4f16a33758?auto=format&fit=crop&w=800&q=80",
    year: "2024",
    tags: ["Logo", "Brand System", "Guidelines"],
  },
  {
    name: "Atlas",
    category: "UI/UX" as const,
    description:
      "SaaS analytics dashboard redesign — 40+ screens spanning onboarding, data views, reports, and settings.",
    image:
      "https://images.unsplash.com/photo-1656231267330-f605c1c16a57?auto=format&fit=crop&w=800&q=80",
    year: "2023",
    tags: ["Dashboard", "Data Viz", "Figma"],
  },
  {
    name: "Pulse",
    category: "UI/UX" as const,
    description:
      "Health-tracking mobile app. From discovery and wireframes to high-fidelity screens for iOS and Android.",
    image:
      "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?auto=format&fit=crop&w=800&q=80",
    year: "2023",
    tags: ["Mobile", "iOS", "User Research"],
  },
  {
    name: "Orbit",
    category: "UI/UX" as const,
    description:
      "E-commerce platform redesign for a fashion brand. Reduced checkout drop-off by 40% post-launch.",
    image:
      "https://images.unsplash.com/photo-1706700392642-dee59f678a09?auto=format&fit=crop&w=800&q=80",
    year: "2024",
    tags: ["E-Commerce", "Mobile", "UX Research"],
  },
  {
    name: "Flux",
    category: "Graphic" as const,
    description:
      "Full campaign for a creative agency — landing page, social ads, OOH, and print collateral.",
    image:
      "https://images.unsplash.com/photo-1609605348579-3123e3d40eb8?auto=format&fit=crop&w=800&q=80",
    year: "2022",
    tags: ["Campaign", "Print", "Digital"],
  },
  {
    name: "Arc",
    category: "Branding" as const,
    description:
      "Identity system and packaging for a design + technology conference. Covers wayfinding, merch, and digital.",
    image:
      "https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?auto=format&fit=crop&w=800&q=80",
    year: "2023",
    tags: ["Identity", "Packaging", "Wayfinding"],
  },
];

const filters: DesignFilter[] = ["All", "Branding", "UI/UX", "Graphic"];

const counts: Record<DesignFilter, number> = {
  All: designProjects.length,
  Branding: designProjects.filter((p) => p.category === "Branding").length,
  "UI/UX": designProjects.filter((p) => p.category === "UI/UX").length,
  Graphic: designProjects.filter((p) => p.category === "Graphic").length,
};

const badgeVariant: Record<DesignFilter, "default" | "secondary" | "outline"> = {
  All: "default",
  Branding: "default",
  "UI/UX": "secondary",
  Graphic: "outline",
};

const PJB = "'Plus Jakarta Sans', sans-serif";

export function DesignPortfolio() {
  const [active, setActive] = useState<DesignFilter>("All");
  const [selectedProject, setSelectedProject] = useState<DesignProject | null>(null);
  const shown =
    active === "All" ? designProjects : designProjects.filter((p) => p.category === active);

  return (
    <>
    {selectedProject && (
      <ProjectModal onClose={() => setSelectedProject(null)}>
        <div>
          <div style={{ overflow: "hidden", aspectRatio: "16/9" }}>
            <img
              src={selectedProject.image}
              alt={selectedProject.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
              <Badge variant={badgeVariant[selectedProject.category]} style={{ fontSize: "0.65rem" }}>
                {selectedProject.category}
              </Badge>
              <span style={{ fontSize: "0.72rem", color: "var(--muted-foreground)", letterSpacing: "-0.01em" }}>
                {selectedProject.year}
              </span>
            </div>
            <h2
              style={{
                fontFamily: PJB,
                fontWeight: 800,
                fontSize: "1.5rem",
                letterSpacing: "-0.04em",
                marginBottom: "0.75rem",
              }}
            >
              {selectedProject.name}
            </h2>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, letterSpacing: "-0.015em", color: "var(--muted-foreground)", marginBottom: "1.25rem" }}>
              {selectedProject.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1.5rem" }}>
              {selectedProject.tags.map((tag) => (
                <Badge key={tag} variant="outline" style={{ fontSize: "0.65rem" }}>{tag}</Badge>
              ))}
            </div>
            {selectedProject.url ? (
              <Button asChild style={{ letterSpacing: "-0.02em" }}>
                <a href={selectedProject.url} target="_blank" rel="noreferrer">Open Project →</a>
              </Button>
            ) : (
              <Button disabled style={{ letterSpacing: "-0.02em" }} title="Coming soon">
                Open Project — Coming soon
              </Button>
            )}
          </div>
        </div>
      </ProjectModal>
    )}
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border transition-all"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: "0.8rem",
              letterSpacing: "-0.01em",
              background: active === f ? "var(--primary)" : "var(--card)",
              color: active === f ? "var(--primary-foreground)" : "var(--foreground)",
              borderColor: active === f ? "var(--primary)" : "var(--border)",
            }}
          >
            {f}
            <span
              style={{
                fontSize: "0.65rem",
                opacity: active === f ? 0.7 : 0.5,
                background: active === f ? "rgba(255,255,255,0.2)" : "var(--muted)",
                borderRadius: "99px",
                padding: "0 5px",
                lineHeight: "1.4",
              }}
            >
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shown.map((project) => (
          <div
            key={project.name}
            className="group relative overflow-hidden rounded-xl border border-border cursor-pointer transition-shadow hover:shadow-lg"
            style={{ background: "var(--card)" }}
            onClick={() => setSelectedProject(project)}
          >
            {/* Image */}
            <div className="overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Hover overlay */}
            <div
              className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,14,30,0.92) 0%, rgba(10,14,30,0.4) 55%, transparent 100%)",
              }}
            >
              <p
                className="text-white mb-1"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  letterSpacing: "-0.03em",
                }}
              >
                {project.name}
              </p>
              <p
                className="text-white/75 mb-3"
                style={{ fontSize: "0.775rem", letterSpacing: "-0.01em", lineHeight: 1.55 }}
              >
                {project.description}
              </p>
              <div
                className="inline-flex items-center gap-1.5 self-start"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  backdropFilter: "blur(8px)",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "999px",
                  fontSize: "0.72rem",
                  letterSpacing: "-0.01em",
                  color: "white",
                }}
              >
                View Project <ArrowUpRight style={{ width: "0.7rem", height: "0.7rem" }} />
              </div>
            </div>

            {/* Card footer */}
            <div className="p-3 border-t border-border flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <p
                  className="truncate"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.name}
                </p>
                <Badge
                  variant={badgeVariant[project.category]}
                  style={{ fontSize: "0.62rem", letterSpacing: "-0.01em" }}
                >
                  {project.category}
                </Badge>
              </div>
              <span
                className="shrink-0"
                style={{ fontSize: "0.72rem", color: "var(--muted-foreground)", letterSpacing: "-0.01em" }}
              >
                {project.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
