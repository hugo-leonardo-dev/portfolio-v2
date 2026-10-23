"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type FeedLine = {
  id: number;
  tag: string;
  message: string;
  warn?: boolean;
};

const SEED: FeedLine[] = [
  { id: 0, tag: "SYS_INIT", message: "establishing secure handshake with 192.168.1.104..." },
  { id: 1, tag: "NET_ACCESS", message: "firewall bypassed. core status: OK" },
  { id: 2, tag: "MEM_LOAD", message: "buffer allocated: 512MB" },
  { id: 3, tag: "SECURITY", message: "encryption level: 2048-BIT RSA ACTIVE" },
  { id: 4, tag: "TRACE", message: "route spoofed via 10.13.37.7" },
];

const POOL: Array<Omit<FeedLine, "id">> = [
  { tag: "PKT", message: "1024 packets sent // 0 loss" },
  { tag: "AUTH", message: "session token refreshed" },
  { tag: "SYS", message: "heartbeat OK // node_07 stable" },
  { tag: "ICE", message: "intrusion countermeasure disarmed", warn: true },
  { tag: "NET_ACCESS", message: "uplink latency 12ms // channel OPEN" },
  { tag: "MEM_LOAD", message: "heap compacted: 384MB reclaimed" },
  { tag: "SECURITY", message: "port scan detected from 45.77.xx.xx", warn: true },
  { tag: "TRACE", message: "ghost relay engaged" },
  { tag: "SYS", message: "daemon portfoliod: process alive" },
  { tag: "PKT", message: "handshake complete // 0 retries" },
];

const MAX_LINES = 16;

/**
 * Ambient background feed. Simulated system logs append in real time inside a
 * fixed-height column: the oldest line leaves the top while new ones arrive at
 * the bottom, so the block keeps "scrolling" without touching the page scroll.
 * Purely decorative (aria-hidden), pointer-events disabled.
 */
export function LiveFeed({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [lines, setLines] = useState<FeedLine[]>(SEED);
  const nextId = useRef(SEED.length);

  useEffect(() => {
    if (reduced) return;

    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!document.hidden) {
        const tpl = POOL[Math.floor(Math.random() * POOL.length)];
        const id = nextId.current++;
        setLines((prev) => [...prev.slice(-(MAX_LINES - 1)), { id, ...tpl }]);
      }
      timer = setTimeout(tick, 900 + Math.random() * 900);
    };

    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "select-none overflow-hidden font-mono text-[9px] leading-relaxed tracking-wide",
        className
      )}
    >
      <div className="mb-2 text-red/80 tracking-[0.35em]">{"// LIVE_SYS_FEED"}</div>
      <div className="flex flex-col justify-end overflow-hidden">
        {lines.map((line) => (
          <div key={line.id} className="feed-line whitespace-nowrap">
            <span className={line.warn ? "text-red" : "text-cyan"}>
              [{line.tag}]
            </span>{" "}
            <span className="text-text">{line.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
