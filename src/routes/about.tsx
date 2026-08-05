import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";
import { SectionReveal } from "@/components/SectionReveal";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About · Fibonnata" },
      {
        name: "description",
        content:
          "Fibonnata separates four concerns usually tangled together: a format that assumes no runtime, operations that never train, middleware that wraps the engine already running, and a local-first runtime where the network is optional.",
      },
      { property: "og:title", content: "About · Fibonnata" },
      {
        property: "og:description",
        content:
          "Each piece stays narrow on purpose. The format does not assume a runtime. The SDK does not train. The stack does not assume the network is there.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://fibo-lazy-mind.lovable.app/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://fibo-lazy-mind.lovable.app/about" }],
  }),
});

function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-24">
      <SectionHeader
        eyebrow="About"
        title="Four concerns, deliberately kept apart."
      />
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <SectionReveal>
            <p>
              Fibonnata separates four things that are usually tangled together: an
              architecture-agnostic file format for what a model has learned, a small,
              non-training set of operations for making and combining that knowledge, a
              thin middleware wrapper for applying it to whatever engine is actually
              running, and a local-first application architecture underneath all of it.
            </p>
          </SectionReveal>
          <SectionReveal delay={100}>
            <p>
              Each piece stays narrow on purpose. The format does not assume a runtime.
              The SDK does not train. The stack does not assume the network is there.
            </p>
          </SectionReveal>
          <SectionReveal delay={200}>
            <p>
              What holds them together is a single idea: an adapter should outlive the
              model it was trained on.
            </p>
          </SectionReveal>
        </div>
        <div className="space-y-5 sm:space-y-6">
          <SectionReveal delay={100}>
            <div className="rounded-xl border border-border/60 bg-card p-5 sm:p-6">
              <h3 className="mb-3 font-display text-lg font-medium text-foreground">
                What Fibonnata is not
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Not an inference engine. It wraps one.</li>
                <li>Not a training framework. The SDK trains nothing.</li>
                <li>Not a bespoke binary format. .natech is safetensors.</li>
                <li>Not a cloud service. The network is optional.</li>
              </ul>
            </div>
          </SectionReveal>
          <SectionReveal delay={200}>
            <div className="rounded-xl border border-border/60 bg-card p-5 sm:p-6">
              <h3 className="mb-3 font-display text-lg font-medium text-foreground">
                What it is
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>A portable adaptation layer for small language models</li>
                <li>The Bonnata Stack and its PWA template</li>
                <li>The .natech talent file and three operations on it</li>
                <li>A reference application: chat, curation, training, evaluation</li>
              </ul>
            </div>
          </SectionReveal>
        </div>
      </div>
    </main>
  );
}
