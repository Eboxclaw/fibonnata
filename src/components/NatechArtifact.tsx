import { SectionReveal } from "./SectionReveal";

export function NatechArtifact() {
  return (
    <SectionReveal className="flex justify-center py-12 sm:py-16">
      <div className="relative h-56 w-56 sm:h-80 sm:w-80">
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full animate-drift text-foreground"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="artifactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#artifactGrad)" strokeWidth="0.75">
            <circle cx="100" cy="100" r="40" className="animate-pulse-slow" />
            <circle cx="100" cy="100" r="70" opacity="0.6" />
            <circle cx="100" cy="100" r="95" opacity="0.3" />
            <rect x="70" y="70" width="60" height="60" transform="rotate(45 100 100)" />
            <polygon
              points="100,30 130,85 190,85 140,120 160,175 100,140 40,175 60,120 10,85 70,85"
              opacity="0.4"
            />
          </g>
        </svg>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full whitespace-nowrap rounded-full border border-border bg-background px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          .natech talent file
        </div>
      </div>
    </SectionReveal>
  );
}
