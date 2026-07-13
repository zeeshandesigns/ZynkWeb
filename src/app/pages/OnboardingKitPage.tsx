import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ChevronDown, ChevronUp, Loader2, Mail } from "lucide-react";
import { API } from "../../utils/supabase";

const PJB = "'Plus Jakarta Sans', sans-serif";
const OUTFIT = "'Outfit', sans-serif";

type OnboardingKit = {
  client: string;
  contact: string;
  welcome: string;
  projectOverview: string;
  expectationsText: string;
  contentBriefFormat: string;
  toolsNeeded: string[];
  faqs: { q: string; a: string }[];
  contactEmail: string;
  createdAt: string;
};

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
        padding: "2.5rem 0",
      }}
    >
      <p
        style={{
          fontFamily: PJB,
          fontWeight: 600,
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--primary)",
          opacity: 0.8,
          marginBottom: "0.875rem",
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: "0.5rem",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "0.875rem 1rem",
          background: open ? "color-mix(in oklch, var(--primary) 4%, var(--card))" : "var(--card)",
          fontFamily: PJB,
          fontWeight: 600,
          fontSize: "0.875rem",
          letterSpacing: "-0.025em",
          color: "var(--foreground)",
          border: "none",
          cursor: "pointer",
        }}
      >
        {q}
        {open ? <ChevronUp size={15} style={{ flexShrink: 0, color: "var(--primary)" }} /> : <ChevronDown size={15} style={{ flexShrink: 0, color: "var(--muted-foreground)" }} />}
      </button>
      {open && (
        <div
          style={{
            padding: "0 1rem 1rem",
            fontFamily: OUTFIT,
            fontSize: "0.875rem",
            lineHeight: 1.75,
            letterSpacing: "-0.015em",
            color: "var(--muted-foreground)",
            background: "var(--card)",
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default function OnboardingKitPage() {
  const { slug } = useParams<{ slug: string }>();
  const [kit, setKit] = useState<OnboardingKit | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) { setNotFound(true); setLoading(false); return; }
    fetch(`${API}/content/onboard-${slug}`)
      .then((r) => r.json())
      .then((res) => {
        if (!res.value) { setNotFound(true); } else { setKit(res.value); }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !kit) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: "rgba(255,255,255,0.8)" }} />
        </div>
        <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.035em" }}>
          Kit not found
        </p>
        <p style={{ fontFamily: OUTFIT, fontSize: "0.9rem", color: "var(--muted-foreground)", lineHeight: 1.65, maxWidth: 400 }}>
          This onboarding kit could not be found. Please contact Zeeshan at{" "}
          <a href="mailto:hello@zynkit.tech" style={{ color: "var(--primary)" }}>hello@zynkit.tech</a>
        </p>
      </div>
    );
  }

  const date = new Date(kit.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", fontFamily: OUTFIT }}>

      {/* Cover */}
      <div
        style={{
          background: "oklch(0.14 0.03 258)",
          padding: "4rem 2rem 3rem",
          textAlign: "center",
        }}
      >
        {/* Zynk mark */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.75rem",
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: 4, background: "rgba(255,255,255,0.85)" }} />
        </div>

        <p
          style={{
            fontFamily: PJB,
            fontWeight: 600,
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            marginBottom: "1rem",
          }}
        >
          Onboarding Kit · Zynk
        </p>

        <h1
          style={{
            fontFamily: PJB,
            fontWeight: 800,
            fontSize: "clamp(2rem, 6vw, 3.25rem)",
            letterSpacing: "-0.045em",
            lineHeight: 1.1,
            color: "white",
            marginBottom: "1rem",
          }}
        >
          {kit.client}
        </h1>

        <p
          style={{
            fontFamily: OUTFIT,
            fontSize: "1.0625rem",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.6)",
            marginBottom: "0.5rem",
          }}
        >
          Welcome, {kit.contact || kit.client}
        </p>

        <p
          style={{
            fontSize: "0.8rem",
            letterSpacing: "-0.01em",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Prepared {date}
        </p>
      </div>

      {/* Body */}
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "0 1.5rem 4rem",
        }}
      >
        {/* Welcome */}
        {kit.welcome && (
          <Section label="Welcome">
            <p style={{ fontFamily: OUTFIT, fontSize: "1rem", lineHeight: 1.8, letterSpacing: "-0.015em", color: "var(--foreground)" }}>
              {kit.welcome}
            </p>
          </Section>
        )}

        {/* Project Overview */}
        {kit.projectOverview && (
          <Section label="Project Overview">
            <p style={{ fontFamily: OUTFIT, fontSize: "0.9375rem", lineHeight: 1.75, letterSpacing: "-0.015em", color: "var(--muted-foreground)" }}>
              {kit.projectOverview}
            </p>
          </Section>
        )}

        {/* What to Expect */}
        {kit.expectationsText && (
          <Section label="What to Expect">
            <p style={{ fontFamily: OUTFIT, fontSize: "0.9375rem", lineHeight: 1.75, letterSpacing: "-0.015em", color: "var(--muted-foreground)" }}>
              {kit.expectationsText}
            </p>
          </Section>
        )}

        {/* How to Send Brief */}
        {kit.contentBriefFormat && (
          <Section label="How to Send Your Brief">
            <p style={{ fontFamily: OUTFIT, fontSize: "0.9375rem", lineHeight: 1.75, letterSpacing: "-0.015em", color: "var(--muted-foreground)" }}>
              {kit.contentBriefFormat}
            </p>
          </Section>
        )}

        {/* Tools & Access */}
        {kit.toolsNeeded?.length > 0 && (
          <Section label="Tools & Access Needed">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {kit.toolsNeeded.map((tool) => (
                <div
                  key={tool}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.625rem 1rem",
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 6,
                      background: "color-mix(in oklch, var(--primary) 12%, transparent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: "var(--primary)" }} />
                  </div>
                  <span style={{ fontFamily: PJB, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "-0.02em" }}>
                    {tool}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* FAQs */}
        {kit.faqs?.length > 0 && (
          <Section label="Frequently Asked Questions">
            {kit.faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </Section>
        )}

        {/* Contact */}
        <Section label="Contact">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1.25rem 1.5rem",
              borderRadius: 12,
              border: "1px solid var(--border)",
              background: "var(--card)",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "color-mix(in oklch, var(--primary) 12%, transparent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Mail size={18} style={{ color: "var(--primary)" }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "-0.025em", marginBottom: "0.2rem" }}>
                Zeeshan Haider
              </p>
              <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", letterSpacing: "-0.01em" }}>
                Zynk · Founder & Lead
              </p>
            </div>
            <a
              href={`mailto:${kit.contactEmail}`}
              style={{
                fontFamily: PJB,
                fontWeight: 600,
                fontSize: "0.8rem",
                letterSpacing: "-0.02em",
                color: "var(--primary)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                flexShrink: 0,
              }}
            >
              Drop me a message →
            </a>
          </div>
        </Section>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "1.25rem 2rem",
          textAlign: "center",
          background: "var(--secondary)",
        }}
      >
        <p style={{ fontSize: "0.75rem", letterSpacing: "-0.01em", color: "var(--muted-foreground)" }}>
          Prepared by <span style={{ fontFamily: PJB, fontWeight: 600 }}>Zynk</span> for {kit.client} · Confidential
        </p>
      </div>
    </div>
  );
}
