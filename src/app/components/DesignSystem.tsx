import { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ColorSwatch } from "./ColorSwatch";
import {
  AlertCircle,
  ArrowRight,
  Download,
  Info,
  Mail,
  Search,
  Zap,
} from "lucide-react";

const navSections = [
  { id: "colors", label: "Colors", group: "Foundation" },
  { id: "typography", label: "Typography", group: "Foundation" },
  { id: "spacing", label: "Spacing", group: "Foundation" },
  { id: "buttons", label: "Buttons", group: "Components" },
  { id: "form", label: "Form Controls", group: "Components" },
  { id: "cards", label: "Cards", group: "Components" },
  { id: "feedback", label: "Feedback", group: "Components" },
  { id: "navigation", label: "Navigation", group: "Components" },
  { id: "display", label: "Data Display", group: "Components" },
];

const colorTokens = [
  { name: "Primary", variable: "--primary", description: "Brand blue — buttons, links, highlights" },
  { name: "Secondary", variable: "--secondary", description: "Soft blue-gray surface for secondary UI" },
  { name: "Muted", variable: "--muted", description: "Subdued fill for decorative and inactive areas" },
  { name: "Accent", variable: "--accent", description: "Sky blue for hover, focus, and selected states" },
  { name: "Background", variable: "--background", description: "Page and app canvas", border: true },
  { name: "Foreground", variable: "--foreground", description: "Primary text and icon color" },
  { name: "Card", variable: "--card", description: "Raised card and panel surface", border: true },
  { name: "Border", variable: "--border", description: "Dividers, outlines, and element edges", border: true },
  { name: "Destructive", variable: "--destructive", description: "Error, danger, and delete states" },
];

const typeScale = [
  { name: "Display", size: "3rem", weight: 800, tracking: "-0.04em", family: "Plus Jakarta Sans", sample: "Clean & Minimal" },
  { name: "H1", size: "2.25rem", weight: 700, tracking: "-0.04em", family: "Plus Jakarta Sans", sample: "Heading One" },
  { name: "H2", size: "1.875rem", weight: 600, tracking: "-0.035em", family: "Plus Jakarta Sans", sample: "Heading Two" },
  { name: "H3", size: "1.5rem", weight: 600, tracking: "-0.03em", family: "Plus Jakarta Sans", sample: "Heading Three" },
  { name: "H4", size: "1.25rem", weight: 500, tracking: "-0.025em", family: "Plus Jakarta Sans", sample: "Heading Four" },
  { name: "Body LG", size: "1.125rem", weight: 400, tracking: "-0.02em", family: "Outfit", sample: "Comfortable reading size for introductory paragraphs." },
  { name: "Body", size: "1rem", weight: 400, tracking: "-0.02em", family: "Outfit", sample: "Standard body text used throughout the interface." },
  { name: "Body SM", size: "0.875rem", weight: 400, tracking: "-0.015em", family: "Outfit", sample: "Smaller text for metadata, captions, and secondary UI." },
  { name: "Caption", size: "0.75rem", weight: 400, tracking: "-0.01em", family: "Outfit", sample: "Timestamps, labels, and auxiliary information at small size." },
  { name: "Code", size: "0.875rem", weight: 400, tracking: "0em", family: "monospace", sample: "const theme = 'blue-white';" },
];

const spacingScale = [
  { token: "1", px: "4px", rem: "0.25rem" },
  { token: "2", px: "8px", rem: "0.5rem" },
  { token: "3", px: "12px", rem: "0.75rem" },
  { token: "4", px: "16px", rem: "1rem" },
  { token: "5", px: "20px", rem: "1.25rem" },
  { token: "6", px: "24px", rem: "1.5rem" },
  { token: "8", px: "32px", rem: "2rem" },
  { token: "10", px: "40px", rem: "2.5rem" },
  { token: "12", px: "48px", rem: "3rem" },
  { token: "16", px: "64px", rem: "4rem" },
  { token: "20", px: "80px", rem: "5rem" },
  { token: "24", px: "96px", rem: "6rem" },
];

