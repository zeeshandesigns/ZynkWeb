import { Badge } from "./ui/badge";
import { ExternalLink, GraduationCap } from "lucide-react";

type Certification = {
  name: string;
  issuer: string;
  year: string;
  emoji: string;
  url?: string;
  color: string;
};

const certifications: Certification[] = [
  {
    name: "Google UX Design Certificate",
    issuer: "Google / Coursera",
    year: "2021",
    emoji: "🎨",
    url: "#",
    color: "oklch(0.55 0.22 258)",
  },
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2022",
    emoji: "☁️",
    url: "#",
    color: "oklch(0.60 0.18 40)",
  },
  {
    name: "Meta Frontend Developer",
    issuer: "Meta / Coursera",
    year: "2023",
    emoji: "⚛️",
    url: "#",
    color: "oklch(0.55 0.18 260)",
  },
  {
    name: "Professional Scrum Master I",
    issuer: "Scrum.org",
    year: "2021",
    emoji: "🔄",
    url: "#",
    color: "oklch(0.50 0.18 145)",
  },
  {
    name: "TypeScript Developer",
    issuer: "Microsoft",
    year: "2022",
    emoji: "📘",
    url: "#",
    color: "oklch(0.52 0.22 240)",
  },
  {
    name: "Figma Professional",
    issuer: "Figma",
    year: "2023",
    emoji: "🖊️",
    url: "#",
    color: "oklch(0.58 0.20 300)",
  },
];

export function EducationSection() {
  return (
    <section
      className="py-20 border-t border-border"
      style={{ background: "var(--secondary)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
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
          Education
        </p>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.15,
          }}
          className="mb-10"
        >
          Qualifications
        </h2>

        {/* ── Degree ─────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl border border-border bg-card p-6 md:p-8 mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "color-mix(in oklch, var(--primary) 10%, transparent)" }}
            >
              <GraduationCap className="w-7 h-7 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(1.1rem, 2vw, 1.375rem)",
                      letterSpacing: "-0.03em",
                    }}
                    className="mb-0.5"
                  >
                    BSc Computer Science
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "0.9rem", letterSpacing: "-0.02em" }}
                  >
                    University of Manchester
                  </p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                  <Badge style={{ letterSpacing: "-0.01em", fontSize: "0.7rem" }}>
                    First Class Honours
                  </Badge>
                  <span
                    className="text-muted-foreground"
                    style={{ fontSize: "0.775rem", letterSpacing: "-0.01em" }}
                  >
                    2014 – 2018
                  </span>
                </div>
              </div>

              <p
                className="text-muted-foreground mb-4"
                style={{ fontSize: "0.875rem", letterSpacing: "-0.015em", lineHeight: 1.7 }}
              >
                Specialised in Human-Computer Interaction and Software Engineering. Final year project: an accessible design system generator that converts design tokens to WCAG-compliant component code — awarded best project in cohort.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {["HCI", "Software Engineering", "Algorithms", "Databases", "UX Research", "Distributed Systems"].map(
                  (module) => (
                    <Badge key={module} variant="outline" style={{ fontSize: "0.68rem", letterSpacing: "-0.01em" }}>
                      {module}
                    </Badge>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Certifications ──────────────────────────────────────────── */}
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
          }}
          className="mb-5"
        >
          Certifications
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="group relative flex items-start gap-3.5 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                style={{ background: `color-mix(in oklch, ${cert.color} 12%, transparent)` }}
              >
                {cert.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.3,
                  }}
                  className="mb-0.5"
                >
                  {cert.name}
                </p>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "0.72rem", letterSpacing: "-0.01em" }}
                >
                  {cert.issuer}
                </p>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "0.68rem", letterSpacing: "-0.01em", marginTop: "0.25rem" }}
                >
                  {cert.year}
                </p>
              </div>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors shrink-0 mt-0.5"
                  aria-label={`Verify ${cert.name}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
