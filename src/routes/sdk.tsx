import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";
import { FlowDiagram } from "@/components/FlowDiagram";
import { AlignmentLevels } from "@/components/AlignmentLevels";
import { SectionReveal } from "@/components/SectionReveal";

const pipeline = [
  {
    label: "MAKE",
    detail:
      "Import an adapter that already exists, whether PEFT, Diffusers, GGUF or MLX, role-map it, and package it as a talent file. It never trains anything.",
  },
  {
    label: "FUSE",
    detail:
      "Merge up to three talent files into one with a weighted linear combination. Inputs are already normalized to the same role taxonomy.",
  },
  {
    label: "COMPILE",
    detail:
      "Take a talent file and a target model, pick an alignment level from L1 to L4, and produce a target-specific artifact.",
  },
  {
    label: "HOT-SWAP",
    detail:
      "The wrapped engine loads the artifact onto a model already running. The engine is wrapped, not replaced.",
  },
];

export const Route = createFileRoute("/sdk")({
  component: SdkPage,
  head: () => ({
    meta: [
      { title: "Fibonnata SDK · make, fuse, compile" },
      {
        name: "description",
        content:
          "The Fibonnata SDK has exactly three operations, make, fuse and compile, and trains nothing. It is middleware that wraps an existing inference engine and adds compilation, compatibility checks and caching.",
      },
      { property: "og:title", content: "Fibonnata SDK · make, fuse, compile" },
      {
        property: "og:description",
        content:
          "Three non-training operations, four alignment levels, and a middleware wrapper around whatever engine is running the model.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://fibo-lazy-mind.lovable.app/sdk" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://fibo-lazy-mind.lovable.app/sdk" }],
  }),
});

function SdkPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-24">
      <SectionHeader
        eyebrow="The SDK"
        title="Three operations. None of them train."
        subtitle="Fibonnata SDK is middleware, not an inference engine. It wraps an existing runtime and adds compilation, a compatibility check, and a cache."
      />

      <FlowDiagram steps={pipeline} title="From existing adapter to running model" />

      <div className="mt-12 grid gap-5 sm:gap-6 md:grid-cols-2">
        <SectionReveal>
          <div className="h-full rounded-xl border border-border/60 bg-card p-5 sm:p-6">
            <h3 className="font-display text-lg font-medium text-foreground sm:text-xl">
              Why fuse caps at three
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              More merged adapters means more interference between overlapping target
              modules, and three is the point past which that risk stops being manageable
              by default. A tensor present in only some inputs is kept at its own weight
              and recorded in the output's provenance chain, not dropped.
            </p>
          </div>
        </SectionReveal>
        <SectionReveal delay={100}>
          <div className="h-full rounded-xl border border-border/60 bg-card p-5 sm:p-6">
            <h3 className="font-display text-lg font-medium text-foreground sm:text-xl">
              Compiled outputs are cached
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Keyed by the pair of talent file and target model, in local storage, so a
              repeat load is a cache hit rather than a recomputation.
            </p>
          </div>
        </SectionReveal>
      </div>

      <div className="mt-16">
        <SectionHeader
          eyebrow="Alignment levels"
          title="How much has to change before the weights make sense?"
          subtitle="The decision is a simple fallthrough, cheapest option first: fingerprint match, then same family, then structural overlap, then distillation. A compiled adapter always carries a level and a confidence score, never a bare success flag."
        />
        <AlignmentLevels />
        <SectionReveal className="mt-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            L1 and L2 are the minimum any implementation supports. L3 is recommended. L4
            is the expensive, cloud-delegable exception, not the default path.
          </p>
        </SectionReveal>
      </div>
    </main>
  );
}
