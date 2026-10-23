"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { bootLines } from "@/lib/data";

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      onComplete();
      return;
    }
    if (typeof window !== "undefined" && sessionStorage.getItem("booted") === "1") {
      onComplete();
      return;
    }
    let i = 0;
    const timers: number[] = [];
    const run = () => {
      if (i < bootLines.length) {
        setShown((s) => [...s, bootLines[i]]);
        i++;
        timers.push(window.setTimeout(run, 420));
      } else {
        timers.push(window.setTimeout(() => {
          setDone(true);
          sessionStorage.setItem("booted", "1");
          onComplete();
        }, 600));
      }
    };
    timers.push(window.setTimeout(run, 300));
    const skip = () => {
      timers.forEach(clearTimeout);
      sessionStorage.setItem("booted", "1");
      onComplete();
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
  }, [reduced, onComplete]);

  if (reduced) return null;

  return (
    <div className="fixed inset-0 z-50 bg-bg flex items-center justify-center p-6">
      <div className="w-full max-w-2xl font-mono text-sm">
        <div className="text-muted text-xs mb-4 tracking-widest">SYS://BOOT</div>
        {shown.map((l, idx) => (
          <div key={idx} className="text-fg">
            <span className="text-accent">&gt;</span> {l}
          </div>
        ))}
        {!done && <span className="cursor-blink text-accent">█</span>}
        <div className="mt-6 text-muted text-xs tracking-widest">[ click or press any key to skip ]</div>
      </div>
    </div>
  );
}