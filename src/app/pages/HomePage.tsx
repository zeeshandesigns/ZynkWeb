import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import {
  ArrowRight,
  Code2,
  Layers,
  MapPin,
  Palette,
  Zap,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { value: "6+", label: "Years Experience" },
  { value: "40+", label: "Projects Shipped" },
  { value: "3", label: "Startups Built" },
  { value: "12+", label: "Happy Clients" },
];

const whatIDo = [
  {
    icon: Palette,
    title: "Design",
    body: "From zero to polished product. UX research, design systems, and visual craft — built to convert and delight.",
  },
  {
    icon: Code2,
    title: "Engineer",
    body: "I don't just hand off designs — I ship them. React, TypeScript, Node.js, deployed to production.",
  },
  {
    icon: Layers,
    title: "Strategy",
    body: "I think in systems, not screens. Product roadmapping, go-to-market, and building for scale.",
  },
];

const experience = [
  {
    role: "Founder & Product Lead",
    company: "Zynk",
    period: "2022 – Present",
    type: "Full-time",
    description:
      "Building a design + development studio that ships end-to-end software products for startups and scale-ups. Responsible for product strategy, design, and engineering across all client projects.",
    tags: ["Product Strategy", "React", "Figma", "Node.js"],
    current: true,
  },
  {
    role: "Senior Product Designer & Developer",
    company: "Independent",
    period: "2020 – 2022",
    type: "Freelance",
    description:
      "Embedded with startups across fintech, health-tech, and SaaS verticals. Led product design and shipped frontend code across 15+ client projects — from 0-to-1 and growth-stage.",
    tags: ["UX Design", "TypeScript", "Figma", "Next.js"],
    current: false,
  },
  {
    role: "Front-End Engineer",
    company: "TechCo",
    period: "2018 – 2020",
    type: "Full-time",
    description:
      "Built production-grade React applications for e-commerce and logistics clients. Led the migration from JavaScript to TypeScript and introduced design system tooling for the first time.",
    tags: ["React", "TypeScript", "CSS", "REST APIs"],
    current: false,
  },
];

const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Design & Product",
    items: ["Figma", "Design Systems", "UX Research", "Prototyping", "Brand Identity", "Product Strategy"],
  },
  {
    label: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Motion", "Three.js"],
  },
  {
    label: "Backend",
    items: ["Node.js", "PostgreSQL", "GraphQL", "Prisma", "REST APIs", "Supabase"],
  },
  {
    label: "Tooling",
    items: ["Git", "Vite", "Vercel", "AWS", "Linear", "Notion"],
  },
];


