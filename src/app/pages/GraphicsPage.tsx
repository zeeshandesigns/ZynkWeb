/**
 * /graphics — Hidden social content page.
 * Not linked from nav. Access directly via /graphics.
 * Screenshot or print each graphic to export.
 */

import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

// ─── Shared graphic helpers ───────────────────────────────────────────────────

const PJB = "'Plus Jakarta Sans', sans-serif";
const OUTFIT = "'Outfit', sans-serif";
const BLUE = "oklch(0.546 0.218 258)";
const NAVY = "oklch(0.14 0.04 258)";

function DotGrid({ opacity = 0.1, size = 24 }: { opacity?: number; size?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,${opacity}) 1.5px, transparent 1.5px)`,
        backgroundSize: `${size}px ${size}px`,
        pointerEvents: "none",
      }}
    />
  );
}

function ZynkMark({ light = false }: { light?: boolean }) {
  const color = light ? "rgba(255,255,255,0.9)" : BLUE;
  const bg = light ? "rgba(255,255,255,0.15)" : `color-mix(in oklch, ${BLUE} 15%, transparent)`;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: light ? "rgba(255,255,255,0.2)" : BLUE, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: light ? "rgba(0,0,0,0.5)" : "white" }} />
      </div>
      <span style={{ fontFamily: PJB, fontWeight: 800, fontSize: "14px", letterSpacing: "-0.03em", color }}>Zynk</span>
    </div>
  );
}

// ─── Graphic card wrapper ─────────────────────────────────────────────────────

type Platform = "LinkedIn" | "Instagram" | "Twitter / X";

const platformColors: Record<Platform, string> = {
  LinkedIn: "oklch(0.55 0.18 240)",
  Instagram: "oklch(0.55 0.20 330)",
  "Twitter / X": "oklch(0.30 0.02 240)",
};

function GraphicCard({
  title,
  description,
  platforms,
  format,
  children,
}: {
  title: string;
  description: string;
  platforms: Platform[];
  format: "1:1" | "4:5" | "16:9" | "4:1";
  children: React.ReactNode;
}) {
  const ratio =
    format === "1:1" ? "1 / 1"
    : format === "4:5" ? "4 / 5"
    : format === "4:1" ? "4 / 1"
    : "16 / 9";

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "0.9375rem", letterSpacing: "-0.025em" }} className="mb-1">
          {title}
        </p>
        <p className="text-muted-foreground" style={{ fontSize: "0.775rem", letterSpacing: "-0.01em" }}>
          {description}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {platforms.map((p) => (
          <span
            key={p}
            style={{
              fontFamily: PJB,
              fontWeight: 600,
              fontSize: "0.65rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: platformColors[p],
              background: `color-mix(in oklch, ${platformColors[p]} 10%, transparent)`,
              border: `1px solid color-mix(in oklch, ${platformColors[p]} 25%, transparent)`,
              padding: "2px 8px",
              borderRadius: "999px",
            }}
          >
            {p}
          </span>
        ))}
        <span style={{ fontSize: "0.68rem", letterSpacing: "-0.01em", color: "var(--muted-foreground)" }}>
          · {format}
        </span>
      </div>

      {/* The graphic */}
      <div
        className="rounded-2xl overflow-hidden shadow-xl border border-border"
        style={{ aspectRatio: ratio, width: "100%", position: "relative" }}
      >
        {children}
      </div>

      <p style={{ fontSize: "0.68rem", letterSpacing: "-0.01em", color: "var(--muted-foreground)" }}>
        Screenshot to export · Optimised for {platforms.join(", ")}
      </p>
    </div>
  );
}

// ─── Graphic 1: Website is Live ───────────────────────────────────────────────

function WebsiteLiveGraphic() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: NAVY,
        position: "relative",
        overflow: "hidden",
        padding: "10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <DotGrid opacity={0.07} size={28} />

      {/* Glow blobs */}
      <div style={{ position: "absolute", top: "-20%", right: "-15%", width: "60%", height: "60%", borderRadius: "50%", background: `radial-gradient(circle, rgba(37,99,235,0.3), transparent 70%)`, filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "40%", height: "40%", borderRadius: "50%", background: `radial-gradient(circle, rgba(37,99,235,0.15), transparent 70%)`, filter: "blur(30px)", pointerEvents: "none" }} />

      {/* Top: tag + mark */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "999px", border: "1px solid rgba(59,130,246,0.4)", background: "rgba(37,99,235,0.18)" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "oklch(0.65 0.20 145)", display: "inline-block" }} />
          <span style={{ color: "#93c5fd", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: PJB }}>New</span>
        </div>
        <ZynkMark light />
      </div>

      {/* Main content */}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8% 0" }}>
        <p style={{ fontFamily: PJB, fontWeight: 800, fontSize: "clamp(3rem, 12vw, 6rem)", letterSpacing: "-0.045em", color: "white", lineHeight: 0.92, marginBottom: "6%" }}>
          It's<br />
          <span style={{ color: BLUE }}>live.</span>
        </p>
        <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.8rem, 2.5vw, 1rem)", letterSpacing: "-0.02em", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, maxWidth: "80%" }}>
          My new digital portfolio is officially up — designed, built, and shipped end to end.
        </p>
      </div>

      {/* Bottom: URL + name */}
      <div style={{ position: "relative" }}>
        <div style={{ display: "inline-block", padding: "8px 18px", borderRadius: "10px", background: BLUE, marginBottom: "5%" }}>
          <span style={{ fontFamily: PJB, fontWeight: 800, fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)", letterSpacing: "-0.03em", color: "white" }}>zynkit.tech</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "clamp(0.75rem, 2vw, 0.9rem)", letterSpacing: "-0.025em", color: "white" }}>Zeeshan Haider</p>
            <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.6rem, 1.5vw, 0.72rem)", letterSpacing: "-0.01em", color: "rgba(255,255,255,0.45)" }}>Designer & Full-Stack Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Graphic 2: Available for Work ───────────────────────────────────────────

function AvailableGraphic() {
  const workTypes = ["Freelance", "Advisory", "Full-time"];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(145deg, oklch(0.22 0.06 258) 0%, oklch(0.52 0.22 255) 100%)`,
        position: "relative",
        overflow: "hidden",
        padding: "10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <DotGrid opacity={0.12} size={32} />

      {/* Glow */}
      <div style={{ position: "absolute", top: "-10%", left: "50%", width: "80%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)", filter: "blur(40px)", transform: "translateX(-50%)", pointerEvents: "none" }} />

      {/* Top */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "oklch(0.65 0.20 145)", display: "inline-block", boxShadow: "0 0 0 4px rgba(34,197,94,0.25)" }} />
          <span style={{ fontFamily: PJB, fontWeight: 700, fontSize: "clamp(0.7rem, 1.8vw, 0.85rem)", color: "rgba(255,255,255,0.8)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Open to Work</span>
        </div>
        <ZynkMark light />
      </div>

      {/* Main */}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <p style={{ fontFamily: PJB, fontWeight: 800, fontSize: "clamp(2.5rem, 10vw, 5rem)", letterSpacing: "-0.045em", color: "white", lineHeight: 0.95, marginBottom: "6%" }}>
          New projects,<br />
          <span style={{ opacity: 0.65 }}>please.</span>
        </p>
        <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.8rem, 2.2vw, 1rem)", color: "rgba(255,255,255,0.65)", letterSpacing: "-0.02em", lineHeight: 1.6, maxWidth: "85%", marginBottom: "8%" }}>
          Available for design and engineering work — from 0-to-1 products to redesigning what's broken.
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {workTypes.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: PJB,
                fontWeight: 600,
                fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.1)",
                padding: "4px 12px",
                borderRadius: "999px",
                letterSpacing: "-0.01em",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ position: "relative", borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "5%" }}>
        <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "clamp(0.75rem, 2vw, 0.9rem)", color: "white", marginBottom: "2%" }}>Zeeshan Haider</p>
        <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)", color: "rgba(255,255,255,0.5)", letterSpacing: "-0.01em" }}>hello@zynkit.tech</p>
      </div>
    </div>
  );
}

