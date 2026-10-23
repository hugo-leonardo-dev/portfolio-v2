"use client";
import { useEffect, useRef, useState } from "react";

export function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const opts = useRef(options);
  opts.current = options;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, opts.current ?? { threshold: 0.2 });
    obs.observe(el);
    // fallback: if already in view on mount
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setInView(true);
      obs.disconnect();
      return;
    }
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}