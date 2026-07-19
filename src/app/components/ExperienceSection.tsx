import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  location?: string;
  description: string;
  tags: string[];
  current?: boolean;
};

const fullTime: ExperienceEntry[] = [
  {
    role: "Founder & Product Lead",
    org: "Zynk",
    period: "2022 – Present",
    location: "Lahore, Pakistan · Remote",
    description:
      "Founded a design + development studio that ships end-to-end software for startups and scale-ups. Responsible for product strategy, design direction, and engineering across all client engagements. Built internal tooling, a component library, and a repeatable delivery process.",
    tags: ["Product Strategy", "React", "Figma", "Node.js", "Supabase"],
    current: true,
  },
  {
    role: "Front-End Engineer",
    org: "TechCo",
    period: "2018 – 2020",
    location: "Manchester, UK",
    description:
      "Built production-grade React applications for e-commerce and logistics clients. Led the migration from JavaScript to TypeScript and introduced design system tooling — reducing UI inconsistency by ~60% across three products.",
    tags: ["React", "TypeScript", "CSS Modules", "REST APIs", "Jest"],
    current: false,
  },
];

const freelance: ExperienceEntry[] = [
  {
    role: "Senior Product Designer & Developer",
    org: "Independent",
    period: "2020 – 2022",
    location: "Remote",
    description:
      "Embedded with startups across fintech, health-tech, and SaaS. Led product design and shipped frontend code across 15+ client engagements — from 0-to-1 launches to redesigning mature platforms with 100k+ users.",
    tags: ["UX Design", "TypeScript", "Figma", "Next.js", "Product Discovery"],
    current: false,
  },
  {
    role: "UI/UX & Brand Consultant",
    org: "Various Startups",
    period: "2019 – 2020",
    location: "Remote",
    description:
      "Short-form design consultancy for early-stage founders. Covered brand identity, landing pages, onboarding flows, and design system foundations. 8 clients across 12 months.",
    tags: ["Brand Design", "Figma", "Webflow", "Framer", "Copywriting"],
    current: false,
  },
  {
    role: "Brand & Web Designer",
    org: "Freelance",
    period: "2017 – 2018",
    location: "Manchester, UK",
    description:
      "Early freelance work designing logos, marketing sites, and print materials for local businesses. First experience combining Photoshop/Illustrator workflows with HTML/CSS.",
    tags: ["Adobe Illustrator", "Photoshop", "HTML", "CSS", "WordPress"],
    current: false,
  },
];

const volunteer: ExperienceEntry[] = [
  {
    role: "Design Mentor",
    org: "ADPList",
    period: "2021 – Present",
    location: "Remote",
    description:
      "Mentoring designers at all levels — from career switchers learning Figma to senior designers navigating leadership transitions. 50+ sessions completed with a 4.9★ mentor rating.",
    tags: ["Mentoring", "Career Development", "UX/UI", "Portfolio Reviews"],
    current: true,
  },
  {
    role: "Open Source Contributor",
    org: "GitHub",
    period: "2019 – Present",
    location: "Remote",
    description:
      "Active contributor across design tooling projects and React component libraries. Maintainer of react-tokens and figma-exporter with a combined 1.7k+ GitHub stars.",
    tags: ["TypeScript", "React", "OSS", "Documentation"],
    current: true,
  },
  {
    role: "Hackathon Judge & Mentor",
    org: "Local Tech Community",
    period: "2022 – Present",
    location: "Lahore, Pakistan",
    description:
      "Judging and mentoring at Manchester-based hackathons and startup weekends. Focused on product design critique, technical feasibility, and go-to-market thinking.",
    tags: ["Product Critique", "Startups", "Judging", "Workshops"],
    current: true,
  },
];

function TimelineDot({ current }: { current?: boolean }) {
  return (
    <div className="flex flex-col items-center shrink-0 w-4">
      <div
        className="w-3 h-3 rounded-full border-2 shrink-0"
        style={{
          background: current ? "var(--primary)" : "var(--background)",
          borderColor: current ? "var(--primary)" : "var(--border)",
          boxShadow: current ? "0 0 0 3px color-mix(in oklch, var(--primary) 20%, transparent)" : "none",
        }}
      />
    </div>
  );
}

function TimelineEntry({ entry, isLast }: { entry: ExperienceEntry; isLast: boolean }) {
  return (
    <div className="flex gap-4">
      {/* Left: dot + line */}
      <div className="flex flex-col items-center shrink-0">
        <TimelineDot current={entry.current} />
        {!isLast && (
          <div
            className="flex-1 w-px mt-2"
            style={{ background: "var(--border)", minHeight: "2rem" }}
          />
        )}
      </div>

      {/* Right: content */}
      <div className={`flex-1 min-w-0 ${isLast ? "pb-0" : "pb-10"}`}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  letterSpacing: "-0.025em",
                }}
              >
                {entry.role}
              </p>
              {entry.current && (
                <Badge style={{ fontSize: "0.6rem", letterSpacing: "-0.01em" }}>Now</Badge>
              )}
            </div>
            <p className="text-muted-foreground" style={{ fontSize: "0.825rem", letterSpacing: "-0.015em" }}>
              {entry.org}
              {entry.location && (
                <span style={{ opacity: 0.7 }}> · {entry.location}</span>
              )}
            </p>
          </div>
          <span
            className="text-muted-foreground shrink-0"
            style={{ fontSize: "0.775rem", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}
          >
            {entry.period}
          </span>
        </div>

        <p
          className="text-muted-foreground mb-3"
          style={{ fontSize: "0.85rem", letterSpacing: "-0.015em", lineHeight: 1.7 }}
        >
          {entry.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <Badge key={tag} variant="secondary" style={{ fontSize: "0.68rem", letterSpacing: "-0.01em" }}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function Timeline({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <div className="mt-6">
      {entries.map((entry, i) => (
        <TimelineEntry key={entry.role + entry.org} entry={entry} isLast={i === entries.length - 1} />
      ))}
    </div>
  );
}

export function ExperienceSection() {
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
          Experience
        </p>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.15,
          }}
          className="mb-8"
        >
          Where I've Worked
        </h2>

        <Tabs defaultValue="fulltime">
          <TabsList className="mb-2">
            <TabsTrigger value="fulltime" style={{ letterSpacing: "-0.015em" }}>
              Full-Time
            </TabsTrigger>
            <TabsTrigger value="freelance" style={{ letterSpacing: "-0.015em" }}>
              Freelance
            </TabsTrigger>
            <TabsTrigger value="volunteer" style={{ letterSpacing: "-0.015em" }}>
              Volunteer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fulltime">
            <Timeline entries={fullTime} />
          </TabsContent>
          <TabsContent value="freelance">
            <Timeline entries={freelance} />
          </TabsContent>
          <TabsContent value="volunteer">
            <Timeline entries={volunteer} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
