import { useEffect, useRef, useState } from "react";
import { SectionReveal } from "./SectionReveal";

export interface FlowStep {
  label: string;
  detail?: string;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  title?: string;
  /** Force the vertical (stacked) rendering at every breakpoint. */
  alwaysVertical?: boolean;
}

/**
 * Responsive pipeline diagram. Stacks vertically with a connecting rail on
 * small screens, and flows horizontally from `md` upwards.
 */
export function FlowDiagram({ steps, title, alwaysVertical = false }: FlowDiagramProps) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          let progress = 0;
          interval = setInterval(() => {
            progress += 1;
            setActive(Math.min(progress, steps.length - 1));
            if (progress >= steps.length - 1 && interval) clearInterval(interval);
          }, 320);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => {
      if (interval) clearInterval(interval);
      observer.disconnect();
    };
  }, [steps.length]);

  return (
    <SectionReveal>
      <div
        ref={ref}
        className="rounded-xl border border-border/60 bg-card p-5 sm:p-8"
      >
        {title && (
          <h3 className="mb-8 font-display text-lg font-medium text-foreground sm:text-xl">
            {title}
          </h3>
        )}

        <ol
          className={
            alwaysVertical
              ? "flex flex-col gap-6"
              : "flex flex-col gap-6 md:grid md:auto-cols-fr md:grid-flow-col md:gap-4"
          }
        >
          {steps.map((step, i) => (
            <li
              key={step.label + i}
              className={
                alwaysVertical
                  ? "grid grid-cols-[auto_minmax(0,1fr)] gap-4"
                  : "grid grid-cols-[auto_minmax(0,1fr)] gap-4 md:block md:min-w-0"
              }
            >
              <div className="flex flex-col items-center md:block">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-colors duration-500 ${
                    i <= active
                      ? "border-foreground bg-foreground text-primary-foreground"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {!alwaysVertical && i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`mt-2 w-px flex-1 bg-border md:mt-0 md:hidden`}
                  />
                )}
                {alwaysVertical && i < steps.length - 1 && (
                  <span aria-hidden="true" className="mt-2 w-px flex-1 bg-border" />
                )}
              </div>

              <div className="min-w-0 pb-2 md:mt-4">
                <p
                  className={`font-mono text-sm font-medium break-words transition-colors duration-500 ${
                    i <= active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </p>
                {step.detail && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-xs">
                    {step.detail}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SectionReveal>
  );
}
