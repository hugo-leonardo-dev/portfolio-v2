"use client";
import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { BootSequence } from "@/components/sections/BootSequence";
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
import { ScrambleText } from "@/components/fx/ScrambleText";
import { TypeWriter } from "@/components/fx/TypeWriter";
import { RotatingTypeWriter } from "@/components/fx/RotatingTypeWriter";
import { CountUp } from "@/components/fx/CountUp";

export default function Home() {
  const [booted, setBooted] = useState(false);
  const reduced = useReducedMotion();
  const showBoot = !reduced && !booted;
  const handleBoot = useCallback(() => setBooted(true), []);
  const [scan, setScan] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      if (sessionStorage.getItem("introDone")) { setReady(true); return; }
      if (document.documentElement.classList.contains("intro-pending")) {
        const handler = () => setReady(true);
        window.addEventListener("intro:done", handler, { once: true });
        return () => window.removeEventListener("intro:done", handler);
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
      {showBoot && <BootSequence onComplete={handleBoot} />}
      {!ready ? (
        <div className="min-h-screen" />
      ) : (
      <div className="space-y-6">
        <HudFrame label="SCANNING">
          <div className="text-center space-y-4">
            <div className="text-cyan text-4xl">▲</div>
            <h1 className="text-2xl md:text-3xl font-display font-bold tracking-widest text-cyan">
              <ScrambleText text="WELCOME, NETRUNNER" trigger="inView" />
            </h1>
            <p className="text-text font-bold">
              <RotatingTypeWriter
                words={["FULL-STACK ENGINEER", "BACKEND ARCHITECT", "AUTOMATION BUILDER", "AI-POWERED SYSTEMS"]}
                className="text-cyan"
              />
            </p>
            <p className="text-sm text-text-dim">
              <TypeWriter text={`> ${site.tagline}`} speed={28} keepCursor />
            </p>
            <StatusTag color="red">OUTSIDE LINK CONNECTED</StatusTag>
            <BinaryText rows={1} cols={48} />
            <SegmentedBar value={scan} />
            <div className="text-[10px] text-text-dim tracking-widest">
              LOADING <CountUp to={100} duration={1800} />%
            </div>
            <ProgressStrip label="SCANNING" duration={1800} />
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <motion.div initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
                <Button href="/projects">[ VIEW_PROJECTS ]</Button>
              </motion.div>
              <motion.div initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
                <Button href="/contact" variant="secondary">[ OPEN_CONNECTION ]</Button>
              </motion.div>
            </div>
          </div>
        </HudFrame>

        <div className="grid gap-4 md:grid-cols-2">
          <HudFrame label="COMPLETE">
            <div className="text-cyan font-bold tracking-widest"><ScrambleText text="ACCESS GRANTED" trigger="inView" /></div>
            <div className="text-[10px] text-text-dim mb-3">SYSTEM ONLINE</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-text-dim">YEARS EXP</span><span className="text-cyan"><CountUp to={4} suffix="+" /></span></div>
              <div className="flex justify-between"><span className="text-text-dim">PROJECTS SHIPPED</span><span className="text-cyan"><CountUp to={6} /></span></div>
              <div className="flex justify-between"><span className="text-text-dim">STACK COUNT</span><span className="text-cyan"><CountUp to={24} suffix="+" /></span></div>
            </div>
            <BinaryText rows={2} cols={28} />
          </HudFrame>
          <HudFrame label="STACK">
            <div className="text-[10px] text-text-dim tracking-widest mb-2"><ScrambleText text="PRIMARY TECH" trigger="inView" /></div>
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
      <div className="px-4 py-2 text-[10px] text-text-dim tracking-widest">
        ROOT@HUGO : ~ # <span className="cursor-blink text-cyan">█</span>
      </div>
      <Terminal />
    </>
  );
}