"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function ScanIn({ children, className, from = "left" }: { children: React.ReactNode; className?: string; from?: "left" | "top" }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <div
      className={cn("relative", from === "left" ? "scan-in" : "scan-in", className)}
      style={from === "top" ? { clipPath: "inset(0 0 100% 0)", animation: "scanInTop 0.5s ease-out forwards" } : undefined}
    >
      {children}
      <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-px bg-cyan opacity-80" />
    </div>
  );
}

export function GlitchIn({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return <div className={cn("glitch-in", className)}>{children}</div>;
}

export function CrtOn({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return <div className={cn("crt-on", className)}>{children}</div>;
}

export function DrawBorder({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <div className={cn("relative", className)}>
      {!reduced && (
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" fill="none" stroke="var(--cyan)" strokeWidth="1" className="draw-stroke" vectorEffect="non-scaling-stroke" />
        </svg>
      )}
      {children}
    </div>
  );
}