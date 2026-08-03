import { useEffect, useRef, useState } from "react";
import { SectionReveal } from "./SectionReveal";

const nodes = [
  { id: "raw", label: "RAW LOG", x: 10, y: 50 },
  { id: "entities", label: "ENTITIES", x: 32, y: 26 },
  { id: "relations", label: "RELATIONS", x: 32, y: 74 },
  { id: "graph", label: "GRAPH", x: 55, y: 50 },
  { id: "walk", label: "SUBGRAPH WALK", x: 76, y: 26 },
  { id: "deferred", label: "LIVE RETRIEVAL (DEFERRED)", x: 76, y: 74 },
  { id: "dataset", label: "DATASET", x: 92, y: 50 },
];

const links: [string, string][] = [
  ["raw", "entities"],
  ["raw", "relations"],
  ["entities", "graph"],
  ["relations", "graph"],
  ["graph", "walk"],
  ["graph", "deferred"],
  ["walk", "dataset"],
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
        className="rounded-xl border border-border/60 bg-card p-5 sm:p-8"
      >
        <h3 className="mb-6 font-display text-base font-medium text-foreground sm:text-lg">
          A graph derived from what accumulates
        </h3>
        <svg
          viewBox="0 0 100 100"
          className="w-full overflow-visible"
          aria-hidden="true"
        >
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
                strokeDasharray={b === "deferred" ? "2 2" : undefined}
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
                r={n.id === "deferred" ? 2 : 3}
                fill="currentColor"
                className={`transition-all duration-500 ${
                  awake && n.id !== "deferred" ? "text-foreground" : "text-border"
                }`}
                style={{ transitionDelay: `${i * 120 + 200}ms` }}
              />
              <text
                y={n.y > 60 ? 8 : -5}
                x={n.x > 80 ? -4 : 4}
                textAnchor={n.x > 80 ? "end" : "start"}
                fontSize="3.2"
                className="fill-muted-foreground font-mono"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </SectionReveal>
  );
}
