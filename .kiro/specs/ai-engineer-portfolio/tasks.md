# Implementation Plan: AI Engineer Portfolio

## Overview

Build Sreelekha Vuppala's personal portfolio as a statically generated Next.js 14+ App Router site with TypeScript strict mode, Tailwind CSS, and Framer Motion. All content lives in `data/` TypeScript files; all interfaces live in `types/`; all shared primitives live in `components/ui/`. One dynamic API route handles the contact form via Resend. Deployment targets Vercel free tier with zero additional configuration.

**Key constraints throughout all tasks:**
- No `console.log`, `console.error`, or `console.warn` anywhere in client-side code
- No automated test framework — manual test checkpoints only
- Default port 3000; if in use, notify the user — do NOT change the port programmatically
- MVP first: all sections functional before any polish pass

---

## Tasks

- [x] 1. Scaffold the Next.js project and configure the toolchain
  - [x] 1.1 Initialize the Next.js 14+ project with TypeScript strict mode and App Router
    - Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"` in `e:\Portfolio2\`
    - Verify `tsconfig.json` has `"strict": true` and path alias `@/*` pointing to the root
    - Verify `tailwind.config.ts` is generated (not `.js`)
    - _Requirements: 1.1_

  - [x] 1.2 Install and pin all required dependencies
    - Install exact versions: `framer-motion@^10`, `resend@^3`, `clsx@^2`, `tailwind-merge@^2`, `@vercel/analytics@^1`
    - Install dev dependency: `@types/node` (latest compatible)
    - Verify `package.json` lists all packages with pinned semver ranges
    - _Requirements: 1.1, 1.6_

  - [x] 1.3 Configure `tailwind.config.ts` with the design token system
    - Extend the theme with the color palette: `background: '#0a0f1e'`, `accent-cyan: '#06b6d4'`, `accent-violet: '#7c3aed'`, `accent-emerald: '#10b981'`
    - Add font families: `heading: ['Sora', 'Inter', 'sans-serif']`, `body: ['Inter', 'sans-serif']`, `mono: ['JetBrains Mono', 'Fira Code', 'monospace']`
    - Add custom spacing and animation tokens as needed by the design
    - _Requirements: 1.7, 2.1, 2.3_

  - [x] 1.4 Configure `next.config.ts` and `app/globals.css`
    - Set up `next.config.ts` with image domains and any required headers
    - Write `app/globals.css` with Tailwind directives (`@tailwind base/components/utilities`) and custom CSS for the animated gradient border on primary buttons (3-second loop through accent colors)
    - Add Google Fonts import for Sora, Inter, and JetBrains Mono
    - _Requirements: 2.3, 2.6_

  - [x] 1.5 Create `.env.example` and `.env.local` placeholder
    - Write `.env.example` documenting `RESEND_API_KEY` (Resend dashboard API key, string) and `CONTACT_EMAIL_TO` (recipient email address, string)
    - Create `.env.local` with placeholder values (gitignored)
    - _Requirements: 14.2_

- [x] 2. Define all TypeScript interfaces in `types/`
  - [x] 2.1 Create `types/hero.ts`, `types/about.ts`, `types/experience.ts`
    - Implement `HeroData` interface exactly as specified in the design (including `resumeVersionDate`, `ctaButtons`, `socialLinks`, `avatarImage`, `roles`)
    - Implement `AboutData` and `AboutStat` interfaces (including `bio: string[]`, `stats`, `currentlyWorkingOn`)
    - Implement `ExperienceData`, `ExperienceEntry`, and `ExperienceType` union type
    - _Requirements: 1.3, 15.7_

  - [x] 2.2 Create `types/skills.ts`, `types/projects.ts`, `types/research.ts`
    - Implement `SkillsData`, `SkillCategory`, and `Skill` interfaces
    - Implement `ProjectsData`, `ProjectEntry`, and `ProjectLink` interfaces (including the `detail` nested object with all five fields)
    - Implement `ResearchData` and `Publication` interfaces
    - _Requirements: 1.3, 15.7_

  - [x] 2.3 Create `types/contact.ts`, `types/testimonials.ts`, `types/navigation.ts`
    - Implement `ContactData` interface
    - Implement `TestimonialsData` and `Testimonial` interfaces
    - Implement `NavItem` and `SiteMetadata` interfaces
    - _Requirements: 1.3, 15.7_