// ─── Graphic 3: Design + Build ────────────────────────────────────────────────

function DesignBuildGraphic() {
  const lines = [
    { word: "Design.", color: BLUE, size: "clamp(2.2rem, 8vw, 4rem)" },
    { word: "Build.", color: "var(--foreground)", size: "clamp(2.2rem, 8vw, 4rem)" },
    { word: "Ship.", color: "var(--muted-foreground)", size: "clamp(2.2rem, 8vw, 4rem)" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "var(--background)",
        position: "relative",
        overflow: "hidden",
        padding: "10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Subtle grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle, var(--border) 1.5px, transparent 1.5px)`, backgroundSize: "28px 28px", opacity: 0.6, pointerEvents: "none" }} />

      {/* Glow */}
      <div style={{ position: "absolute", top: "-20%", right: "-20%", width: "60%", height: "60%", borderRadius: "50%", background: `radial-gradient(circle, color-mix(in oklch, ${BLUE} 15%, transparent), transparent 70%)`, filter: "blur(40px)", pointerEvents: "none" }} />

      {/* Top */}
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <ZynkMark />
        <span style={{ fontFamily: PJB, fontWeight: 600, fontSize: "clamp(0.6rem, 1.5vw, 0.72rem)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
          Designer + Developer
        </span>
      </div>

      {/* Main typography */}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {lines.map(({ word, color, size }) => (
          <p
            key={word}
            style={{
              fontFamily: PJB,
              fontWeight: 800,
              fontSize: size,
              letterSpacing: "-0.045em",
              color,
              lineHeight: 1.05,
            }}
          >
            {word}
          </p>
        ))}
        <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.75rem, 2vw, 0.9rem)", letterSpacing: "-0.02em", color: "var(--muted-foreground)", lineHeight: 1.65, maxWidth: "85%", marginTop: "8%" }}>
          I don't hand off designs — I ship them. From product strategy and UX to production code.
        </p>
      </div>

      {/* Bottom */}
      <div style={{ position: "relative", borderTop: "1px solid var(--border)", paddingTop: "5%", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "clamp(0.75rem, 2vw, 0.875rem)", letterSpacing: "-0.025em" }}>Zeeshan Haider</p>
          <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.6rem, 1.5vw, 0.72rem)", color: "var(--muted-foreground)", letterSpacing: "-0.01em" }}>zynkit.tech</p>
        </div>
      </div>
    </div>
  );
}

// ─── Graphic 4: 6 Years in the Craft ─────────────────────────────────────────

function SixYearsGraphic() {
  const milestones = [
    "40+ products shipped",
    "3 startups co-founded",
    "1 studio built",
    "12+ clients, 0 regrets",
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(160deg, oklch(0.14 0.04 258) 0%, oklch(0.20 0.06 255) 100%)`,
        position: "relative",
        overflow: "hidden",
        padding: "10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <DotGrid opacity={0.06} size={24} />

      {/* Accent line */}
      <div style={{ position: "absolute", left: 0, top: "15%", bottom: "15%", width: "3px", background: `linear-gradient(to bottom, transparent, ${BLUE}, transparent)` }} />

      {/* Top */}
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontFamily: PJB, fontWeight: 600, fontSize: "clamp(0.6rem, 1.5vw, 0.72rem)", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
          Since 2018
        </span>
        <ZynkMark light />
      </div>

      {/* Main */}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <p style={{ fontFamily: PJB, fontWeight: 800, fontSize: "clamp(5rem, 20vw, 10rem)", letterSpacing: "-0.05em", color: "white", lineHeight: 0.85, marginBottom: "5%" }}>
          6<span style={{ color: BLUE }}>+</span>
        </p>
        <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "clamp(0.9rem, 2.5vw, 1.25rem)", letterSpacing: "-0.03em", color: "rgba(255,255,255,0.85)", lineHeight: 1.3, marginBottom: "7%" }}>
          Years building digital products<br />that actually ship.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {milestones.map((m) => (
            <div key={m} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: BLUE, flexShrink: 0 }} />
              <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.65rem, 1.8vw, 0.85rem)", color: "rgba(255,255,255,0.55)", letterSpacing: "-0.015em" }}>{m}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ position: "relative", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "5%" }}>
        <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "clamp(0.75rem, 2vw, 0.875rem)", color: "white", letterSpacing: "-0.025em" }}>Zeeshan Haider</p>
        <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.6rem, 1.5vw, 0.72rem)", color: "rgba(255,255,255,0.4)", letterSpacing: "-0.01em" }}>Designer & Full-Stack Developer</p>
      </div>
    </div>
  );
}

// ─── Graphic 5: Zynk Studio ───────────────────────────────────────────────────

function ZynkStudioGraphic() {
  const services = ["Product Design", "Full-Stack Dev", "Design Systems", "Advisory"];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(135deg, oklch(0.46 0.22 258) 0%, oklch(0.60 0.18 240) 50%, oklch(0.78 0.09 220) 100%)`,
        position: "relative",
        overflow: "hidden",
        padding: "10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <DotGrid opacity={0.1} size={28} />

      {/* Corner glow */}
      <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50%", height: "50%", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />

      {/* Top */}
      <div style={{ position: "relative" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 14px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.1)", marginBottom: "8%" }}>
          <span style={{ fontFamily: PJB, fontWeight: 700, fontSize: "clamp(0.6rem, 1.5vw, 0.72rem)", color: "white", letterSpacing: "0.05em", textTransform: "uppercase" }}>Introducing</span>
        </div>

        <p style={{ fontFamily: PJB, fontWeight: 800, fontSize: "clamp(3rem, 12vw, 6rem)", letterSpacing: "-0.045em", color: "white", lineHeight: 0.9, marginBottom: "5%" }}>
          Zynk<br />Studio.
        </p>

        <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.75rem, 2vw, 0.95rem)", color: "rgba(255,255,255,0.7)", letterSpacing: "-0.02em", lineHeight: 1.6, maxWidth: "80%" }}>
          A design + development studio that ships end-to-end software for startups and scale-ups.
        </p>
      </div>

      {/* Services */}
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "7%" }}>
          {services.map((s) => (
            <span
              key={s}
              style={{
                fontFamily: PJB,
                fontWeight: 600,
                fontSize: "clamp(0.55rem, 1.4vw, 0.7rem)",
                color: "white",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                padding: "4px 10px",
                borderRadius: "999px",
                letterSpacing: "-0.01em",
              }}
            >
              {s}
            </span>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "5%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: PJB, fontWeight: 800, fontSize: "clamp(0.8rem, 2vw, 0.95rem)", color: "white", letterSpacing: "-0.03em" }}>zynkit.tech</p>
            <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.6rem, 1.4vw, 0.7rem)", color: "rgba(255,255,255,0.5)", letterSpacing: "-0.01em" }}>hello@zynkit.tech</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "20px", height: "20px", borderRadius: "5px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "rgba(255,255,255,0.8)" }} />
            </div>
            <span style={{ fontFamily: PJB, fontWeight: 800, fontSize: "clamp(0.75rem, 2vw, 0.9rem)", color: "white", letterSpacing: "-0.03em" }}>Zynk</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Graphic 6: Thought Leadership ───────────────────────────────────────────

function ThoughtGraphic() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "var(--background)",
        position: "relative",
        overflow: "hidden",
        padding: "10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Subtle grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle, var(--border) 1.5px, transparent 1.5px)`, backgroundSize: "28px 28px", opacity: 0.5, pointerEvents: "none" }} />

      {/* Blue accent bar */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: `linear-gradient(to bottom, ${BLUE}, oklch(0.78 0.09 220))` }} />

      {/* Top */}
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: PJB, fontWeight: 600, fontSize: "clamp(0.6rem, 1.4vw, 0.7rem)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>Perspective</span>
        <ZynkMark />
      </div>

      {/* Quote */}
      <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
        <div>
          <p
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(2rem, 7vw, 3.5rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--foreground)",
              marginBottom: "7%",
            }}
          >
            "Design doesn't<br />end at handoff.{" "}
            <span style={{ color: BLUE }}>It starts<br />at the terminal.</span>"
          </p>
          <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.75rem, 2vw, 0.9rem)", color: "var(--muted-foreground)", letterSpacing: "-0.02em", lineHeight: 1.65, maxWidth: "85%" }}>
            The best designers I know write code. The best engineers I know have strong visual instincts. The best products are built when both halves of the brain are talking to each other.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ position: "relative", borderTop: "1px solid var(--border)", paddingTop: "5%", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "clamp(0.75rem, 2vw, 0.875rem)", letterSpacing: "-0.025em" }}>Zeeshan Haider</p>
          <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.6rem, 1.5vw, 0.72rem)", color: "var(--muted-foreground)", letterSpacing: "-0.01em" }}>Designer & Full-Stack Developer · zynkit.tech</p>
        </div>
      </div>
    </div>
  );
}

