# Plan: "My Work" Section — Three-Lane Portfolio UX

## Context

The current `id="work"` section in `HomePage.tsx` has a flat mix of case studies and dev projects. The user wants three clearly separated content types — **Design Portfolio**, **Dev Projects**, and **Case Studies** — each with its own browsing UX appropriate to how that content is consumed. Real content will be added later; the implementation uses realistic sample data.

---

## UX Architecture Decision

### Why three vertical lanes (not tabs)

Tabs hide content. For a portfolio that needs to communicate breadth and depth at a glance, **all three lanes are visible by scrolling** — but a sticky in-section jump bar lets visitors navigate directly to any lane. This means:

- Visitors understand the full scope immediately
- No cognitive effort to "discover" hidden content
- Scroll-spy highlights the active lane in the jump bar (optional phase-two)
- Each lane remains independently filterable

### Section entry: Three category preview cards

Before the lanes, three large "entry cards" at the top of the section act as both preview and navigation anchors. Each card shows:
- Lane name + count
- Short descriptor
- Representative visual thumbnail
- Scrolls to the relevant lane on click

---

## Three Lane Designs

### Lane 1 — Design Portfolio

**Goal:** Show visual breadth — branding, UI/UX, graphic design.

**Layout:** Masonry-style grid (2 col desktop, 1 col mobile). Each card:
- Square/landscape image (Unsplash placeholder)
- Category badge (Branding / UI·UX / Graphic)
- Project name + client/context
- Hover overlay: short descriptor + "View Project" arrow

**Filter:** Pill filter row — All · Branding · UI/UX · Graphic Design — client-side filter via `useState`.

**Sample projects (6):**
| Name | Category | Description |
|---|---|---|
| Nexus | Branding | Complete brand identity & design system for a B2B SaaS startup |
| Atlas | UI/UX | Analytics dashboard redesign — 40 screens, shipped |
| Pulse | UI/UX | Consumer health app, iOS + Android |
| Orbit | UI/UX | E-commerce platform — from 0 to launch |
| Flux | Graphic | Marketing campaign — landing page, ads, print |
| Arc | Branding | Conference identity, wayfinding, collateral |

---

### Lane 2 — Dev Projects

**Goal:** Communicate technical credibility and open-source contribution.

**Layout:** Featured project (full width, richer detail) + 3-column compact card grid below.

**Featured card anatomy:** Project name, full description, tech stack, outcome stat, GitHub + live links, "Featured" badge.

**Compact card anatomy:** Name, 1-liner, tech tags, star count, icon links.

**Filter:** Type pills — All · Library · CLI · Full-Stack · Template

**Sample projects (4):**
| Name | Type | Stars |
|---|---|---|
| react-tokens | Library | 1.2k |
| figma-exporter | CLI | 480 |
| supabase-kit | Full-Stack | 820 |
| api-scaffold | Template | 310 |

---

### Lane 3 — Case Studies

**Goal:** Narrative depth — show thinking, not just output.

**Layout:** Two large editorial cards per row. Each card:
- Cover image (left or top)
- Category badge (Design · Dev · Full-Stack)
- Project name + one-line challenge statement
- Key outcome metric in a highlighted callout
- "Read Case Study →" CTA

**Hover state:** Card lifts, image zooms slightly.

**Sample case studies (4):**
| Title | Type | Outcome |
|---|---|---|
| Atlas Analytics | Full-Stack | +32% DAU post-launch |
| Pulse Health | Full-Stack | 4.8★ · 50k downloads |
| react-tokens | Dev | 1.2k GitHub stars, used by 80+ teams |
| Zynk Design System | Design | Internal system powering all client work |

---

## Implementation Plan

### Files to create

| File | Purpose |
|---|---|
| `src/app/components/WorkSection.tsx` | All three lanes + category preview cards + in-section jump nav |
| `src/app/components/DesignPortfolio.tsx` | Design lane: filtered image grid |
| `src/app/components/DevProjects.tsx` | Dev lane: featured + compact card grid |
| `src/app/components/CaseStudies.tsx` | Case study lane: editorial cards |

### File to modify

| File | Change |
|---|---|
| `src/app/pages/HomePage.tsx` | Replace the existing `id="work"` section with `<WorkSection />` |

---

## Component details

### `WorkSection.tsx`
```tsx
// Renders:
// 1. Section header
// 2. Three entry/preview cards (Palette | Code2 | FileText icons)
//    - Each scrolls to its lane anchor (id="design", id="dev", id="cases")
// 3. In-section sticky jump bar: Design · Dev · Case Studies
// 4. <DesignPortfolio /> with id="design"
// 5. <DevProjects /> with id="dev"  
// 6. <CaseStudies /> with id="cases"
```

### `DesignPortfolio.tsx`
- `useState` for active filter
- Projects array filtered client-side
- Images sourced via Unsplash MCP at build time
- Cards: `overflow-hidden rounded-xl border` with `group` hover state

### `DevProjects.tsx`
- First item in array renders as featured card (full-width, more detail)
- Remaining items in 3-col grid
- `useState` for type filter
- Star counts as static data

### `CaseStudies.tsx`
- 2-column grid on desktop, 1 on mobile
- Uses Unsplash images from the two existing case studies
- Two more case studies with generated placeholder images
- Outcome metric inside a `color-mix(primary 8%)` callout block

---

## Sticky in-section jump nav

A `position: sticky; top: 64px` (below main nav) bar inside the work section:
```tsx
<div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
  <div className="max-w-6xl mx-auto px-6 py-3 flex gap-6">
    {['Design', 'Dev', 'Case Studies'].map(…)}
  </div>
</div>
```

Each button does `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })`.

---

## Verification

1. Three category entry cards render above the lanes
2. Jump nav sticks below the main nav when scrolling within the work section
3. Filter pills in Design lane show/hide projects correctly (client-side, no layout shift)
4. Featured dev project renders full-width; remaining in grid
5. Case study cards have consistent image height and proper hover state
6. All sample data renders without errors; images load from Unsplash URLs
