import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { ResearchGrid } from "@/components/ResearchGrid";
import { SectionReveal } from "@/components/SectionReveal";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: "FiboNNata · Intelligence shouldn't need everything",
      },
      {
        name: "description",
        content:
          "FiboNNata builds infrastructure for AI systems that learn selectively, remember efficiently, and compute only what matters.",
      },
      {
        property: "og:title",
        content: "FiboNNata · Intelligence shouldn't need everything",
      },
      {
        property: "og:description",
        content:
          "FiboNNata builds infrastructure for AI systems that learn selectively, remember efficiently, and compute only what matters.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          eyebrow="The problem"
          title="Today's AI forces learning and memory into the same place."
          subtitle="Models carry everything in context. Memory systems index everything upfront. The result is bigger, slower, more fragile systems. FiboNNata separates what a model has learned from what an agent needs to remember."
        />
        <ResearchGrid />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          eyebrow="Two primitives"
          title="Selective intelligence, composed."
        />
        <div className="grid gap-8 md:grid-cols-2">
          <SectionReveal delay={0}>
            <Link
              to="/fibo"
              className="group block rounded-xl border border-border/60 bg-card p-8 transition-all hover:border-foreground/30 hover:bg-secondary"
            >
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Primitive 01
              </p>
              <h3 className="mb-3 font-display text-2xl font-medium text-foreground">
                .fibo
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                A portable representation for learned capabilities. Compile,
                adapt, and reuse intelligence across models and runtimes.
              </p>
              <span className="mt-6 inline-block text-sm font-medium text-foreground transition-transform group-hover:translate-x-1">
                Explore →
              </span>
            </Link>
          </SectionReveal>
          <SectionReveal delay={100}>
            <Link
              to="/lazy-memory"
              className="group block rounded-xl border border-border/60 bg-card p-8 transition-all hover:border-foreground/30 hover:bg-secondary"
            >
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Primitive 02
              </p>
              <h3 className="mb-3 font-display text-2xl font-medium text-foreground">
                Lazy Memory
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Adaptive memory that discovers relationships, creates indexes,
                and expands context only when necessary.
              </p>
              <span className="mt-6 inline-block text-sm font-medium text-foreground transition-transform group-hover:translate-x-1">
                Explore →
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <SectionReveal>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Now building
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl text-balance">
            A new architecture for smaller, more efficient, more modular AI.
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
