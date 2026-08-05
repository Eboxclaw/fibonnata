import { useEffect, useRef } from "react";
import { OrganismScene } from "./organism/OrganismScene";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

interface Chapter {
  index: string;
  title: string;
  body: string;
}

const chapters: Chapter[] = [
  {
    index: "01",
    title: "It starts with any agent.",
    body: "No fixed base model, no privileged runtime. Neurons come online one by one as the agent works, and the organism starts from whatever is already running.",
  },
  {
    index: "02",
    title: "Actions become vectors.",
    body: "Interactions, corrections and semantic memory are vectorized instead of replayed. Those vectors are what later become VeTas: talent, captured as structure.",
  },
  {
    index: "03",
    title: "VeTas and LoRAs travel together.",
    body: "A VeTa can be wrapped with a LoRA and used with existing adapters, unified in a single QAM. One artifact, one loader, no bespoke plumbing per engine.",
  },
  {
    index: "04",
    title: "Accumulate, equip, merge.",
    body: "Collect talents over time, equip the ones a task needs, merge them when they help each other, and carry the result anywhere. Nothing is retrained to get there.",
  },
  {
    index: "05",
    title: "Zero context tax.",
    body: "What the system learned lives in weights and in Lazy Memory, not in the context window. It stays memory ready and pays nothing per token to remember.",
  },
];

export function StoryChapters() {
  const { ref, subscribe } = useScrollProgress<HTMLDivElement>();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    return subscribe((p) => {
      const n = chapters.length;
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        el.style.setProperty("--shift", `${(p - (i + 0.5) / n) * -40}px`);
      });
    });
  }, [subscribe]);

  return (
    <div ref={ref} className="relative">
      <div className="pointer-events-none sticky top-0 -z-10 h-svh w-full overflow-hidden">
        <OrganismScene subscribe={subscribe} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="-mt-svh">
        {chapters.map((c, i) => (
          <section
            key={c.index}
            className="mx-auto flex min-h-svh max-w-6xl items-center px-5 sm:px-6"
          >
            <div
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className={`w-full max-w-md rounded-xl border border-border/50 bg-background/70 p-6 backdrop-blur-sm will-change-transform sm:p-8 ${
                i % 2 === 1 ? "sm:ml-auto" : ""
              }`}
              style={{ transform: "translateY(var(--shift, 0px))" }}
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:text-xs">
                Chapter {c.index}
              </p>
              <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-foreground text-balance sm:text-3xl">
                {c.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {c.body}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
