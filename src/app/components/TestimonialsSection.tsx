import { Avatar, AvatarFallback } from "./ui/avatar";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  accentColor?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Working with Zeeshan was unlike any agency or freelancer we'd worked with before. He understood the product deeply, asked the right questions, and delivered something that genuinely moved the needle on activation.",
    name: "Sarah K.",
    role: "Chief Product Officer",
    company: "Pulse Health",
    initials: "SK",
    accentColor: "oklch(0.55 0.22 258)",
  },
  {
    quote:
      "Zeeshan shipped a design system in 3 months that we'd been trying to build internally for over a year. The quality was extraordinary — every component, documented and production-ready from day one.",
    name: "Marcus T.",
    role: "CTO",
    company: "Atlas Analytics",
    initials: "MT",
    accentColor: "oklch(0.55 0.18 300)",
  },
  {
    quote:
      "If you need someone who can design and build — not just one or the other — Zeeshan is that rare person. He saved us two hires and delivered a product our users actually love.",
    name: "Emily R.",
    role: "Founder",
    company: "Orbit",
    initials: "ER",
    accentColor: "oklch(0.55 0.18 145)",
  },
  {
    quote:
      "Zeeshan brought product thinking to a role we'd expected to be purely technical. He pushed back where it mattered, moved fast where it counted, and the end result was something we're genuinely proud of.",
    name: "David L.",
    role: "Head of Product",
    company: "Nexus SaaS",
    initials: "DL",
    accentColor: "oklch(0.55 0.20 40)",
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="py-20 border-t border-border"
      style={{ background: "var(--secondary)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
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
            Social Proof
          </p>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
            }}
          >
            What clients say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col p-6 rounded-2xl border border-border bg-card"
            >
              {/* Opening mark */}
              <span
                className="block mb-4 leading-none select-none"
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "3.5rem",
                  lineHeight: 0.8,
                  color: t.accentColor ?? "var(--primary)",
                  opacity: 0.35,
                }}
                aria-hidden
              >
                "
              </span>

              <p
                className="text-foreground flex-1 mb-6"
                style={{ fontSize: "0.9375rem", letterSpacing: "-0.02em", lineHeight: 1.7 }}
              >
                {t.quote}
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <Avatar className="w-9 h-9 shrink-0">
                  <AvatarFallback
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      letterSpacing: 0,
                      background: `color-mix(in oklch, ${t.accentColor ?? "var(--primary)"} 15%, var(--secondary))`,
                      color: t.accentColor ?? "var(--primary)",
                    }}
                  >
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "0.75rem", letterSpacing: "-0.01em" }}
                  >
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
