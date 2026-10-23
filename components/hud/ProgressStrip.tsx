"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function ProgressStrip({
  label = "SCANNING",
  duration = 1800,
}: {
  label?: string;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? 100 : 0);
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setValue(100);
      setDone(true);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(t * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, duration]);

  return (
    <div className="flex items-center gap-3 text-[10px] tracking-widest">
      <span className="text-cyan-dim">{label}</span>
      <div className="relative h-1.5 flex-1 bg-panel border border-red-deep overflow-hidden">
        <div
          className="relative h-full bg-cyan transition-[width] duration-75 overflow-hidden"
          style={{ width: `${value}%` }}
        >
          {value > 0 && <span className="bar-shimmer" aria-hidden />}
        </div>
      </div>
      <span className="text-cyan">{done ? "ACCESS GRANTED" : `${value}%`}</span>
    </div>
  );
}