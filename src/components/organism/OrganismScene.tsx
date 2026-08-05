import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { ProgressSubscriber } from "@/hooks/use-scroll-progress";
import type { OrganismHandle } from "./scene";

interface OrganismSceneProps {
  /** static 0 -> 1 story progress */
  progress?: number;
  /** live progress feed, avoids re-rendering on scroll */
  subscribe?: (fn: ProgressSubscriber) => () => void;
  className?: string;
}

async function pickBackend(): Promise<"webgpu" | "webgl" | "none"> {
  const gpu = (navigator as Navigator & { gpu?: { requestAdapter: () => Promise<unknown> } })
    .gpu;
  if (gpu) {
    try {
      const adapter = await gpu.requestAdapter();
      if (adapter) return "webgpu";
    } catch {
      /* fall through to webgl */
    }
  }
  const test = document.createElement("canvas");
  const ctx = test.getContext("webgl") || test.getContext("experimental-webgl");
  return ctx ? "webgl" : "none";
}

export function OrganismScene({
  progress = 0,
  subscribe,
  className = "",
}: OrganismSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<OrganismHandle | null>(null);
  const [fallback, setFallback] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mounted = true;
    let dispose = () => {};

    const boot = async () => {
      let backend = await pickBackend();
      if (!mounted) return;
      if (backend === "none") {
        setFallback(true);
        return;
      }

      const mod = await import("./scene");
      let handle: OrganismHandle | null = null;

      if (backend === "webgpu") {
        try {
          const [THREE, tsl] = await Promise.all([
            import("three/webgpu"),
            import("three/tsl"),
          ]);
          if (!mounted || !containerRef.current) return;
          handle = await mod.createOrganism(
            containerRef.current,
            THREE as unknown as typeof import("three"),
            { reducedMotion: reduced, gpu: { tsl } }
          );
        } catch {
          backend = "webgl";
        }
      }

      if (!handle) {
        try {
          const THREE = await import("three");
          if (!mounted || !containerRef.current) return;
          handle = await mod.createOrganism(containerRef.current, THREE, {
            reducedMotion: reduced,
          });
        } catch {
          setFallback(true);
          return;
        }
      }

      if (!mounted || !containerRef.current) {
        handle.dispose();
        return;
      }

      handleRef.current = handle;
      handle.setProgress(progress);

      const onResize = () => handle!.resize();
      let visible = true;
      const syncActive = () => handle!.setActive(visible && !document.hidden);
      const onVisibility = () => syncActive();
      const onPointer = (e: PointerEvent) => {
        handle!.setPointer(
          (e.clientX / window.innerWidth - 0.5) * 2,
          (e.clientY / window.innerHeight - 0.5) * 2
        );
      };
      const isTouch = window.matchMedia("(pointer: coarse)").matches;

      window.addEventListener("resize", onResize);
      const ro = new ResizeObserver(onResize);
      ro.observe(containerRef.current);
      onResize();

      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry?.isIntersecting ?? true;
          syncActive();
        },
        { rootMargin: "10% 0px" }
      );
      io.observe(containerRef.current);

      document.addEventListener("visibilitychange", onVisibility);
      if (!isTouch) window.addEventListener("pointermove", onPointer, { passive: true });

      const unsubscribe = subscribe?.((p) => handle!.setProgress(p));

      dispose = () => {
        unsubscribe?.();
        window.removeEventListener("resize", onResize);
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("pointermove", onPointer);
        handle!.dispose();
        handleRef.current = null;
      };
    };

    void boot();

    return () => {
      mounted = false;
      dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, subscribe]);

  useEffect(() => {
    if (!subscribe) handleRef.current?.setProgress(progress);
  }, [progress, subscribe]);

  if (fallback) return <OrganismFallback progress={progress} className={className} />;

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}

function OrganismFallback({
  progress,
  className = "",
}: {
  progress: number;
  className?: string;
}) {
  const count = 160;
  const phi = Math.PI * (3 - Math.sqrt(5));
  const scale = 0.35 + 0.65 * progress;
  const pts = Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    return { x: Math.cos(theta) * r * scale, y: y * scale, o: i / count <= progress };
  });

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="-1.2 -1.2 2.4 2.4" className="h-full w-full opacity-40">
        {pts.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={0.012}
            fill="currentColor"
            className="text-steel"
            opacity={p.o ? 0.8 : 0}
          />
        ))}
      </svg>
    </div>
  );
}
