"use client";
import { useEffect, useState } from "react";

export function Barcode({ className }: { className?: string }) {
  const [bars, setBars] = useState<number[]>([]);
  useEffect(() => {
    const arr = Array.from({ length: 48 }, () => (Math.random() > 0.45 ? 1 : 0));
    setBars(arr);
  }, []);
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 24"
      className={`h-6 w-32 ${className ?? ""}`}
      preserveAspectRatio="none"
    >
      {bars.map((b, i) =>
        b ? <rect key={i} x={i * 2.5} y={2} width={1.2} height={20} fill="var(--cyan)" /> : null
      )}
    </svg>
  );
}