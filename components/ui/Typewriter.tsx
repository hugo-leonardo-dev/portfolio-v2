"use client";
import { useTypewriter } from "@/lib/hooks/useTypewriter";

export function Typewriter({ text, speed = 24, className }: { text: string; speed?: number; className?: string }) {
  const out = useTypewriter(text, speed);
  return (
    <span className={className}>
      {out}
      <span className="cursor-blink">_</span>
    </span>
  );
}