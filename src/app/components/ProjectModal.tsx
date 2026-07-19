import { useEffect } from "react";
import { X } from "lucide-react";

interface ProjectModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export function ProjectModal({ onClose, children }: ProjectModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(10, 14, 30, 0.72)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 680,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 16,
          background: "var(--card)",
          border: "1px solid var(--border)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "sticky",
            top: 0,
            float: "right",
            zIndex: 10,
            margin: "0.75rem 0.75rem 0 0",
            width: 32,
            height: 32,
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--card)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--muted-foreground)",
          }}
          aria-label="Close"
        >
          <X size={15} />
        </button>
        {children}
      </div>
    </div>
  );
}
