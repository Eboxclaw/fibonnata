import { SectionReveal } from "./SectionReveal";

const items = [
  {
    title: "Selective learning",
    body: "Models should add only what they need, not retrain on everything.",
  },
  {
    title: "Lazy indexing",
    body: "Indexes emerge from real queries, not speculative preprocessing.",
  },
  {
    title: "Portable primitives",
    body: "Capabilities compiled into forms that move across runtimes.",
  },
  {
    title: "Composable memory",
    body: "Structured, semantic, lexical, and temporal memory as one system.",
  },
];

export function ResearchGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((item, i) => (
        <SectionReveal key={item.title} delay={i * 100}>
          <div className="rounded-xl border border-border/60 bg-card p-6 transition-transform duration-300 hover:-translate-y-1">
            <p className="mb-3 font-mono text-xs text-muted-foreground">
              0{i + 1}
            </p>
            <h3 className="mb-2 font-display text-lg font-medium text-foreground">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </div>
        </SectionReveal>
      ))}
    </div>
  );
}