- [x] 3. Populate all content data files in `data/`
  - [x] 3.1 Create `data/hero.ts` and `data/about.ts`
    - Write `heroData` object satisfying `HeroData`: name "Sreelekha Vuppala", roles array with all four role strings, tagline ≤200 chars, CTA buttons, GitHub/LinkedIn URLs, avatar image path, `resumeVersionDate`
    - Write `aboutData` object satisfying `AboutData`: 3–4 bio paragraphs, image path, stats array (years experience, AI projects shipped, technologies mastered), `currentlyWorkingOn` string
    - Add inline branding comments adjacent to tagline and bio fields per Requirement 11.1
    - _Requirements: 3.1–3.8, 4.1–4.5, 11.1_

  - [x] 3.2 Create `data/experience.ts` and `data/skills.ts`
    - Write `experienceData` with all three work entries (Agentic AI School, Citius Tech, Accenture) plus the ASU education entry, each with `type`, `company`, `role`, `dateRange`, `achievements[]`, `technologies[]`, and `accentColor`
    - Write `skillsData` with all six categories and their full skill lists as specified in Requirement 6.1
    - _Requirements: 5.1–5.6, 6.1–6.3_

  - [x] 3.3 Create `data/projects.ts` and `data/research.ts`
    - Write `projectsData` with all three project entries (Contract Intelligence Agent, RAG Document Intelligence, Fine-Tuned Gemma 3), each with `id`, `title`, `description` ≤160 chars, `technicalSummary` ≤280 chars, `technologies[]`, `links`, `thumbnail`, `featured`, and the full `detail` object with all five fields
    - Add inline branding comments adjacent to each project description and achievement bullets per Requirement 11.1
    - Write `researchData` with research interests array, empty `publications: []`, empty `currentlyReading: []`, and `githubUrl`
    - Add inline branding comment adjacent to research interests per Requirement 11.1
    - _Requirements: 7.1–7.9, 8.1–8.5, 11.1_

  - [x] 3.4 Create `data/contact.ts`, `data/testimonials.ts`, `data/navigation.ts`, `data/metadata.ts`
    - Write `contactData` with `enabled: true`, `invitationText`, `email: 'mssreelekha238@gmail.com'`, `linkedin`, `github`
    - Write `testimonialsData` with `enabled: false` and empty `testimonials: []`
    - Write `navigationData` as `NavItem[]` covering Hero, About, Experience, Skills, Projects, Research, Contact
    - Write `siteMetadata` satisfying `SiteMetadata` with title, description, `ogImage`, `siteUrl`, `resumeVersionDate`
    - Add inline branding comments adjacent to GitHub links and `currentlyWorkingOn` per Requirement 11.1
    - _Requirements: 9.4–9.5, 11.1, 11.2, 12.1, 14.2_

- [x] 4. Implement shared library utilities in `lib/`
  - [x] 4.1 Create `lib/utils.ts`
    - Implement `cn(...inputs)` classname helper using `clsx` and `tailwind-merge`
    - Export as named export
    - _Requirements: 1.7, 15.5_

  - [x] 4.2 Create `lib/animations.ts`
    - Implement all Framer Motion `Variants` exports exactly as specified in the design: `fadeInUp`, `staggerContainer`, `staggerContainerSlow`, `staggerBadge`, `heroSequence`, and `cardHover`
    - Add JSDoc comments explaining each variant's intended use
    - _Requirements: 1.6, 2.4_

  - [x] 4.3 Create `lib/scroll.ts`
    - Implement `smoothScrollTo(sectionId: string)` that reads the navbar height from the DOM and scrolls to the target element with the correct offset
    - Implement `getActiveSection(navItems: NavItem[])` that returns the `sectionId` of the section currently occupying the majority of the viewport
    - _Requirements: 12.2, 12.6_

