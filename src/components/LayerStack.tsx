import { SectionReveal } from "./SectionReveal";

export interface StackLayer {
  name: string;
  tech: string;
  items: string[];
}

export function LayerStack({ layers }: { layers: StackLayer[] }) {
  return (
    <div className="space-y-4">
      {layers.map((layer, i) => (
        <SectionReveal key={layer.name} delay={i * 60}>
          <div className="rounded-xl border border-border/60 bg-card p-5 transition-colors hover:border-foreground/30 sm:p-6">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 sm:flex sm:flex-wrap sm:justify-between">
              <h3 className="min-w-0 truncate font-display text-base font-medium text-foreground sm:text-lg">
                {layer.name}
              </h3>
              <p className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {layer.tech}
              </p>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {layer.items.map((item) => (
                <li
                  key={item}
                  className="min-w-0 break-words font-mono text-xs leading-relaxed text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      ))}
    </div>
  );
}
