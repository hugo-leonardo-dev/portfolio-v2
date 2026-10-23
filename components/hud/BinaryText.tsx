"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function BinaryText({ rows = 4, cols = 24 }: { rows?: number; cols?: number }) {
  const reduced = useReducedMotion();
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    setLines(
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => (Math.random() > 0.5 ? "1" : "0")).join("")
      )
    );
    if (reduced) return;
    let cancelled = false;
    const flip = () => {
      if (cancelled || document.hidden) return;
      setLines((prev) => {
        if (prev.length === 0) return prev;
        const next = [...prev];
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        const arr = next[r].split("");
        arr[c] = arr[c] === "1" ? "0" : "1";
        next[r] = arr.join("");
        return next;
      });
    };
    const schedule = () => {
      if (cancelled) return;
      const delay = 400 + Math.random() * 400;
      const t = setTimeout(() => {
        flip();
        schedule();
      }, delay);
      return t;
    };
    const t = schedule();
    return () => {
      cancelled = true;
      if (t) clearTimeout(t);
    };
  }, [reduced, rows, cols]);

  return (
    <div aria-hidden="true" className="font-mono text-[9px] leading-tight text-red/70 select-none">
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
  );
}