// ─── Section header ───────────────────────────────────────────────────────────

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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
        letterSpacing: "-0.04em",
        lineHeight: 1.15,
      }}
      className="mb-4"
    >
      {children}
    </h2>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HomePage() {

  return (
    <div className="min-h-full">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "calc(100svh - 4rem)" }}
      >
        {/* Dot grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, var(--border) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
            opacity: 0.7,
          }}
        />
        {/* Glow blob */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-8rem",
            right: "-8rem",
            width: "40rem",
            height: "40rem",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--primary) 18%, transparent), transparent 65%)",
            filter: "blur(48px)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 flex flex-col justify-center" style={{ minHeight: "calc(100svh - 4rem)", paddingTop: "4rem", paddingBottom: "5rem" }}>
          {/* Available badge */}
          <div className="mb-8">
            <Badge variant="outline" style={{ letterSpacing: "-0.01em" }}>
              <span
                className="mr-2 inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "oklch(0.65 0.20 145)" }}
              />
              Available for Work
            </Badge>
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3.5rem, 10vw, 8.5rem)",
              letterSpacing: "-0.045em",
              lineHeight: 0.92,
            }}
          >
            Zeeshan
            <br />
            <span style={{ color: "var(--primary)" }}>Haider</span>
          </h1>

          {/* Role */}
          <p
            className="mt-6 mb-4"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1rem, 2vw, 1.375rem)",
              letterSpacing: "-0.025em",
              color: "var(--muted-foreground)",
            }}
          >
            Designer &amp; Full-Stack Developer · Founder at Zynk
          </p>

          {/* Tagline */}
          <p
            className="max-w-lg"
            style={{
              fontSize: "clamp(0.95rem, 1.5vw, 1.125rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.7,
              color: "var(--muted-foreground)",
            }}
          >
            I design and build software — end to end. From product strategy and UX to shipped code.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/work">
              <Button size="lg" style={{ letterSpacing: "-0.025em" }}>
                View My Work <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" style={{ letterSpacing: "-0.025em" }}>
                Get in Touch
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 mt-14 pt-10 border-t border-border">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    letterSpacing: "-0.045em",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </p>
                <p
                  className="mt-1"
                  style={{ fontSize: "0.8rem", letterSpacing: "-0.01em", color: "var(--muted-foreground)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Me ─────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">

          {/* Bio */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div>
              <SectionLabel>About Me</SectionLabel>
              <SectionTitle>Design × Code × Strategy</SectionTitle>
              <div className="space-y-4 text-muted-foreground" style={{ letterSpacing: "-0.02em", lineHeight: 1.75 }}>
                <p>
                  I'm Zeeshan — a designer and full-stack developer who builds software end to end. I started in frontend engineering, moved into product design, and realised the most impactful work happens at the intersection of both.
                </p>
                <p>
                  In 2022 I founded Zynk to do exactly that: ship products that are both beautifully designed and solidly engineered. We work with startups and scale-ups on everything from 0-to-1 product launches to redesigning legacy systems.
                </p>
                <p>
                  I believe great software is invisible — it gets out of your way and lets people do what they came to do.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span style={{ fontSize: "0.875rem", letterSpacing: "-0.015em" }}>Remote · Based in the UK</span>
              </div>
            </div>

            {/* Currently card + highlights */}
            <div className="space-y-4">
              <Card className="border-primary/20" style={{ background: "color-mix(in oklch, var(--primary) 4%, var(--card))" }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-primary" />
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--primary)" }}>
                      Currently
                    </span>
                  </div>
                  <CardTitle style={{ letterSpacing: "-0.03em", fontSize: "1rem" }}>
                    Founder at Zynk
                  </CardTitle>
                  <CardDescription style={{ letterSpacing: "-0.015em" }}>
                    Building a studio that ships beautifully engineered software.
                  </CardDescription>
                </CardHeader>
              </Card>

              {[
                { icon: "🎯", label: "Available for", value: "Freelance · Advisory · Full-time" },
                { icon: "⚡", label: "Strongest in", value: "React · Figma · Product Thinking" },
                { icon: "🌍", label: "Works with", value: "Startups · Scale-ups · Founders" },
                { icon: "📬", label: "Response time", value: "Within 24 hours" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                  <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                  <div>
                    <p style={{ fontSize: "0.75rem", letterSpacing: "-0.01em", color: "var(--muted-foreground)" }}>{label}</p>
                    <p style={{ fontSize: "0.875rem", letterSpacing: "-0.015em", fontWeight: 500 }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What I do */}
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {whatIDo.map(({ icon: Icon, title, body }) => (
                <Card key={title} className="group hover:border-primary/40 transition-colors">
                  <CardContent className="pt-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: "color-mix(in oklch, var(--primary) 10%, transparent)" }}
                    >
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        letterSpacing: "-0.03em",
                      }}
                      className="mb-2"
                    >
                      {title}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.875rem", letterSpacing: "-0.015em", lineHeight: 1.65 }}>
                      {body}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator className="mb-20" />

          {/* Experience */}
          <div className="mb-20">
            <SectionLabel>Experience</SectionLabel>
            <SectionTitle>Where I've Worked</SectionTitle>

            <div className="space-y-4 mt-8">
              {experience.map((exp) => (
                <Card key={exp.role + exp.company} className={exp.current ? "border-primary/30" : ""}>
                  <CardContent className="pt-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p
                            style={{
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontWeight: 700,
                              fontSize: "1rem",
                              letterSpacing: "-0.025em",
                            }}
                          >
                            {exp.role}
                          </p>
                          {exp.current && (
                            <Badge style={{ letterSpacing: "-0.01em", fontSize: "0.65rem" }}>
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground" style={{ fontSize: "0.875rem", letterSpacing: "-0.015em" }}>
                          {exp.company} · {exp.type}
                        </p>
                      </div>
                      <span
                        className="text-muted-foreground shrink-0"
                        style={{ fontSize: "0.8rem", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}
                      >
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4" style={{ fontSize: "0.875rem", letterSpacing: "-0.015em", lineHeight: 1.65 }}>
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" style={{ fontSize: "0.72rem", letterSpacing: "-0.01em" }}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator className="mb-20" />

          {/* Skills */}
          <div>
            <SectionLabel>Skills</SectionLabel>
            <SectionTitle>Toolkit</SectionTitle>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
              {skillGroups.map(({ label, items }) => (
                <div key={label}>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      letterSpacing: "0.05em",
                      color: "var(--muted-foreground)",
                      textTransform: "uppercase",
                    }}
                    className="mb-3"
                  >
                    {label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg border border-border text-sm transition-colors hover:border-primary/40 hover:text-primary"
                        style={{ letterSpacing: "-0.015em", background: "var(--card)" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-sm bg-white/80" />
            </div>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: "-0.025em", fontSize: "0.875rem" }}>
              Zynk
            </span>
            <span className="text-muted-foreground" style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}>
              · © 2026 Zeeshan Haider
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              to="/work"
              className="text-muted-foreground hover:text-primary transition-colors"
              style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}
            >
              My Work
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <Link
              to="/contact"
              className="text-muted-foreground hover:text-primary transition-colors"
              style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}
            >
              Contact
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <Link
              to="/design-system"
              className="text-muted-foreground hover:text-primary transition-colors"
              style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}
            >
              Design System
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
