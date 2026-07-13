import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { PageMeta } from "../components/PageMeta";

const PJB = "'Plus Jakarta Sans', sans-serif";
const OUTFIT = "'Outfit', sans-serif";

export default function NotFoundPage() {
  return (
    <>
      <PageMeta title="Page Not Found" description="This page doesn't exist." noIndex />
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background 404 watermark */}
      <p
        aria-hidden
        style={{
          fontFamily: PJB,
          fontWeight: 900,
          fontSize: "clamp(10rem, 35vw, 22rem)",
          letterSpacing: "-0.06em",
          lineHeight: 1,
          color: "var(--primary)",
          opacity: 0.04,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        404
      </p>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 480 }}>
        {/* Zynk mark */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 2rem",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 4,
              background: "rgba(255,255,255,0.8)",
            }}
          />
        </div>

        {/* Label */}
        <p
          style={{
            fontFamily: PJB,
            fontWeight: 600,
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--primary)",
            marginBottom: "1rem",
          }}
        >
          404 — Page not found
        </p>

        {/* Heading */}
        <h1
          style={{
            fontFamily: PJB,
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.15,
            color: "var(--foreground)",
            marginBottom: "1rem",
          }}
        >
          Nothing here.
        </h1>

        {/* Body */}
        <p
          style={{
            fontFamily: OUTFIT,
            fontSize: "1.0625rem",
            lineHeight: 1.75,
            color: "var(--muted-foreground)",
            letterSpacing: "-0.01em",
            marginBottom: "2.5rem",
          }}
        >
          The page you're looking for doesn't exist or may have moved. Head back home or take a look at my work.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link to="/">
            <Button
              variant="outline"
              style={{ letterSpacing: "-0.02em", gap: "0.375rem" }}
            >
              <ArrowLeft size={15} />
              Back to Home
            </Button>
          </Link>
          <Link to="/work">
            <Button style={{ letterSpacing: "-0.02em", gap: "0.375rem" }}>
              View My Work
              <ArrowRight size={15} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
