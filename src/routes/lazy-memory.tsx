import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";
import { FlowDiagram } from "@/components/FlowDiagram";
import { MemoryVisualization } from "@/components/MemoryVisualization";
import { SectionReveal } from "@/components/SectionReveal";

const steps = [
  {
    label: "CAPTURE",
    detail:
      "Every interaction — a chat turn, an evaluation, a correction — is appended to a cold, append-only tier. Capture is cheap and happens by default.",
  },
  {
    label: "DERIVE GRAPH",
    detail:
      "Entities and relationships are derived from what accumulates. The graph is rebuildable, never authoritative.",
  },
  {
    label: "TRAINING EXPORT",
    detail:
      "Walk a subgraph and bundle a related cluster into a single training set — far better data than a flat transcript.",
  },
  {
    label: "CURATED DATASET",
    detail: "The hot tier: what an actual training run consumes.",
  },
  {
    label: "MAKE",
    detail:
      "The resulting adapter re-enters the Fibonnata SDK as a .natech talent file.",
  },
];

export const Route = createFileRoute("/lazy-memory")({
  component: LazyMemoryPage,
  head: () => ({
    meta: [
      { title: "Lazy Memory · Fibonnata" },
      {
        name: "description",
        content:
          "Lazy Memory is an append-only cold tier with a derived, rebuildable graph on top. Training exports are walked out of that graph; live retrieval is deliberately deferred.",
      },
      { property: "og:title", content: "Lazy Memory · Fibonnata" },
      {
        property: "og:description",
        content:
          "Capture is cheap, the graph is derived and rebuildable, and only live retrieval is deferred.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://fibo-lazy-mind.lovable.app/lazy-memory" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://fibo-lazy-mind.lovable.app/lazy-memory" },
    ],
  }),
});

function LazyMemoryPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-24">
      <SectionHeader
        eyebrow="The memory tier"
        title="Adapters have to come from somewhere."
        subtitle="Most of what a running application generates is worth almost nothing individually, but a graph built from that raw material is worth a great deal: it turns isolated turns into a related, walkable structure that exports into far better training data than any flat transcript could."
      />

      <FlowDiagram steps={steps} title="From raw interaction to trained adapter" />

      <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
        <MemoryVisualization />
        <div className="space-y-6">
          <SectionReveal delay={100}>
            <h3 className="font-display text-lg font-medium text-foreground sm:text-xl">
              The graph is derived, never the source of truth
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              It is rebuildable from the raw log at any time, and exported in its own
              format, separate from .natech. A talent file describes trained weights; a
              graph describes knowledge. Keeping them apart is what makes the graph, and
              the training bundles walked out of it, usable by more than one training
              pipeline.
            </p>
          </SectionReveal>
          <SectionReveal delay={200}>
            <h3 className="font-display text-lg font-medium text-foreground sm:text-xl">
              Live retrieval is deferred
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              The model querying that graph mid-conversation is the one piece still held
              back, and only because there is no reason to query a graph before it holds
              anything worth querying.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>— Append-only cold tier, cheap by default</li>
              <li>— Entities and relationships derived on accumulation</li>
              <li>— Graph-informed training export</li>
              <li>— Live retrieval: deferred</li>
            </ul>
          </SectionReveal>
        </div>
      </div>
    </main>
  );
}
