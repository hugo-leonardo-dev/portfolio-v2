"use client";

import { useEffect, useState } from "react";

type Time = { h: string; m: string; s: string };

function localNow(): Time {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return { h: pad(d.getHours()), m: pad(d.getMinutes()), s: pad(d.getSeconds()) };
}

/**
 * Local clock (visitor's timezone) with a blinking seconds field.
 * Renders a placeholder on the server, then syncs on the client, so the
 * markup never causes a hydration mismatch.
 */
export function Clock({ className }: { className?: string }) {
  const [time, setTime] = useState<Time | null>(null);

  useEffect(() => {
    const tick = () => setTime(localNow());
    // Deferred first tick: avoids a synchronous setState inside the effect body.
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return (
    <div
      className={
        "flex items-center gap-2 font-mono text-[10px] tracking-widest text-text-dim " +
        (className ?? "")
      }
    >
      <span className="text-red" aria-hidden>
        ●
      </span>
      <span>SYS_TIME</span>
      <span className="flex items-center text-cyan">
        <span>{time ? `${time.h}:${time.m}:` : "--:--:"}</span>
        <span className="cursor-blink">{time ? time.s : "--"}</span>
      </span>
      <span>LOCAL</span>
    </div>
  );
}