- [ ] 5. Build shared UI primitives in `components/ui/`
  - [ ] 5.1 Create `components/ui/Button.tsx`
    - Implement `Button` with `variant` prop: `'primary' | 'secondary' | 'ghost'`
    - Primary variant: animated gradient border/glow cycling through accent colors on a 3-second loop (CSS animation defined in `globals.css`)
    - All variants: accessible focus indicator with 3:1 non-text contrast ratio
    - No `console.log` anywhere in this file
    - _Requirements: 2.6, 10.7_

  - [ ] 5.2 Create `components/ui/Badge.tsx`
    - Implement `Badge` as a pill element accepting `children` and optional `className`
    - Used for skill tags and technology tags throughout the site
    - _Requirements: 5.2, 7.7_

  - [ ] 5.3 Create `components/ui/Card.tsx`
    - Implement `Card` with hover lift effect: `y: -4px` translation and box-shadow glow using `cardHover` from `lib/animations.ts`
    - Accept `children`, `className`, and optional `onClick`
    - _Requirements: 5.3, 7.5_

  - [ ] 5.4 Create `components/ui/AnimatedCounter.tsx`
    - Implement counter that animates from 0 to `target` over 1.5 seconds using Framer Motion's `useMotionValue` and `useTransform` with an easing function
    - Accept `target: number` and optional `suffix?: string`
    - Trigger animation when the component enters the viewport using `useInView`
    - _Requirements: 4.3_

  - [ ] 5.5 Create `components/ui/TypewriterText.tsx`
    - Implement typewriter/word-cycling effect that cycles through a `strings: string[]` prop
    - Each string displayed for 2–4 seconds; transition uses a character-by-character or fade effect
    - Render nothing gracefully when `strings` is empty
    - _Requirements: 3.2_

  - [ ] 5.6 Create `components/ui/ParticleBackground.tsx`
    - Implement canvas-based animated particle network for the Hero section
    - Particles connect with lines when within a threshold distance; animation loops continuously
    - Respect `prefers-reduced-motion`: when set, render a static particle snapshot with no animation
    - No `console.log` in this file
    - _Requirements: 2.2, 2.9_

  - [ ] 5.7 Create `components/ui/SectionWrapper.tsx`
    - Implement scroll-triggered animation wrapper using Framer Motion `useInView`
    - Accept `id: string`, `className?: string`, `children`, `threshold?: number` (default 0.2)
    - Check `prefers-reduced-motion` on mount: if set, render children immediately in `visible` state with no transitions
    - Fire `track(id)` via `@vercel/analytics` when the section enters the viewport
    - Apply `fadeInUp` variant from `lib/animations.ts`
    - _Requirements: 2.4, 2.9, 14.1_

  - [ ] 5.8 Create `components/ui/BackToTop.tsx`
    - Implement fixed-position button visible only after the user scrolls past the Hero section (>100vh)
    - On click, smooth-scroll to the top of the page using `lib/scroll.ts`
    - Accessible: keyboard focusable, visible focus indicator, `aria-label="Back to top"`
    - _Requirements: 12.3, 12.4_

- [ ] 6. Build layout components
  - [ ] 6.1 Create `components/NavBar.tsx`
    - Implement fixed top navigation bar with: initials/logo mark on the left, anchor links on the right
    - Scroll-aware: transition from transparent to `backdrop-filter: blur(12px)` opaque background after 64px scroll, within 200ms (CSS transition, not Framer Motion)
    - Active link indicator: use `getActiveSection` from `lib/scroll.ts` to highlight the current section's nav link
    - "Download Resume" CTA that accepts a `resumeExists: boolean` prop — hide the button when `false`
    - Mobile hamburger menu: visible on viewports <768px, expands to full-screen overlay; overlay closes on link click or outside tap
    - Filter nav items by the corresponding section's `enabled` flag
    - No `console.log` in this file
    - _Requirements: 12.1–12.6, 13.1, 13.2, 13.5_

  - [ ] 6.2 Create `components/Footer.tsx`
    - Implement site footer with: copyright notice using `new Date().getFullYear()`, same anchor links as the nav bar, social icon links to GitHub and LinkedIn (each `target="_blank" rel="noopener noreferrer"`)
    - Filter nav items by `enabled` flag (same logic as NavBar)
    - _Requirements: 12.7_

- [ ] 7. Implement root layout and page scaffold
  - [ ] 7.1 Create `app/layout.tsx`
    - Implement root layout with: Next.js `Metadata` export sourced from `data/metadata.ts` (title, description, all five OG tags, all four Twitter Card tags)
    - Load Sora, Inter, and JetBrains Mono via `next/font/google` with `display: 'swap'`
    - Wrap children with `<Analytics />` from `@vercel/analytics/react`
    - Use semantic HTML: `<html>`, `<body>` with dark background class
    - _Requirements: 10.4, 10.5, 14.1_

  - [ ] 7.2 Create `app/page.tsx`
    - Implement the single-page root with build-time `resumeExists` check using `fs.existsSync`
    - Import all data files and render sections in order: `<NavBar>`, `<main>` containing Hero → About → Experience → Skills → Projects → Research → Contact → Testimonials (conditional on `enabled`), `<Footer>`, `<BackToTop>`
    - Pass `resumeExists` as a prop to `HeroSection` and `NavBar`
    - Conditionally render `TestimonialsSection` only when `testimonialsData.enabled === true`
    - Use semantic HTML: `<header>` for NavBar, `<main>` for sections, `<footer>` for Footer
    - _Requirements: 1.2, 11.2, 15.1–15.4_

