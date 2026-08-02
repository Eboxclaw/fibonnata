import { useEffect, useRef, useState } from "react";
import { SectionReveal } from "./SectionReveal";

const nodes = [
  { id: "raw", label: "RAW MEMORY", x: 10, y: 50 },
  { id: "discover", label: "DISCOVER", x: 30, y: 30 },
  { id: "store", label: "STORE", x: 30, y: 70 },
  { id: "query", label: "QUERY", x: 55, y: 50 },
  { id: "index", label: "INDEX", x: 75, y: 30 },
  { id: "expand", label: "EXPAND", x: 75, y: 70 },
  { id: "compile", label: "COMPILE", x: 90, y: 50 },
];

const links: [string, string][] = [
  ["raw", "discover"],
  ["raw", "store"],
  ["discover", "query"],
  ["store", "query"],
  ["query", "index"],
  ["query", "expand"],
  ["index", "compile"],
  ["expand", "compile"],
];

export function MemoryVisualization() {
  const [awake, setAwake] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setAwake(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <SectionReveal>
      <div
        ref={ref}
        className="rounded-xl border border-border/60 bg-card p-6 sm:p-10"
      >
        <h3 className="mb-6 font-display text-lg font-medium text-foreground">
          Memory wakes up on demand
        </h3>
        <svg viewBox="0 0 100 100" className="w-full overflow-visible" aria-hidden="true">
          {links.map(([a, b], i) => {
            const na = nodeMap.get(a)!;
            const nb = nodeMap.get(b)!;
            return (
              <line
                key={i}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke="currentColor"
                strokeWidth="0.4"
                className={`text-border transition-all duration-700 ${
                  awake ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              />
            );
          })}
          {nodes.map((n, i) => (
            <g key={n.id} transform={`translate(${n.x},${n.y})`}>
              <circle
                r="3"
                fill="currentColor"
                className={`transition-all duration-500 ${
                  awake ? "text-foreground" : "text-border"
                }`}
                style={{ transitionDelay: `${i * 120 + 200}ms` }}
              />
              <text y="5" x="4" fontSize="3.5" className="fill-muted-foreground font-mono">
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </SectionReveal>
  );
}
