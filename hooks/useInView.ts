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

    let obs: IntersectionObserver | null = null;
    let cancelled = false;
    let started = false;
    let poll: ReturnType<typeof setInterval> | undefined;

    const start = () => {
      if (cancelled || started) return;
      started = true;
      // fallback: if already in view on mount
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        setInView(true);
        return;
      }
      obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs?.disconnect();
        }
      }, opts.current ?? { threshold: 0.2 });
      obs.observe(el);
    };

    // The intro hides the page with visibility:hidden, which still has layout.
    // Without this guard every inView animation finishes behind the overlay
    // before the visitor sees it. Defer the first observation until handoff.
    if (document.documentElement.classList.contains("intro-pending")) {
      const onDone = () => start();
      window.addEventListener("intro:done", onDone, { once: true });
      // Safety net in case the intro unmounts without dispatching the event.
      poll = setInterval(() => {
        if (!document.documentElement.classList.contains("intro-pending")) {
          clearInterval(poll);
          start();
        }
      }, 300);

      return () => {
        cancelled = true;
        window.removeEventListener("intro:done", onDone);
        if (poll) clearInterval(poll);
        obs?.disconnect();
      };
    }

    start();
    return () => {
      cancelled = true;
      obs?.disconnect();
    };
  }, []);

  return { ref, inView };
}
