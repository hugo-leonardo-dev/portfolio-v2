"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "@/hooks/useInView";

type Props = {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: string;
  keepCursor?: boolean;
  onDone?: () => void;
  as?: React.ElementType;
  className?: string;
  trigger?: "inView" | "mount" | "hover";
};

export function TypeWriter({
  text,
  speed = 32,
  delay = 0,
  cursor = "█",
  keepCursor = true,
  onDone,
  as: Tag = "span",
  className,
  trigger = "inView",
}: Props) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.15 });
  const [displayed, setDisplayed] = useState(reduced ? text : "");
  const [done, setDone] = useState(reduced);
  const ran = useRef(false);

  const run = () => {
    if (reduced || ran.current) return;
    ran.current = true;
    let i = 0;
    let cancelled = false;
    const step = () => {
      if (cancelled) return;
      if (i >= text.length) {
        setDone(true);
        onDone?.();
        return;
      }
      i++;
      setDisplayed(text.slice(0, i));
      const ch = text[i - 1];
      let wait = speed + (Math.random() * 20 - 10);
      if (ch === "\n") wait += 200;
      else if (".!?,;:".includes(ch)) wait += 120;
      setTimeout(step, Math.max(8, wait));
    };
    const t = setTimeout(step, delay);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  };

  useEffect(() => {
    if (reduced) {
      setDisplayed(text);
      setDone(true);
      return;
    }
    if (trigger === "mount") {
      const cleanup = run();
      return cleanup;
    }
    if (trigger === "inView" && inView) {
      const cleanup = run();
      return cleanup;
    }
  }, [inView, reduced, text, speed, delay, onDone, trigger]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEnter = () => {
    if (trigger === "hover") run();
  };

  return (
    <Tag ref={ref} className={className} style={{ position: "relative", display: "inline-block" }} onMouseEnter={handleEnter}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" style={{ opacity: 0, pointerEvents: "none", userSelect: "none" }}>
        {text}
      </span>
      <span aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
        {displayed}
        {(!done || keepCursor) && <span className="cursor-blink text-cyan">{cursor}</span>}
      </span>
    </Tag>
  );
}