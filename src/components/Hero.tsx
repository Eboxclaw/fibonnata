import { Link } from "@tanstack/react-router";
import { FibonacciCloud } from "./FibonacciCloud";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24 pb-16">
      <div className="absolute inset-0 -z-10">
        <FibonacciCloud />
      </div>

      <div className="mx-auto max-w-6xl">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          FiboNNata · AI systems infrastructure
        </p>

        <h1 className="max-w-4xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl text-balance">
          Intelligence
          <br />
          shouldn't need
          <br />
          everything.
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          We are building infrastructure for AI systems that can learn
          selectively, remember efficiently, and compute only what matters.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/fibo"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Explore .fibo
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
