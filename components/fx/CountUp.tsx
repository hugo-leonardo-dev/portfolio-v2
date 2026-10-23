"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "@/hooks/useInView";

type Props = {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
};

export function CountUp({ to, duration = 1200, suffix = "", className }: Props) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.1 });
  const [value, setValue] = useState(reduced ? to : 0);
  const ran = useRef(false);

  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }
    if (ran.current) return;
    if (!inView) return;
    ran.current = true;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, duration]);

  // fallback: animate even if inView never fires
  useEffect(() => {
    if (reduced || ran.current) return;
    const t = setTimeout(() => {
      if (ran.current) return;
      ran.current = true;
      const start = performance.now();
      let raf = 0;
      const tick = (now: number) => {
        const tt = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - tt, 3);
        setValue(Math.round(eased * to));
        if (tt < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, 600);
    return () => clearTimeout(t);
  }, [reduced, to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}