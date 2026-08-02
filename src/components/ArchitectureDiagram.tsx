import { useEffect, useRef, useState } from "react";
import { SectionReveal } from "./SectionReveal";

interface Step {
  label: string;
  detail?: string;
}

interface ArchitectureDiagramProps {
  steps: Step[];
  title?: string;
}

export function ArchitectureDiagram({
  steps,
  title,
}: ArchitectureDiagramProps) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let progress = 0;
          const interval = setInterval(() => {
            progress += 1;
            setActive((prev) => {
              const next = Math.min(progress, steps.length - 1);
              if (next === prev) return prev;
              return next;
            });
            if (progress >= steps.length - 1) {
              clearInterval(interval);
            }
          }, 400);
          observer.disconnect();
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <SectionReveal>
      <div
        ref={ref}
        className="rounded-xl border border-border/60 bg-card p-6 sm:p-10"
      >
        {title && (
          <h3 className="mb-10 font-display text-xl font-medium text-foreground">
            {title}
          </h3>
        )}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-none lg:flex lg:flex-wrap lg:items-start lg:gap-4">
          {steps.map((step, i) => (
            <div key={i} className="flex min-w-[140px] flex-1 flex-col items-start">
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm transition-colors duration-500 ${
                  i <= active
                    ? "border-foreground bg-foreground text-primary-foreground"
                    : "border-border bg-background text-muted-foreground"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <p
                className={`font-mono text-sm font-medium transition-colors duration-500 ${
                  i <= active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </p>
              {step.detail && (
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
