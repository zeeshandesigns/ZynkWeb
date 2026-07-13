import { Separator } from "./ui/separator";

type Tool = {
  name: string;
  emoji: string;
  level: 1 | 2 | 3; // 1=familiar, 2=proficient, 3=expert
};

type ToolGroup = {
  label: string;
  tools: Tool[];
};

const designTools: Tool[] = [
  { name: "Figma", emoji: "🖊️", level: 3 },
  { name: "Framer", emoji: "⚡", level: 2 },
  { name: "Adobe XD", emoji: "🎨", level: 2 },
  { name: "Illustrator", emoji: "✏️", level: 2 },
  { name: "Photoshop", emoji: "🖼️", level: 2 },
  { name: "Spline", emoji: "🌀", level: 1 },
  { name: "Principle", emoji: "🎬", level: 1 },
  { name: "Maze", emoji: "🔬", level: 2 },
];

const devGroups: ToolGroup[] = [
  {
    label: "Languages",
    tools: [
      { name: "TypeScript", emoji: "📘", level: 3 },
      { name: "JavaScript", emoji: "📜", level: 3 },
      { name: "HTML / CSS", emoji: "🌐", level: 3 },
      { name: "Python", emoji: "🐍", level: 1 },
      { name: "SQL", emoji: "🗃️", level: 2 },
    ],
  },
  {
    label: "Frontend",
    tools: [
      { name: "React", emoji: "⚛️", level: 3 },
      { name: "Next.js", emoji: "▲", level: 3 },
      { name: "Tailwind CSS", emoji: "🌊", level: 3 },
      { name: "Motion", emoji: "🎥", level: 2 },
      { name: "Three.js", emoji: "🔷", level: 1 },
    ],
  },
  {
    label: "Infrastructure",
    tools: [
      { name: "Vercel", emoji: "▲", level: 3 },
      { name: "Git / GitHub", emoji: "🐙", level: 3 },
      { name: "AWS", emoji: "☁️", level: 1 },
      { name: "Docker", emoji: "🐳", level: 1 },
      { name: "Linear", emoji: "📐", level: 3 },
    ],
  },
];

const LEVEL_LABELS = ["", "Familiar", "Proficient", "Expert"];

function ProficiencyDots({ level }: { level: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-0.5" title={LEVEL_LABELS[level]}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background:
              i <= level
                ? "var(--primary)"
                : "var(--border)",
          }}
        />
      ))}
    </div>
  );
}

function ToolChip({ tool }: { tool: Tool }) {
  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-2 min-w-0">
        <span style={{ fontSize: "0.9rem", lineHeight: 1 }}>{tool.emoji}</span>
        <span
          className="truncate"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500,
            fontSize: "0.8rem",
            letterSpacing: "-0.015em",
          }}
        >
          {tool.name}
        </span>
      </div>
      <ProficiencyDots level={tool.level} />
    </div>
  );
}

export function ToolkitSection() {
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
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
          Toolkit
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
            }}
          >
            Tools & Technologies
          </h2>
          {/* Legend */}
          <div className="flex items-center gap-4 shrink-0">
            {[
              { level: 1 as const, label: "Familiar" },
              { level: 2 as const, label: "Proficient" },
              { level: 3 as const, label: "Expert" },
            ].map(({ level, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <ProficiencyDots level={level} />
                <span style={{ fontSize: "0.7rem", letterSpacing: "-0.01em", color: "var(--muted-foreground)" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left — Design */}
          <div>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "-0.01em",
                color: "var(--muted-foreground)",
              }}
              className="mb-4 flex items-center gap-2"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-primary" />
              Design
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {designTools.map((tool) => (
                <ToolChip key={tool.name} tool={tool} />
              ))}
            </div>
          </div>

          {/* Right — Dev */}
          <div className="space-y-7">
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "-0.01em",
                color: "var(--muted-foreground)",
              }}
              className="flex items-center gap-2"
            >
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: "oklch(0.65 0.20 145)" }} />
              Development
            </p>

            {devGroups.map((group, i) => (
              <div key={group.label}>
                {i > 0 && <Separator className="mb-5" />}
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                  }}
                  className="mb-3"
                >
                  {group.label}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {group.tools.map((tool) => (
                    <ToolChip key={tool.name} tool={tool} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
