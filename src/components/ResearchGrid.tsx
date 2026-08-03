import { SectionReveal } from "./SectionReveal";

const items = [
  {
    title: "Adapters are locked to one architecture",
    body: "A LoRA trained against one model is tied to its parameter names, hidden dimensions, and attention layout. Moving it means retraining from scratch.",
  },
  {
    title: "Formats don't read each other",
    body: "PEFT safetensors folders, Diffusers single-file, GGUF, MLX. Tooling that reads one rarely reads another.",
  },
  {
    title: "The useful work already exists",
    body: "Most adapters worth having were trained once, shipped in one format, and are unusable anywhere else.",
  },
  {
    title: "The adapter is the durable asset",
    body: "The base model is interchangeable infrastructure. The adapter is the thing worth making portable.",
  },
];

export function ResearchGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
      {items.map((item, i) => (
        <SectionReveal key={item.title} delay={i * 100}>
          <div className="h-full rounded-xl border border-border/60 bg-card p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6">
            <p className="mb-3 font-mono text-xs text-muted-foreground">
              0{i + 1}
            </p>
            <h3 className="mb-2 font-display text-base font-medium text-foreground sm:text-lg">
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
