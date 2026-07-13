import { useState } from "react";

const PJB = "'Plus Jakarta Sans', sans-serif";
const OUTFIT = "'Outfit', sans-serif";

type CheckItem = {
  id: string;
  section: string;
  item: string;
  where: string;
  current: string;
  priority?: "high" | "medium" | "low";
};

const TODO_ITEMS: CheckItem[] = [
  // Personal
  { id: "linkedin-url", section: "Personal", item: "LinkedIn URL", where: "Contact page, About section", current: "# (placeholder)", priority: "high" },
  { id: "github-url", section: "Personal", item: "GitHub URL", where: "Contact page", current: "# (placeholder)", priority: "high" },
  { id: "twitter-url", section: "Personal", item: "Twitter / X URL", where: "Contact page", current: "# (placeholder)", priority: "medium" },
  { id: "cv-pdf", section: "Personal", item: "CV / Resume PDF", where: "Hero download button, footer", current: "No file at /resume.pdf", priority: "high" },
  { id: "profile-photo", section: "Personal", item: "Profile photo / avatar", where: "ProposalPage About, OnboardingKit", current: "ZH initials (text fallback)" },
  { id: "og-image", section: "Personal", item: "og-image.png (1200×630)", where: "Open Graph meta tags", current: "File not uploaded to zynkit.tech", priority: "high" },

  // Homepage
  { id: "testimonial-1", section: "Homepage", item: "Testimonial #1 — name, role, company, quote", where: "TestimonialsSection", current: "Placeholder text", priority: "medium" },
  { id: "testimonial-2", section: "Homepage", item: "Testimonial #2 — name, role, company, quote", where: "TestimonialsSection", current: "Placeholder text", priority: "medium" },
  { id: "testimonial-3", section: "Homepage", item: "Testimonial #3 — name, role, company, quote", where: "TestimonialsSection", current: "Placeholder text", priority: "medium" },
  { id: "testimonial-4", section: "Homepage", item: "Testimonial #4 — name, role, company, quote", where: "TestimonialsSection", current: "Placeholder text", priority: "medium" },
  { id: "impact-revenue", section: "Homepage", item: "Verify impact: £2M+ client revenue influenced", where: "Hero stats + About section", current: "£2M+ (unverified)", priority: "low" },
  { id: "impact-downloads", section: "Homepage", item: "Verify impact: 50k app downloads (Pulse Health)", where: "Hero stats + About section", current: "50k (unverified)", priority: "low" },
  { id: "impact-stars", section: "Homepage", item: "Verify impact: 1.7k GitHub stars", where: "Hero stats + About section", current: "1.7k (unverified)", priority: "low" },
  { id: "impact-mentorship", section: "Homepage", item: "Verify impact: 50+ mentorship sessions", where: "Hero stats + About section", current: "50+ (unverified)", priority: "low" },
  { id: "location-about", section: "Homepage", item: "Update location in About text", where: "About section body copy", current: "\"Based in Manchester, UK\" — needs updating", priority: "high" },
  { id: "contact-location", section: "Homepage", item: "Update location in Contact hero", where: "ContactPage hero", current: "\"Remote · Based in the UK\"", priority: "high" },

  // Design Portfolio
  { id: "nexus-image", section: "Design Portfolio", item: "Nexus — real project image", where: "DesignPortfolio grid + modal", current: "Unsplash placeholder" },
  { id: "nexus-url", section: "Design Portfolio", item: "Nexus — View Project URL", where: "DesignPortfolio modal CTA", current: "None (button disabled)" },
  { id: "atlas-image", section: "Design Portfolio", item: "Atlas — real project image", where: "DesignPortfolio grid + modal", current: "Unsplash placeholder" },
  { id: "atlas-url", section: "Design Portfolio", item: "Atlas — View Project URL", where: "DesignPortfolio modal CTA", current: "None (button disabled)" },
  { id: "pulse-image", section: "Design Portfolio", item: "Pulse — real project image", where: "DesignPortfolio grid + modal", current: "Unsplash placeholder" },
  { id: "orbit-image", section: "Design Portfolio", item: "Orbit — real project image", where: "DesignPortfolio grid + modal", current: "Unsplash placeholder" },
  { id: "flux-image", section: "Design Portfolio", item: "Flux — real project image", where: "DesignPortfolio grid + modal", current: "Unsplash placeholder" },
  { id: "arc-image", section: "Design Portfolio", item: "Arc — real project image", where: "DesignPortfolio grid + modal", current: "Unsplash placeholder" },

  // Dev Portfolio
  { id: "rt-url", section: "Dev Portfolio", item: "react-tokens — real GitHub URL", where: "DevProjects CompactCard link", current: "# (placeholder)" },
  { id: "rt-stats", section: "Dev Portfolio", item: "react-tokens — real stars / forks", where: "DevProjects FeaturedCard", current: "1.2k / 89 (hardcoded)" },
  { id: "fe-url", section: "Dev Portfolio", item: "figma-exporter — real GitHub URL", where: "DevProjects CompactCard link", current: "# (placeholder)" },
  { id: "sk-url", section: "Dev Portfolio", item: "supabase-kit — real GitHub URL", where: "DevProjects CompactCard link", current: "# (placeholder)" },
  { id: "as-url", section: "Dev Portfolio", item: "api-scaffold — real GitHub URL", where: "DevProjects CompactCard link", current: "# (placeholder)" },

  // Case Studies
  { id: "atlas-cs-image", section: "Case Studies", item: "Atlas Analytics — real cover image", where: "CaseStudies card + modal", current: "Unsplash placeholder" },
  { id: "pulse-cs-image", section: "Case Studies", item: "Pulse Health — real cover image", where: "CaseStudies card + modal", current: "Unsplash placeholder" },
  { id: "rt-cs-image", section: "Case Studies", item: "react-tokens — real cover image", where: "CaseStudies card + modal", current: "Unsplash placeholder" },
  { id: "zynk-cs-image", section: "Case Studies", item: "Zynk Design System — real cover image", where: "CaseStudies card + modal", current: "Unsplash placeholder" },

  // Now Section (KV)
  { id: "now-building", section: "Now Section", item: "\"Building\" — current project", where: "NowSection (editable via Admin → Content)", current: "Placeholder", priority: "medium" },
  { id: "now-reading", section: "Now Section", item: "\"Reading\" — current book", where: "NowSection (editable via Admin → Content)", current: "Placeholder", priority: "low" },
  { id: "now-learning", section: "Now Section", item: "\"Learning\" — current focus", where: "NowSection (editable via Admin → Content)", current: "Placeholder", priority: "low" },
];

