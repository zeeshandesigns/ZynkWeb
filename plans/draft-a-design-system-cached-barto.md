# Plan: 7-Update Batch

## Context

A batch of updates across the site and admin panel: factual corrections (location, active since year), content additions (Video Editing service), data removals (Backend toolkit), UX fixes (View Project links), new admin features (Documents tab for proposals + onboarding kits), and a new internal Manager page for tracking placeholder data.

---

## 1. Simple Data Fixes — 3 files

### AtAGlanceBar.tsx
- `START_YEAR = 2018` → `START_YEAR = 2022`
- Location item value: `"Manchester, UK · Remote"` → `"Lahore, Pakistan"`

### HomePage.tsx — Add Video Editing to `whatIDo`
Add a 4th card after "Strategy":
```ts
{
  icon: Video,    // import from lucide-react
  title: "Video Edit",
  body: "Reels, ads, and branded motion content — edited, optimised, and ready to publish on every platform.",
}
```
Import `Video` from `lucide-react`.

### ToolkitSection.tsx — Remove Backend & Data
In `devGroups` (the 3rd group, lines ~46–55), delete the entire `{ label: "Backend & Data", tools: [...] }` object. Keep Languages, Frontend, and Infrastructure groups.

---

## 2. Portfolio "View Project" Modals — 2 components

Currently, "View Project" in DesignPortfolio does nothing, and CaseStudy cards are pointer-cursored but unclickable. No external URLs exist yet, so modals are the right solution.

### Shared overlay pattern

Create **one reusable modal component** at `src/app/components/ProjectModal.tsx`:
- Full-screen backdrop (`position: fixed`, `inset: 0`, `z-index: 50`, dark rgba overlay)
- Centered panel (`max-width: 680px`, rounded, white bg, `overflow-y: auto`, `max-height: 90vh`)
- Close button (top-right `×`)
- Closes on backdrop click or Escape key (`useEffect` on keydown)
- Accepts `onClose` prop + `children`

### DesignPortfolio.tsx
- Add `useState<DesignProject | null>(null)` → `selectedProject`
- "View Project" button: `onClick={() => setSelectedProject(project)}`
- When `selectedProject !== null`, render `<ProjectModal onClose={() => setSelectedProject(null)}>` containing:
  - Hero image (full-width, `aspect-video`, `object-cover`)
  - Category badge + year (right-aligned)
  - Project name (h2, PJB, bold)
  - Description (body copy)
  - Tags (badge row)
  - "Open Project →" button — disabled with tooltip "Coming soon" if no `url` field on the project; project data schema can optionally include `url?: string` (all currently `undefined`)

### CaseStudies.tsx
- Add `useState<CaseStudy | null>(null)` → `selectedCase`
- Make the entire `<article>` card `onClick={() => setSelectedCase(cs)}`
- Render `<ProjectModal>` containing:
  - Cover image (full-width, `aspect-video`)
  - Category badge + duration + year row
  - Title (h2) + subtitle
  - "Challenge" label + challenge text
  - Outcome metric (large, blue) + outcome detail
  - Description
  - Tags

### DevProjects.tsx
- `CompactCard` — wrap the card in an `<a href={project.url} target="_blank" rel="noreferrer">` so the whole card is clickable to the GitHub repo (already has real placeholder paths like `"https://github.com/zeeshanh/react-tokens"`)
- `FeaturedCard` already has working "View Source" and "Live Demo" `<a>` tags — no change needed

---

## 3. Admin Documents Tab — AdminDashboard.tsx

### Architecture decision

No new server routes needed. Reuse existing `/content/:key` (public GET) and `/admin/content/:key` (auth PUT) routes.

KV keys:
- `content:doc-proposals` → JSON array of proposal metadata objects
- `content:onboard-{slug}` → JSON object with onboarding kit content

### New tab: "Documents"

Add a 3rd tab button alongside "Bookings" and "Content". Tab state: `"bookings" | "content" | "documents"`.

### Documents tab — two sub-tabs: Proposals | Onboarding Kits

#### Proposals sub-tab

**Data model** stored in KV under `doc-proposals`:
```ts
type ProposalMeta = {
  id: string;          // uuid
  client: string;
  project: string;
  ref: string;         // e.g. ZYK-2026-002
  url: string;         // e.g. /proposal/sa-global or /proposal?client=Acme...
  status: "draft" | "sent" | "accepted" | "expired";
  date: string;        // ISO date
  notes?: string;
}
```

