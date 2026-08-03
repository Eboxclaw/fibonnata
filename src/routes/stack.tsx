import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";
import { LayerStack, type StackLayer } from "@/components/LayerStack";
import { SectionReveal } from "@/components/SectionReveal";

const layers: StackLayer[] = [
  {
    name: "Experience",
    tech: "PWA",
    items: [
      "tiny bootstrap",
      "code splitting",
      "lazy loading",
      "offline-first",
      "service worker",
      "immutable caching",
    ],
  },
  {
    name: "Application",
    tech: "TypeScript",
    items: ["UI", "state", "orchestration", "capability management"],
  },
  {
    name: "Workers",
    tech: "Web Workers",
    items: [
      "main thread stays UI-only",
      "hosts Rust/WASM execution",
      "dispatches WebGPU work",
      "message-passing boundary",
    ],
  },
  {
    name: "Systems",
    tech: "Rust",
    items: ["algorithms", "parsing", "indexing", "high-performance CPU logic"],
  },
  {
    name: "CPU runtime",
    tech: "WASM",
    items: ["SIMD", "workers", "zero/minimal copies", "CPU fallback"],
  },
  {
    name: "GPU runtime",
    tech: "WebGPU",
    items: [
      "compute shaders",
      "persistent buffers",
      "pipeline reuse",
      "GPU-resident data",
      "batching",
      "minimal readback",
    ],
  },
  {
    name: "AI runtime",
    tech: "Fibonnata SDK",
    items: [
      "make: adapter to talent file",
      "fuse: up to 3 talent files into one",
      "compile: talent file to target",
      "wraps the inference engine",
      "no training in this layer",
    ],
  },
  {
    name: "Memory",
    tech: "Lazy Memory",
    items: [
      "append-only, cold tier",
      "graph derived, rebuildable",
      "training export, graph-informed",
      "live retrieval is deferred",
    ],
  },
  {
    name: "Local",
    tech: "Storage",
    items: ["OPFS", "IndexedDB", "Cache API", "local models", "local state"],
  },
  {
    name: "Security",
    tech: "Baseline",
    items: [
      "CSP",
      "sandboxing",
      "permission minimization",
      "asset integrity",
      "dependency minimization",
    ],
  },
];

export const Route = createFileRoute("/stack")({
  component: StackPage,
  head: () => ({
    meta: [
      { title: "The Bonnata Stack · Fibonnata" },
      {
        name: "description",
        content:
          "A local-first, browser-based architecture where computation moves from TypeScript to Rust and WebAssembly to WebGPU, and the network is an enhancement rather than a dependency.",
      },
      { property: "og:title", content: "The Bonnata Stack · Fibonnata" },
      {
        property: "og:description",
        content:
          "Ten layers, two rules: heavy compute never runs on the main thread, and everything loads lazily.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://fibo-lazy-mind.lovable.app/stack" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://fibo-lazy-mind.lovable.app/stack" }],
  }),
});

function StackPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-24">
      <SectionHeader
        eyebrow="The architecture"
        title="The Bonnata Stack."
        subtitle="A local-first, browser-based system where an application runs its own models, stores its own data, and treats the network as optional. The Bonnata PWA Template is the reusable scaffold that implements it: the application shell, the storage layer, the worker boundary, and two open slots — one for an AI runtime, one for memory."
      />

      <div className="mb-12 grid gap-5 sm:gap-6 md:grid-cols-2">
        <SectionReveal>
          <div className="h-full rounded-xl border border-border/60 bg-card p-5 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Rule 01
            </p>
            <h3 className="mt-3 font-display text-lg font-medium text-foreground sm:text-xl">
              Heavy computation never runs on the main thread.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              It runs in a Worker, calling into Rust compiled to WebAssembly, or into
              WebGPU compute shaders. TypeScript orchestrates: it decides what to load and
              when. It never becomes the compute engine itself.
            </p>
          </div>
        </SectionReveal>
        <SectionReveal delay={100}>
          <div className="h-full rounded-xl border border-border/60 bg-card p-5 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Rule 02
            </p>
            <h3 className="mt-3 font-display text-lg font-medium text-foreground sm:text-xl">
              Everything loads lazily.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A model, an adapter, a WebGPU pipeline, a database index: none of it
              initializes until something asks for it, and what does load is cached
              aggressively under content-hashed, immutable filenames.
            </p>
          </div>
        </SectionReveal>
      </div>

      <LayerStack layers={layers} />

      <SectionReveal className="mt-12">
        <div className="rounded-xl border border-dashed border-border bg-card p-6 text-center">
          <p className="font-display text-lg font-medium text-foreground">
            A PWA that starts in milliseconds and works offline by default.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            It only reaches for the network when a feature explicitly needs to.
          </p>
        </div>
      </SectionReveal>
    </main>
  );
}
