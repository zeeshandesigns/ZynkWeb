# Plan: Homepage Expansion — Full Digital CV

## Context

The homepage currently has Hero → About Me (bio + 3 pillars + flat experience list + skill tags) → Footer. The user wants it to work as a full LinkedIn replacement with structured experience (jobs / freelance / volunteer), education (degree + certs), a visual toolkit, an at-a-glance info bar, and a downloadable resume. This plan also suggests additional sections that strengthen the page as a professional document.

---

## New Page Structure

```
Hero  (existing — add Download CV button)
↓
At-a-Glance Bar          ← NEW
↓
About                    (existing bio, condensed)
↓
Experience               ← RESTRUCTURED (tabbed: Full-Time · Freelance · Volunteer)
↓
Education                ← NEW (Degree card + Certifications grid)
↓
Toolkit                  ← REPLACES flat skills (visual, categorised)
↓
Testimonials             ← NEW (suggested)
↓
Now                      ← NEW (suggested)
↓
Footer  (existing — add Download CV button)
```

---

## Section Specs

### 1. At-a-Glance Bar
A slim horizontal strip that pins directly below the hero. Scannable at a glance — no interaction needed.

| Item | Example |
|---|---|
| Location | Manchester, UK · Remote |
| Status | 🟢 Open to Work |
| Years Active | Since 2018 (auto-calc) |
| Focus | Design + Engineering |
| Work Type | Freelance · Advisory · Full-time |
| Timezone | GMT/BST |

**Layout:** `max-w-6xl` centred, 6 items in a row on desktop, 2-col grid on mobile. Each item: small icon + label (muted) + value (bold). Separated by thin vertical dividers. Background: `var(--secondary)` with top/bottom border.

---

### 2. About (bio) — condensed
Keep the two-column bio + currently card. Remove the "What I Do" three-pillar cards — those are better served by the separate Work page. Replace with a compact "Currently" card + a few quick highlights.

---

### 3. Experience — tabbed with timeline

**Tabs:** `Full-Time` · `Freelance / Contract` · `Volunteer`

Each tab renders a **vertical timeline**:
- Continuous vertical line on the left (primary/20 colour)
- Each entry: coloured dot on the line + role, company, period, description, tag chips
- "Current" entry: filled blue dot, badge

**Sample data (placeholder — user will update):**

*Full-Time:*
- Founder & Product Lead — Zynk (2022–Present)
- Front-End Engineer — TechCo (2018–2020)

*Freelance:*
- Senior Product Designer & Developer — Independent (2020–2022) [15+ projects]
- UI/UX Consultant — Various clients (2019–2020)

*Volunteer:*
- Design Mentor — ADPList (2021–Present)
- Open Source Contributor — Various (2019–Present)

---

### 4. Education

Two sub-sections:

**Degree card** (full width):
- University name, degree title, field of study, year
- Clean card with university info + any notable achievements/modules

**Certifications grid** (3-col desktop, 2 mobile):
- Each cert: icon/emoji or coloured badge, cert name, issuing org, year, optional "Verify →" link
- Sample certs: Google UX Design, AWS Cloud Practitioner, Meta Frontend, Scrum Master

---

### 5. Toolkit — visual, categorised

Replace flat skill tag chips with a richer layout. Two columns:

**Design** (left):
- Figma, Framer, Adobe XD, Photoshop, Illustrator, Principle, Spline

**Development** (right):
- Languages: TypeScript, JavaScript, Python
- Frontend: React, Next.js, Tailwind CSS, Three.js
- Backend: Node.js, PostgreSQL, GraphQL, Prisma
- Infrastructure: Vercel, AWS, Docker, Supabase

Each tool: small icon area (emoji/text) + tool name + optional proficiency dot (★ primary, ○ muted).

---

### 6. Download Resume PDF

**Placement:** Two locations:
1. Hero section — secondary outline button next to "View My Work"
2. Footer — text link

**Implementation:** Static PDF in `public/resume.pdf`. Button uses `<a href="/resume.pdf" download>`. Placeholder file until user uploads real PDF.

---

## Suggested Additional Sections

### A. Testimonials ⭐ (highest value)
3–4 quotes from clients or colleagues. Each card: quote, name, role + company, optional photo avatar. Use `<Card>` in a 2-col grid or a horizontal scroll on mobile. This is the single most powerful conversion element missing from the page.

### B. Now 🟢
A short, personal "what I'm currently doing" block — current project, what I'm learning, what I'm reading, where I'm based. Updates frequently. Gives the page a live, human feel that LinkedIn doesn't have. Single card, mid-page.

### C. Writing / Thoughts
A 2–3 card preview of published articles, essays, or blog posts. Title, publication, date, 1-line excerpt. Links out. Even if currently empty, the placeholder sets intent.

### D. Numbers / Impact
A row of 4–5 bold metrics: not just "40+ projects" but specific, verifiable outcomes. E.g., "€2M in client revenue influenced", "50k app downloads", "1.2k GitHub stars". Positioned just after the bio.

---

## Files to Create / Modify

| File | Action |
|---|---|
| `src/app/pages/HomePage.tsx` | Major restructure: add at-a-glance bar, download button, import new sections |
| `src/app/components/AtAGlanceBar.tsx` | NEW — slim info strip |
| `src/app/components/ExperienceSection.tsx` | NEW — tabbed timeline |
| `src/app/components/EducationSection.tsx` | NEW — degree card + certs grid |
| `src/app/components/ToolkitSection.tsx` | NEW — visual tool display |
| `src/app/components/TestimonialsSection.tsx` | NEW — quote cards |
| `src/app/components/NowSection.tsx` | NEW — current focus card |
| `public/resume.pdf` | ADD — placeholder PDF file |

---

## Reused Components
- `Badge`, `Card`, `CardContent`, `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `Separator` from `src/app/components/ui/`
- `SectionLabel` + `SectionTitle` helpers defined in `HomePage.tsx` (move to shared file)

---

## Verification
1. At-a-glance bar renders all 6 items on desktop, 2-col on mobile
2. Experience tabs switch correctly between Full-Time / Freelance / Volunteer
3. Timeline vertical line renders correctly; current role has filled dot
4. Education degree card + cert grid render without overflow
5. Toolkit shows both design and dev columns with tool names
6. Testimonials show at least 3 cards
7. Download Resume button triggers file download
8. No layout shift when switching experience tabs
