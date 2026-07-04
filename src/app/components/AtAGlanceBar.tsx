import { Briefcase, Clock, MapPin, Sparkles, TrendingUp, Zap } from "lucide-react";

const START_YEAR = 2018;

const items = [
  {
    icon: MapPin,
    label: "Location",
    value: "Manchester, UK · Remote",
  },
  {
    icon: Sparkles,
    label: "Status",
    value: "Open to Work",
    dot: { color: "oklch(0.65 0.20 145)" },
  },
  {
    icon: TrendingUp,
    label: "Active Since",
    value: `${START_YEAR} · ${new Date().getFullYear() - START_YEAR}+ yrs`,
  },
  {
    icon: Zap,
    label: "Focus",
    value: "Design + Engineering",
  },
  {
    icon: Briefcase,
    label: "Work Type",
    value: "Freelance · Advisory · Full-time",
  },
  {
    icon: Clock,
    label: "Timezone",
    value: "GMT / BST",
  },
];

export function AtAGlanceBar() {
  return (
    <div className="border-y border-border" style={{ background: "var(--secondary)" }}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-4 gap-x-6 lg:gap-x-0 lg:divide-x lg:divide-border">
          {items.map(({ icon: Icon, label, value, dot }) => (
            <div key={label} className="flex items-start gap-2.5 lg:px-5 first:lg:pl-0 last:lg:pr-0">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "color-mix(in oklch, var(--primary) 10%, transparent)" }}
              >
                <Icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="min-w-0">
                <p
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "var(--muted-foreground)",
                  }}
                  className="mb-0.5"
                >
                  {label}
                </p>
                <div className="flex items-center gap-1.5 min-w-0">
                  {dot && (
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: dot.color }}
                    />
                  )}
                  <p
                    className="truncate"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