function SectionHeader({
  category,
  title,
  description,
}: {
  category: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 mt-2">
      <p
        className="mb-2 block"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--primary)",
          opacity: 0.7,
        }}
      >
        {category}
      </p>
      <h2
        style={{
          letterSpacing: "-0.035em",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: "1.6rem",
          lineHeight: 1.2,
        }}
        className="mb-2"
      >
        {title}
      </h2>
      <p className="text-muted-foreground" style={{ letterSpacing: "-0.02em" }}>
        {description}
      </p>
    </div>
  );
}

const groups = Array.from(new Set(navSections.map((s) => s.group)));

export function DesignSystem() {
  const [sliderValue, setSliderValue] = useState([40]);
  const [radioVal, setRadioVal] = useState("pro");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <TooltipProvider>
      <div className="flex h-full overflow-hidden bg-background">

        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-52 shrink-0 border-r border-border h-full overflow-y-auto py-8">
          <div className="px-5 mb-8">
            <button
              onClick={() => scrollTo("top")}
              className="flex items-center gap-2 mb-1 hover:opacity-80 transition-opacity"
            >
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-sm bg-white/80" />
              </div>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  fontSize: "0.9rem",
                }}
              >
                Make DS
              </span>
            </button>
            <span className="text-xs text-muted-foreground pl-8" style={{ letterSpacing: "-0.01em" }}>
              Version 1.0
            </span>
          </div>

          {groups.map((group) => (
            <div key={group} className="mb-5">
              <p
                className="px-5 mb-1 text-muted-foreground"
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                {group}
              </p>
              {navSections
                .filter((s) => s.group === group)
                .map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className="w-full text-left px-5 py-1.5 hover:text-primary hover:bg-accent/60 transition-colors"
                    style={{
                      fontSize: "0.875rem",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {section.label}
                  </button>
                ))}
            </div>
          ))}
        </aside>

        {/* Main content */}
        <main id="top" className="flex-1 overflow-y-auto">

          {/* Hero */}
          <div
            className="border-b border-border px-6 lg:px-12 py-14"
            style={{
              background: "linear-gradient(140deg, var(--background) 0%, var(--secondary) 60%, var(--accent) 100%)",
            }}
          >
            <Badge variant="outline" className="mb-5" style={{ letterSpacing: "-0.01em" }}>
              Version 1.0.0
            </Badge>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                fontSize: "2.75rem",
                lineHeight: 1.1,
              }}
              className="mb-4 max-w-xl"
            >
              Design System
            </h1>
            <p
              className="text-muted-foreground max-w-lg"
              style={{ letterSpacing: "-0.02em", lineHeight: 1.6 }}
            >
              A clean, minimal component library on a blue and white palette. Plus Jakarta Sans for display type, Outfit for body copy, compact kerning throughout.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Button onClick={() => scrollTo("colors")} style={{ letterSpacing: "-0.025em" }}>
                Explore Tokens <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={() => scrollTo("buttons")} style={{ letterSpacing: "-0.025em" }}>
                View Components
              </Button>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="px-6 lg:px-12 pb-24 max-w-5xl">

            {/* ─── Colors ─── */}
            <section id="colors" className="pt-14">
              <SectionHeader
                category="Foundation"
                title="Color Tokens"
                description="Semantic palette built on oklch for perceptual uniformity. Each token maps to a CSS custom property."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {colorTokens.map((token) => (
                  <ColorSwatch
                    key={token.name}
                    name={token.name}
                    variable={token.variable}
                    description={token.description}
                    border={token.border}
                  />
                ))}
              </div>
            </section>

            <Separator className="my-14" />

            {/* ─── Typography ─── */}
            <section id="typography" className="pt-2">
              <SectionHeader
                category="Foundation"
                title="Typography Scale"
                description="Two-family system — Plus Jakarta Sans for headings, Outfit for body. Compact kerning applied at every size."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="border border-border rounded-xl p-5 bg-card">
                  <p className="text-xs text-muted-foreground mb-3" style={{ letterSpacing: "-0.01em" }}>
                    Display / Heading
                  </p>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.75rem",
                      letterSpacing: "-0.04em",
                      lineHeight: 1.1,
                    }}
                  >
                    Plus Jakarta Sans
                  </p>
                  <p
                    className="text-muted-foreground mt-2"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "0.875rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Aa Bb Cc Dd 0123 !@#
                  </p>
                </div>
                <div className="border border-border rounded-xl p-5 bg-card">
                  <p className="text-xs text-muted-foreground mb-3" style={{ letterSpacing: "-0.01em" }}>
                    Body / Interface
                  </p>
                  <p
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 400,
                      fontSize: "1.75rem",
                      letterSpacing: "-0.025em",
                      lineHeight: 1.1,
                    }}
                  >
                    Outfit
                  </p>
                  <p
                    className="text-muted-foreground mt-2"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.875rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Aa Bb Cc Dd 0123 !@#
                  </p>
                </div>
              </div>

              <div className="border border-border rounded-xl overflow-hidden">
                <div
                  className="grid items-center px-5 py-2.5 border-b border-border bg-muted"
                  style={{ gridTemplateColumns: "6rem 1fr 4rem" }}
                >
                  {["Style", "Sample", "Tracking"].map((h) => (
                    <span
                      key={h}
                      className="text-xs text-muted-foreground"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
                {typeScale.map((item, i) => (
                  <div
                    key={item.name}
                    className="grid items-center px-5 py-4"
                    style={{
                      gridTemplateColumns: "6rem 1fr 4rem",
                      borderBottom: i !== typeScale.length - 1 ? "1px solid var(--border)" : undefined,
                    }}
                  >
                    <div>
                      <p
                        className="text-xs"
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground" style={{ letterSpacing: "-0.01em" }}>
                        {item.size}
                      </p>
                    </div>
                    <div className="overflow-hidden pr-4">
                      <p
                        style={{
                          fontFamily:
                            item.family === "monospace"
                              ? "ui-monospace, monospace"
                              : `'${item.family}', sans-serif`,
                          fontSize: item.size,
                          fontWeight: item.weight,
                          letterSpacing: item.tracking,
                          lineHeight: 1.2,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.sample}
                      </p>
                    </div>
                    <p
                      className="text-xs text-muted-foreground text-right"
                      style={{ letterSpacing: 0, fontFamily: "monospace" }}
                    >
                      {item.tracking}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-14" />

            {/* ─── Spacing ─── */}
            <section id="spacing" className="pt-2">
              <SectionHeader
                category="Foundation"
                title="Spacing Scale"
                description="Base-4 system. Every spatial value is a multiple of 4px, creating consistent vertical and horizontal rhythm."
              />
              <div className="border border-border rounded-xl overflow-hidden">
                <div
                  className="grid items-center px-5 py-2.5 border-b border-border bg-muted"
                  style={{ gridTemplateColumns: "3rem 3.5rem 4.5rem 1fr" }}
                >
                  {["Token", "px", "rem", "Visual"].map((h) => (
                    <span
                      key={h}
                      className="text-xs text-muted-foreground"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
                {spacingScale.map((s, i) => (
                  <div
                    key={s.token}
                    className="grid items-center px-5 py-3"
                    style={{
                      gridTemplateColumns: "3rem 3.5rem 4.5rem 1fr",
                      borderBottom: i !== spacingScale.length - 1 ? "1px solid var(--border)" : undefined,
                    }}
                  >
                    <code
                      className="text-xs text-primary"
                      style={{
                        background: "color-mix(in oklch, var(--primary) 10%, transparent)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontFamily: "monospace",
                        letterSpacing: 0,
                        display: "inline-block",
                      }}
                    >
                      {s.token}
                    </code>
                    <span className="text-xs text-muted-foreground" style={{ letterSpacing: "-0.01em" }}>
                      {s.px}
                    </span>
                    <span className="text-xs text-muted-foreground" style={{ letterSpacing: "-0.01em" }}>
                      {s.rem}
                    </span>
                    <div className="flex items-center">
                      <div
                        className="h-3.5 rounded-sm"
                        style={{
                          width: s.px,
                          background: "color-mix(in oklch, var(--primary) 30%, var(--accent))",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-14" />

            {/* ─── Buttons ─── */}
            <section id="buttons" className="pt-2">
              <SectionHeader
                category="Components"
                title="Buttons"
                description="Six variants, three sizes. Default for primary actions, outline for secondary, ghost for tertiary."
              />

              <div className="space-y-7">
                <div>
                  <p
                    className="text-muted-foreground mb-3"
                    style={{
                      fontSize: "0.7rem",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Variants
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </div>

                <div>
                  <p
                    className="text-muted-foreground mb-3"
                    style={{
                      fontSize: "0.7rem",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Sizes
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <Search />
                    </Button>
                  </div>
                </div>

                <div>
                  <p
                    className="text-muted-foreground mb-3"
                    style={{
                      fontSize: "0.7rem",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    With Icons & States
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <Mail className="w-4 h-4" /> Send Email
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4" /> Export
                    </Button>
                    <Button variant="secondary">
                      <Zap className="w-4 h-4" /> Boost
                    </Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </div>
              </div>
            </section>

            <Separator className="my-14" />

            {/* ─── Form Controls ─── */}
            <section id="form" className="pt-2">
              <SectionHeader
                category="Components"
                title="Form Controls"
                description="Input primitives for collecting user data, each with focus, error, and disabled states."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label>Text Input</Label>
                    <Input placeholder="Enter a value..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Search Input</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="Search..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Textarea</Label>
                    <Textarea placeholder="Write something..." rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label>Select</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an option..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="opt1">Option One</SelectItem>
                        <SelectItem value="opt2">Option Two</SelectItem>
                        <SelectItem value="opt3">Option Three</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>Checkboxes</Label>
                    <div className="space-y-2">
                      {["Notifications", "Analytics", "Marketing emails"].map(
                        (item, i) => (
                          <div key={item} className="flex items-center gap-2">
                            <Checkbox id={`chk-${item}`} defaultChecked={i === 0} />
                            <label
                              htmlFor={`chk-${item}`}
                              className="cursor-pointer"
                              style={{ fontSize: "0.875rem", letterSpacing: "-0.015em" }}
                            >
                              {item}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Radio Group</Label>
                    <RadioGroup value={radioVal} onValueChange={setRadioVal}>
                      {["starter", "pro", "enterprise"].map((opt) => (
                        <div key={opt} className="flex items-center gap-2">
                          <RadioGroupItem value={opt} id={`radio-${opt}`} />
                          <label
                            htmlFor={`radio-${opt}`}
                            className="cursor-pointer capitalize"
                            style={{ fontSize: "0.875rem", letterSpacing: "-0.015em" }}
                          >
                            {opt}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Toggles</Label>
                    <div className="space-y-3">
                      {["Enable feature", "Dark mode", "Notifications"].map(
                        (label, i) => (
                          <div key={label} className="flex items-center justify-between">
                            <span style={{ fontSize: "0.875rem", letterSpacing: "-0.015em" }}>
                              {label}
                            </span>
                            <Switch defaultChecked={i === 0} />
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Slider — {sliderValue[0]}%</Label>
                    <Slider
                      value={sliderValue}
                      onValueChange={setSliderValue}
                      max={100}
                      step={1}
                    />
                  </div>
                </div>
              </div>
            </section>

            <Separator className="my-14" />

            {/* ─── Cards ─── */}
            <section id="cards" className="pt-2">
              <SectionHeader
                category="Components"
                title="Cards"
                description="Contained surface elements for grouping related content and actions. Supports header, content, and footer slots."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle style={{ letterSpacing: "-0.03em" }}>Basic Card</CardTitle>
                    <CardDescription style={{ letterSpacing: "-0.015em" }}>
                      A standard card with header and content.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p
                      className="text-sm text-muted-foreground"
                      style={{ letterSpacing: "-0.015em", lineHeight: 1.65 }}
                    >
                      Cards are versatile containers for presenting grouped information. They support headers, content regions, and footer actions.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle style={{ letterSpacing: "-0.03em" }}>With Actions</CardTitle>
                      <Badge>New</Badge>
                    </div>
                    <CardDescription style={{ letterSpacing: "-0.015em" }}>
                      Card with badge and footer actions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p
                      className="text-sm text-muted-foreground"
                      style={{ letterSpacing: "-0.015em", lineHeight: 1.65 }}
                    >
                      Use the card footer for primary and secondary actions related to the card content.
                    </p>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button size="sm">Confirm</Button>
                    <Button size="sm" variant="outline">
                      Cancel
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
                      style={{ background: "color-mix(in oklch, var(--primary) 12%, transparent)" }}
                    >
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle style={{ letterSpacing: "-0.03em" }}>Feature Card</CardTitle>
                    <CardDescription style={{ letterSpacing: "-0.015em" }}>
                      Highlight features with an icon header.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p
                      className="text-sm text-muted-foreground"
                      style={{ letterSpacing: "-0.015em", lineHeight: 1.65 }}
                    >
                      Icon cards work well in grids to present multiple capabilities at a glance.
                    </p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <div
                    className="h-32 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 800,
                        letterSpacing: "-0.05em",
                        fontSize: "2.5rem",
                        color: "rgba(255,255,255,0.3)",
                      }}
                    >
                      DS
                    </span>
                  </div>
                  <CardHeader>
                    <CardTitle style={{ letterSpacing: "-0.03em" }}>Media Card</CardTitle>
                    <CardDescription style={{ letterSpacing: "-0.015em" }}>
                      Cards with visual image or gradient headers.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </section>

            <Separator className="my-14" />

            {/* ─── Feedback ─── */}
            <section id="feedback" className="pt-2">
              <SectionHeader
                category="Components"
                title="Feedback & Status"
                description="Alerts, badges, progress, and skeleton states communicate system status to the user."
              />

              <div className="space-y-8">
                <div>
                  <p
                    className="text-muted-foreground mb-3"
                    style={{
                      fontSize: "0.7rem",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Alerts
                  </p>
                  <div className="space-y-3">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Information</AlertTitle>
                      <AlertDescription>
                        Here's some helpful context about what's happening in the system right now.
                      </AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        Something went wrong. Please check your input and try again.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>

                <div>
                  <p
                    className="text-muted-foreground mb-3"
                    style={{
                      fontSize: "0.7rem",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Badges
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge
                      style={{
                        background: "color-mix(in oklch, oklch(0.65 0.20 145) 15%, transparent)",
                        color: "oklch(0.40 0.15 145)",
                        borderColor: "color-mix(in oklch, oklch(0.65 0.20 145) 30%, transparent)",
                      }}
                    >
                      Success
                    </Badge>
                    <Badge
                      style={{
                        background: "color-mix(in oklch, oklch(0.75 0.18 85) 15%, transparent)",
                        color: "oklch(0.48 0.14 85)",
                        borderColor: "color-mix(in oklch, oklch(0.75 0.18 85) 30%, transparent)",
                      }}
                    >
                      Warning
                    </Badge>
                  </div>
                </div>

                <div>
                  <p
                    className="text-muted-foreground mb-3"
                    style={{
                      fontSize: "0.7rem",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Progress
                  </p>
                  <div className="space-y-3">
                    {[25, 65, 90].map((val) => (
                      <div key={val} className="flex items-center gap-4">
                        <Progress value={val} className="flex-1" />
                        <span
                          className="text-xs text-muted-foreground w-7 text-right"
                          style={{ letterSpacing: "-0.01em" }}
                        >
                          {val}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p
                    className="text-muted-foreground mb-3"
                    style={{
                      fontSize: "0.7rem",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Skeleton Loading
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-3 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-3 w-2/3" />
                        <Skeleton className="h-3 w-2/5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Separator className="my-14" />

            {/* ─── Navigation ─── */}
            <section id="navigation" className="pt-2">
              <SectionHeader
                category="Components"
                title="Navigation"
                description="Tabs organize related content into sequential, accessible panels without page navigation."
              />

              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview" style={{ letterSpacing: "-0.02em" }}>
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="analytics" style={{ letterSpacing: "-0.02em" }}>
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="settings" style={{ letterSpacing: "-0.02em" }}>
                    Settings
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <Card>
                    <CardContent className="pt-5">
                      <p
                        className="text-sm text-muted-foreground"
                        style={{ letterSpacing: "-0.015em", lineHeight: 1.65 }}
                      >
                        Overview content lives here. Tabs are ideal for segmenting related views — keep labels short, scannable, and parallel in form (all nouns or all verbs, not mixed).
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="analytics" className="mt-4">
                  <Card>
                    <CardContent className="pt-5">
                      <p
                        className="text-sm text-muted-foreground"
                        style={{ letterSpacing: "-0.015em", lineHeight: 1.65 }}
                      >
                        Analytics content would appear here — typically charts, metrics, and trends relevant to the current context.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="settings" className="mt-4">
                  <Card>
                    <CardContent className="pt-5">
                      <p
                        className="text-sm text-muted-foreground"
                        style={{ letterSpacing: "-0.015em", lineHeight: 1.65 }}
                      >
                        Settings panel — usually a collection of labeled form controls grouped by category.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>

            <Separator className="my-14" />

            {/* ─── Data Display ─── */}
            <section id="display" className="pt-2">
              <SectionHeader
                category="Components"
                title="Data Display"
                description="Avatars, tooltips, and contextual overlays for richer interface density."
              />

              <div className="space-y-8">
                <div>
                  <p
                    className="text-muted-foreground mb-4"
                    style={{
                      fontSize: "0.7rem",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Avatars
                  </p>
                  <div className="flex items-end gap-4 flex-wrap">
                    {[
                      { initials: "JD", size: 28 },
                      { initials: "AB", size: 36 },
                      { initials: "CK", size: 44 },
                      { initials: "ML", size: 56 },
                    ].map(({ initials, size }) => (
                      <Avatar
                        key={initials}
                        style={{ width: size, height: size }}
                      >
                        <AvatarFallback
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 600,
                            letterSpacing: "-0.01em",
                            fontSize: size * 0.32,
                          }}
                        >
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    ))}

                    <div className="flex -space-x-2 ml-2">
                      {["MK", "LR", "TN", "PQ"].map((init) => (
                        <Avatar
                          key={init}
                          className="border-2 border-background"
                          style={{ width: 36, height: 36 }}
                        >
                          <AvatarFallback
                            style={{
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontWeight: 600,
                              fontSize: "0.7rem",
                              letterSpacing: 0,
                            }}
                          >
                            {init}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      <div
                        className="flex items-center justify-center border-2 border-background rounded-full bg-muted"
                        style={{ width: 36, height: 36 }}
                      >
                        <span
                          className="text-muted-foreground"
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: "0.65rem",
                            letterSpacing: 0,
                          }}
                        >
                          +8
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p
                    className="text-muted-foreground mb-4"
                    style={{
                      fontSize: "0.7rem",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Tooltips
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: "Top (hover me)", tip: "Tooltip appears above", side: "top" as const },
                      { label: "Right side", tip: "Tooltip appears right", side: "right" as const },
                      { label: "Bottom", tip: "Tooltip appears below", side: "bottom" as const },
                    ].map(({ label, tip, side }) => (
                      <Tooltip key={label}>
                        <TooltipTrigger
                          className={buttonVariants({ variant: "outline", size: "sm" })}
                          style={{ letterSpacing: "-0.02em" }}
                        >
                          {label}
                        </TooltipTrigger>
                        <TooltipContent side={side}>
                          <p style={{ letterSpacing: "-0.015em" }}>{tip}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-20 pt-8 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-sm bg-white/80" />
                </div>
                <span
                  className="text-muted-foreground"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.875rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Make Design System
                </span>
              </div>
              <span
                className="text-muted-foreground"
                style={{ fontSize: "0.75rem", letterSpacing: "-0.01em" }}
              >
                v1.0.0 — 2026
              </span>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
