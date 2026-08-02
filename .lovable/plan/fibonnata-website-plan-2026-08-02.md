# FiboNNata Website Plan

## Goal
Build the official public website for FiboNNata — a small, technically serious AI infrastructure/research landing page. The site should feel like an experimental computer-science lab hidden inside a mathematical cloud system: monochromatic pearl/charcoal, subtle Fibonacci geometry, and precise motion.

## What we are building

### Pages
1. **Home** (`/`) — Hero, one-line positioning, two core primitives preview, Fibonacci cloud visual, scroll into the lab.
2. **About / Mission** (`/about`) — The "Intelligence shouldn't need everything" story, research philosophy, and what FiboNNata is not.
3. **.fibo** (`/fibo`) — Dedicated primitive page with the LEARN → .fibo → COMPILE → MODEL/RUNTIME diagram, experimental labels, and visual artifact.
4. **Lazy Memory** (`/lazy-memory`) — Dedicated primitive page with the RAW MEMORY → DISCOVER → STORE → QUERY → INDEX → EXPAND → COMPILE → AGENT flow and an interactive/adaptive memory visualization.
5. **Contact** (`/contact`) — Form that stores submissions and sends an email to `fibonnata@proton.me`.

Shared chrome: minimal fixed navigation, footer, and per-route SEO metadata.

## Design direction

- **Palette:** off-white/pearl background (`#f8f7f4`), charcoal/obsidian text (`#1a1a1a`), metallic silver accents (`#c0c0c0` / `#8a8a8a`), near-black for emphasis (`#0d0d0d`).
- **Typography:** a clean sans-serif for body and UI; a slightly idiosyncratic display font for headlines (loaded via `<link>` in `__root.tsx`). Monospace for code/diagram labels.
- **Texture:** subtle noise/grain, thin rules, golden-ratio spacing, and Fibonacci-derived geometry. No glassmorphism, no gradient blobs, no fake holograms, no stock photography.
- **Motion:** slow, composed. Scroll-triggered fades, staggered diagram reveals, and a gently drifting Fibonacci particle cloud. Full reduced-motion fallback.

## Visual systems

### Fibonacci cloud (hero / ambient)
- Use WebGPU when available; fall back to WebGL, then to a static SVG/CSS particle field.
- Particles distributed by golden-angle / Fibonacci spiral rules.
- Slight mouse parallax and slow rotation.
- Sandbox preview has no GPU, so the fallback must be production-ready and visually consistent.

### .fibo artifact
- A compact, abstract 3D-ish object (or SVG/CSS construction) representing a portable learned capability.
- Hover reveals the compile/runtime transformation concept.
- Labels: RESEARCH · EXPERIMENTAL · PROTOTYPE.

### Lazy Memory visualization
- A node/cloud diagram that starts sparse and "wakes up" as the user scrolls or hovers.
- Nodes appear progressively; connections draw themselves.
- Communicates: memory is built on demand, not pre-indexed.

### Architecture diagrams
- SVG-based step diagrams for both primitives.
- Each step is a node; active step highlights on scroll.
- No animated charts libraries unless justified.

## Backend / contact form

1. **Enable Lovable Cloud** first — required for database and email.
2. **Database:** create a `contact_submissions` table with columns for name, email, subject, message, status, created_at, and an idempotency key.
   - Include RLS policies and GRANT statements.
3. **Server function:** `submitContactForm` validates with Zod, inserts the row, then calls the Lovable email API to send the message to `fibonnata@proton.me`.
   - Rate-limit by email/IP to prevent abuse.
   - Idempotency key derived from submission to avoid duplicate emails.
   - If outbound email domain is not yet configured, store the submission and return a friendly "we'll be in touch" confirmation; surface the need for a sender domain to enable email delivery.
4. **Client:** ContactForm with validation, loading/error/success states, and accessible labels.

## Technical implementation

- **Framework:** TanStack Start (React + Vite).
- **Styling:** Tailwind v4 via `src/styles.css`; all colors added as semantic tokens.
- **Fonts:** loaded in `src/routes/__root.tsx` head via `<link>`.
- **Graphics:** Three.js for 3D/fallback WebGL; WebGPU via `navigator.gpu` with CPU/SVG fallback.
- **State / data:** TanStack Query for server-function calls.
- **Routes:**
  - `src/routes/index.tsx`
  - `src/routes/about.tsx`
  - `src/routes/fibo.tsx`
  - `src/routes/lazy-memory.tsx`
  - `src/routes/contact.tsx`
- **Components:**
  - `Navigation`, `Footer`
  - `Hero`, `FibonacciCloud`, `FiboArtifact`, `MemoryVisualization`
  - `ArchitectureDiagram`, `ResearchGrid`, `ContactForm`
- **Hooks:** `useWebGPU`, `useReducedMotion`, `useIntersection`
- **Utils:** Fibonacci/golden-ratio helpers, performance throttling.

## Build phases

1. **Foundation**
   - Enable Lovable Cloud.
   - Update `src/styles.css` with FiboNNata tokens and custom utilities.
   - Load fonts in `__root.tsx` and set up shared layout/navigation/footer.
   - Create route files with unique `head()` metadata.

2. **Content & layout**
   - Build each page's static structure and copy.
   - Implement SVG architecture diagrams.
   - Add scroll-triggered reveal animations.

3. **Visual effects**
   - Build Fibonacci cloud with WebGPU/WebGL/SVG fallback.
   - Build .fibo artifact and Lazy Memory visualization.
   - Wire reduced-motion and performance checks.

4. **Contact form backend**
   - Create `contact_submissions` migration with RLS/grants.
   - Implement `submitContactForm` server function.
   - Wire email sending via Lovable email API.
   - Build and test the form.

5. **Polish & verify**
   - Responsive pass (mobile, tablet, desktop).
   - Lighthouse/perf check.
   - Console/runtime error check.

## Open decisions / prerequisites

- **Email domain:** Lovable's managed email requires a domain you own. If you have one, we'll configure it; if not, the form will still save submissions and we can enable sending once a domain is added.
- **Display font:** If you have a preferred free web font for headlines, let me know; otherwise I'll choose a restrained but distinctive option that fits the lab aesthetic.
- **Writing/blog page:** The brief mentions a possible writing section. Should we include a `/writing` route now, or keep it as a nav placeholder for later?
