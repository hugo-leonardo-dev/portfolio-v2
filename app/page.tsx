"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Terminal } from "@/components/terminal/Terminal";
import { site } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HudFrame } from "@/components/hud/HudFrame";
import { SegmentedBar } from "@/components/hud/SegmentedBar";
import { BinaryText } from "@/components/hud/BinaryText";
import { StatusTag } from "@/components/hud/StatusTag";
import { ProgressStrip } from "@/components/hud/ProgressStrip";
import { RotatingTypeWriter } from "@/components/fx/RotatingTypeWriter";
import { CountUp } from "@/components/fx/CountUp";
import { ScrambleReveal } from "@/components/fx/ScrambleReveal";
import { LiveFeed } from "@/components/sections/LiveFeed";

// Stable identity: an inline array would restart the typing loop on every render.
const ROLES = [
  "FULL-STACK ENGINEER",
  "BACKEND ARCHITECT",
  "AUTOMATION BUILDER",
  "AI-POWERED SYSTEMS",
];

export default function Home() {
  const reduced = useReducedMotion();
  const [scan, setScan] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      if (sessionStorage.getItem("introDone")) {
        setReady(true);
        return;
      }
      if (document.documentElement.classList.contains("intro-pending")) {
        let done = false;
        const handler = () => {
          done = true;
          setReady(true);
        };
        window.addEventListener("intro:done", handler, { once: true });
        // Never leave the hero permanently unmounted if the intro chunk fails.
        const failsafe = setTimeout(() => {
          if (!done) setReady(true);
        }, 7000);
        return () => {
          window.removeEventListener("intro:done", handler);
          clearTimeout(failsafe);
        };
      }
      setReady(true);
    } catch {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (reduced) {
      setScan(100);
      return;
    }
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setScan(Math.round(t * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, ready]);

  return (
    <>
      {!ready ? (
        <div className="min-h-screen" />
      ) : (
        <div className="space-y-6">
          <HudFrame className="relative">
            {/* ambient live feed, behind the hero content */}
            <LiveFeed className="pointer-events-none absolute left-4 top-6 hidden w-[42%] max-w-sm flex-col opacity-30 md:flex [mask-image:linear-gradient(to_bottom,black_75%,transparent)]" />
            <div className="relative text-center space-y-4">
              <div className="text-cyan text-4xl">▲</div>
              <h1 className="text-2xl md:text-3xl font-display font-bold tracking-widest text-cyan">
                WELCOME, NETRUNNER
              </h1>
              <p className="text-text font-bold">
                <RotatingTypeWriter
                  words={ROLES}
                  typingSpeed={40}
                  deletingSpeed={20}
                  pause={1400}
                  className="text-cyan"
                />
              </p>
              <p className="text-sm text-text-dim">&gt; {site.tagline}</p>
              <StatusTag color="red">OUTSIDE LINK CONNECTED</StatusTag>
              <BinaryText rows={1} cols={48} />
              <SegmentedBar value={scan} />
              <div className="text-[10px] text-text-dim tracking-widest hud-glow">
                LOADING <CountUp to={100} duration={1800} />%
              </div>
              <ProgressStrip label="SCANNING" duration={1800} />
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <Button href="/projects" variant="primary">
                    <ScrambleReveal
                      text="[ VIEW_PROJECTS ]"
                      hoverScope="parent"
                    />
                  </Button>
                </motion.div>
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <Button href="/contact" variant="primary">
                    <ScrambleReveal
                      text="[ OPEN_CONNECTION ]"
                      hoverScope="parent"
                    />
                  </Button>
                </motion.div>
              </div>
            </div>
          </HudFrame>

          <div className="grid gap-4 md:grid-cols-2">
            <HudFrame>
              <div className="text-cyan font-bold tracking-widest">
                <ScrambleReveal text="ACCESS GRANTED" />
              </div>
              <div className="text-[10px] text-text-dim mb-3">
                SYSTEM ONLINE
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-dim">YEARS EXP</span>
                  <span className="text-cyan">
                    <CountUp to={4} suffix="+" />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-dim">PROJECTS SHIPPED</span>
                  <span className="text-cyan">
                    <CountUp to={6} />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-dim">STACK COUNT</span>
                  <span className="text-cyan">
                    <CountUp to={24} suffix="+" />
                  </span>
                </div>
              </div>
              <BinaryText rows={2} cols={28} />
            </HudFrame>
            <HudFrame>
              <div className="text-[10px] text-text-dim tracking-widest mb-2">
                <ScrambleReveal text="PRIMARY TECH" />
              </div>
              <div className="text-xs text-red space-y-1">
                <div>JS // TS // C# // NODE.JS // SQL</div>
                <div>REACT // NEXT.JS // ADONISJS // ASP.NET</div>
                <div>POSTGRES // MYSQL // REDIS // AWS // DOCKER</div>
              </div>
            </HudFrame>
          </div>
        </div>
      )}
      <Marquee />
      <div className="px-4 py-3">
        <Terminal />
      </div>
    </>
  );
}