// ─── Graphic 7: Hire Me / CTA ─────────────────────────────────────────────────

function HireGraphic() {
  const bullets = [
    "Design that ships as code",
    "Engineering that looks designed",
    "Strategy that ties both together",
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: NAVY,
        position: "relative",
        overflow: "hidden",
        padding: "10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <DotGrid opacity={0.07} size={28} />

      {/* Glow */}
      <div style={{ position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)", width: "100%", height: "40%", background: `radial-gradient(ellipse, color-mix(in oklch, ${BLUE} 20%, transparent), transparent 70%)`, filter: "blur(30px)", pointerEvents: "none" }} />

      {/* Top */}
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "999px", border: "1px solid rgba(34,197,94,0.4)", background: "rgba(34,197,94,0.12)" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "oklch(0.65 0.20 145)", display: "inline-block" }} />
          <span style={{ fontFamily: PJB, fontWeight: 700, fontSize: "clamp(0.55rem, 1.4vw, 0.68rem)", color: "oklch(0.55 0.18 145)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Available Q3 2026</span>
        </div>
        <ZynkMark light />
      </div>

      {/* Main */}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <p style={{ fontFamily: PJB, fontWeight: 800, fontSize: "clamp(2rem, 9vw, 4.5rem)", letterSpacing: "-0.045em", color: "white", lineHeight: 0.92, marginBottom: "7%" }}>
          Let's build<br />
          <span style={{ color: BLUE }}>something</span><br />
          great.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "8%" }}>
          {bullets.map((b) => (
            <div key={b} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: BLUE, flexShrink: 0 }} />
              <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.7rem, 1.8vw, 0.875rem)", color: "rgba(255,255,255,0.65)", letterSpacing: "-0.015em" }}>{b}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ position: "relative", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "5%", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "clamp(0.75rem, 2vw, 0.875rem)", color: "white", letterSpacing: "-0.025em" }}>Zeeshan Haider</p>
          <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.6rem, 1.4vw, 0.72rem)", color: "rgba(255,255,255,0.4)", letterSpacing: "-0.01em" }}>hello@zynkit.tech</p>
        </div>
        <div style={{ padding: "6px 14px", borderRadius: "8px", background: BLUE }}>
          <span style={{ fontFamily: PJB, fontWeight: 700, fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)", color: "white", letterSpacing: "-0.02em" }}>zynkit.tech →</span>
        </div>
      </div>
    </div>
  );
}

