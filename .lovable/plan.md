# Fibonnata — content correction, UI fix, mobile pass

The site currently describes two primitives (".fibo" and "Lazy Memory") with placeholder-level copy. The whitepaper defines a different, more precise system: a portable adapter format called `.natech`, an SDK with three operations, the Bonnata Stack, and Lazy Memory as a memory tier. This updates names, terminology and structure to match, reuses the existing pearl/charcoal design system, and fixes the styling bug that is currently breaking the stylesheet.

## Blocking fix first

`src/styles.css` declares `@utility grain::before`, which Tailwind v4 rejects — the whole stylesheet fails to compile and the preview 500s on CSS. Move the pseudo-element inside the utility body with `&::before`.

## Naming and routes

| Now | Becomes |
| --- | --- |
| `/fibo` — ".fibo — portable intelligence" | `/natech` — "The .natech talent file" |
| `/lazy-memory` | `/lazy-memory` (kept, content rewritten) |
| — | `/sdk` — Fibonnata SDK: make · fuse · compile |
| — | `/stack` — The Bonnata Stack |

Old `/fibo` keeps working via a permanent redirect so existing links don't break.

Component renames to match: `FiboArtifact` → `NatechArtifact`, `FibonacciCloud` stays (it's the hero visual, not a product name).

## Page content

- **Home** — hero line stays short and declarative ("An adapter should outlive the model it was trained on"), abstract paragraph, then four cards: Bonnata Stack, Bonnata PWA Template, Fibonnata SDK, Reference Application. Adds "The problem" section (adapters are locked to one architecture) reusing the existing reveal-on-scroll cards.
- **/natech** — what the file is (a valid safetensors file), the header/metadata breakdown as a responsive diagram, and the two design choices: role-based tensor names, and the travelling model fingerprint. Role taxonomy listed as pills (attention_query, mlp_gate, …).
- **/sdk** — the three operations (make, fuse, compile), the fuse cap of three files and why, the middleware-not-engine framing, and the alignment levels L1–L4 as a table with method / when / cost, plus the cheapest-first fallthrough diagram.
- **/lazy-memory** — rewritten around capture → derived graph → training export, with live retrieval marked deferred. Existing node visualisation is relabelled to the real stages.
- **/stack** — the layer list (Experience → Application → Workers → Systems → CPU runtime → GPU runtime → AI runtime → Memory → Local → Security) as a vertical stack of layer cards, plus the two rules (no heavy compute on the main thread; everything loads lazily).
- **/about** and **/contact** — copy aligned to the new terminology; contact email unchanged.

## UI and mobile

- Replace the ASCII diagrams with real responsive components: the existing `ArchitectureDiagram` becomes a shared flow component that renders as a vertical stack under `sm` and horizontally above it.
- Header rows follow `grid-cols-[minmax(0,1fr)_auto]` on mobile, promoting to flex at `sm:`, with `min-w-0` on text containers and `truncate` on headings — currently long titles clip on narrow screens.
- Fluid heading scale so the hero doesn't overflow at 360px; body text min 16px.
- Navigation gets a working mobile menu (currently links wrap awkwardly).
- Tables (alignment levels) become cards on mobile rather than horizontally scrolling.
- Three.js hero cloud: lower particle count and disable mouse parallax on touch/small screens to protect battery and scroll performance.
- Each route keeps its own `head()` with unique title, description and og tags reflecting the new names.

## Technical notes

- Tailwind v4: `@utility grain { &::before { … } }`.
- New routes are file-based under `src/routes/`; `/fibo` becomes a redirect route.
- No backend or database changes; the contact form and its table stay as they are.
- Verification: typecheck, then a Playwright pass over every route at 375px and 1280px checking for console errors and horizontal overflow.
