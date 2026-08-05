import { useCallback, useEffect, useRef } from "react";

export type ProgressSubscriber = (progress: number) => void;

/**
 * Tracks how far the user has scrolled through a given element,
 * from 0 (element top hits viewport top) to 1 (element bottom hits viewport bottom).
 *
 * Progress is published through subscribers and a ref rather than React state,
 * so scrolling never triggers a re-render.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const progressRef = useRef(0);
  const subsRef = useRef<Set<ProgressSubscriber>>(new Set());

  const subscribe = useCallback((fn: ProgressSubscriber) => {
    subsRef.current.add(fn);
    fn(progressRef.current);
    return () => {
      subsRef.current.delete(fn);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let rect = el.getBoundingClientRect();
    let scrollY = window.scrollY;

    const measure = () => {
      const box = el.getBoundingClientRect();
      scrollY = window.scrollY;
      rect = box;
    };

    const publish = () => {
      raf = 0;
      const top = rect.top + scrollY - window.scrollY;
      const total = rect.height - window.innerHeight;
      const p =
        total <= 0 ? (top <= 0 ? 1 : 0) : Math.min(1, Math.max(0, -top / total));
      if (Math.abs(p - progressRef.current) < 0.0005) return;
      progressRef.current = p;
      for (const fn of subsRef.current) fn(p);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(publish);
    };

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        measure();
        progressRef.current = -1;
        onScroll();
      }, 120);
    };

    measure();
    progressRef.current = -1;
    publish();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { ref, progressRef, subscribe };
}