- [ ] 8. Implement section components
  - [ ] 8.1 Implement `components/sections/HeroSection.tsx`
    - Render `<h1>` "Sreelekha Vuppala" at min 48px desktop / 32px mobile
    - Render `<TypewriterText>` cycling through `data.roles`
    - Render tagline paragraph
    - Render two CTA buttons: "View My Work" (smooth-scroll to `#projects`) and "Download Resume" (hidden when `resumeExists` is `false`; when visible, uses `download` attribute to trigger file download without navigation)
    - Render GitHub and LinkedIn icon links with `target="_blank" rel="noopener noreferrer"`
    - Render avatar image with glowing ring/gradient border CSS treatment; non-empty `alt` from data
    - Render `<ParticleBackground>` as the section background
    - Apply `heroSequence` animation variant from `lib/animations.ts` with sequential delays: name → tagline → roles → CTAs → social links; total entrance ≤1.5s
    - Section occupies `100vh` desktop / `min-h-[90vh]` mobile
    - Render resume version date from `data.resumeVersionDate`
    - No `console.log` in this file
    - _Requirements: 3.1–3.9, 13.1–13.5_

  - [ ] 8.2 Implement `components/sections/AboutSection.tsx`
    - Render bio paragraphs from `data.bio[]`
    - Two-column layout (image + text) on ≥1024px; single-column stacked on <1024px
    - Render `<AnimatedCounter>` for each stat in `data.stats[]` with label and optional suffix
    - Render "What I'm currently working on" subsection from `data.currentlyWorkingOn`
    - Wrap in `<SectionWrapper id="about">` with `fadeInUp` + `staggerContainer`
    - No `console.log` in this file
    - _Requirements: 4.1–4.5_

  - [ ] 8.3 Implement `components/sections/ExperienceSection.tsx`
    - Render vertical timeline: alternating left/right card layout on ≥1024px, single-column on <1024px
    - For each entry in `data.entries[]`: render company, role, date range, achievements as bullet points, technologies as `<Badge>` pills
    - Education entry (`type === 'education'`): render with graduation cap icon and visually distinct accent color
    - Hover effect on each card: `cardHover` from `lib/animations.ts` (4px upward translation + box-shadow glow)
    - Wrap in `<SectionWrapper id="experience">` with `staggerContainerSlow` (150ms stagger)
    - No `console.log` in this file
    - _Requirements: 5.1–5.6_

  - [ ] 8.4 Implement `components/sections/SkillsSection.tsx`
    - Render six skill categories, each with its icon, accent color, category name, and skill badges
    - Each skill rendered as `<Badge>` with skill name; show icon alongside name when `skill.iconUrl` is defined
    - No proficiency bars, percentage meters, or any relative proficiency indicators — flat equal-weight list only
    - Wrap in `<SectionWrapper id="skills" threshold={0.1}>` with `staggerBadge` (50ms stagger per badge)
    - No `console.log` in this file
    - _Requirements: 6.1–6.6_

  - [ ] 8.5 Implement `components/sections/ProjectsSection.tsx`
    - Render project cards from `data.projects[]`, each with: title, description, technology tags as `<Badge>` pills, GitHub/demo links (omit link controls entirely when both are absent), thumbnail image with `alt` from data
    - "Featured" badge on cards where `project.featured === true`; no badge otherwise
    - Hover overlay revealing `project.technicalSummary` (≤280 chars) using Framer Motion `AnimatePresence`
    - Technology tag filter: clicking a tag filters visible cards to only those containing that tag; clicking again restores all cards
    - Project detail view: clicking a card opens a modal or expanded view with all five labeled sections (description, architecture, key decisions, challenges solved, outcome/impact)
    - Wrap in `<SectionWrapper id="projects">` with `staggerContainer`
    - No `console.log` in this file
    - _Requirements: 7.1–7.9_

  - [ ] 8.6 Implement `components/sections/ResearchSection.tsx`
    - Render research interests list from `data.interests[]`
    - Publications: if `data.publications` is empty, render "Coming Soon" placeholder text (no empty list); if non-empty, render each with title, venue, date, abstract ≤300 chars, and hyperlink
    - "Currently Reading / Exploring" subsection: render only when `data.currentlyReading` is non-empty
    - "View GitHub" CTA button linking to `data.githubUrl` in a new tab
    - Wrap in `<SectionWrapper id="research">` with `staggerContainer`
    - No `console.log` in this file
    - _Requirements: 8.1–8.5_

  - [ ] 8.7 Implement `components/sections/ContactSection.tsx`
    - Render invitation text from `data.invitationText`
    - Render direct contact links (email, LinkedIn, GitHub) each opening in a new tab
    - Implement contact form with fields: Name, Email, Subject, Message
    - Client-side validation: Name 1–100 chars, Email contains `@` and valid domain, Subject 1–150 chars, Message 20–1000 chars; show inline error adjacent to each failing field without clearing other fields
    - On valid submit: disable submit button, show loading spinner, POST to `/api/contact` with 10-second `AbortController` timeout
    - On success response: show confirmation message, clear all fields, re-enable submit
    - On error/timeout: show descriptive error message, re-enable submit, preserve all field values
    - Wrap in `<SectionWrapper id="contact">` with `fadeInUp`
    - No `console.log` anywhere in this file — all error states surface via UI state only
    - _Requirements: 9.1–9.7_

  - [ ] 8.8 Implement `components/sections/TestimonialsSection.tsx`
    - Implement the component in the codebase (it must exist as a file)
    - Render testimonial cards from `data.testimonials[]` when the array is non-empty
    - The component is only rendered in `app/page.tsx` when `testimonialsData.enabled === true`
    - Wrap in `<SectionWrapper id="testimonials">` with `staggerContainer`
    - No `console.log` in this file
    - _Requirements: 11.2, 15.4_