const FUTURE_ITEMS = [
  { id: "resend-key", label: "Set RESEND_API_KEY", detail: "Supabase project → Edge Functions → Secrets. Domain: bookings@zynkit.tech needs zynkit.tech verified in Resend." },
  { id: "invoice-gen", label: "Invoice generator", detail: "Add an Invoices tab in admin. Generate PDF invoices from booking data + custom line items." },
  { id: "client-crm", label: "Client CRM tab in admin", detail: "Track clients, project status, invoices, and communication history in one place." },
  { id: "proposal-expiry", label: "Proposal expiry tracking", detail: "Show \"expires in X days\" on proposal cards. Auto-flag expired proposals in admin." },
  { id: "client-confirm-email", label: "Booking confirmation email to client", detail: "When a booking is confirmed, send a copy to the client email via Resend." },
  { id: "blog", label: "Blog / Writing section", detail: "Add a /writing route with MDX or CMS-backed posts on design, engineering, and product." },
  { id: "graphics-password", label: "Password-protect /graphics page", detail: "Add a PIN or password gate so the graphics portfolio is only accessible to people you share it with." },
  { id: "analytics", label: "Basic analytics (Plausible / Fathom)", detail: "Add privacy-friendly analytics to understand page views and booking conversion." },
];

const SECTIONS = [...new Set(TODO_ITEMS.map((i) => i.section))];

const PRIORITY_COLORS: Record<string, string> = {
  high: "oklch(0.55 0.22 25)",
  medium: "oklch(0.58 0.18 85)",
  low: "var(--muted-foreground)",
};

