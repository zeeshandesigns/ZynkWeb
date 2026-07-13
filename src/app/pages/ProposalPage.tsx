import React from "react";
import { useSearchParams } from "react-router";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  FileText,
  Globe,
  Lock,
  Mail,
  Palette,
  Printer,
  RefreshCw,
  Rocket,
  Search,
  Shield,
  TrendingUp,
  X as XIcon,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

// ── Constants ──────────────────────────────────────────────────────────────

const PJB = "'Plus Jakarta Sans', sans-serif";
const OUTFIT = "'Outfit', sans-serif";

const CURRENCY_SYMBOLS: Record<string, string> = {
  GBP: "£",
  USD: "$",
  EUR: "€",
  AED: "AED ",
  CAD: "CA$",
};

const DEFAULT_SCOPE = [
  "UX Research & Discovery",
  "Information Architecture",
  "Wireframes & Prototyping",
  "Visual / UI Design",
  "Responsive Development",
  "CMS / Backend Integration",
  "QA & Cross-browser Testing",
  "Handover & Documentation",
];

const NOT_INCLUDED = [
  "Web hosting & domain registration",
  "Third-party software licences",
  "Copywriting & content creation",
  "Stock photography or video",
];

// ── Helpers ────────────────────────────────────────────────────────────────

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        fontFamily: PJB,
        fontWeight: 600,
        fontSize: "0.7rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase" as const,
        color: light ? "rgba(255,255,255,0.4)" : "var(--primary)",
        marginBottom: "0.75rem",
      }}
    >
      {children}
    </p>
  );
}

function SectionTitle({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      style={{
        fontFamily: PJB,
        fontWeight: 700,
        fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
        letterSpacing: "-0.04em",
        lineHeight: 1.15,
        color: light ? "white" : "var(--foreground)",
        marginBottom: "2rem",
      }}
    >
      {children}
    </h2>
  );
}

