import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { ResearchGrid } from "@/components/ResearchGrid";
import { SectionReveal } from "@/components/SectionReveal";

const pillars = [
  {
    eyebrow: "Architecture",
    title: "Bonnata Stack",
    body: "A local-first pattern where computation moves from TypeScript to Rust and WebAssembly to WebGPU, and the network is an enhancement, not a dependency.",
    to: "/stack" as const,
  },
  {
    eyebrow: "Format",
    title: ".natech talent file",
    body: "A portable, architecture-agnostic representation of a trained adapter, built directly on the safetensors container format.",
    to: "/natech" as const,
  },
  {
    eyebrow: "Middleware",
    title: "Fibonnata SDK",
    body: "Three operations — make, fuse, compile — wrapped around whatever inference engine is actually running the model. None of them train anything.",
    to: "/sdk" as const,
  },
  {
    eyebrow: "Memory",
    title: "Lazy Memory",
    body: "Append-only capture, a derived and rebuildable graph, and training exports walked out of that graph. Live retrieval stays deferred.",
    to: "/lazy-memory" as const,
  },
];

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Fibonnata · A portable adaptation layer for language models" },
      {
        name: "description",
        content:
          "Fibonnata is a portable adaptation layer and local-first runtime architecture for small language models: the .natech format, a three-operation SDK, and the Bonnata Stack.",
      },
      {
        property: "og:title",
        content: "Fibonnata · A portable adaptation layer for language models",
      },
      {
        property: "og:description",
        content:
          "An architecture-agnostic file format for trained adapters, operations for combining and retargeting them, and middleware that wraps existing inference engines.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://fibo-lazy-mind.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://fibo-lazy-mind.lovable.app/" }],
  }),
});

function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24">
        <SectionHeader
          eyebrow="The problem"
          title="A trained adapter is stranded on the model it was trained on."
          subtitle="Adapters exist in fragmented, model-specific formats. Fibonnata treats the adapter, not the base model, as the durable asset."
        />
        <ResearchGrid />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24">
        <SectionHeader
          eyebrow="System architecture"
          title="Four concerns, each with a narrow job."
          subtitle="The format does not assume a runtime. The SDK does not train. The stack does not assume the network is there."
        />
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {pillars.map((p, i) => (
            <SectionReveal key={p.title} delay={i * 100}>
              <Link
                to={p.to}
                className="group flex h-full flex-col rounded-xl border border-border/60 bg-card p-6 transition-all hover:border-foreground/30 hover:bg-secondary sm:p-8"
              >
                <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:text-xs">
                  {p.eyebrow}
                </p>
                <h3 className="mb-3 font-display text-xl font-medium text-foreground sm:text-2xl">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                <span className="mt-6 inline-block text-sm font-medium text-foreground transition-transform group-hover:translate-x-1">
                  Read more →
                </span>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24">
        <SectionReveal>
          <div className="rounded-xl border border-border/60 bg-card p-6 sm:p-10">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:text-xs">
              Reference implementation
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-2xl font-medium tracking-tight text-foreground text-balance sm:text-3xl">
              Proven end to end on a WebAssembly build of llama.cpp.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Patched to hot-swap a LoRA adapter on a running model context without
              reloading the base model. The compile step targets that backend first,
              producing a GGUF adapter the engine already knows how to load. Other
              backends follow the same wrapper pattern without a rewrite.
            </p>
          </div>
        </SectionReveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-6 sm:py-24">
        <SectionReveal>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:text-xs">
            Now building
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-2xl font-medium tracking-tight text-foreground text-balance sm:text-4xl">
            Smaller, more modular AI that runs where the user is.
          </h2>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Get in touch
          </Link>
        </SectionReveal>
      </section>
    </>
  );
}
