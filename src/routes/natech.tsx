import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";
import { FlowDiagram } from "@/components/FlowDiagram";
import { NatechArtifact } from "@/components/NatechArtifact";
import { SectionReveal } from "@/components/SectionReveal";

const structure = [
  { label: "8-byte header length", detail: "Standard safetensors prefix." },
  {
    label: "JSON header",
    detail:
      "Tensor index plus __metadata__.natech.talent: format, schema version, source fingerprint, binder, adaptation, alignment, provenance, role coverage.",
  },
  {
    label: "Tensor data",
    detail: "Role-based and contiguous, readable by any safetensors reader.",
  },
];

const roles = [
  "attention_query",
  "attention_key",
  "attention_value",
  "attention_output",
  "mlp_gate",
  "mlp_up_projection",
  "mlp_down_projection",
];

const fingerprint = [
  "architecture",
  "hidden size",
  "layer count",
  "attention heads",
  "key-value heads",
  "vocabulary size",
  "activation function",
  "normalization type",
  "RoPE base",
];

export const Route = createFileRoute("/natech")({
  component: NatechPage,
  head: () => ({
    meta: [
      { title: ".natech · Fibonnata talent file format" },
      {
        name: "description",
        content:
          "A .natech file is a portable, architecture-agnostic representation of a trained adapter, built on the safetensors container with role-based tensor names and a travelling model fingerprint.",
      },
      { property: "og:title", content: ".natech · Fibonnata talent file format" },
      {
        property: "og:description",
        content:
          "Role-based tensor names and a model fingerprint that travels with the file, inside a valid safetensors container.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://fibo-lazy-mind.lovable.app/natech" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://fibo-lazy-mind.lovable.app/natech" }],
  }),
});

function NatechPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-24">
      <SectionHeader
        eyebrow="The format"
        title="The .natech talent file."
        subtitle="A portable, architecture-agnostic representation of a trained adapter. It is built directly on the safetensors container format, not a bespoke binary layout: any existing safetensors reader can open one, and only tooling that understands the role taxonomy can use it for cross-model compilation."
      />

      <FlowDiagram steps={structure} title="File structure" alwaysVertical />
      <NatechArtifact />

      <div className="mt-12 grid gap-5 sm:gap-6 md:grid-cols-2">
        <SectionReveal>
          <div className="h-full rounded-xl border border-border/60 bg-card p-5 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Design choice 01
            </p>
            <h3 className="mt-3 font-display text-lg font-medium text-foreground sm:text-xl">
              Tensor names are roles, not source parameter paths.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A source adapter names its tensors after one model's modules —
              <span className="font-mono"> model.layers.4.self_attn.q_proj</span> — which
              means nothing on a different architecture. A .natech file renames every
              tensor to its role. Every transformer has something that plays each part,
              even where the module is called something else. A tensor a binder cannot
              resolve is kept and tagged <span className="font-mono">unmapped</span>,
              never dropped.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {roles.map((r) => (
                <li
                  key={r}
                  className="rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>

        <SectionReveal delay={100}>
          <div className="h-full rounded-xl border border-border/60 bg-card p-5 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Design choice 02
            </p>
            <h3 className="mt-3 font-display text-lg font-medium text-foreground sm:text-xl">
              The model fingerprint travels with the file.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Enough to know, before attempting any transfer, how similar a source and a
              target model actually are.
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {fingerprint.map((f) => (
                <li
                  key={f}
                  className="min-w-0 break-words font-mono text-xs text-muted-foreground"
                >
                  — {f}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </div>

      <SectionReveal className="mt-12">
        <div className="rounded-xl border border-dashed border-border bg-card p-6 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Provenance
          </p>
          <p className="mt-2 font-display text-lg font-medium text-foreground">
            License and attribution ship inside the file.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            So an adapter's origin stays traceable once it moves through a registry, not
            only when it is first made.
          </p>
        </div>
      </SectionReveal>
    </main>
  );
}
