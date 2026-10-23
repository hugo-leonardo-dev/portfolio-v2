"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Intensity = "low" | "medium" | "high";
type Effect = "rgb" | "slice" | "flicker" | "corrupt";

export function useGlitch(intensity: Intensity = "low") {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const [effect, setEffect] = useState<Effect>("slice");
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);

  const fire = useCallback(
    (e?: Effect, dur = 160) => {
      if (reduced) return;
      const eff = e ?? (["slice", "flicker", "rgb"] as Effect[])[Math.floor(Math.random() * 3)];
      setEffect(eff);
      setActive(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setActive(false), dur);
    },
    [reduced]
  );

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const schedule = () => {
      const delay = 5000 + Math.random() * 10000;
      const t = setTimeout(() => {
        if (cancelled) return;
        const eff = (["slice", "flicker", "rgb"] as Effect[])[Math.floor(Math.random() * 3)];
        fire(eff, 150);
        schedule();
      }, delay);
      return t;
    };
    const t = schedule();
    const onStorm = () => fire("slice", 300);
    window.addEventListener("glitch-storm", onStorm);
    return () => {
      cancelled = true;
      clearTimeout(t);
      clearTimeout(timer.current);
      window.removeEventListener("glitch-storm", onStorm);
    };
  }, [reduced, fire]);

  return { active, effect, fire };
}

export function Glitch({
  children,
  intensity = "low",
  className,
  as: Tag = "span",
  dataText,
}: {
  children: React.ReactNode;
  intensity?: Intensity;
  className?: string;
  as?: React.ElementType;
  dataText?: string;
}) {
  const { active, effect, fire } = useGlitch(intensity);
  const reduced = useReducedMotion();

  const handleEnter = () => {
    if (reduced) return;
    fire("rgb", 180);
  };
  const handleClick = () => {
    if (reduced) return;
    fire("slice", 200);
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 200);
  };

  const effectClass = active ? `glitch-${effect}` : "";

  return (
    <Tag
      className={cn("relative inline-block", effectClass, className)}
      onMouseEnter={handleEnter}
      onClick={handleClick}
      data-text={dataText}
    >
      {children}
    </Tag>
  );
}