- [ ] 9. Checkpoint — Verify MVP foundation
  - Ensure `npm run build` completes with zero TypeScript errors
  - Verify `npm run dev` starts on port 3000; if port is in use, the terminal notifies the user — do NOT change the port
  - Manually verify all sections render with correct content from data files at 320px, 768px, and 1280px viewports
  - Verify no horizontal overflow at any breakpoint
  - Verify no `console.log` calls exist anywhere in `components/` or `lib/` (search the codebase)
  - Ask the user if any questions arise before proceeding

- [ ] 10. Implement the contact form API route
  - [ ] 10.1 Create `app/api/contact/route.ts`
    - Implement `validateContactPayload(body)` as a pure function: Name 1–100 chars (trimmed), Email contains `@` and valid domain pattern, Subject 1–150 chars, Message 20–1000 chars; return `{ valid: true }` or `{ valid: false, errors: Record<string, string> }`
    - Implement `POST` handler: parse JSON body, run `validateContactPayload`, return 400 with field errors on failure
    - On valid payload: call `resend.emails.send()` with `from: 'Portfolio Contact <onboarding@resend.dev>'`, `to: process.env.CONTACT_EMAIL_TO`, subject prefixed with `[Portfolio]`, plain-text body
    - On success: return `{ success: true }` with status 200
    - On Resend SDK error: catch the error silently (no `console.log`), return `{ success: false, message: 'Failed to send message. Please try again.' }` with status 500
    - `RESEND_API_KEY` must only be accessed server-side — never referenced in any client component
    - _Requirements: 9.1–9.7, 14.2_

- [ ] 11. Add SEO artifacts
  - [ ] 11.1 Create `app/sitemap.ts`
    - Implement Next.js `sitemap()` function returning the site root URL with `lastModified: new Date()` and `changeFrequency: 'monthly'`
    - Source `siteUrl` from `data/metadata.ts`
    - _Requirements: 10.10_

  - [ ] 11.2 Create `app/robots.ts`
    - Implement Next.js `robots()` function returning `{ rules: { userAgent: '*', allow: '/' }, sitemap: '<siteUrl>/sitemap.xml' }`
    - Source `siteUrl` from `data/metadata.ts`
    - _Requirements: 10.10_

- [ ] 12. Integrate Vercel Analytics
  - [ ] 12.1 Wire `<Analytics />` into `app/layout.tsx` and verify `SectionWrapper` tracking
    - Confirm `<Analytics />` from `@vercel/analytics/react` is present in the root layout (added in task 7.1)
    - Verify `SectionWrapper` calls `track(id)` from `@vercel/analytics` when each section enters the viewport
    - Confirm no cookie consent banner is required (Vercel Analytics is cookieless)
    - _Requirements: 14.1_

