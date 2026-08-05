import { SectionReveal } from "./SectionReveal";

const levels = [
  {
    level: "L1",
    method: "Direct load",
    when: "Identical architecture, identical dimensions",
    cost: "Zero",
  },
  {
    level: "L2",
    method: "SVD projection",
    when: "Same model family, different dimensions",
    cost: "~1 second, CPU",
  },
  {
    level: "L3",
    method: "Optimal transport",
    when: "Different families, structural overlap",
    cost: "~5 to 30 seconds, CPU",
  },
  {
    level: "L4",
    method: "Synthetic distillation",
    when: "No structural similarity",
    cost: "Requires GPU and generated data",
  },
];

export function AlignmentLevels() {
  return (
    <div>
      {/* Cards on small screens */}
      <div className="space-y-4 md:hidden">
        {levels.map((l, i) => (
          <SectionReveal key={l.level} delay={i * 80}>
            <div className="rounded-xl border border-border/60 bg-card p-5">
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-3">
                <span className="shrink-0 font-mono text-sm font-medium text-foreground">
                  {l.level}
                </span>
                <span className="min-w-0 font-display text-base text-foreground">
                  {l.method}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{l.when}</p>
              <p className="mt-2 font-mono text-xs text-muted-foreground">Cost: {l.cost}</p>
            </div>
          </SectionReveal>
        ))}
      </div>

      {/* Table from md up */}
      <SectionReveal className="hidden md:block">
        <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border/60">
                {["Level", "Method", "When it applies", "Cost"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-4 font-mono text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {levels.map((l) => (
                <tr key={l.level} className="border-b border-border/40 last:border-0">
                  <td className="px-5 py-4 font-mono text-sm text-foreground">{l.level}</td>
                  <td className="px-5 py-4 text-sm text-foreground">{l.method}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{l.when}</td>
                  <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                    {l.cost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionReveal>
    </div>
  );
}
