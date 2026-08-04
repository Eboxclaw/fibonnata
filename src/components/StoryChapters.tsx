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
    title: "It starts as one neuron.",
    body: "A single unit, no history, no context window to carry. Intelligence does not have to begin large — it has to begin able to change.",
  },
  {
    index: "02",
    title: "Actions become vectors.",
    body: "What the system does gets captured and vectorized rather than replayed. Experience compacts into structure instead of piling up in the prompt.",
  },
  {
    index: "03",
    title: "It eats adapters.",
    body: "Trained LoRAs and adapters arrive as portable .natech talent files. Each one is absorbed into the organism as a capability, not a retraining run.",
  },
  {
    index: "04",
    title: "Fusion, not accumulation.",
    body: "Up to three talent files fuse into one. The result is denser and more capable — bulkier in ability, still small on disk and in memory.",
  },
  {
    index: "05",
    title: "Zero context tax.",
    body: "What it learned lives in the weights and in Lazy Memory, not in the context window. It stays memory-ready and pays nothing per token to remember.",
  },
];

export function StoryChapters() {


  return (
    <div ref={ref} className="relative">
      <div className="pointer-events-none sticky top-0 -z-10 h-svh w-full overflow-hidden">
        <OrganismScene progress={progress} className="absolute inset-0 h-full w-full" />
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
              className={`w-full max-w-md rounded-xl border border-border/50 bg-background/70 p-6 backdrop-blur-sm sm:p-8 ${
                i % 2 === 1 ? "sm:ml-auto" : ""
              }`}
              style={{
                transform: `translateY(${(progress - (i + 0.5) / chapters.length) * -40}px)`,
              }}
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
});
