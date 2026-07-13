import { useState } from "react";
import { ExternalLink, Github, GitFork, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

type DevFilter = "All" | "Library" | "CLI" | "Full-Stack" | "Template";

type DevProject = {
  name: string;
  type: DevFilter;
  description: string;
  longDescription?: string;
  tags: string[];
  stars: string;
  forks: string;
  url: string;
  demo?: string;
  stat?: { label: string; value: string };
};

const devProjects: DevProject[] = [
  {
    name: "react-tokens",
    type: "Library",
    description:
      "Open-source CSS design token library for React. Zero config, fully typed.",
    longDescription:
      "Generates typed token sets from Figma variables and outputs CSS custom properties, SCSS, or JSON. Supports theming, dark mode, and component-level token scoping. Used in production by 80+ design teams.",
    tags: ["TypeScript", "CSS", "React", "npm"],
    stars: "1.2k",
    forks: "89",
    url: "#",
    demo: "#",
    stat: { label: "Weekly downloads", value: "14k" },
  },
  {
    name: "figma-exporter",
    type: "CLI",
    description:
      "CLI to sync Figma variables to code tokens. Supports CSS, SCSS, JSON, and TypeScript.",
    tags: ["Node.js", "CLI", "Figma API", "TypeScript"],
    stars: "480",
    forks: "34",
    url: "#",
  },
  {
    name: "supabase-kit",
    type: "Full-Stack",
    description:
      "Opinionated Next.js + Supabase starter with auth, RBAC, and type-safe DB client.",
    tags: ["Next.js", "Supabase", "PostgreSQL", "TypeScript"],
    stars: "820",
    forks: "67",
    url: "#",
    demo: "#",
  },
  {
    name: "api-scaffold",
    type: "Template",
    description:
      "Production-ready Express + TypeScript API boilerplate — auth, validation, logging, Docker.",
    tags: ["Node.js", "Express", "TypeScript", "Docker"],
    stars: "310",
    forks: "51",
    url: "#",
  },
];

const filters: DevFilter[] = ["All", "Library", "CLI", "Full-Stack", "Template"];

function FeaturedCard({ project }: { project: DevProject }) {
  return (
    <Card className="mb-6 overflow-hidden border-primary/20" style={{ background: "color-mix(in oklch, var(--primary) 3%, var(--card))" }}>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 pt-6">
          <div>
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "color-mix(in oklch, var(--primary) 12%, transparent)" }}
              >
                <Github className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.125rem",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {project.name}
                  </p>
                  <Badge style={{ fontSize: "0.65rem", letterSpacing: "-0.01em" }}>Featured</Badge>
                  <Badge variant="outline" style={{ fontSize: "0.65rem", letterSpacing: "-0.01em" }}>
                    {project.type}
                  </Badge>
                </div>
              </div>
            </div>

            <p
              className="text-muted-foreground mb-5"
              style={{ fontSize: "0.9rem", letterSpacing: "-0.02em", lineHeight: 1.7, maxWidth: "48rem" }}
            >
              {project.longDescription}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" style={{ fontSize: "0.72rem", letterSpacing: "-0.01em" }}>
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <a
                href={project.url}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border hover:border-primary/40 hover:text-primary transition-colors"
                style={{ fontSize: "0.825rem", letterSpacing: "-0.015em" }}
              >
                <Github className="w-3.5 h-3.5" /> View Source
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border hover:border-primary/40 hover:text-primary transition-colors"
                  style={{ fontSize: "0.825rem", letterSpacing: "-0.015em" }}
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex md:flex-col items-center md:items-end justify-start md:justify-start gap-4 md:gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Star className="w-4 h-4 text-primary" />
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  letterSpacing: "-0.04em",
                  color: "var(--foreground)",
                }}
              >
                {project.stars}
              </span>
              <span style={{ fontSize: "0.75rem", letterSpacing: "-0.01em" }}>stars</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <GitFork className="w-4 h-4" />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "1rem", letterSpacing: "-0.03em", color: "var(--foreground)" }}>
                {project.forks}
              </span>
              <span style={{ fontSize: "0.75rem", letterSpacing: "-0.01em" }}>forks</span>
            </div>
            {project.stat && (
              <div
                className="px-3 py-2 rounded-lg text-center"
                style={{ background: "color-mix(in oklch, var(--primary) 10%, transparent)" }}
              >
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.035em", color: "var(--primary)" }}>
                  {project.stat.value}
                </p>
                <p style={{ fontSize: "0.68rem", letterSpacing: "-0.01em", color: "var(--muted-foreground)" }}>
                  {project.stat.label}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CompactCard({ project }: { project: DevProject }) {
  return (
    <a href={project.url} target="_blank" rel="noreferrer" style={{ display: "block", height: "100%", textDecoration: "none", color: "inherit" }}>
    <Card className="group hover:border-primary/40 transition-colors h-full flex flex-col">
      <CardContent className="pt-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <Github className="w-4 h-4 text-muted-foreground shrink-0" />
            <p
              className="truncate"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "0.9375rem",
                letterSpacing: "-0.025em",
              }}
            >
              {project.name}
            </p>
          </div>
          <span className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2">
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>

        <Badge variant="outline" style={{ fontSize: "0.62rem", letterSpacing: "-0.01em", alignSelf: "flex-start", marginBottom: "0.75rem" }}>
          {project.type}
        </Badge>

        <p
          className="text-muted-foreground flex-1 mb-4"
          style={{ fontSize: "0.825rem", letterSpacing: "-0.015em", lineHeight: 1.65 }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" style={{ fontSize: "0.65rem", letterSpacing: "-0.01em" }}>
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto pt-3 border-t border-border">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Star className="w-3 h-3" />
            <span style={{ fontSize: "0.75rem", letterSpacing: "-0.01em" }}>{project.stars}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <GitFork className="w-3 h-3" />
            <span style={{ fontSize: "0.75rem", letterSpacing: "-0.01em" }}>{project.forks}</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </a>
  );
}

export function DevProjects() {
  const [active, setActive] = useState<DevFilter>("All");

  const featured = devProjects[0];
  const showFeatured = active === "All" || active === featured.type;
  const grid = active === "All"
    ? devProjects.slice(1)
    : devProjects.filter((p) => p.type === active && p !== featured);

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className="px-4 py-1.5 rounded-full border transition-all"
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
          </button>
        ))}
      </div>

      {/* Featured */}
      {showFeatured && <FeaturedCard project={featured} />}

      {/* Grid */}
      {grid.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {grid.map((p) => (
            <CompactCard key={p.name} project={p} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!showFeatured && grid.length === 0 && (
        <div className="flex items-center justify-center py-16 text-muted-foreground border border-dashed border-border rounded-xl">
          <p style={{ fontSize: "0.875rem", letterSpacing: "-0.015em" }}>No projects in this category yet.</p>
        </div>
      )}
    </div>
  );
}
