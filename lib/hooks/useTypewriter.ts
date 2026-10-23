"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useTypewriter(text: string, speed = 30, start = true) {
  const reduced = useReducedMotion();
  const [out, setOut] = useState(reduced ? text : "");
  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    if (!start) return;
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start, reduced]);
  return out;
}