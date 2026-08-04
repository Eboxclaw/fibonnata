import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { OrganismHandle } from "./scene";

interface OrganismSceneProps {
  /** 0 -> 1 story progress */
  progress: number;
  className?: string;
}

export function OrganismScene({ progress, className = "" }: OrganismSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<OrganismHandle | null>(null);
  const [fallback, setFallback] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const test = document.createElement("canvas");
    const gl = test.getContext("webgl") || test.getContext("experimental-webgl");
    if (!gl) {
      setFallback(true);
      return;
    }

    let mounted = true;
    let dispose = () => {};

    void Promise.all([import("three"), import("./scene")]).then(
      ([THREE, mod]) => {
        if (!mounted || !containerRef.current) return;
        const handle = mod.createOrganism(containerRef.current, THREE, {
          reducedMotion: reduced,
        });
        handleRef.current = handle;

        const onResize = () => handle.resize();
        const onVisibility = () => handle.setActive(!document.hidden);
        const onPointer = (e: PointerEvent) => {
          handle.setPointer(
            (e.clientX / window.innerWidth - 0.5) * 2,
            (e.clientY / window.innerHeight - 0.5) * 2
          );
        };
        const isTouch = window.matchMedia("(pointer: coarse)").matches;

        window.addEventListener("resize", onResize);
        const ro = new ResizeObserver(onResize);
        ro.observe(containerRef.current);
        onResize();

        document.addEventListener("visibilitychange", onVisibility);
        if (!isTouch) window.addEventListener("pointermove", onPointer);

        dispose = () => {
          window.removeEventListener("resize", onResize);
          ro.disconnect();

          document.removeEventListener("visibilitychange", onVisibility);
          window.removeEventListener("pointermove", onPointer);
          handle.dispose();
          handleRef.current = null;
        };
      }
    );

    return () => {
      mounted = false;
      dispose();
    };
  }, [reduced]);

  useEffect(() => {
    handleRef.current?.setProgress(progress);
  }, [progress]);

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
            r={0.01}
            fill="currentColor"
            className="text-steel"
            opacity={p.o ? 0.8 : 0}
          />
        ))}
      </svg>
    </div>
  );
}
