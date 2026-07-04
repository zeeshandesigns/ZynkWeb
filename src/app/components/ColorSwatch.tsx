type ColorSwatchProps = {
  name: string;
  variable: string;
  description: string;
  border?: boolean;
};

export function ColorSwatch({ name, variable, description, border = false }: ColorSwatchProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-border">
      <div
        className="h-24 w-full"
        style={{
          background: `var(${variable})`,
          boxShadow: border ? "inset 0 0 0 1px rgba(0,0,0,0.08)" : undefined,
        }}
      />
      <div className="p-3 bg-card">
        <div className="flex items-center justify-between mb-1">
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              fontSize: "0.875rem",
            }}
          >
            {name}
          </span>
          <code
            className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
            style={{ letterSpacing: 0, fontFamily: "monospace" }}
          >
            {variable}
          </code>
        </div>
        <p className="text-xs text-muted-foreground" style={{ letterSpacing: "-0.01em" }}>
          {description}
        </p>
      </div>
    </div>
  );
}