export default function ManagerPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [futureChecked, setFutureChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleFuture = (id: string) =>
    setFutureChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const total = TODO_ITEMS.length;
  const done = checked.size;
  const pct = Math.round((done / total) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", fontFamily: OUTFIT }}>

      {/* Header */}
      <div style={{ background: "oklch(0.14 0.03 258)", padding: "2rem 2rem 1.75rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 9, height: 9, borderRadius: 3, background: "rgba(255,255,255,0.85)" }} />
            </div>
            <span style={{ fontFamily: PJB, fontWeight: 800, fontSize: "0.9rem", letterSpacing: "-0.03em", color: "white" }}>Zynk</span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>/</span>
            <span style={{ fontFamily: PJB, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "-0.02em", color: "rgba(255,255,255,0.5)" }}>Manager</span>
          </div>

          <h1 style={{ fontFamily: PJB, fontWeight: 800, fontSize: "clamp(1.5rem, 4vw, 2.25rem)", letterSpacing: "-0.045em", color: "white", marginBottom: "0.5rem" }}>
            Site Manager
          </h1>
          <p style={{ fontFamily: OUTFIT, fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", letterSpacing: "-0.015em" }}>
            Internal checklist of all placeholder data still needing real content.
            Check items off as you fill them in — resets on page refresh.
          </p>

          {/* Progress bar */}
          <div style={{ marginTop: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontFamily: PJB, fontWeight: 600, fontSize: "0.75rem", letterSpacing: "-0.01em", color: "rgba(255,255,255,0.6)" }}>
                {done} of {total} items complete
              </span>
              <span style={{ fontFamily: PJB, fontWeight: 700, fontSize: "0.875rem", letterSpacing: "-0.025em", color: pct === 100 ? "oklch(0.65 0.20 145)" : "rgba(255,255,255,0.7)" }}>
                {pct}%
              </span>
            </div>
            <div style={{ height: 4, borderRadius: 999, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  borderRadius: 999,
                  width: `${pct}%`,
                  background: pct === 100 ? "oklch(0.65 0.20 145)" : "var(--primary)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>

        {SECTIONS.map((section) => {
          const items = TODO_ITEMS.filter((i) => i.section === section);
          const sectionDone = items.filter((i) => checked.has(i.id)).length;

          return (
            <div key={section} style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <p
                  style={{
                    fontFamily: PJB,
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {section}
                </p>
                <span
                  style={{
                    fontFamily: PJB,
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    letterSpacing: "-0.01em",
                    color: sectionDone === items.length ? "oklch(0.40 0.15 145)" : "var(--muted-foreground)",
                  }}
                >
                  {sectionDone}/{items.length}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                {items.map((item) => {
                  const isChecked = checked.has(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.875rem",
                        padding: "0.875rem 1rem",
                        borderRadius: 10,
                        border: "1px solid var(--border)",
                        background: isChecked ? "color-mix(in oklch, oklch(0.65 0.20 145) 5%, var(--card))" : "var(--card)",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        opacity: isChecked ? 0.6 : 1,
                      }}
                    >
                      {/* Checkbox */}
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 5,
                          border: isChecked ? "none" : "2px solid var(--border)",
                          background: isChecked ? "oklch(0.65 0.20 145)" : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 1,
                          transition: "all 0.15s",
                        }}
                      >
                        {isChecked && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5L4.2 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.2rem" }}>
                          <p
                            style={{
                              fontFamily: PJB,
                              fontWeight: 600,
                              fontSize: "0.875rem",
                              letterSpacing: "-0.02em",
                              textDecoration: isChecked ? "line-through" : "none",
                              color: isChecked ? "var(--muted-foreground)" : "var(--foreground)",
                            }}
                          >
                            {item.item}
                          </p>
                          {item.priority && (
                            <span
                              style={{
                                fontSize: "0.58rem",
                                fontFamily: PJB,
                                fontWeight: 700,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                color: PRIORITY_COLORS[item.priority],
                                opacity: isChecked ? 0.5 : 1,
                              }}
                            >
                              {item.priority}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: "0.75rem", letterSpacing: "-0.01em", color: "var(--muted-foreground)", marginBottom: "0.2rem" }}>
                          {item.where}
                        </p>
                        <p
                          style={{
                            fontFamily: "ui-monospace, monospace",
                            fontSize: "0.7rem",
                            letterSpacing: 0,
                            color: "var(--muted-foreground)",
                            opacity: 0.7,
                            background: "var(--muted)",
                            display: "inline-block",
                            padding: "1px 6px",
                            borderRadius: 4,
                          }}
                        >
                          {item.current}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Future Improvements */}
        <div
          style={{
            borderTop: "2px dashed var(--border)",
            paddingTop: "2.5rem",
            marginTop: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: PJB,
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              marginBottom: "0.5rem",
            }}
          >
            Future Improvements
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", letterSpacing: "-0.01em", marginBottom: "1.25rem" }}>
            Features and improvements planned for later — not urgent but tracked here.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            {FUTURE_ITEMS.map((item) => {
              const isChecked = futureChecked.has(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleFuture(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.875rem",
                    padding: "0.875rem 1rem",
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                    background: isChecked ? "color-mix(in oklch, oklch(0.65 0.20 145) 5%, var(--card))" : "var(--card)",
                    cursor: "pointer",
                    opacity: isChecked ? 0.55 : 1,
                    transition: "all 0.15s",
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 5,
                      border: isChecked ? "none" : "2px solid var(--border)",
                      background: isChecked ? "oklch(0.65 0.20 145)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                      transition: "all 0.15s",
                    }}
                  >
                    {isChecked && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4.2 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: PJB, fontWeight: 600, fontSize: "0.875rem", letterSpacing: "-0.02em", textDecoration: isChecked ? "line-through" : "none", color: isChecked ? "var(--muted-foreground)" : "var(--foreground)", marginBottom: "0.25rem" }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: "0.775rem", letterSpacing: "-0.01em", color: "var(--muted-foreground)", lineHeight: 1.55 }}>
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
