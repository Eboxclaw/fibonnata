# Cinematic scene: WebGPU path, smoother scroll, corrected story copy

## 1. WebGPU with graceful fallback

Renderer selection becomes a three-step ladder inside the organism scene:

1. `navigator.gpu` present and an adapter is returned: use Three's WebGPU renderer.
2. Otherwise: current WebGL renderer (unchanged behaviour).
3. No WebGL context at all: existing SVG fallback stays.

Because the current point cloud uses hand written GLSL, the scene module gets two
material builders that produce the same look: the existing GLSL shader for the WebGL
path, and a node-material equivalent for the WebGPU path (growth, breathe, ember tint,
projected point size). Everything else (geometry, camera path, shards, filaments,
dispose) is shared. If WebGPU init throws for any reason, the code silently drops to
WebGL, so nothing regresses on Safari or older machines.

## 2. Scroll optimisation

Today every scroll frame calls `setState`, which re-renders `StoryChapters` and the
scene wrapper on each tick. Changes:

- Scroll progress is published through a ref plus a subscriber callback, so the WebGL
  loop reads it directly and React only re-renders when the active chapter index
  changes (not on every pixel).
- Chapter card parallax moves from inline React style to a CSS custom property updated
  in the same rAF pass.
- The scene pauses rendering when the canvas is off screen (IntersectionObserver) in
  addition to the existing tab-visibility pause.
- Scroll and resize handlers coalesce into a single rAF, resize is debounced.

Net effect: no React work during scroll, one render pass per frame.

## 3. Scene tuning (reference art)

- Core cloud dots slightly larger and a touch brighter, so the graph reads as a wire
  sphere of nodes rather than dust.
- Adapter/LoRA shards noticeably larger (roughly double), keeping the faceted crystal
  look from the reference, clustered nearer the core when equipped.
- Filament lines a little more present at high growth so the sphere lattice is visible.

## 4. Story chapter copy (rewritten, no long dashes)

1. **It starts with any agent.** No fixed base, no special model. Neurons come online
   one by one as the agent runs.
2. **Actions become vectors.** Interactions, corrections and semantic memory are
   vectorised. Those vectors are what later become VeTas.
3. **VeTas and LoRAs travel together.** A VeTa can be wrapped with a LoRA and used with
   adapters, unified in a single QAM.
4. **Accumulate, equip, merge.** Knowledge is collected, equipped when needed, merged
   when it helps, and carried anywhere. Nothing is retrained.
5. **Zero context tax.** What it learned lives in weights and in Lazy Memory, not in the
   context window. Memory ready, nothing paid per token.

## 5. Four concerns copy review

Home and About both describe the same four concerns. They get tightened to one clear
job each and matched wording between pages: format that assumes no runtime, operations
that never train, middleware that wraps the engine already running, local first runtime
where the network is optional.

## 6. Dash cleanup

Em dashes and en dashes are removed from all user visible copy across the home, about,
natech, sdk, stack, lazy memory pages and the shared components, replaced with commas,
colons or full stops so sentences still read naturally.

## Technical notes

Files touched: `src/components/organism/scene.ts` (renderer ladder, material builders,
sizing), `src/components/organism/OrganismScene.tsx` (progress subscription,
IntersectionObserver), `src/hooks/use-scroll-progress.ts` (ref based publishing),
`src/components/StoryChapters.tsx`, `src/routes/index.tsx`, `src/routes/about.tsx`,
`src/routes/natech.tsx`, `src/routes/sdk.tsx`, `src/routes/stack.tsx`,
`src/routes/lazy-memory.tsx`, `src/components/LayerStack.tsx`,
`src/components/AlignmentLevels.tsx`. No backend or data changes.
