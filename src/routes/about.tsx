import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";
import { SectionReveal } from "@/components/SectionReveal";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About · FiboNNata" },
      {
        name: "description",
        content:
          "FiboNNata is an experimental research lab building new primitives for AI systems.",
      },
      { property: "og:title", content: "About · FiboNNata" },
      {
        property: "og:description",
        content:
          "FiboNNata is an experimental research lab building new primitives for AI systems.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <SectionHeader
        eyebrow="About"
        title="We are building a new shape of intelligence."
      />
      <div className="grid gap-16 md:grid-cols-2">
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <SectionReveal>
            <p>
              FiboNNata is an experimental research lab exploring AI
              infrastructure. Our premise is simple: intelligence shouldn't
              need everything.
            </p>
          </SectionReveal>
          <SectionReveal delay={100}>
            <p>
              We believe the next generation of AI systems will be built from
              smaller, composable parts: learned capabilities packaged into
              portable representations, and memory that wakes up only when it
              is needed.
            </p>
          </SectionReveal>
          <SectionReveal delay={200}>
            <p>
              This is not another chatbot, assistant, or productivity tool. We
              are working on the underlying architecture — the protocols,
              representations, and memory systems that make selective
              intelligence possible.
            </p>
          </SectionReveal>
        </div>
        <div className="space-y-6">
          <SectionReveal delay={100}>
            <div className="rounded-xl border border-border/60 bg-card p-6">
              <h3 className="mb-3 font-display text-lg font-medium text-foreground">
                What FiboNNata is not
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>— Not a generic AI startup landing page</li>
                <li>— Not a chatbot or assistant product</li>
                <li>— Not a model training company</li>
                <li>— Not a SaaS dashboard</li>
              </ul>
            </div>
          </SectionReveal>
          <SectionReveal delay={200}>
            <div className="rounded-xl border border-border/60 bg-card p-6">
              <h3 className="mb-3 font-display text-lg font-medium text-foreground">
                What we are
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>— AI systems infrastructure / research</li>
                <li>— Selective learning and lazy memory</li>
                <li>— Composable, portable intelligence</li>
                <li>— Experimental and open-ended</li>
              </ul>
            </div>
          </SectionReveal>
        </div>
      </div>
    </main>
  );
}