// ─── LinkedIn Banner 1: Dark Statement ───────────────────────────────────────

function LinkedInBannerDark() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: NAVY,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <DotGrid opacity={0.06} size={24} />

      {/* Avatar zone gradient (left ~28%) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "30%",
          background: `linear-gradient(to right, ${NAVY} 40%, transparent)`,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Right glow */}
      <div
        style={{
          position: "absolute",
          top: "-100%",
          right: "-5%",
          width: "35%",
          height: "300%",
          background: `radial-gradient(circle, rgba(37,99,235,0.28), transparent 70%)`,
          filter: "blur(24px)",
          pointerEvents: "none",
        }}
      />

      {/* Left accent line */}
      <div
        style={{
          position: "absolute",
          left: "29%",
          top: "15%",
          bottom: "15%",
          width: "2px",
          background: `linear-gradient(to bottom, transparent, ${BLUE}, transparent)`,
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "0 7% 0 33%",
          gap: "4%",
        }}
      >
        {/* Main */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: PJB,
              fontWeight: 800,
              fontSize: "clamp(1rem, 3.8vw, 2.2rem)",
              letterSpacing: "-0.045em",
              color: "white",
              lineHeight: 1.0,
              marginBottom: "4%",
              whiteSpace: "nowrap",
            }}
          >
            Design.{" "}
            <span style={{ color: BLUE }}>Build.</span>{" "}
            Ship.
          </p>
          <p
            style={{
              fontFamily: OUTFIT,
              fontSize: "clamp(0.5rem, 1.4vw, 0.8rem)",
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
            }}
          >
            Designer & Full-Stack Developer · Founder at Zynk
          </p>
        </div>

        {/* Right: mark + domain */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", flexShrink: 0 }}>
          <ZynkMark light />
          <p
            style={{
              fontFamily: PJB,
              fontWeight: 700,
              fontSize: "clamp(0.5rem, 1.3vw, 0.8rem)",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "-0.015em",
            }}
          >
            zynkit.tech
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── LinkedIn Banner 2: Light Gradient ───────────────────────────────────────

function LinkedInBannerLight() {
  const pills = ["Product Design", "Full-Stack Dev", "Design Systems"];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(105deg, oklch(0.92 0.04 230) 0%, oklch(0.97 0.015 240) 40%, oklch(0.99 0.003 240) 100%)`,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Subtle dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, oklch(0.80 0.025 240) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Blue left bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "5px",
          background: `linear-gradient(to bottom, ${BLUE}, oklch(0.78 0.09 220))`,
        }}
      />

      {/* Avatar zone: slightly tinted */}
      <div
        style={{
          position: "absolute",
          left: "5px",
          top: 0,
          bottom: 0,
          width: "26%",
          background: `linear-gradient(to right, oklch(0.90 0.05 230), transparent)`,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "0 7% 0 32%",
          gap: "4%",
        }}
      >
        {/* Main */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: PJB,
              fontWeight: 800,
              fontSize: "clamp(1rem, 3.8vw, 2.2rem)",
              letterSpacing: "-0.045em",
              color: NAVY,
              lineHeight: 1.0,
              marginBottom: "4%",
              whiteSpace: "nowrap",
            }}
          >
            Zeeshan Haider
          </p>
          <div style={{ display: "flex", gap: "5px", flexWrap: "nowrap" }}>
            {pills.map((p) => (
              <span
                key={p}
                style={{
                  fontFamily: PJB,
                  fontWeight: 600,
                  fontSize: "clamp(0.4rem, 1.1vw, 0.65rem)",
                  color: "white",
                  background: BLUE,
                  padding: "2px 8px",
                  borderRadius: "999px",
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px", flexShrink: 0 }}>
          <ZynkMark />
          <p
            style={{
              fontFamily: PJB,
              fontWeight: 700,
              fontSize: "clamp(0.5rem, 1.3vw, 0.78rem)",
              color: "var(--muted-foreground)",
              letterSpacing: "-0.015em",
            }}
          >
            zynkit.tech
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── LinkedIn Featured 1: Website ────────────────────────────────────────────

function FeaturedWebsiteGraphic() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(145deg, oklch(0.20 0.06 258) 0%, oklch(0.46 0.22 258) 60%, oklch(0.60 0.18 240) 100%)`,
        position: "relative",
        overflow: "hidden",
        padding: "8%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <DotGrid opacity={0.08} size={28} />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-10%",
          width: "50%",
          height: "70%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      {/* Browser chrome mock */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "8px",
            padding: "6px 12px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "6%",
          }}
        >
          <div style={{ display: "flex", gap: "4px" }}>
            {["rgba(255,255,255,0.3)", "rgba(255,255,255,0.2)", "rgba(255,255,255,0.15)"].map((c, i) => (
              <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: c }} />
            ))}
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              borderRadius: "4px",
              padding: "2px 10px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "oklch(0.65 0.20 145)" }} />
            <span style={{ fontFamily: OUTFIT, fontSize: "clamp(0.5rem, 1.3vw, 0.72rem)", color: "rgba(255,255,255,0.8)", letterSpacing: "-0.01em" }}>
              zynkit.tech
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <p
          style={{
            fontFamily: PJB,
            fontWeight: 800,
            fontSize: "clamp(1.5rem, 5.5vw, 3rem)",
            letterSpacing: "-0.045em",
            color: "white",
            lineHeight: 0.95,
            marginBottom: "5%",
          }}
        >
          My digital<br />portfolio.
        </p>
        <p
          style={{
            fontFamily: OUTFIT,
            fontSize: "clamp(0.65rem, 1.8vw, 0.95rem)",
            color: "rgba(255,255,255,0.65)",
            letterSpacing: "-0.02em",
            lineHeight: 1.55,
            maxWidth: "70%",
          }}
        >
          Designed and built end to end — React, Tailwind, and a lot of care.
        </p>
      </div>

      {/* Bottom */}
      <div
        style={{
          position: "relative",
          borderTop: "1px solid rgba(255,255,255,0.15)",
          paddingTop: "5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ZynkMark light />
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "6px",
            padding: "4px 12px",
          }}
        >
          <span
            style={{
              fontFamily: PJB,
              fontWeight: 700,
              fontSize: "clamp(0.5rem, 1.3vw, 0.72rem)",
              color: "white",
              letterSpacing: "-0.01em",
            }}
          >
            Visit site →
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── LinkedIn Featured 2: Portfolio ──────────────────────────────────────────

