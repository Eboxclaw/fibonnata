import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { FiboArtifact } from "@/components/FiboArtifact";
import { SectionReveal } from "@/components/SectionReveal";

const steps = [
  { label: "LEARN", detail: "A model acquires a capability from data or feedback." },
  { label: ".fibo", detail: "The learned capability is encoded as a portable representation." },
  { label: "COMPILE", detail: "The representation is adapted to a target runtime or model." },
  { label: "MODEL / RUNTIME", detail: "The capability is deployed where it is needed." },
];

export const Route = createFileRoute("/fibo")({
  component: FiboPage,
  head: () => ({
    meta: [
      { title: ".fibo · FiboNNata" },
      {
        name: "description",
        content:
          ".fibo packages learned capabilities into a portable representation that can be compiled, adapted, and reused across models and runtimes.",
      },
      { property: "og:title", content: ".fibo · FiboNNata" },
      {
        property: "og:description",
        content:
          ".fibo packages learned capabilities into a portable representation that can be compiled, adapted, and reused across models and runtimes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/fibo" },
    ],
    links: [{ rel: "canonical", href: "/fibo" }],
  }),
});

function FiboPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <SectionHeader
        eyebrow="Primitive 01"
        title=".fibo — portable intelligence."
        subtitle="A .fibo is an intermediate representation for learned capabilities. It is intended to become transformable into different adapter implementations and target runtimes."
      />
      <ArchitectureDiagram steps={steps} title="The .fibo pipeline" />
      <FiboArtifact />
      <SectionReveal className="mt-16">
        <div className="rounded-xl border border-dashed border-border bg-card p-6 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Status
          </p>
          <p className="mt-2 font-display text-lg font-medium text-foreground">
            Research · Experimental · Prototype
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Universal model portability is the direction, not a claim.
          </p>
        </div>
      </SectionReveal>
      <SectionReveal className="mt-16 grid gap-8 md:grid-cols-3">
        {[
          {
            title: "Portable",
            body: "Move learned behavior between architectures without starting from scratch.",
          },
          {
            title: "Composable",
            body: "Combine multiple .fibo units into larger capability graphs.",
          },
          {
            title: "Compilable",
            body: "Target specific runtimes, from edge devices to large servers.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-border/60 bg-card p-6"
          >
            <h3 className="mb-2 font-display text-lg font-medium text-foreground">
              {f.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {f.body}
            </p>
          </div>
        ))}
      </SectionReveal>
    </main>
  );
}
