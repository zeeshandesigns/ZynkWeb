import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { BookingWidget } from "../components/BookingWidget";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@zynk.studio",
    href: "mailto:hello@zynk.studio",
    sub: "Best for project enquiries",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/zeeshanh",
    href: "#",
    sub: "Connect & follow updates",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/zeeshanh",
    href: "#",
    sub: "Open-source projects & code",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    value: "@zeeshanh",
    href: "#",
    sub: "Thoughts on design & code",
  },
];

const faqs = [
  {
    q: "What kind of projects do you take on?",
    a: "Product design, UI/UX, full-stack web and mobile development, design systems, and brand identity. I work best on projects that need both design and engineering thinking.",
  },
  {
    q: "Are you available for full-time roles?",
    a: "Yes — open to the right opportunity. I'm equally interested in founding-team roles, senior IC positions, and design engineering roles at product-led companies.",
  },
  {
    q: "How do you typically engage?",
    a: "Most client work is project-based or retainer. I also advise early-stage startups on product and design. Drop me an email and we'll figure out the right structure.",
  },
  {
    q: "What's your response time?",
    a: "Within 24 hours on weekdays. If it's urgent, say so in the subject line.",
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
      className="mb-6"
    >
      {children}
    </p>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-full">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div
        className="border-b border-border px-6 lg:px-12 py-16"
        style={{
          background: "linear-gradient(140deg, var(--background) 0%, var(--secondary) 60%, var(--accent) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <Badge variant="outline" className="mb-5" style={{ letterSpacing: "-0.01em" }}>
            <span
              className="mr-2 inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "oklch(0.65 0.20 145)" }}
            />
            Available · Responding within 24h
          </Badge>

          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              letterSpacing: "-0.045em",
              lineHeight: 1.05,
            }}
            className="mb-4 max-w-xl"
          >
            Let's build<br />
            <span style={{ color: "var(--primary)" }}>something great.</span>
          </h1>

          <p
            className="text-muted-foreground max-w-lg"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.7 }}
          >
            Book a call, send an email, or find me on socials. Available for freelance, advisory, and full-time opportunities.
          </p>

          <div className="flex items-center gap-2 mt-4 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span style={{ fontSize: "0.825rem", letterSpacing: "-0.015em" }}>Remote · Based in the UK</span>
          </div>
        </div>
      </div>

      {/* ── Booking + sidebar ────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14">

          {/* Left — Booking widget */}
          <div>
            <SectionLabel>Schedule a Call</SectionLabel>
            <BookingWidget />
          </div>

          {/* Right — Contact links */}
          <div>
            <SectionLabel>Other Ways to Reach Me</SectionLabel>
            <div className="space-y-3 mb-8">
              {contactLinks.map(({ icon: Icon, label, value, href, sub }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-accent/20 transition-all group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "color-mix(in oklch, var(--primary) 10%, transparent)" }}
                  >
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "0.7rem", letterSpacing: "-0.01em", color: "var(--muted-foreground)" }}>
                      {label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        letterSpacing: "-0.02em",
                      }}
                      className="truncate"
                    >
                      {value}
                    </p>
                    <p style={{ fontSize: "0.72rem", letterSpacing: "-0.01em", color: "var(--muted-foreground)" }}>
                      {sub}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </a>
              ))}
            </div>

            {/* Availability card */}
            <div
              className="p-5 rounded-xl border"
              style={{
                borderColor: "color-mix(in oklch, var(--primary) 25%, transparent)",
                background: "color-mix(in oklch, var(--primary) 5%, var(--card))",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: "oklch(0.65 0.20 145)" }}
                />
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "oklch(0.40 0.15 145)",
                  }}
                >
                  Currently Available
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "-0.03em",
                }}
                className="mb-1"
              >
                Taking on projects from Q3 2026
              </p>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "0.8rem", letterSpacing: "-0.015em", lineHeight: 1.6 }}
              >
                Best way to start is a 30-min discovery call — no deck needed.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <SectionLabel>Common Questions</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          {faqs.map(({ q, a }) => (
            <div key={q} className="py-6 border-b border-border">
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  letterSpacing: "-0.025em",
                }}
                className="mb-2"
              >
                {q}
              </p>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "0.85rem", letterSpacing: "-0.015em", lineHeight: 1.7 }}
              >
                {a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