function FeaturedPortfolioGraphic() {
  const categories = [
    { emoji: "🎨", label: "Design", sub: "6 projects" },
    { emoji: "⚡", label: "Dev", sub: "4 projects" },
    { emoji: "📋", label: "Case Studies", sub: "4 deep dives" },
  ];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: NAVY,
        position: "relative",
        overflow: "hidden",
        padding: "8%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <DotGrid opacity={0.06} size={24} />
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "60%",
          background: `radial-gradient(ellipse, rgba(37,99,235,0.18), transparent 70%)`,
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      {/* Top */}
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p
            style={{
              fontFamily: PJB,
              fontWeight: 600,
              fontSize: "clamp(0.5rem, 1.3vw, 0.72rem)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "3%",
            }}
          >
            Portfolio
          </p>
          <p
            style={{
              fontFamily: PJB,
              fontWeight: 800,
              fontSize: "clamp(1.4rem, 5vw, 2.75rem)",
              letterSpacing: "-0.045em",
              color: "white",
              lineHeight: 0.95,
            }}
          >
            My Work.
          </p>
        </div>
        <ZynkMark light />
      </div>

      {/* Category blocks */}
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "3%",
          flex: 1,
          alignContent: "center",
          margin: "5% 0",
        }}
      >
        {categories.map(({ emoji, label, sub }) => (
          <div
            key={label}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "10px",
              padding: "6% 5%",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <span style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.4rem)" }}>{emoji}</span>
            <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "clamp(0.55rem, 1.5vw, 0.85rem)", color: "white", letterSpacing: "-0.02em" }}>
              {label}
            </p>
            <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.4rem, 1.1vw, 0.65rem)", color: "rgba(255,255,255,0.45)", letterSpacing: "-0.01em" }}>
              {sub}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div
        style={{
          position: "relative",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "4%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.45rem, 1.2vw, 0.68rem)", color: "rgba(255,255,255,0.4)", letterSpacing: "-0.01em" }}>
          zynkit.tech/work
        </p>
        <div style={{ background: BLUE, borderRadius: "6px", padding: "4px 10px" }}>
          <span style={{ fontFamily: PJB, fontWeight: 700, fontSize: "clamp(0.45rem, 1.2vw, 0.68rem)", color: "white", letterSpacing: "-0.01em" }}>
            View all work →
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── LinkedIn Featured 3: Book a Call ────────────────────────────────────────

