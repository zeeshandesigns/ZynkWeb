import { useState } from "react";
import { ArrowUpRight, Zap } from "lucide-react";
import { Badge } from "./ui/badge";
import { ProjectModal } from "./ProjectModal";

type CaseStudy = {
  title: string;
  subtitle: string;
  category: string;
  challenge: string;
  outcome: string;
  outcomeDetail: string;
  description: string;
  image: string;
  tags: string[];
  duration: string;
  year: string;
};

const caseStudies: CaseStudy[] = [
  {
    title: "Atlas Analytics",
    subtitle: "SaaS Dashboard Redesign",
    category: "Full-Stack",
    challenge:
      "A Series A analytics company was losing users at activation — the product was powerful but incomprehensible.",
    outcome: "+32% daily active usage",
    outcomeDetail: "Measured 60 days post-launch",
    description:
      "Led the end-to-end product redesign: 20+ user interviews, heuristic audit, 40 screens in Figma, and shipping the React frontend. Reduced onboarding time from 11 minutes to under 3.",
    image:
      "https://images.unsplash.com/photo-1656231267330-f605c1c16a57?auto=format&fit=crop&w=900&q=80",
    tags: ["Product Design", "React", "TypeScript", "Recharts"],
    duration: "4 months",
    year: "2023",
  },
  {
    title: "Pulse Health",
    subtitle: "Consumer Mobile App",
    category: "Full-Stack",
    challenge:
      "A health startup needed an app designed and built from scratch — zero existing product, tight deadline, seed budget.",
    outcome: "4.8★ App Store · 50k downloads",
    outcomeDetail: "In first 3 months post-launch",
    description:
      "Sole designer and co-developer on a two-person team. Ran discovery sprints, prototyped in Figma, built React Native frontend, and shipped to iOS and Android in 14 weeks.",
    image:
      "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?auto=format&fit=crop&w=900&q=80",
    tags: ["React Native", "UX Research", "Figma", "Node.js"],
    duration: "14 weeks",
    year: "2023",
  },
  {
    title: "react-tokens",
    subtitle: "Open-Source Library",
    category: "Dev",
    challenge:
      "Design-to-code token workflows were fragmented — every team reinvented the same Figma export pipeline differently.",
    outcome: "1.2k GitHub stars",
    outcomeDetail: "14k weekly npm downloads",
    description:
      "Built and shipped a zero-config token library that syncs Figma variables to typed CSS custom properties, SCSS, and JSON. Grew organically through the design engineering community.",
    image:
      "https://images.unsplash.com/photo-1770319810923-2944895fb5cb?auto=format&fit=crop&w=900&q=80",
    tags: ["TypeScript", "CSS", "Figma API", "npm"],
    duration: "Ongoing",
    year: "2024",
  },
  {
    title: "Zynk Design System",
    subtitle: "Internal Design System",
    category: "Design",
    challenge:
      "Client projects were slowing down because every engagement started from a blank canvas — no shared foundation.",
    outcome: "60% faster project starts",
    outcomeDetail: "Across 8 subsequent client projects",
    description:
      "Designed and built Zynk's internal component library: 50+ components, full token system, documentation site, and Figma kit. Now the foundation for all client product work.",
    image:
      "https://images.unsplash.com/photo-1763705857736-2b4f16a33758?auto=format&fit=crop&w=900&q=80",
    tags: ["Design Systems", "React", "Figma", "Storybook"],
    duration: "3 months",
    year: "2024",
  },
];


const PJB = "'Plus Jakarta Sans', sans-serif";

