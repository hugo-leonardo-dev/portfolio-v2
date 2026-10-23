"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const GLYPHS = "#%$01&X";

type Props = {
  text: string;
  /** How long the scramble runs before settling on the original text. */
  duration?: number;
  className?: string;
  /**
   * "self" listens on the text itself.
   * "parent" listens on the closest <a>/<button> so the whole control reacts.
   */
  hoverScope?: "self" | "parent";
};

/**
 * Text scramble on hover. Starts with the real text (SSR-safe), then replaces
 * characters with random glyphs for `duration` ms, revealing the original
 * left-to-right. No animation runs on mount, so nothing flashes on load.
 */
export function ScrambleReveal({
  text,
  duration = 300,
  className,
  hoverScope = "self",
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const running = useRef(false);

  const scramble = useCallback(() => {
    if (reduced || running.current || !text) return;
    running.current = true;
    const start = performance.now();
    const total = text.length;

    intervalRef.current = setInterval(() => {
      const progress = Math.min(1, (performance.now() - start) / duration);
      const revealed = Math.floor(progress * total);

      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            // Keep spaces and already-revealed characters intact.
            if (ch === " " || i < revealed) return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (progress >= 1) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        running.current = false;
        setDisplay(text);
      }
    }, 30);
  }, [duration, reduced, text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const target =
      hoverScope === "parent"
        ? (el.closest("a, button, [data-scramble-scope]") ?? el)
        : el;

    const onEnter = () => scramble();
    target.addEventListener("mouseenter", onEnter);
    target.addEventListener("focus", onEnter);
    return () => {
      target.removeEventListener("mouseenter", onEnter);
      target.removeEventListener("focus", onEnter);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hoverScope, scramble]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
