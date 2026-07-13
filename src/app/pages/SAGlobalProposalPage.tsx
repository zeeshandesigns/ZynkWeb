import React from "react";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  Film,
  Globe,
  Image,
  Lock,
  Mail,
  Megaphone,
  Printer,
  RefreshCw,
  Shield,
  X as XIcon,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

// ── Constants ──────────────────────────────────────────────────────────────

const PJB = "'Plus Jakarta Sans', sans-serif";
const OUTFIT = "'Outfit', sans-serif";

const REF = "ZYK-2026-002";
const ISSUE_DATE = "12 July 2026";
const VALID_UNTIL = "11 August 2026";

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

// ── Deliverable cards ──────────────────────────────────────────────────────

const DELIVERABLES = [
  {
    Icon: Image,
    title: "Static Posts",
    qty: "15 / month",
    desc: "Scroll-stopping graphics for your monthly content calendar — formatted for Instagram Feed, Facebook Feed, and Stories.",
    specs: [
      "Instagram Feed (1:1 & 4:5)",
      "Facebook Feed (1.91:1)",
      "Stories & Reels cover (9:16)",
      "Branded templates with consistent visual identity",
      "Export-ready PNG/JPG at platform-optimised resolution",
    ],
  },
  {
    Icon: Film,
    title: "Reels",
    qty: "10 / month",
    desc: "Short-form video content edited from your footage — polished with motion graphics, captions, and branded intros.",
    specs: [
      "15–60 second edits optimised for Instagram & Facebook Reels",
      "Branded intro & outro",
      "Subtitles and animated captions",
      "Transitions & motion graphics",
      "Licensed background music",
    ],
  },
  {
    Icon: Megaphone,
    title: "Meta Ad Creatives",
    qty: "Per campaign",
    desc: "Resized and optimised ad creative variants ready to upload — every required format, pixel-perfect for Meta's specs.",
    specs: [
      "Feed ads (1:1, 4:5, 1.91:1)",
      "Story & Reel ads (9:16)",
      "Carousel frames",
      "Headline & CTA text overlays",
      "File-size optimised for Meta upload limits",
    ],
  },
  {
    Icon: Mail,
    title: "Email Newsletter",
    qty: "1 / month",
    desc: "A branded monthly newsletter template for your student audience — designed to inform, engage, and drive applications.",
    specs: [
      "Responsive HTML layout (desktop + mobile)",
      "SA Global branded header & footer",
      "Content zones: featured destination, visa updates, deadline alerts",
      "Clickable CTAs (Apply Now, Book Consultation)",
      "Compatible with Mailchimp, Brevo, and similar platforms",
    ],
  },
];

const NOT_INCLUDED = [
  "Video filming & on-site production",
  "Copywriting & caption writing",
  "Social media scheduling & posting",
  "Paid ad campaign management",
];

const TERMS = [
  {
    Icon: RefreshCw,
    title: "Revisions",
    body: "2 rounds of revisions included per deliverable batch. Additional rounds billed at PKR 2,500/hour.",
  },
  {
    Icon: Calendar,
    title: "Content Brief",
    body: "Client provides the weekly content calendar brief by Monday 9am. Deliverables returned within 3 business days.",
  },
  {
    Icon: FileText,
    title: "File Delivery",
    body: "All finals delivered via shared Google Drive in print-ready and web-optimised formats.",
  },
  {
    Icon: Shield,
    title: "Ownership",
    body: "Client retains full rights to all final delivered assets. Source files available upon request at no extra cost.",
  },
  {
    Icon: Lock,
    title: "Confidentiality",
    body: "All student data, campaign details, and business information kept strictly confidential.",
  },
  {
    Icon: Clock,
    title: "Notice Period",
    body: "30 days written notice required to pause or cancel. Current month's deliverables will be completed in full.",
  },
];

// ── Main ───────────────────────────────────────────────────────────────────

