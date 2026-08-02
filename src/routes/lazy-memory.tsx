import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { MemoryVisualization } from "@/components/MemoryVisualization";
import { SectionReveal } from "@/components/SectionReveal";

const steps = [
  { label: "RAW MEMORY", detail: "Unstructured observations enter the system." },
  { label: "DISCOVER", detail: "Patterns and relationships are found on demand." },
  { label: "STORE", detail: "Only useful representations are kept." },
  { label: "QUERY", detail: "A question triggers retrieval and expansion." },
  { label: "INDEX", detail: "Indexes are built around what actually matters." },
  { label: "EXPAND", detail: "Context grows only when necessary." },
  { label: "COMPILE CONTEXT", detail: "A focused context is assembled for the agent." },
  { label: "AGENT", detail: "The agent acts with just enough memory." },
];

export const Route = createFileRoute("/lazy-memory")({
  component: LazyMemoryPage,
  head: () => ({
    meta: [
      { title: "Lazy Memory · FiboNNata" },
      {
        name: "description",
        content:
          "Lazy Memory is an adaptive memory architecture for AI agents that discovers relationships, creates indexes, and expands context only when necessary.",
      },
      { property: "og:title", content: "Lazy Memory · FiboNNata" },
      {
        property: "og:description",
        content:
          "Lazy Memory is an adaptive memory architecture for AI agents that discovers relationships, creates indexes, and expands context only when necessary.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/lazy-memory" },
    ],
    links: [{ rel: "canonical", href: "/lazy-memory" }],
  }),
});

function LazyMemoryPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <SectionHeader
        eyebrow="Primitive 02"
        title="Lazy Memory — adaptive memory."
        subtitle="Don't build memory until you need it. Instead of embedding, indexing, graphing, summarizing, and loading everything upfront, the system progressively discovers useful representations based on actual queries and usage."
      />
      <ArchitectureDiagram steps={steps} title="The Lazy Memory flow" />
      <div className="mt-16 grid gap-16 md:grid-cols-2">
        <MemoryVisualization />
        <div className="space-y-6">
          <SectionReveal delay={100}>
            <h3 className="font-display text-xl font-medium text-foreground">
              Why lazy?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Upfront indexing is expensive and often wrong. Lazy Memory lets an
              agent start with raw observations and build structure around real
              questions. Memory grows where the work is, not everywhere.
            </p>
          </SectionReveal>
          <SectionReveal delay={200}>
            <h3 className="font-display text-xl font-medium text-foreground">
              What it combines
            </h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>— Structured memory and graph relationships</li>
              <li>— Semantic and lexical retrieval</li>
              <li>— Temporal relationships and summaries</li>
              <li>— Adaptive indexes that evolve with use</li>
            </ul>
          </SectionReveal>
        </div>
      </div>
    </main>
  );
}
