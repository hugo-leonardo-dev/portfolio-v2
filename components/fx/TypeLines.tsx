"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "@/hooks/useInView";

type Props = {
  lines: string[];
  prompt?: string;
  speed?: number;
  lineDelay?: number;
  className?: string;
};

export function TypeLines({ lines, prompt = "> ", speed = 28, lineDelay = 250, className }: Props) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState<string[]>(() => (reduced ? [...lines] : []));
  const ran = useRef(false);

  useEffect(() => {
    if (reduced) {
      setDisplayed([...lines]);
      return;
    }
    if (!inView || ran.current) return;
    ran.current = true;
    let lineIdx = 0;
    let charIdx = 0;
    const out: string[] = lines.map(() => "");
    setDisplayed([...out]);

    const step = () => {
      if (lineIdx >= lines.length) return;
      const target = lines[lineIdx];
      if (charIdx < target.length) {
        charIdx++;
        out[lineIdx] = target.slice(0, charIdx);
        setDisplayed([...out]);
        const ch = target[charIdx - 1];
        let wait = speed + (Math.random() * 16 - 8);
        if (".!?,;:".includes(ch)) wait += 100;
        setTimeout(step, Math.max(8, wait));
      } else {
        lineIdx++;
        charIdx = 0;
        if (lineIdx < lines.length) {
          setTimeout(() => {
            setActive(lineIdx);
            step();
          }, lineDelay);
        } else {
          setActive(-1);
        }
      }
    };
    setActive(0);
    setTimeout(step, 200);
  }, [inView, reduced, lines, speed, lineDelay]);

  return (
    <div ref={ref} className={className}>
      <span className="sr-only">{lines.join("\n")}</span>
      <div aria-hidden="true">
        {lines.map((l, i) => {
          const visible = reduced ? l : (displayed[i] ?? "");
          const isActive = !reduced && i === active && active !== -1;
          return (
            <div key={i} className="whitespace-pre-wrap">
              <span className="text-red">{prompt}</span>
              {visible}
              {isActive && <span className="cursor-blink text-cyan">█</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}