- [ ] 13. Add documentation files
  - [ ] 13.1 Create `README.md`
    - Write sections covering: prerequisites (Node.js version, pnpm/npm), local development setup (`npm install`, `npm run dev`), environment variable configuration (reference `.env.example`), build and deployment steps (`npm run build`, Vercel dashboard connection), and a content update summary pointing to `CONTENT_GUIDE.md`
    - _Requirements: 14.3_

  - [ ] 13.2 Create `CONTENT_GUIDE.md`
    - Write numbered update instructions for each section: Hero, About, Experience, Skills, Projects, Research, Contact
    - Each instruction specifies: the file to edit (`data/<section>.ts`), the field name, accepted values/format, and the visible effect of the change
    - Include a note on how to enable Testimonials (`testimonials.enabled: true`) and how to add a new section (three-location rule)
    - _Requirements: 11.3_

- [ ] 14. Configure Vercel deployment
  - [ ] 14.1 Verify Vercel deployment readiness
    - Confirm `npm run build` produces a clean build with no TypeScript errors and no ESLint errors
    - Confirm `public/Sreelekha_Vuppala_Resume.pdf` exists (or the build-time check in `app/page.tsx` correctly hides the CTA when absent)
    - Confirm `public/avatar.jpg` and `public/og-image.png` exist
    - Confirm `public/projects/` directory contains the three project thumbnails
    - Document the two Vercel environment variables to set in the dashboard: `RESEND_API_KEY` and `CONTACT_EMAIL_TO`
    - _Requirements: 1.4, 14.2_

- [ ] 15. Final checkpoint — Full manual test pass
  - Run through all manual test checkpoints from the design document's Testing Strategy section:
    - `npm run build` completes with zero TypeScript errors
    - All sections render correctly at 320px, 768px, 1280px
    - NavBar blur transition triggers after 64px scroll
    - Active nav link updates as sections scroll into view
    - Hero occupies 100vh desktop / ≥90vh mobile
    - Hero entrance animation completes within 1.5 seconds
    - All animations disabled when `prefers-reduced-motion: reduce` is set
    - Contact form: inline validation errors, loading spinner, success confirmation, error preservation
    - Resume download triggers file download without navigation
    - Keyboard navigation: all interactive elements reachable via Tab in DOM order
    - All informative images have non-empty `alt` attributes
    - `<title>`, `<meta name="description">`, all OG tags, and all Twitter Card tags present in `<head>`
    - `sitemap.xml` and `robots.txt` accessible at site root
    - No `console.log` anywhere in client-side code (final codebase search)
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- No automated test framework is set up as part of this spec — testing is manual only per MVP scope (Requirement 1, Note)
- Tasks marked with `*` would be optional test sub-tasks; none are present here since no test framework is in scope
- Each task references specific requirements for traceability
- Checkpoints (tasks 9 and 15) ensure incremental validation at key milestones
- The `enabled` flag pattern (tasks 3.4, 7.2, 8.8) is the only extensibility hook — no plugin system needed
- `console.log` prohibition applies to all files under `components/`, `lib/`, and `app/` client components; the API route also omits `console.log` per the design
- Port 3000 is the default; if occupied, Next.js will print a conflict notice — the code must never call `process.env.PORT` assignment or any programmatic port override
- Vercel Analytics is cookieless — no consent banner required (Requirement 14.1)
- The three-location rule for adding a new section: (1) new file in `components/sections/`, (2) one entry in `data/navigation.ts`, (3) one `<Section />` tag in `app/page.tsx` (Requirements 14.4, 15.3)

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "1.4", "1.5"] },
    { "id": 2, "tasks": ["2.1", "2.2", "2.3"] },
    { "id": 3, "tasks": ["3.1", "3.2", "3.3", "3.4"] },
    { "id": 4, "tasks": ["4.1", "4.2", "4.3"] },
    { "id": 5, "tasks": ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6"] },
    { "id": 6, "tasks": ["5.7", "5.8"] },
    { "id": 7, "tasks": ["6.1", "6.2"] },
    { "id": 8, "tasks": ["7.1", "7.2"] },
    { "id": 9, "tasks": ["8.1", "8.2", "8.3", "8.4"] },
    { "id": 10, "tasks": ["8.5", "8.6", "8.7", "8.8"] },
    { "id": 11, "tasks": ["10.1"] },
    { "id": 12, "tasks": ["11.1", "11.2", "12.1"] },
    { "id": 13, "tasks": ["13.1", "13.2", "14.1"] }
  ]
}
```