**UI:**
- On mount, fetch `GET /content/doc-proposals`. If null, seed with the two existing proposals (SA Global + a "Generic Template" entry).
- List of proposal cards: client name, ref, status badge (colour-coded), date, two action buttons:
  - "Preview" → `window.open(url, "_blank")`
  - "Copy Link" → copies full URL to clipboard (`navigator.clipboard.writeText(window.location.origin + url)`)
- Status can be changed via a `<select>` dropdown inline on each card (auto-saves on change via `PUT /admin/content/doc-proposals`)
- **"New Proposal"** button → opens an inline form (accordion at top of list):
  - Fields: Client, Project, Ref, Currency (select), Price, Weeks, Deposit %, Scope (textarea, one per line), Type
  - On submit: generates the `/proposal?...` URL from the fields, adds entry to the array, saves, collapses form

#### Onboarding Kits sub-tab

**Data model index** stored in KV under `doc-onboarding-index`:
```ts
type OnboardingMeta = {
  id: string;
  client: string;
  contact: string;
  slug: string;        // e.g. "sa-global"
  status: "draft" | "active" | "archived";
  createdAt: string;
}
```

**Individual kit content** stored in KV under `onboard-{slug}`:
```ts
type OnboardingKit = {
  client: string;
  contact: string;
  welcome: string;        // Welcome message paragraph
  projectOverview: string;
  expectationsText: string;
  contentBriefFormat: string; // How to send the weekly brief
  toolsNeeded: string[];  // e.g. ["Google Drive access", "WhatsApp group"]
  faqs: { q: string; a: string }[];
  contactEmail: string;
  createdAt: string;
}
```

**UI:**
- List of kits: client, status badge, "Preview" → `window.open("/onboard/" + slug, "_blank")`, "Copy Link", "Edit" → expands inline editor
- **Inline editor** (accordion): all `OnboardingKit` fields as text inputs/textareas
  - `toolsNeeded` → comma-separated text field
  - `faqs` → dynamic list (Add FAQ button, each FAQ has Q and A text inputs, delete button)
  - Save → `PUT /admin/content/onboard-{slug}` + updates index → `PUT /admin/content/doc-onboarding-index`
- **"New Kit"** button → form for client name + contact + slug (auto-suggested from client name, editable), creates blank kit in KV

---

## 4. Onboarding Kit Public Page

**New file:** `src/app/pages/OnboardingKitPage.tsx`
**Route:** `{ path: "/onboard/:slug", Component: OnboardingKitPage }` — outside Root (no site nav)

**Behaviour:**
- Extract `slug` from `useParams()`
- `useEffect` → fetch `GET /content/onboard-{slug}` from `${API}`
- If loading: spinner
- If not found (value is null): "This onboarding kit could not be found." message
- If found: render the kit

**Design:** Same visual language as ProposalPage — dark navy cover, clean white body sections. No site nav.

**Sections:**
1. **Cover** — Zynk logo + "Onboarding Kit" label + client name + "Welcome, {contact}" + date
2. **Welcome** — Zeeshan's welcome message paragraph
3. **Project Overview** — `projectOverview` text
4. **What to Expect** — `expectationsText` + bullet breakdown
5. **How to Send Your Brief** — `contentBriefFormat` text (how to submit weekly content briefs)
6. **Tools & Access Needed** — `toolsNeeded` list with checkmark items
7. **FAQs** — expandable accordion per FAQ entry
8. **Contact** — Zeeshan's info + mailto CTA "Drop me a message →"

---

## 5. Manager Page — `/manager`

**New file:** `src/app/pages/ManagerPage.tsx`
**Route:** `{ path: "/manager", Component: ManagerPage }` — outside Root (no site nav)

This is an **internal reference page** — a living checklist of every piece of placeholder data that still needs real content from Zeeshan. It is not linked from anywhere public.

**Design:** Simple, functional, no dark hero needed. Uses the same Zynk header style as proposal pages (dark bar at top), then a clean white body.

**State:** `useState<Set<string>>` for checked items (local only — not persisted; refreshing resets it). Each row has a checkbox Zeeshan can tick off as he fills things in.

**Sections and items:**

