import { Code2, FileText, Palette } from "lucide-react";
import { Separator } from "./ui/separator";
import { DesignPortfolio } from "./DesignPortfolio";
import { DevProjects } from "./DevProjects";
import { CaseStudies } from "./CaseStudies";

const lanes = [
  {
    id: "design-lane",
    icon: Palette,
    label: "Design",
    title: "Design Portfolio",
    subtitle: "Graphic design & UI/UX work",
    description:
      "Brand identities, UI systems, mobile apps, and graphic design. 6 projects across branding, UI/UX, and graphic design.",
    count: 6,
    accentColor: "oklch(0.65 0.15 300)",
  },
  {
    id: "dev-lane",
    icon: Code2,
    label: "Dev",
    title: "Dev Projects",
    subtitle: "Open-source & shipped code",
    description:
      "Libraries, CLI tools, full-stack starters, and templates. All open-source, all used in production by real teams.",
    count: 4,
    accentColor: "oklch(0.55 0.22 258)",
  },
  {
    id: "cases-lane",
    icon: FileText,
    label: "Case Studies",
    title: "Case Studies",
    subtitle: "Process, thinking, and outcomes",
    description:
      "Deep dives into the work — problem, process, solution, and measurable result. Design and dev projects.",
    count: 4,
    accentColor: "oklch(0.62 0.18 245)",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
        fontSize: "0.7rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--primary)",
        opacity: 0.8,
      }}
      className="mb-3"
    >
      {children}
    </p>
  );
}

function LaneHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10">
      <SectionLabel>{label}</SectionLabel>
      <h2
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1.6rem, 2.5vw, 2.25rem)",
          letterSpacing: "-0.04em",
          lineHeight: 1.15,
        }}
        className="mb-3"
      >
        {title}
      </h2>
      <p
        className="text-muted-foreground max-w-2xl"
        style={{ letterSpacing: "-0.02em", lineHeight: 1.65 }}
      >
        {description}
      </p>
    </div>
  );
}

export function WorkSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="work" className="border-t border-border">
      {/* ── Section header + entry cards ───────────────────────────── */}
      <div className="py-24" style={{ background: "var(--secondary)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>Portfolio</SectionLabel>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
            className="mb-4"
          >
            My Work
          </h2>
          <p
            className="text-muted-foreground max-w-xl mb-14"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.7 }}
          >
            Three ways to explore the work — browse the visual portfolio, dig into code projects, or read the full case studies.
          </p>

          {/* Entry cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lanes.map(({ id, icon: Icon, label, subtitle, description, count, accentColor }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="group text-left p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `color-mix(in oklch, ${accentColor} 12%, transparent)` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: accentColor }} />
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full border"
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "-0.01em",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      background: `color-mix(in oklch, ${accentColor} 10%, transparent)`,
                      color: accentColor,
                      borderColor: `color-mix(in oklch, ${accentColor} 25%, transparent)`,
                    }}
                  >
                    {count} projects
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    letterSpacing: "-0.03em",
                  }}
                  className="mb-1"
                >
                  {label}
                </p>
                <p
                  className="text-muted-foreground mb-3"
                  style={{ fontSize: "0.75rem", letterSpacing: "-0.01em" }}
                >
                  {subtitle}
                </p>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "0.825rem", letterSpacing: "-0.015em", lineHeight: 1.6 }}
                >
                  {description}
                </p>

                <p
                  className="mt-4 group-hover:text-primary transition-colors"
                  style={{ fontSize: "0.775rem", letterSpacing: "-0.01em", color: "var(--muted-foreground)" }}
                >
                  Scroll to explore →
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── In-section sticky jump nav ──────────────────────────────── */}
      <div
        className="sticky top-0 z-40 border-b border-border"
        style={{
          background: "color-mix(in oklch, var(--background) 95%, transparent)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center gap-1">
          {lanes.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-accent/60 hover:text-primary transition-colors"
              style={{ fontSize: "0.8rem", letterSpacing: "-0.015em" }}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Lane 1: Design Portfolio ────────────────────────────────── */}
      <div id="design-lane" style={{ background: "var(--background)" }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <LaneHeader
            label="Design"
            title="Design Portfolio"
            description="Visual work across branding, UI/UX, and graphic design. Filter by discipline to find what's relevant to you."
          />
          <DesignPortfolio />
        </div>
      </div>

      <Separator />

      {/* ── Lane 2: Dev Projects ────────────────────────────────────── */}
      <div id="dev-lane" style={{ background: "var(--secondary)" }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <LaneHeader
            label="Dev"
            title="Dev Projects"
            description="Open-source tools, libraries, and starters built for the developer community. All used in production."
          />
          <DevProjects />
        </div>
      </div>

      <Separator />

      {/* ── Lane 3: Case Studies ────────────────────────────────────── */}
      <div id="cases-lane" style={{ background: "var(--background)" }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <LaneHeader
            label="Case Studies"
            title="In-Depth Case Studies"
            description="The full story behind four projects — problem, process, decisions, and measurable outcomes."
          />
          <CaseStudies />
        </div>
      </div>
    </section>
  );
}
