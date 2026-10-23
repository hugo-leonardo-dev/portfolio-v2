"use client";
import { useEffect, useState } from "react";
import { formatUptime } from "@/lib/utils";

const start = Date.now();

export function Footer() {
  const [now, setNow] = useState("");
  const [uptime, setUptime] = useState("00:00:00");
  useEffect(() => {
    const tick = () => {
      setNow(new Date().toLocaleTimeString());
      setUptime(formatUptime(start));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <footer className="border-t border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-3 text-xs text-muted tracking-widest flex flex-wrap items-center gap-3 justify-between">
        <span>UPTIME: {uptime}</span>
        <span className="hidden sm:inline">//</span>
        <span>LOCAL_TIME: {now}</span>
        <span className="hidden sm:inline">//</span>
        <span>SIGNAL: <span className="text-secondary">STABLE</span></span>
        <span className="hidden sm:inline">//</span>
        <span className="text-muted/60">© HUGO_LEONARDO</span>
      </div>
    </footer>
  );
}