export default function SAGlobalProposalPage() {
  const mailtoHref = `mailto:hello@zynkit.tech?subject=${encodeURIComponent("Proposal Accepted – " + REF)}&body=${encodeURIComponent("Hi Zeeshan,\n\nI'd like to accept the service proposal " + REF + " for SA Global Education's monthly content retainer.\n\nLooking forward to working together.\n\n— Mr. Badr Ali, SA Global Education")}`;

  return (
    <div style={{ fontFamily: OUTFIT, background: "var(--background)", minHeight: "100vh" }}>
      <style>{`
        .sag-brief { display: grid; grid-template-columns: 1fr 280px; gap: 3rem; align-items: start; }
        .sag-deliverables { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .sag-terms { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.875rem; }
        .sag-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; }
        .sag-about { display: grid; grid-template-columns: 80px 1fr; gap: 2.5rem; align-items: start; }
        .sag-steps { display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap; }
        @media (max-width: 640px) {
          .sag-brief { grid-template-columns: 1fr !important; }
          .sag-deliverables { grid-template-columns: 1fr !important; }
          .sag-terms { grid-template-columns: 1fr 1fr !important; }
          .sag-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .sag-about { grid-template-columns: 1fr !important; }
          .sag-about-avatar { display: none !important; }
          .sag-steps { flex-direction: column !important; }
          .sag-step-arrow { transform: rotate(90deg); }
        }
        @media (max-width: 440px) {
          .sag-terms { grid-template-columns: 1fr !important; }
        }
        @media print {
          .no-print { display: none !important; }
          section { break-inside: avoid; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* ── Cover ─────────────────────────────────────────────────────────── */}
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
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: 3, background: "rgba(255,255,255,0.6)" }} />
            </div>
            <span style={{ fontFamily: PJB, fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.03em", color: "white" }}>
              Zynk
            </span>
          </div>
          <span style={{ fontFamily: PJB, fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
            Service Proposal & Retainer
          </span>
          <span style={{ fontFamily: OUTFIT, fontSize: "0.8rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.02em" }}>
            {REF}
          </span>
        </div>

        {/* Centre */}
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
              fontSize: "clamp(2.25rem, 7vw, 5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "white",
              marginBottom: "0.625rem",
              maxWidth: "16ch",
            }}
          >
            SA Global Education
          </h1>
          <p style={{ fontFamily: OUTFIT, fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>
            Attn. Mr. Badr Ali
          </p>
          <p
            style={{
              fontFamily: OUTFIT,
              fontSize: "clamp(1rem, 2vw, 1.35rem)",
              letterSpacing: "-0.02em",
              color: "oklch(0.65 0.19 258)",
              marginBottom: "2.5rem",
            }}
          >
            Monthly Design & Video Editing Retainer
          </p>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontFamily: OUTFIT, fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)" }}>{ISSUE_DATE}</span>
            <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
            <span style={{ fontFamily: OUTFIT, fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)" }}>Monthly Retainer</span>
            <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
            <span style={{ fontFamily: OUTFIT, fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)" }}>PKR 35,000 / mo</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem", opacity: 0.25 }}>
            <span style={{ fontFamily: OUTFIT, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "white" }}>
              Scroll to read
            </span>
            <ChevronDown size={14} color="white" />
          </div>
        </div>
      </section>

      {/* ── Brief ─────────────────────────────────────────────────────────── */}
      <SectionWrap>
        <div className="sag-brief">
          {/* Left */}
          <div>
            <SectionLabel>The Brief</SectionLabel>
            <SectionTitle>What we're building together</SectionTitle>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--muted-foreground)", marginBottom: "1.25rem" }}>
              Thank you for considering Zynk, Mr. Badr Ali. SA Global Education is doing vital work connecting students with international opportunities — and your content should reflect that ambition. This proposal sets out how Zynk will serve as your{" "}
              <strong style={{ color: "var(--foreground)" }}>dedicated design and video partner</strong>, executing your full monthly content pipeline so your team stays focused on students.
            </p>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--muted-foreground)" }}>
              Based on your content calendar model, Zynk will receive your weekly brief every Monday and return polished, publish-ready deliverables within 3 business days — covering static posts, reels, ad creatives, and your monthly student newsletter.
            </p>
          </div>

          {/* At a Glance */}
          <div
            style={{
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
              background: "var(--secondary)",
              padding: "1.5rem",
            }}
          >
            <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "-0.01em", marginBottom: "1rem", color: "var(--foreground)" }}>
              At a Glance
            </p>
            {[
              { label: "Client", value: "SA Global Education" },
              { label: "Contact", value: "Mr. Badr Ali" },
              { label: "Engagement", value: "Monthly Retainer" },
              { label: "Monthly Fee", value: "PKR 35,000" },
              { label: "Billing", value: "1st of each month" },
              { label: "Valid Until", value: VALID_UNTIL },
            ].map(({ label, value }) => (
              <div key={label} style={{ marginBottom: "0.875rem" }}>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "0.125rem" }}>{label}</p>
                <p style={{ fontSize: "0.875rem", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--foreground)" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>

      <Separator />

      {/* ── Scope ─────────────────────────────────────────────────────────── */}
      <SectionWrap bg="var(--secondary)">
        <SectionLabel>Monthly Deliverables</SectionLabel>
        <SectionTitle>What you get each month</SectionTitle>
        <div className="sag-deliverables">
          {DELIVERABLES.map(({ Icon, title, qty, desc, specs }) => (
            <div
              key={title}
              style={{
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border)",
                background: "var(--background)",
                padding: "1.75rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "var(--radius-md)", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={17} style={{ color: "var(--primary)" }} />
                  </div>
                  <h3 style={{ fontFamily: PJB, fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.025em" }}>{title}</h3>
                </div>
                <span
                  style={{
                    fontFamily: PJB,
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    letterSpacing: "-0.01em",
                    color: "var(--primary)",
                    background: "var(--accent)",
                    border: "1px solid color-mix(in oklch, var(--primary) 25%, transparent)",
                    borderRadius: "var(--radius-sm)",
                    padding: "0.25rem 0.625rem",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {qty}
                </span>
              </div>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--muted-foreground)", marginBottom: "1.125rem" }}>
                {desc}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                {specs.map((spec) => (
                  <p key={spec} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.8rem", color: "var(--muted-foreground)", lineHeight: 1.5 }}>
                    <CheckCircle2 size={13} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "0.1rem" }} />
                    {spec}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Not included */}
        <div style={{ marginTop: "1.25rem", padding: "1.125rem 1.5rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", background: "var(--muted)" }}>
          <p style={{ fontFamily: PJB, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "0.625rem" }}>
            Not included
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem 1.75rem" }}>
            {NOT_INCLUDED.map((item) => (
              <span key={item} style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8rem", color: "var(--muted-foreground)" }}>
                <XIcon size={11} style={{ flexShrink: 0 }} /> {item}
              </span>
            ))}
          </div>
        </div>
      </SectionWrap>

      <Separator />

      {/* ── Investment ────────────────────────────────────────────────────── */}
      <SectionWrap>
        <div style={{ textAlign: "center" }}>
          <SectionLabel>Retainer Pricing</SectionLabel>
          <SectionTitle>Your monthly investment</SectionTitle>

          <div
            style={{
              maxWidth: 480,
              margin: "0 auto 2rem",
              borderRadius: "var(--radius-xl)",
              border: "1px solid color-mix(in oklch, var(--primary) 35%, transparent)",
              background: "var(--accent)",
              padding: "2.5rem 2rem",
            }}
          >
            <p style={{ fontFamily: PJB, fontWeight: 800, fontSize: "clamp(2.75rem, 7vw, 4rem)", letterSpacing: "-0.05em", lineHeight: 1, marginBottom: "0.25rem" }}>
              PKR 35,000
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--muted-foreground)", marginBottom: "2rem", letterSpacing: "-0.01em" }}>
              per month · fixed retainer
            </p>

            {/* Payment structure */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.625rem", marginBottom: "2rem" }}>
              {[
                { label: "Billing date", value: "1st of month" },
                { label: "First payment", value: "On acceptance" },
                { label: "Notice to cancel", value: "30 days" },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: "0.875rem 0.75rem", borderRadius: "var(--radius-md)", background: "var(--background)", border: "1px solid var(--border)" }}>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "0.375rem" }}>{label}</p>
                  <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "0.875rem", letterSpacing: "-0.02em" }}>{value}</p>
                </div>
              ))}
            </div>

            {/* What's included summary */}
            <div style={{ textAlign: "left" }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "0.625rem" }}>
                Included every month
              </p>
              {[
                "15 static posts (all platform formats)",
                "10 reels (edited, captioned, branded)",
                "Meta ad creatives (all required sizes)",
                "1 monthly email newsletter template",
              ].map((item) => (
                <p key={item} style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.3rem" }}>
                  <CheckCircle2 size={11} style={{ color: "var(--primary)", flexShrink: 0 }} />
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Value context */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", maxWidth: 480, margin: "0 auto" }}>
            {[
              {
                Icon: Shield,
                title: "Fixed monthly rate",
                body: "No per-asset billing. No surprise invoices. One flat fee, every month, regardless of volume within scope.",
              },
              {
                Icon: RefreshCw,
                title: "Scales with you",
                body: "Need more posts or a new format? Scope can be expanded with a simple amendment — no renegotiation from scratch.",
              },
            ].map(({ Icon, title, body }) => (
              <div key={title} style={{ padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", textAlign: "left" }}>
                <Icon size={15} style={{ color: "var(--primary)", marginBottom: "0.5rem" }} />
                <p style={{ fontFamily: PJB, fontWeight: 600, fontSize: "0.875rem", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>{title}</p>
                <p style={{ fontSize: "0.8rem", lineHeight: 1.6, color: "var(--muted-foreground)" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>

      <Separator />

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <SectionWrap bg="var(--secondary)">
        <SectionLabel>Your partner</SectionLabel>
        <SectionTitle>Who you're working with</SectionTitle>
        <div className="sag-about">
          <div className="sag-about-avatar">
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: PJB, fontWeight: 800, fontSize: "1.375rem", color: "white", letterSpacing: "-0.02em" }}>ZH</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--muted-foreground)", marginBottom: "1.5rem" }}>
              I'm <strong style={{ color: "var(--foreground)" }}>Zeeshan Haider</strong>, a designer and full-stack developer with 6+ years building digital products, brand identities, and content systems for startups and businesses. I understand what makes content perform — and I build pipelines that are consistent, fast, and brand-aligned.
            </p>
            <div className="sag-stats" style={{ marginBottom: "1.5rem" }}>
              {[
                { value: "40+", label: "Projects shipped" },
                { value: "12+", label: "Happy clients" },
                { value: "6+", label: "Years active" },
                { value: "£2M+", label: "Revenue influenced" },
              ].map(({ value, label }) => (
                <div key={label} style={{ padding: "1rem 0.75rem", borderRadius: "var(--radius-md)", background: "var(--background)", border: "1px solid var(--border)", textAlign: "center" }}>
                  <p style={{ fontFamily: PJB, fontWeight: 800, fontSize: "1.125rem", letterSpacing: "-0.04em", color: "var(--primary)", lineHeight: 1.1, marginBottom: "0.25rem" }}>{value}</p>
                  <p style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", lineHeight: 1.3 }}>{label}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <a href="https://zynkit.tech" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem", color: "var(--primary)", textDecoration: "none" }}>
                <Globe size={14} /> zynkit.tech
              </a>
              <a href="mailto:hello@zynkit.tech" style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem", color: "var(--primary)", textDecoration: "none" }}>
                <Mail size={14} /> hello@zynkit.tech
              </a>
            </div>
          </div>
        </div>
      </SectionWrap>

      <Separator />

      {/* ── Terms ─────────────────────────────────────────────────────────── */}
      <SectionWrap>
        <SectionLabel>Terms</SectionLabel>
        <SectionTitle>How this retainer works</SectionTitle>
        <div className="sag-terms">
          {TERMS.map(({ Icon, title, body }) => (
            <div key={title} style={{ padding: "1.375rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", background: "var(--card)" }}>
              <div style={{ width: 30, height: 30, borderRadius: "var(--radius-sm)", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.875rem" }}>
                <Icon size={14} style={{ color: "var(--primary)" }} />
              </div>
              <h3 style={{ fontFamily: PJB, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "-0.02em", marginBottom: "0.375rem" }}>{title}</h3>
              <p style={{ fontSize: "0.8rem", lineHeight: 1.65, color: "var(--muted-foreground)" }}>{body}</p>
            </div>
          ))}
        </div>
      </SectionWrap>

      <Separator />

      {/* ── Next Steps ────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "5rem 1.5rem",
          background: "oklch(0.14 0.03 258)",
          WebkitPrintColorAdjust: "exact",
        } as React.CSSProperties}
      >
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel light>Let's go</SectionLabel>
          <SectionTitle light>Ready to get started?</SectionTitle>
          <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.4)", maxWidth: "44ch", margin: "0 auto 3rem" }}>
            If this proposal looks right, here's what happens next.
          </p>

          <div className="sag-steps" style={{ marginBottom: "3rem" }}>
            {[
              { num: "1", title: "Confirm", desc: "Reply to accept or ask any questions." },
              { num: "2", title: "First payment", desc: "Pay Month 1 retainer to activate." },
              { num: "3", title: "Brief us", desc: "Share your first content calendar." },
              { num: "4", title: "We deliver", desc: "Receive publish-ready assets in 3 days." },
            ].map(({ num, title, desc }, i) => (
              <React.Fragment key={num}>
                <div style={{ textAlign: "center", padding: "1.25rem 0.75rem", maxWidth: 160 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.875rem" }}>
                    <span style={{ fontFamily: PJB, fontWeight: 700, fontSize: "0.875rem", color: "white" }}>{num}</span>
                  </div>
                  <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "-0.02em", color: "white", marginBottom: "0.375rem" }}>{title}</p>
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{desc}</p>
                </div>
                {i < 3 && (
                  <ArrowRight className="sag-step-arrow" size={16} style={{ color: "rgba(255,255,255,0.18)", flexShrink: 0 }} />
                )}
              </React.Fragment>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <a href={mailtoHref} className="no-print">
              <Button size="lg" style={{ fontSize: "0.9375rem", letterSpacing: "-0.02em", paddingLeft: "1.75rem", paddingRight: "1.75rem", height: "3rem" }}>
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

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer
        style={{
          padding: "1.75rem 1.5rem",
          background: "oklch(0.11 0.025 258)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          WebkitPrintColorAdjust: "exact",
        } as React.CSSProperties}
      >
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: 20, height: 20, borderRadius: 5, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: "rgba(255,255,255,0.35)" }} />
            </div>
            <span style={{ fontFamily: PJB, fontWeight: 800, fontSize: "0.875rem", letterSpacing: "-0.03em", color: "rgba(255,255,255,0.35)" }}>Zynk</span>
          </div>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.2)", letterSpacing: "-0.01em" }}>
            Prepared for SA Global Education · {ISSUE_DATE} · {REF}
          </p>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
            <a href="mailto:hello@zynkit.tech" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>hello@zynkit.tech</a>
            <a href="https://zynkit.tech" target="_blank" rel="noreferrer" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>zynkit.tech</a>
            <button
              className="no-print"
              onClick={() => window.print()}
              style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <Printer size={12} /> Print
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
