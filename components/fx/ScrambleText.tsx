"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "@/hooks/useInView";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&アカサタナハマヤラワ";

type Props = {
  text: string;
  trigger?: "mount" | "hover" | "inView";
  duration?: number;
  delay?: number;
  className?: string;
};

export function ScrambleText({ text, trigger = "inView", duration = 600, delay = 0, className }: Props) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.2 });
  const [display, setDisplay] = useState(text);
  const ran = useRef(false);

  const run = () => {
    if (reduced) {
      setDisplay(text);
      return;
    }
    const steps = Math.ceil(duration / 40);
    let step = 0;
    const id = setInterval(() => {
      step++;
      const progress = step / steps;
      const out = text
        .split("")
        .map((c, i) => {
          if (c === " ") return " ";
          if (i / text.length < progress) return c;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setDisplay(out);
      if (step >= steps) {
        clearInterval(id);
        setDisplay(text);
      }
    }, 40);
  };

  useEffect(() => {
    if (trigger === "mount") {
      const t = setTimeout(() => { ran.current = true; run(); }, delay);
      return () => clearTimeout(t);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (trigger === "inView" && inView && !ran.current) {
      ran.current = true;
      const t = setTimeout(run, delay);
      return () => clearTimeout(t);
    }
  }, [inView, trigger]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEnter = () => {
    run();
  };

  return (
    <span ref={ref} className={className} onMouseEnter={handleEnter}>
      {display}
    </span>
  );
}