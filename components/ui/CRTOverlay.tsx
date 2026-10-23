"use client";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function CRTOverlay() {
  const reduced = useReducedMotion();
  return (
    <>
      <div className="noise" aria-hidden style={{ opacity: 0.04 }} />
      {reduced ? null : <div className="pointer-events-none fixed inset-0 z-[57] opacity-[0.04] mix-blend-screen" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,240,255,0.05)_50%)] bg-[length:100%_4px]" />
      </div>}
    </>
  );
}