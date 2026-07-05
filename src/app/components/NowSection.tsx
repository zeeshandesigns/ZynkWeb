import { useEffect, useState } from "react";
import { BookOpen, Code2, Lightbulb, MapPin } from "lucide-react";
import { API } from "../../utils/supabase";
// @ts-ignore
import { publicAnonKey } from "/utils/supabase/info";

type NowData = {
  building: string;
  learning: string;
  reading: string;
  based: string;
  updatedAt?: string;
};

const DEFAULTS: NowData = {
  building:
    "Next version of the Zynk client toolkit — shared React components and Supabase integrations for rapid product development.",
  learning:
    "Three.js + WebGL for interactive 3D experiences in the browser, and exploring AI-assisted design workflows.",
  reading:
    '"Shape Up" by Ryan Singer (Basecamp) and "The Design of Everyday Things" by Don Norman.',
  based: "Manchester, UK — working across GMT and EST time zones with clients remotely.",
};

const ITEMS = [
  { key: "building" as keyof NowData, icon: Code2, label: "Building" },
  { key: "learning" as keyof NowData, icon: Lightbulb, label: "Learning" },
  { key: "reading" as keyof NowData, icon: BookOpen, label: "Reading" },
  { key: "based" as keyof NowData, icon: MapPin, label: "Based" },
];

export function NowSection() {
  const [data, setData] = useState<NowData>(DEFAULTS);

  useEffect(() => {
    fetch(`${API}/content/now`, {
      headers: { Authorization: `Bearer ${publicAnonKey}` },
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.value) setData({ ...DEFAULTS, ...res.value });
      })
      .catch(() => {}); // silently fall back to defaults
  }, []);

  const updatedLabel = data.updatedAt
    ? new Date(data.updatedAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })
    : "July 2026";

  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start">

          {/* Left */}
          <div>
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
              Now
            </p>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.15,
              }}
              className="mb-3"
            >
              What I'm up to
            </h2>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "0.875rem", letterSpacing: "-0.015em", lineHeight: 1.65 }}
            >
              A snapshot of what I'm currently working on, learning, and thinking about.
            </p>
            <p
              className="mt-4"
              style={{ fontSize: "0.72rem", letterSpacing: "-0.01em", color: "var(--muted-foreground)" }}
            >
              Last updated {updatedLabel}
            </p>
          </div>

          {/* Right — grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ITEMS.map(({ key, icon: Icon, label }) => (
              <div key={key} className="p-5 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "color-mix(in oklch, var(--primary) 10%, transparent)" }}
                  >
                    <Icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {label}
                  </span>
                </div>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "0.825rem", letterSpacing: "-0.015em", lineHeight: 1.65 }}
                >
                  {data[key] as string}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