| Section | Item | Where it appears | Current value |
|---|---|---|---|
| Personal | LinkedIn URL | ContactPage, AboutSection | `#` |
| Personal | GitHub URL | ContactPage | `#` |
| Personal | Twitter / X URL | ContactPage | `#` |
| Personal | CV / Resume PDF | Hero download button | `#` (no file) |
| Personal | Profile photo | ProposalPage About, OnboardKit | ZH initials |
| Homepage | Testimonial #1 — name, role, company | TestimonialsSection | Placeholder |
| Homepage | Testimonial #2 — name, role, company | TestimonialsSection | Placeholder |
| Homepage | Testimonial #3 — name, role, company | TestimonialsSection | Placeholder |
| Homepage | Testimonial #4 — name, role, company | TestimonialsSection | Placeholder |
| Homepage | Impact numbers — verify accuracy | Hero + About | £2M+, 50k, 1.7k★, 50+ |
| Design Portfolio | Nexus — project image | DesignPortfolio | Unsplash placeholder |
| Design Portfolio | Nexus — View Project URL | DesignPortfolio modal | None |
| Design Portfolio | Atlas — project image | DesignPortfolio | Unsplash placeholder |
| Design Portfolio | Atlas — View Project URL | DesignPortfolio modal | None |
| Design Portfolio | Pulse — project image | DesignPortfolio | Unsplash placeholder |
| Design Portfolio | Orbit — project image | DesignPortfolio | Unsplash placeholder |
| Design Portfolio | Flux — project image | DesignPortfolio | Unsplash placeholder |
| Design Portfolio | Arc — project image | DesignPortfolio | Unsplash placeholder |
| Dev Portfolio | react-tokens — GitHub URL | DevProjects | Placeholder path |
| Dev Portfolio | react-tokens — Stars/forks | DevProjects | "1.2k / 89" (hardcoded) |
| Dev Portfolio | figma-exporter — GitHub URL | DevProjects | Placeholder path |
| Dev Portfolio | supabase-kit — GitHub URL | DevProjects | Placeholder path |
| Dev Portfolio | api-scaffold — GitHub URL | DevProjects | Placeholder path |
| Case Studies | Atlas Analytics — cover image | CaseStudies | Unsplash placeholder |
| Case Studies | Pulse Health — cover image | CaseStudies | Unsplash placeholder |
| Case Studies | react-tokens — cover image | CaseStudies | Unsplash placeholder |
| Case Studies | Zynk Design System — cover image | CaseStudies | Unsplash placeholder |
| Now Section | "Building" current project | NowSection (KV) | "make-server" placeholder |
| Now Section | "Reading" current book | NowSection (KV) | Placeholder |

**Progress bar** at top: `{checked} of {total} items complete` with a thin progress bar.

**Each row:**
- Checkbox (toggles local state)
- Item name (bold) + "Where it appears" (muted) + "Current value" (code-style, muted)
- Struck-through when checked

---

## Files to Create / Modify

| File | Change |
|---|---|
| `src/app/components/AtAGlanceBar.tsx` | `START_YEAR = 2022`, location = "Lahore, Pakistan" |
| `src/app/pages/HomePage.tsx` | Add Video Editing to `whatIDo`, import `Video` from lucide-react |
| `src/app/components/ToolkitSection.tsx` | Remove "Backend & Data" group from `devGroups` |
| `src/app/components/ProjectModal.tsx` | **New** — reusable modal overlay component |
| `src/app/components/DesignPortfolio.tsx` | Wire "View Project" → `selectedProject` state → `<ProjectModal>` |
| `src/app/components/CaseStudies.tsx` | Wire card click → `selectedCase` state → `<ProjectModal>` |
| `src/app/components/DevProjects.tsx` | Wrap `CompactCard` in `<a href={project.url}>` |
| `src/app/pages/AdminDashboard.tsx` | Add "Documents" tab with Proposals + Onboarding Kits sub-tabs |
| `src/app/pages/OnboardingKitPage.tsx` | **New** — public onboarding kit renderer |
| `src/app/pages/ManagerPage.tsx` | **New** — internal placeholder checklist |
| `src/app/routes.ts` | Add `/onboard/:slug` and `/manager` routes (both outside Root) |

No server changes — existing `/content/:key` and `/admin/content/:key` routes handle all new KV keys.

---

## Verification

1. AtAGlanceBar: location shows "Lahore, Pakistan", years active calculated from 2022
2. Homepage "What I Do": 4 cards (Design, Engineer, Strategy, Video Edit)
3. ToolkitSection Dev tab: 3 groups only (Languages, Frontend, Infrastructure) — no Backend & Data
4. DesignPortfolio: clicking "View Project" on any card opens a modal with image, name, description, tags
5. CaseStudies: clicking any card opens a modal with full case study detail
6. DevProjects: clicking a compact card navigates to the GitHub URL
7. Admin → Documents tab → Proposals: SA Global and Generic Template shown with correct links; Copy Link works; status dropdown saves
8. Admin → Documents tab → Onboarding Kits: create a new kit → fill fields → save → visit `/onboard/{slug}` and see rendered kit
9. `/manager`: all placeholder items listed, checkboxes work, progress bar updates
