"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  /**
   * Renders the typed text in normal flow instead of the hidden clone +
   * absolute overlay. Use it for headings that may wrap: the line height then
   * grows with the text instead of overprinting the next element.
   */
  flow?: boolean;
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
  flow = false,
}: Props) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.15 });
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  // Keeps the timer of the current run so a new run (or StrictMode's cleanup)
  // can cancel it instead of leaving a stale typing loop behind.
  const cancelRef = useRef<(() => void) | null>(null);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  const run = useCallback(() => {
    if (reduced) return;
    cancelRef.current?.();

    let i = 0;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      if (cancelled) return;
      if (i >= text.length) {
        setDone(true);
        onDoneRef.current?.();
        return;
      }
      i++;
      setDisplayed(text.slice(0, i));
      const ch = text[i - 1];
      let wait = speed + (Math.random() * 20 - 10);
      if (ch === "\n") wait += 100;
      else if (".!?,;:".includes(ch)) wait += 60;
      timer = setTimeout(step, Math.max(8, wait));
    };

    timer = setTimeout(step, delay);

    const cancel = () => {
      cancelled = true;
      clearTimeout(timer);
    };
    cancelRef.current = cancel;
    return cancel;
  }, [delay, reduced, speed, text]);

  useEffect(() => {
    if (reduced) {
      cancelRef.current?.();
      return;
    }
    if (trigger === "mount" || (trigger === "inView" && inView)) {
      return run();
    }
  }, [inView, reduced, run, trigger]);

  // Cancel any pending typing when the component unmounts.
  useEffect(() => () => cancelRef.current?.(), []);

  const handleEnter = () => {
    if (trigger === "hover") run();
  };

  const shown = reduced ? text : displayed;
  const cursorNode = (!done || keepCursor) && <span className="cursor-blink text-cyan">{cursor}</span>;

  if (flow) {
    return (
      <Tag ref={ref} className={className} onMouseEnter={handleEnter}>
        {shown}
        {cursorNode}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className} style={{ position: "relative", display: "inline-block" }} onMouseEnter={handleEnter}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" style={{ opacity: 0, pointerEvents: "none", userSelect: "none" }}>
        {text}
      </span>
      <span aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
        {shown}
        {cursorNode}
      </span>
    </Tag>
  );
}
