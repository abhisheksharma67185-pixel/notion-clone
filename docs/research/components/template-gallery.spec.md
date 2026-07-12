# TemplateGalleryModal Specification (live app.notion.com — LIGHT theme)

## Overview
- **Target file:** `components/notion-library/database-page.tsx` → `TemplateGalleryModal`
- **Trigger:** "More templates" button in the New database right panel
- **Screenshot:** `docs/design-references/app.notion.com/template-gallery-top.png`, `gallery-top-hires.png`
- **Interaction model:** static modal + click-to-select cards + live search filter
- **Source of truth:** live extraction from app.notion.com (workspace in light mode). Overrides the
  earlier dark-theme build made from user screenshots. Light theme chosen because the live site
  renders light AND the whole notion-clone repo/DatabasePage is light-themed.

## Modal container
- Size: **1000px wide**, min-height ~650px, vertically+horizontally centered (~125px top margin at 900h)
- background: `#F9F8F7` (rgb 249,248,247)
- border-radius: `12px`
- box-shadow (layered):
  - `0 24px 48px rgba(25,25,25,0.24)`
  - `0 4px 12px rgba(25,25,25,0.14)`
  - `0 0 0 1px rgba(42,28,0,0.07)` (hairline ring)
- Header band ~68px tall (content scroller has padding-top:68px); header floats over it.
- **Content column: 576px wide, centered** (212px side margins). Labels, AI box, grid all 576px.

## Header (floating, ~68px)
- **X close** — top-left, ~16px inset, muted icon, hover subtle bg
- **"Add to" + lock + "Private" + chevron** — left group:
  - "Add to" 14px / weight 500 / `rgb(125,122,117)`
  - lock icon + "Private" (14px) + chevron-down
- **Search** — horizontally centered in modal:
  - wrapper 296px wide, height 36px, radius `10px`, bg `rgba(249,249,248,0.8)`, padding `8px 12px`
  - focus ring: `inset 0 0 0 1px #2383E2, 0 0 0 1px #2383E2`
  - search icon left, input 14px `rgb(44,44,43)`, placeholder muted
- **"Empty database"** — top-right: table icon + text (14px). Click → create empty db.

## Sections (each: label + content, label margin-bottom 24px)
Label style: 14px / weight 500 / `rgb(125,122,117)`, small leading icon, gap ~6px.

### 1. Build with AI
- Label "Build with AI"
- Box 576px wide, ~76px tall, white bg, 1px light border, radius ~12px
- Face/AI icon left, placeholder "Describe what you want to build" (`rgb(125,122,117)`), up-arrow send button bottom-right

### 2. Existing data sources ( ↗ icon )
- One card: **Todo List** (280px, left-aligned; same card recipe as templates but neutral tint)
  - Title "Todo List" (14px/500), subtitle "To Do List" (12px/400)
  - White preview: header "▤ Todo List", columns Assignee / Status / Due date, 3 rows

### 3. Templates ( ▤ icon )
- Grid: `grid-template-columns: 280px 280px; gap: 16px` (576px total)
- 6 cards, order: Tasks Tracker, Projects, Document Hub, Brainstorm Session, Meeting Notes, Goals Tracker

## Template card recipe (280 × 174, clips overflow)
- border-radius `12px`, `1px solid <tint-border>`, subtle tint bg
- **Header block** padding `20px 20px 10px`:
  - Title 14px / weight 500 / `<tint-text>`
  - Description 12px / weight 400 / `<tint-text>` (reads muted at small size)
- **White preview** (256px, left-aligned, radius `6px 6px 0 0`, bleeds off bottom edge — card `overflow:hidden`):
  - bg `#FFFFFF`
  - header padding `12px 0 0 12px`: tiny colored icon (rounded-4px) + name (12px `rgb(44,44,43)`)
  - grid table: column headers 9px `rgb(125,122,117)`; rows of chips / avatars / line placeholders

### Card tints (bg / border / text)
| key | bg | border | text |
|-----|-----|--------|------|
| tasks (green) | `rgba(3,87,31,0.035)` | `rgb(215,230,221)` | `rgb(42,83,60)` |
| projects (blue) | `rgba(0,128,213,0.047)` | ~`rgb(214,229,242)` | `rgb(38,74,114)` |
| docs (red) | `rgba(199,3,3,0.035)` | ~`rgb(238,220,219)` | `rgb(109,53,49)` |
| brainstorm (orange) | `rgba(186,72,3,0.043)` | ~`rgb(238,225,214)` | `rgb(106,66,34)` |
| meeting (yellow) | `rgba(207,175,0,0.063)` | ~`rgb(236,230,210)` | `rgb(101,81,33)` |
| goals (blue) | `rgba(0,128,213,0.047)` | ~`rgb(214,229,242)` | `rgb(38,74,114)` |

### Status chips (in white preview)
- radius `6px`, font-size `8px`, padding `0 7px 0 5px`, height ~12px, leading dot
- Not started: bg `rgba(28,19,1,0.11)`, text `rgb(73,72,70)`
- In progress: bg `rgba(0,118,217,0.204)`, text `rgb(38,74,114)`
- Done: bg `rgba(0,96,38,0.157)`, text `rgb(42,83,60)`
- High(red)/Medium(yellow)/Low(green), Standup/Presentation/Planning follow same recipe with matching tints.

## Per-card preview content
- Tasks: cols Task name / Status / Assignee — rows: Not started+avatar, In progress+avatar, Done+avatar
- Projects: chips row (Not started, In progress, Done) then line rows (board-ish)
- Document Hub: cols Doc name / Created by / Created time — avatars + lines
- Brainstorm: cols Idea / Created by / Priority — High / Medium / Low chips
- Meeting Notes: cols Meeting name / Date / Category — Standup / Presentation / Planning
- Goals Tracker: cols Goal name / Owner / Status — Done / Not started / In progress

## Behaviors
- Search filters template cards live (case-insensitive over title+description). While searching,
  hide Build-with-AI + Existing sources; show only matching Templates (or "No templates found").
- Card hover: border darkens slightly, subtle bg lift.
- Clicking Tasks/Projects/Docs → hand off to existing `TemplateCustomizeModal`.
  Other cards / Empty database / Todo → toast + close.
- Esc / X / backdrop click → close.

## Responsive
- Desktop (1440): as above (1000px modal, 576 content).
- Tablet/Mobile: modal shrinks to `min(1000px, calc(100vw-40px))`; grid collapses to 1 column under ~640px.