export function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  return (
    <>
    {selectedCase && (
      <ProjectModal onClose={() => setSelectedCase(null)}>
        <div>
          <div style={{ overflow: "hidden", height: 220 }}>
            <img
              src={selectedCase.image}
              alt={selectedCase.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.875rem" }}>
              <span style={{ fontFamily: PJB, fontWeight: 600, fontSize: "0.7rem", letterSpacing: "-0.01em", background: "color-mix(in oklch, var(--primary) 10%, transparent)", color: "var(--primary)", padding: "0.2rem 0.6rem", borderRadius: 999 }}>
                {selectedCase.category}
              </span>
              <span style={{ fontSize: "0.7rem", color: "var(--muted-foreground)" }}>{selectedCase.year} · {selectedCase.duration}</span>
            </div>
            <h2 style={{ fontFamily: PJB, fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.04em", marginBottom: "0.25rem" }}>
              {selectedCase.title}
            </h2>
            <p style={{ fontSize: "0.825rem", color: "var(--muted-foreground)", letterSpacing: "-0.01em", marginBottom: "1rem" }}>
              {selectedCase.subtitle}
            </p>
            <div style={{ marginBottom: "1rem" }}>
              <p style={{ fontFamily: PJB, fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "0.4rem" }}>Challenge</p>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.7, letterSpacing: "-0.015em", color: "var(--muted-foreground)" }}>{selectedCase.challenge}</p>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", padding: "0.75rem", borderRadius: 10, background: "color-mix(in oklch, var(--primary) 7%, transparent)", marginBottom: "1rem" }}>
              <Zap style={{ width: 14, height: 14, color: "var(--primary)", marginTop: 2, flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.03em", color: "var(--primary)" }}>{selectedCase.outcome}</p>
                <p style={{ fontSize: "0.72rem", color: "var(--muted-foreground)" }}>{selectedCase.outcomeDetail}</p>
              </div>
            </div>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.7, letterSpacing: "-0.015em", color: "var(--muted-foreground)", marginBottom: "1.25rem" }}>{selectedCase.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
              {selectedCase.tags.map((tag) => (
                <Badge key={tag} variant="outline" style={{ fontSize: "0.65rem" }}>{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </ProjectModal>
    )}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {caseStudies.map((cs) => (
          <article
            key={cs.title}
            className="group flex flex-col overflow-hidden rounded-xl border border-border cursor-pointer transition-all hover:shadow-xl hover:border-primary/30"
            style={{ background: "var(--card)" }}
            onClick={() => setSelectedCase(cs)}
          >
            {/* Cover image */}
            <div className="relative overflow-hidden shrink-0" style={{ height: "220px" }}>
              <img
                src={cs.image}
                alt={cs.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 100%)",
                }}
              />
              {/* Category + year badges */}
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    letterSpacing: "-0.01em",
                    background: "rgba(255,255,255,0.15)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.25)",
                    backdropFilter: "blur(8px)",
                    padding: "0.25rem 0.6rem",
                    borderRadius: "999px",
                  }}
                >
                  {cs.category}
                </span>
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {cs.year} · {cs.duration}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
              {/* Title */}
              <div className="mb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.125rem",
                        letterSpacing: "-0.03em",
                        lineHeight: 1.2,
                      }}
                    >
                      {cs.title}
                    </p>
                    <p
                      className="text-muted-foreground"
                      style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}
                    >
                      {cs.subtitle}
                    </p>
                  </div>
                  <div className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors mt-0.5">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Challenge */}
              <p
                className="text-muted-foreground mb-4 flex-1"
                style={{ fontSize: "0.845rem", letterSpacing: "-0.015em", lineHeight: 1.65 }}
              >
                {cs.challenge}
              </p>

              {/* Outcome callout */}
              <div
                className="flex items-start gap-2.5 p-3 rounded-lg mb-4"
                style={{ background: "color-mix(in oklch, var(--primary) 7%, transparent)" }}
              >
                <Zap className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      letterSpacing: "-0.02em",
                      color: "var(--primary)",
                    }}
                  >
                    {cs.outcome}
                  </p>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      letterSpacing: "-0.01em",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {cs.outcomeDetail}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {cs.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    style={{ fontSize: "0.65rem", letterSpacing: "-0.01em" }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </article>
      ))}
    </div>
    </>
  );
}
