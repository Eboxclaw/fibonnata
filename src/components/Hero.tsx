import { Link } from "@tanstack/react-router";
import { OrganismScene } from "./organism/OrganismScene";

export function Hero() {
  return (
    <section className="relative flex min-h-[88svh] flex-col justify-center overflow-hidden px-5 pt-28 pb-16 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <OrganismScene progress={0.06} className="absolute inset-0 h-full w-full" />
      </div>


      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:text-xs">
          Fibonnata · portable adaptation layer · local-first runtime
        </p>

        <h1 className="max-w-4xl font-display font-medium leading-[1.05] tracking-tight text-foreground text-balance text-[clamp(2.25rem,9vw,5.5rem)]">
          An adapter should
          <br />
          outlive the model
          <br />
          it was trained on.
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Fibonnata is a portable adaptation layer for small language models: an
          architecture-agnostic file format for trained adapters, a small set of
          operations for combining and retargeting them, and middleware that wraps
          existing inference engines rather than replacing them.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Link
            to="/natech"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            The .natech format
          </Link>
          <Link
            to="/sdk"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Fibonnata SDK
          </Link>
        </div>
      </div>
    </section>
  );
}
