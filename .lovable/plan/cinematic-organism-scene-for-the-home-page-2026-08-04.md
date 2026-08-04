# Cinematic organism scene for the home page

Turn the home page into a scroll-driven film: a single Three.js "organism" — a graphed cloud / fireball of points and connective lines — that grows and changes as the visitor scrolls, with a virtual cameraman moving around it. The existing sections stay; the scene lives behind them and reacts to where the reader is.

## The story, in five beats

Each beat is a scroll chapter. Copy overlays the scene; the organism changes shape at each one.

1. **One neuron** — a single bright point in empty space, slow drift. "Intelligence starts small."
2. **Actions accumulate** — sparks fire around it, trails collapse into a tight vectorized shell (VeTas). "Experience becomes vectors, not context."
3. **Eating adapters** — discrete LoRA/adapter shards fly in from off-camera and are absorbed; the core thickens each time.
4. **Fusion** — absorbed shards fuse; the cloud reorganizes into a denser, more ordered golden-angle lattice. Bulkier, brighter, fewer stray points.
5. **Zero context tax** — the organism settles, memory-ready, breathing slowly. Camera pulls back to reveal the whole form.

## The scene

- One persistent WebGL canvas, fixed behind the page content, replacing the current hero-only `FibonacciCloud`.
- Organism = three layered systems sharing a Fibonacci-sphere distribution: a dense point core, a thin filament/line mesh between near neighbours, and an outer soft "fire" halo. Additive blending, monochrome pearl/charcoal palette with a single warm ember accent — no rainbow, no neon.
- Growth is driven by one scalar `growth` value (0 → 1) mapped from scroll progress: radius, point count in view, line density, halo intensity and rotation speed all read from it. Absorbed shards are a small satellite particle set that lerps into the core between beats.

## Camera and parallax

- A cinematic rig, not a scroll-jack: the camera path is a set of keyframed positions/targets per beat, interpolated with easing off scroll progress, so scrolling feels like a DP changing the angle — wide, low orbit, close push-in, pull-back.
- Mouse (and device tilt on mobile) adds a small damped offset on top, max a few degrees.
- DOM content gets matching depth: section headers and cards translate at slightly different rates so foreground and background separate.

## Fusing with the current page

- Hero keeps its headline and CTAs; the scene sits behind it and the existing card sections scroll over it with the page background becoming translucent in the story chapters.
- New chapter blocks are inserted between the existing "problem" and "architecture" sections, each with short copy that maps a beat to a real primitive (`.natech`, fuse, Lazy Memory) so the narrative and the technical page are one story.
- Everything stays in the existing pearl/charcoal token system and existing typography.

## Performance and fallbacks

- Rendering only runs while the canvas is on screen; frame loop pauses otherwise.
- Mobile: lower point counts, no line mesh above a threshold, capped pixel ratio, tilt parallax instead of mouse.
- `prefers-reduced-motion`: static composed frame per beat, no camera motion.
- No WebGL: the existing SVG fallback is extended to a simple static organism per beat.

## Technical notes

- Three.js is already installed; the scene is dynamically imported client-side only, so SSR/prerender is untouched.
- WebGPU is not usable here — the sandbox and many visitor browsers have no adapter; Three's WebGL renderer with custom shader material gives the same look reliably. If you want a WebGPU path later it can be added as an opt-in upgrade behind a capability check.
- New files: `src/components/organism/OrganismScene.tsx` (canvas + lifecycle), `organism/scene.ts` (geometry, materials, growth), `organism/camera.ts` (keyframes + easing), `src/hooks/use-scroll-progress.ts`, `src/components/StoryChapters.tsx`.
- Edits: `src/components/Hero.tsx` and `src/routes/index.tsx` to host the scene and chapters; `FibonacciCloud` is retired into the new scene.