function SectionWrap({
  children,
  bg = "var(--background)",
  id,
}: {
  children: React.ReactNode;
  bg?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      style={{
        padding: "5rem 1.5rem",
        background: bg,
        WebkitPrintColorAdjust: "exact",
      } as React.CSSProperties}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────

export default function ProposalPage() {
  const [searchParams] = useSearchParams();

  const client = searchParams.get("client") || "Your Company";
  const project = searchParams.get("project") || "Your Project";
  const ref = searchParams.get("ref") || `ZYK-${new Date().getFullYear()}-001`;
  const dateParam = searchParams.get("date");
  const priceParam = searchParams.get("price") || "5000";
  const currency = searchParams.get("currency") || "GBP";
  const weeksParam = searchParams.get("weeks") || "6";
  const depositPct = Math.min(100, Math.max(0, parseInt(searchParams.get("deposit") || "50")));
  const scopeParam = searchParams.get("scope");
  const projectType = searchParams.get("type") || "Design & Development";

  const currencySymbol = CURRENCY_SYMBOLS[currency] ?? "£";
  const priceNum = parseInt(priceParam.replace(/,/g, "")) || 5000;
  const fmt = (n: number) => n.toLocaleString("en-GB");
  const depositAmount = Math.round((priceNum * depositPct) / 100);
  const remainingAmount = priceNum - depositAmount;

  const proposalDate = dateParam ? new Date(dateParam + "T12:00:00") : new Date();
  const validUntil = new Date(proposalDate);
  validUntil.setDate(validUntil.getDate() + 30);

  const fmtDate = (d: Date) =>
    d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const displayDate = fmtDate(proposalDate);
  const validUntilDisplay = fmtDate(validUntil);

  const scopeItems = scopeParam
    ? scopeParam
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : DEFAULT_SCOPE;

  const weeks = parseInt(weeksParam) || 6;
  const discoverEnd = Math.max(1, Math.round(weeks * 0.3));
  const designEnd = Math.max(discoverEnd + 1, Math.round(weeks * 0.6));
  const buildEnd = weeks;

  const mailtoSubject = `Proposal Accepted – ${ref}`;
  const mailtoBody = `Hi Zeeshan,\n\nI'd like to accept the proposal ${ref} for ${project}.\n\nLooking forward to working together.\n\n— ${client}`;
  const mailtoHref = `mailto:hello@zynkit.tech?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

  return (
    <div style={{ fontFamily: OUTFIT, background: "var(--background)", minHeight: "100vh" }}>
      <style>{`
        .proposal-brief { display: grid; grid-template-columns: 1fr 280px; gap: 3rem; align-items: start; }
        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .terms-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.875rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; }
        .about-grid { display: grid; grid-template-columns: 80px 1fr; gap: 2.5rem; align-items: start; }
        .investment-notes { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .steps-flex { display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap; }
        @media (max-width: 640px) {
          .proposal-brief { grid-template-columns: 1fr !important; }
          .at-a-glance { min-width: unset !important; }
          .process-grid { grid-template-columns: 1fr 1fr !important; }
          .process-connector { display: none !important; }
          .terms-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .about-avatar { display: none !important; }
          .investment-notes { grid-template-columns: 1fr !important; }
          .steps-flex { flex-direction: column !important; }
          .step-arrow { transform: rotate(90deg); }
        }
        @media (max-width: 440px) {
          .process-grid { grid-template-columns: 1fr !important; }
          .terms-grid { grid-template-columns: 1fr !important; }
        }
        @media print {
          .no-print { display: none !important; }
          #investment { break-before: page; }
          section { break-inside: avoid; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* ── 1. Cover ─────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh",
          background: "oklch(0.14 0.03 258)",
          display: "flex",
          flexDirection: "column",
          WebkitPrintColorAdjust: "exact",
        } as React.CSSProperties}
      >
        {/* Top bar */}
        <div
          style={{
            padding: "1.25rem 2rem",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: "rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: 3, background: "rgba(255,255,255,0.6)" }} />
            </div>
            <span
              style={{
                fontFamily: PJB,
                fontWeight: 800,
                fontSize: "1.05rem",
                letterSpacing: "-0.03em",
                color: "white",
              }}
            >
              Zynk
            </span>
          </div>
          <span
            style={{
              fontFamily: PJB,
              fontWeight: 600,
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Proposal
          </span>
          <span style={{ fontFamily: OUTFIT, fontSize: "0.8rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.02em" }}>
            {ref}
          </span>
        </div>

        {/* Centre content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 2rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: PJB,
              fontWeight: 500,
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "1.25rem",
            }}
          >
            Prepared for
          </p>
          <h1
            style={{
              fontFamily: PJB,
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "white",
              marginBottom: "1rem",
              maxWidth: "14ch",
            }}
          >
            {client}
          </h1>
          <p
            style={{
              fontFamily: OUTFIT,
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              letterSpacing: "-0.02em",
              color: "oklch(0.65 0.19 258)",
              marginBottom: "2.5rem",
            }}
          >
            {project}
          </p>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: OUTFIT, fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)" }}>
              {displayDate}
            </span>
            <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
            <span style={{ fontFamily: OUTFIT, fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)" }}>
              {projectType}
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem", opacity: 0.25 }}
          >
            <span
              style={{
                fontFamily: OUTFIT,
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "white",
              }}
            >
              Scroll to read
            </span>
            <ChevronDown size={14} color="white" />
          </div>
        </div>
      </section>

      {/* ── 2. Brief ─────────────────────────────────────────────────────── */}
      <SectionWrap>
        <div className="proposal-brief">
          {/* Left */}
          <div>
            <SectionLabel>The Brief</SectionLabel>
            <SectionTitle>What we're building together</SectionTitle>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--muted-foreground)", marginBottom: "1.25rem" }}>
              Thank you for considering Zynk for{" "}
              <strong style={{ color: "var(--foreground)" }}>{project}</strong>. Based on our conversations, I
              understand that <strong style={{ color: "var(--foreground)" }}>{client}</strong> needs a polished,
              high-quality digital solution — built with both design and engineering excellence — that moves the
              needle on the right metrics.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--muted-foreground)" }}>
              This proposal outlines exactly what I'll deliver, how we'll work together, and what you can expect at
              every stage. My process is transparent, communicative, and focused on shipping something you're
              genuinely proud of.
            </p>
          </div>

          {/* At a Glance card */}
          <div
            className="at-a-glance"
            style={{
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
              background: "var(--secondary)",
              padding: "1.5rem",
            }}
          >
            <p
              style={{
                fontFamily: PJB,
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "-0.01em",
                marginBottom: "1rem",
                color: "var(--foreground)",
              }}
            >
              At a Glance
            </p>
            {[
              { label: "Client", value: client },
              { label: "Project", value: project },
              { label: "Type", value: projectType },
              { label: "Timeline", value: `${weeks} weeks` },
              { label: "Investment", value: `${currencySymbol}${fmt(priceNum)}` },
              { label: "Valid Until", value: validUntilDisplay },
            ].map(({ label, value }) => (
              <div key={label} style={{ marginBottom: "0.875rem" }}>
                <p
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                    marginBottom: "0.125rem",
                  }}
                >
                  {label}
                </p>
                <p style={{ fontSize: "0.875rem", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--foreground)" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>

      <Separator />

      {/* ── 3. Scope ──────────────────────────────────────────────────────── */}
      <SectionWrap bg="var(--secondary)">
        <SectionLabel>Deliverables</SectionLabel>
        <SectionTitle>What's included</SectionTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "0.625rem",
            marginBottom: "2rem",
          }}
        >
          {scopeItems.map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.875rem 1rem",
                background: "var(--background)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)",
              }}
            >
              <CheckCircle2 size={16} style={{ color: "var(--primary)", flexShrink: 0 }} />
              <span style={{ fontSize: "0.9rem", letterSpacing: "-0.01em" }}>{item}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            padding: "1.125rem 1.5rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border)",
            background: "var(--muted)",
          }}
        >
          <p
            style={{
              fontFamily: PJB,
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              marginBottom: "0.625rem",
            }}
          >
            Not included
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem 1.75rem" }}>
            {NOT_INCLUDED.map((item) => (
              <span
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  fontSize: "0.8rem",
                  color: "var(--muted-foreground)",
                }}
              >
                <XIcon size={11} style={{ flexShrink: 0 }} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </SectionWrap>

      <Separator />

      {/* ── 4. Process ────────────────────────────────────────────────────── */}
      <SectionWrap>
        <SectionLabel>Methodology</SectionLabel>
        <SectionTitle>How we work</SectionTitle>
        <div className="process-grid">
          {[
            {
              num: "01",
              title: "Discover",
              desc: "Kick-off call, brief alignment, competitive research, and defining measurable success criteria.",
              Icon: Search,
            },
            {
              num: "02",
              title: "Design",
              desc: "Wireframes, visual design, interactive prototype, and complete design system documentation.",
              Icon: Palette,
            },
            {
              num: "03",
              title: "Build",
              desc: "Clean, production-ready code. Integrations, responsive development, and thorough QA.",
              Icon: Code2,
            },
            {
              num: "04",
              title: "Launch",
              desc: "Deployment, handover docs, team training, and 2 weeks of post-launch support included.",
              Icon: Rocket,
            },
          ].map(({ num, title, desc, Icon }, i) => (
            <div key={num} style={{ position: "relative" }}>
              {i < 3 && (
                <div
                  className="process-connector"
                  style={{
                    position: "absolute",
                    top: "1.375rem",
                    right: "-0.5rem",
                    width: "1rem",
                    height: "1px",
                    background: "var(--border)",
                    zIndex: 1,
                  }}
                />
              )}
              <div
                style={{
                  padding: "1.375rem",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: PJB,
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      letterSpacing: "-0.04em",
                      color: "var(--primary)",
                      opacity: 0.25,
                    }}
                  >
                    {num}
                  </span>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "var(--radius-sm)",
                      background: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={14} style={{ color: "var(--primary)" }} />
                  </div>
                </div>
                <h3
                  style={{
                    fontFamily: PJB,
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    letterSpacing: "-0.025em",
                    marginBottom: "0.5rem",
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: "0.8125rem", lineHeight: 1.65, color: "var(--muted-foreground)" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrap>

      <Separator />

      {/* ── 5. Timeline ───────────────────────────────────────────────────── */}
      <SectionWrap bg="var(--secondary)">
        <SectionLabel>Schedule</SectionLabel>
        <SectionTitle>When you'll have it</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.5rem", marginBottom: "0.75rem" }}>
          {[
            { label: "Discover", opacity: 0.28, range: `Wk 1–${discoverEnd}` },
            { label: "Design", opacity: 0.5, range: `Wk ${discoverEnd}–${designEnd}` },
            { label: "Build", opacity: 0.75, range: `Wk ${designEnd}–${buildEnd}` },
            { label: "Launch", opacity: 1, range: `Wk ${buildEnd}+` },
          ].map(({ label, opacity, range }) => (
            <div key={label}>
              <div
                style={{
                  height: 5,
                  borderRadius: 3,
                  marginBottom: "0.625rem",
                  background: `oklch(0.546 0.218 258 / ${opacity})`,
                }}
              />
              <p
                style={{
                  fontFamily: PJB,
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                  letterSpacing: "-0.01em",
                  marginBottom: "0.125rem",
                }}
              >
                {label}
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{range}</p>
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--muted-foreground)",
            marginTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <Clock size={12} style={{ flexShrink: 0 }} />
          Exact schedule confirmed at kick-off. Assumes timely client feedback at each stage.
        </p>
      </SectionWrap>

      <Separator />

      {/* ── 6. Investment ─────────────────────────────────────────────────── */}
      <SectionWrap id="investment">
        <div style={{ textAlign: "center" }}>
          <SectionLabel>Pricing</SectionLabel>
          <SectionTitle>Your investment</SectionTitle>

          <div
            style={{
              maxWidth: 440,
              margin: "0 auto 2rem",
              borderRadius: "var(--radius-xl)",
              border: "1px solid color-mix(in oklch, var(--primary) 35%, transparent)",
              background: "var(--accent)",
              padding: "2.5rem 2rem",
            }}
          >
            <p
              style={{
                fontFamily: PJB,
                fontWeight: 800,
                fontSize: "clamp(2.75rem, 7vw, 4rem)",
                letterSpacing: "-0.05em",
                lineHeight: 1,
                marginBottom: "0.375rem",
              }}
            >
              {currencySymbol}
              {fmt(priceNum)}
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", marginBottom: "2rem", letterSpacing: "-0.01em" }}>
              {projectType} · fixed price
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.75rem" }}>
              {[
                {
                  label: `${depositPct}% deposit`,
                  value: `${currencySymbol}${fmt(depositAmount)}`,
                  sub: "Due on acceptance",
                },
                {
                  label: `${100 - depositPct}% on delivery`,
                  value: `${currencySymbol}${fmt(remainingAmount)}`,
                  sub: "Due on final handover",
                },
              ].map(({ label, value, sub }) => (
                <div
                  key={label}
                  style={{
                    padding: "1rem",
                    borderRadius: "var(--radius-md)",
                    background: "var(--background)",
                    border: "1px solid var(--border)",
                    textAlign: "left",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--muted-foreground)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontFamily: PJB,
                      fontWeight: 700,
                      fontSize: "1.125rem",
                      letterSpacing: "-0.03em",
                      marginBottom: "0.125rem",
                    }}
                  >
                    {value}
                  </p>
                  <p style={{ fontSize: "0.7rem", color: "var(--muted-foreground)" }}>{sub}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--muted-foreground)",
                  marginBottom: "0.5rem",
                }}
              >
                Includes
              </p>
              {scopeItems.slice(0, 5).map((item) => (
                <p
                  key={item}
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--muted-foreground)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  <CheckCircle2 size={11} style={{ color: "var(--primary)", flexShrink: 0 }} />
                  {item}
                </p>
              ))}
              {scopeItems.length > 5 && (
                <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", paddingLeft: "1.1875rem" }}>
                  + {scopeItems.length - 5} more deliverables
                </p>
              )}
            </div>
          </div>

          <div className="investment-notes" style={{ maxWidth: 440, margin: "0 auto" }}>
            {[
              {
                Icon: Shield,
                title: "Fixed pricing",
                body: "The number above is the final number. No hidden fees, surprise invoices, or scope-creep charges.",
              },
              {
                Icon: TrendingUp,
                title: "Agency comparison",
                body: `Equivalent agency rates for this scope typically run ${currencySymbol}${fmt(Math.round(priceNum * 2.2))}–${currencySymbol}${fmt(Math.round(priceNum * 3))}.`,
              },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                style={{
                  padding: "1.25rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  textAlign: "left",
                }}
              >
                <Icon size={15} style={{ color: "var(--primary)", marginBottom: "0.5rem" }} />
                <p
                  style={{
                    fontFamily: PJB,
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    letterSpacing: "-0.02em",
                    marginBottom: "0.25rem",
                  }}
                >
                  {title}
                </p>
                <p style={{ fontSize: "0.8rem", lineHeight: 1.6, color: "var(--muted-foreground)" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>

      <Separator />

      {/* ── 7. About ──────────────────────────────────────────────────────── */}
      <SectionWrap bg="var(--secondary)">
        <SectionLabel>Your partner</SectionLabel>
        <SectionTitle>Who you're working with</SectionTitle>
        <div className="about-grid">
          <div className="about-avatar" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{ fontFamily: PJB, fontWeight: 800, fontSize: "1.375rem", color: "white", letterSpacing: "-0.02em" }}
              >
                ZH
              </span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--muted-foreground)", marginBottom: "1.5rem" }}>
              I'm <strong style={{ color: "var(--foreground)" }}>Zeeshan Haider</strong>, a designer and full-stack
              developer with 6+ years building digital products for startups, agencies, and established businesses. I
              work across the full stack — from UX research to deployed production code — so nothing gets lost in
              handoff and every decision serves the end product.
            </p>
            <div className="stats-grid" style={{ marginBottom: "1.5rem" }}>
              {[
                { value: "40+", label: "Projects shipped" },
                { value: "12+", label: "Happy clients" },
                { value: "6+", label: "Years active" },
                { value: "£2M+", label: "Revenue influenced" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  style={{
                    padding: "1rem 0.75rem",
                    borderRadius: "var(--radius-md)",
                    background: "var(--background)",
                    border: "1px solid var(--border)",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: PJB,
                      fontWeight: 800,
                      fontSize: "1.125rem",
                      letterSpacing: "-0.04em",
                      color: "var(--primary)",
                      lineHeight: 1.1,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {value}
                  </p>
                  <p style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", lineHeight: 1.3 }}>{label}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <a
                href="https://zynkit.tech"
                target="_blank"
                rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem", color: "var(--primary)", textDecoration: "none" }}
              >
                <Globe size={14} /> zynkit.tech
              </a>
              <a
                href="mailto:hello@zynkit.tech"
                style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem", color: "var(--primary)", textDecoration: "none" }}
              >
                <Mail size={14} /> hello@zynkit.tech
              </a>
            </div>
          </div>
        </div>
      </SectionWrap>

      <Separator />

      {/* ── 8. Terms ──────────────────────────────────────────────────────── */}
      <SectionWrap>
        <SectionLabel>Terms</SectionLabel>
        <SectionTitle>The small print</SectionTitle>
        <div className="terms-grid">
          {[
            {
              Icon: RefreshCw,
              title: "Revisions",
              body: "2 rounds of revisions included per phase. Additional revisions billed at an agreed hourly rate.",
            },
            {
              Icon: FileText,
              title: "IP Transfer",
              body: "Full intellectual property rights transferred to you upon receipt of the final payment.",
            },
            {
              Icon: Lock,
              title: "Confidentiality",
              body: "All project details kept strictly private. A formal NDA is available on request at no extra cost.",
            },
            {
              Icon: AlertCircle,
              title: "Cancellation",
              body: "The deposit is non-refundable. Work completed to the cancellation date will be invoiced pro-rata.",
            },
            {
              Icon: Clock,
              title: "Timeline",
              body: "Schedules assume prompt feedback within 2 business days. Client-side delays are absorbed with a buffer week.",
            },
            {
              Icon: Calendar,
              title: "Validity",
              body: "This proposal is valid for 30 days from the issue date. Pricing may be revised after this period.",
            },
          ].map(({ Icon, title, body }) => (
            <div
              key={title}
              style={{
                padding: "1.375rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border)",
                background: "var(--card)",
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "var(--radius-sm)",
                  background: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.875rem",
                }}
              >
                <Icon size={14} style={{ color: "var(--primary)" }} />
              </div>
              <h3
                style={{
                  fontFamily: PJB,
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.375rem",
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: "0.8rem", lineHeight: 1.65, color: "var(--muted-foreground)" }}>{body}</p>
            </div>
          ))}
        </div>
      </SectionWrap>

      <Separator />

      {/* ── 9. Next Steps ─────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "5rem 1.5rem",
          background: "oklch(0.14 0.03 258)",
          WebkitPrintColorAdjust: "exact",
        } as React.CSSProperties}
      >
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel light>Let's go</SectionLabel>
          <SectionTitle light>Ready to start?</SectionTitle>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.4)",
              maxWidth: "44ch",
              margin: "0 auto 3rem",
            }}
          >
            If this proposal looks right, here's what happens next.
          </p>

          <div className="steps-flex" style={{ marginBottom: "3rem" }}>
            {[
              { num: "1", title: "Review", desc: "Read through. Ask any questions." },
              { num: "2", title: "Confirm", desc: "Reply to accept or request changes." },
              { num: "3", title: "Kick off", desc: "Pay deposit & book the first call." },
            ].map(({ num, title, desc }, i) => (
              <React.Fragment key={num}>
                <div style={{ textAlign: "center", padding: "1.5rem 1rem", maxWidth: 180 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: "rgba(255,255,255,0.04)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 0.875rem",
                    }}
                  >
                    <span style={{ fontFamily: PJB, fontWeight: 700, fontSize: "0.875rem", color: "white" }}>{num}</span>
                  </div>
                  <p
                    style={{
                      fontFamily: PJB,
                      fontWeight: 700,
                      fontSize: "0.9375rem",
                      letterSpacing: "-0.02em",
                      color: "white",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {title}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{desc}</p>
                </div>
                {i < 2 && (
                  <ArrowRight
                    className="step-arrow"
                    size={18}
                    style={{ color: "rgba(255,255,255,0.18)", flexShrink: 0 }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <a href={mailtoHref} className="no-print">
              <Button
                size="lg"
                style={{ fontSize: "0.9375rem", letterSpacing: "-0.02em", paddingLeft: "1.75rem", paddingRight: "1.75rem", height: "3rem" }}
              >
                Accept This Proposal
                <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
              </Button>
            </a>
            <a href="/contact" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
              Or <span style={{ textDecoration: "underline" }}>book a call</span> to discuss first
            </a>
          </div>
        </div>
      </section>

      {/* ── 10. Footer ────────────────────────────────────────────────────── */}
      <footer
        style={{
          padding: "1.75rem 1.5rem",
          background: "oklch(0.11 0.025 258)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          WebkitPrintColorAdjust: "exact",
        } as React.CSSProperties}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                background: "rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: 2, background: "rgba(255,255,255,0.35)" }} />
            </div>
            <span
              style={{
                fontFamily: PJB,
                fontWeight: 800,
                fontSize: "0.875rem",
                letterSpacing: "-0.03em",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Zynk
            </span>
          </div>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.2)", letterSpacing: "-0.01em" }}>
            Prepared by Zeeshan Haider · {displayDate} · {ref}
          </p>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
            <a
              href="mailto:hello@zynkit.tech"
              style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}
            >
              hello@zynkit.tech
            </a>
            <a
              href="https://zynkit.tech"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}
            >
              zynkit.tech
            </a>
            <button
              className="no-print"
              onClick={() => window.print()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.25)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <Printer size={12} /> Print
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
