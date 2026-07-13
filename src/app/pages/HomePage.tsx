import { Link } from "react-router";
import { PageMeta } from "../components/PageMeta";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { ArrowRight, Code2, Download, Layers, MapPin, Palette, Video, Zap } from "lucide-react";
import { AtAGlanceBar } from "../components/AtAGlanceBar";
import { ExperienceSection } from "../components/ExperienceSection";
import { EducationSection } from "../components/EducationSection";
import { ToolkitSection } from "../components/ToolkitSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { NowSection } from "../components/NowSection";

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { value: "3+", label: "Years Active" },
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
  {
    icon: Video,
    title: "Video Edit",
    body: "Reels, ads, and branded motion content — edited, optimised, and ready to publish on every platform.",
  },
];

const impactNumbers = [
  { value: "£2M+", label: "Client revenue influenced" },
  { value: "50k", label: "App downloads (Pulse Health)" },
  { value: "1.7k★", label: "Combined GitHub stars" },
  { value: "50+", label: "Mentorship sessions" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-full">
      <PageMeta
        description="Designer & Full-Stack Developer based in Lahore, PK. I design, build, and ship products that look great and work fast. Available for freelance projects."
        path="/"
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "calc(100svh - 4rem)" }}
      >
        {/* Dot grid */}
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
            background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 18%, transparent), transparent 65%)",
            filter: "blur(48px)",
          }}
        />

        <div
          className="relative max-w-6xl mx-auto px-6 flex flex-col justify-center"
          style={{ minHeight: "calc(100svh - 4rem)", paddingTop: "4rem", paddingBottom: "5rem" }}
        >
          <div className="mb-8">
            <Badge variant="outline" style={{ letterSpacing: "-0.01em" }}>
              <span
                className="mr-2 inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "oklch(0.65 0.20 145)" }}
              />
              Available for Work
            </Badge>
          </div>

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
            <a href="/resume.pdf" download="Zeeshan_Haider_CV.pdf">
              <Button size="lg" variant="ghost" style={{ letterSpacing: "-0.025em" }}>
                <Download className="w-4 h-4" /> Download CV
              </Button>
            </a>
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

      {/* ── At-a-Glance Bar ──────────────────────────────────────────────── */}
      <AtAGlanceBar />

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">

          {/* Bio + currently */}
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
                <span style={{ fontSize: "0.875rem", letterSpacing: "-0.015em" }}>Remote · Based in Lahore, PK</span>
              </div>
            </div>

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

          {/* Impact numbers */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border"
            style={{ background: "var(--border)" }}
          >
            {impactNumbers.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center py-8 px-4 text-center"
                style={{ background: "var(--card)" }}
              >
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    letterSpacing: "-0.04em",
                    color: "var(--primary)",
                    lineHeight: 1,
                  }}
                  className="mb-2"
                >
                  {value}
                </p>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "0.775rem", letterSpacing: "-0.01em", lineHeight: 1.4 }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          <Separator className="mt-20" />

          {/* What I do */}
          <div className="pt-16">
            <SectionLabel>Disciplines</SectionLabel>
            <SectionTitle>What I Do</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────────────────────── */}
      <ExperienceSection />

      {/* ── Education ────────────────────────────────────────────────────── */}
      <EducationSection />

      {/* ── Toolkit ──────────────────────────────────────────────────────── */}
      <ToolkitSection />

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── Now ──────────────────────────────────────────────────────────── */}
      <NowSection />

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-8" style={{ background: "var(--secondary)" }}>
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
            <a
              href="/resume.pdf"
              download="Zeeshan_Haider_CV.pdf"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}
            >
              <Download className="w-3 h-3" /> CV
            </a>
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