function FeaturedBookCallGraphic() {
  const sessions = [
    { label: "Discovery Call", duration: "30 min", emoji: "💬" },
    { label: "Project Brief", duration: "60 min", emoji: "📋" },
    { label: "Advisory", duration: "30 min", emoji: "⚡" },
  ];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "var(--background)",
        position: "relative",
        overflow: "hidden",
        padding: "8%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, var(--border) 1.5px, transparent 1.5px)`,
          backgroundSize: "24px 24px",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "50%",
          height: "70%",
          background: `radial-gradient(circle, color-mix(in oklch, ${BLUE} 12%, transparent), transparent 70%)`,
          filter: "blur(35px)",
          pointerEvents: "none",
        }}
      />

      {/* Top */}
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3%" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "oklch(0.65 0.20 145)", display: "inline-block" }} />
            <span style={{ fontFamily: PJB, fontWeight: 700, fontSize: "clamp(0.45rem, 1.2vw, 0.7rem)", color: "oklch(0.40 0.15 145)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Available Now
            </span>
          </div>
          <p
            style={{
              fontFamily: PJB,
              fontWeight: 800,
              fontSize: "clamp(1.2rem, 4.5vw, 2.5rem)",
              letterSpacing: "-0.045em",
              color: "var(--foreground)",
              lineHeight: 0.95,
            }}
          >
            Book a free<br />
            <span style={{ color: BLUE }}>discovery call.</span>
          </p>
        </div>
        <ZynkMark />
      </div>

      {/* Session types */}
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "3%",
        }}
      >
        {sessions.map(({ label, duration, emoji }) => (
          <div
            key={label}
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "5% 4%",
            }}
          >
            <span style={{ fontSize: "clamp(0.8rem, 2.2vw, 1.2rem)", display: "block", marginBottom: "3px" }}>{emoji}</span>
            <p style={{ fontFamily: PJB, fontWeight: 700, fontSize: "clamp(0.45rem, 1.3vw, 0.75rem)", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "2px" }}>
              {label}
            </p>
            <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.4rem, 1vw, 0.6rem)", color: "var(--muted-foreground)", letterSpacing: "-0.01em" }}>
              {duration}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div
        style={{
          position: "relative",
          borderTop: "1px solid var(--border)",
          paddingTop: "4%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontFamily: OUTFIT, fontSize: "clamp(0.4rem, 1.1vw, 0.65rem)", color: "var(--muted-foreground)", letterSpacing: "-0.01em" }}>
          zynkit.tech/contact · hello@zynkit.tech
        </p>
        <div style={{ background: BLUE, borderRadius: "6px", padding: "4px 10px" }}>
          <span style={{ fontFamily: PJB, fontWeight: 700, fontSize: "clamp(0.45rem, 1.1vw, 0.65rem)", color: "white", letterSpacing: "-0.01em" }}>
            Book now →
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── LinkedIn data arrays ─────────────────────────────────────────────────────

const linkedInBanners = [
  {
    id: "banner-dark",
    title: "Banner — Dark Statement",
    description: "High-contrast navy banner. Works well over most profile photos. Profile picture appears bottom-left.",
    platforms: ["LinkedIn"] as Platform[],
    format: "4:1" as const,
    Component: LinkedInBannerDark,
  },
  {
    id: "banner-light",
    title: "Banner — Light Gradient",
    description: "Clean, minimal light banner. Name and discipline pills. Professional and approachable.",
    platforms: ["LinkedIn"] as Platform[],
    format: "4:1" as const,
    Component: LinkedInBannerLight,
  },
];

const linkedInFeatured = [
  {
    id: "featured-website",
    title: "Featured — Website",
    description: "Pin to your LinkedIn Featured section linking to zynkit.tech.",
    platforms: ["LinkedIn"] as Platform[],
    format: "16:9" as const,
    Component: FeaturedWebsiteGraphic,
  },
  {
    id: "featured-portfolio",
    title: "Featured — Portfolio",
    description: "Showcase the three work categories. Links to zynkit.tech/work.",
    platforms: ["LinkedIn"] as Platform[],
    format: "16:9" as const,
    Component: FeaturedPortfolioGraphic,
  },
  {
    id: "featured-book",
    title: "Featured — Book a Call",
    description: "Drive inbound enquiries. Links to the booking page at zynkit.tech/contact.",
    platforms: ["LinkedIn"] as Platform[],
    format: "16:9" as const,
    Component: FeaturedBookCallGraphic,
  },
];

// ─── Section header ───────────────────────────────────────────────────────────

function ContentSectionHeader({ label, title, hint }: { label: string; title: string; hint?: string }) {
  return (
    <div className="mb-8">
      <p
        style={{
          fontFamily: PJB,
          fontWeight: 600,
          fontSize: "0.68rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--primary)",
          opacity: 0.75,
        }}
        className="mb-2"
      >
        {label}
      </p>
      <div className="flex items-baseline gap-4">
        <h2 style={{ fontFamily: PJB, fontWeight: 700, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", letterSpacing: "-0.04em" }}>
          {title}
        </h2>
        {hint && (
          <span style={{ fontSize: "0.75rem", letterSpacing: "-0.01em", color: "var(--muted-foreground)" }}>
            {hint}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

const graphics = [
  {
    id: "website-live",
    title: "Website is Live",
    description: "Announce the new portfolio — first post on launch day.",
    platforms: ["LinkedIn", "Instagram"] as Platform[],
    format: "1:1" as const,
    Component: WebsiteLiveGraphic,
  },
  {
    id: "open-to-work",
    title: "Open to Work",
    description: "Availability announcement for freelance, advisory, or full-time.",
    platforms: ["LinkedIn", "Instagram"] as Platform[],
    format: "4:5" as const,
    Component: AvailableGraphic,
  },
  {
    id: "design-build",
    title: "Design. Build. Ship.",
    description: "What sets you apart — the full-stack designer story.",
    platforms: ["LinkedIn", "Instagram"] as Platform[],
    format: "1:1" as const,
    Component: DesignBuildGraphic,
  },
  {
    id: "six-years",
    title: "6+ Years in the Craft",
    description: "Career milestone — use on workiversary or reflection posts.",
    platforms: ["LinkedIn"] as Platform[],
    format: "1:1" as const,
    Component: SixYearsGraphic,
  },
  {
    id: "zynk-studio",
    title: "Zynk Studio Launch",
    description: "Introduce the studio to your network.",
    platforms: ["LinkedIn", "Instagram"] as Platform[],
    format: "4:5" as const,
    Component: ZynkStudioGraphic,
  },
  {
    id: "thought",
    title: "Design Doesn't End at Handoff",
    description: "Thought leadership post — share a perspective that invites conversation.",
    platforms: ["LinkedIn", "Twitter / X"] as Platform[],
    format: "16:9" as const,
    Component: ThoughtGraphic,
  },
  {
    id: "hire-me",
    title: "Let's Build Something Great",
    description: "Direct CTA post — use when actively seeking projects.",
    platforms: ["LinkedIn", "Instagram"] as Platform[],
    format: "4:5" as const,
    Component: HireGraphic,
  },
];

export default function GraphicsPage() {
  return (
    <div className="min-h-full">
      {/* Header */}
      <div
        className="border-b border-border px-6 lg:px-12 py-12"
        style={{ background: "var(--secondary)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-sm bg-white/80" />
            </div>
            <span style={{ fontFamily: PJB, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "-0.02em" }}>Zynk</span>
            <span className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>/</span>
            <span style={{ fontFamily: PJB, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "-0.02em", color: "var(--muted-foreground)" }}>Graphics</span>
          </div>

          <h1
            style={{ fontFamily: PJB, fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}
            className="mb-3"
          >
            Social Graphics
          </h1>
          <p className="text-muted-foreground max-w-xl" style={{ letterSpacing: "-0.02em", lineHeight: 1.65 }}>
            On-brand social content for LinkedIn, Instagram, and Twitter. Screenshot each graphic to export — or print to PDF for full resolution.
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            <Badge variant="outline" style={{ letterSpacing: "-0.01em", fontSize: "0.7rem" }}>
              {graphics.length + linkedInBanners.length + linkedInFeatured.length} graphics total
            </Badge>
            <Badge variant="outline" style={{ letterSpacing: "-0.01em", fontSize: "0.7rem" }}>
              Plus Jakarta Sans · Outfit
            </Badge>
            <Badge variant="outline" style={{ letterSpacing: "-0.01em", fontSize: "0.7rem" }}>
              zynkit.tech
            </Badge>
          </div>
        </div>
      </div>

      <Separator />

      <div className="max-w-6xl mx-auto px-6 py-14 space-y-20">

        {/* ── Social Posts ── */}
        <div>
          <ContentSectionHeader
            label="Social Content"
            title="Posts"
            hint={`${graphics.length} graphics · LinkedIn, Instagram, Twitter`}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {graphics.map(({ id, title, description, platforms, format, Component }) => (
              <GraphicCard key={id} title={title} description={description} platforms={platforms} format={format}>
                <Component />
              </GraphicCard>
            ))}
          </div>
        </div>

        <Separator />

        {/* ── LinkedIn Banners ── */}
        <div>
          <ContentSectionHeader
            label="LinkedIn Profile"
            title="Banner Variations"
            hint="1584 × 396px · 4:1 ratio · profile photo overlaps bottom-left"
          />
          <div className="flex flex-col gap-10">
            {linkedInBanners.map(({ id, title, description, platforms, format, Component }) => (
              <GraphicCard key={id} title={title} description={description} platforms={platforms} format={format}>
                <Component />
              </GraphicCard>
            ))}
          </div>
        </div>

        <Separator />

        {/* ── LinkedIn Featured ── */}
        <div>
          <ContentSectionHeader
            label="LinkedIn Profile"
            title="Featured Sections"
            hint="1200 × 627px · 16:9 · pin to LinkedIn Featured for max visibility"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {linkedInFeatured.map(({ id, title, description, platforms, format, Component }) => (
              <GraphicCard key={id} title={title} description={description} platforms={platforms} format={format}>
                <Component />
              </GraphicCard>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
