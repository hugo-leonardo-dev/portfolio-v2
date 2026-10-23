"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, Menu, X } from "lucide-react";
import { Ruler } from "@/components/hud/Ruler";
import { Barcode } from "@/components/hud/Barcode";
import { ProgressStrip } from "@/components/hud/ProgressStrip";
import { MenuItem } from "@/components/hud/MenuItem";
import { StatusTag } from "@/components/hud/StatusTag";
import { Clock } from "@/components/hud/Clock";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { Home, User, Briefcase, Folder, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/", label: "HOME", subtitle: "PROFILE DATA", icon: Home },
  { href: "/about", label: "ABOUT", subtitle: "MANIFESTO", icon: User },
  {
    href: "/experience",
    label: "EXPERIENCE",
    subtitle: "WORK LOGS",
    icon: Briefcase,
  },
  { href: "/projects", label: "PROJECTS", subtitle: "ARCHIVE", icon: Folder },
  {
    href: "/contact",
    label: "CONNECTION",
    subtitle: "SECURE CHANNEL",
    icon: Mail,
  },
];

const sectionName: Record<string, string> = {
  "/": "HOME",
  "/about": "ABOUT",
  "/experience": "EXPERIENCE",
  "/projects": "PROJECTS",
  "/contact": "CONNECTION",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Home stays crisp: no scanline grid, no ambient sweep, no CRT texture.
  const isHome = pathname === "/";
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scanlines, setScanlines] = useState(true);
  const [glitch, setGlitch] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [sound] = useState(false);
  const [uptime, setUptime] = useState("00:00:00");
  const [now, setNow] = useState("");
  const [signal, setSignal] = useState("STABLE");
  const [dataError, setDataError] = useState(false);
  const [storm, setStorm] = useState(false);
  // Only persist "anim" after the visitor actually touches the toggle, so the
  // OS preference keeps working until someone makes an explicit choice.
  const animTouched = useRef(false);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    try {
      const a = localStorage.getItem("anim");
      if (a === "1") setAnimations(true);
      else if (a === "0") setAnimations(false);
      else
        setAnimations(
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        );
      const s = localStorage.getItem("scanlines");
      if (s !== null) setScanlines(s === "1");
      const g = localStorage.getItem("glitch");
      if (g !== null) setGlitch(g === "1");
    } catch {}
  }, []);

  useEffect(() => {
    // Lets CSS motion (shimmer, cursor blink, marquee...) follow the same
    // preference as the JS effects, including an explicit opt-in over the OS.
    document.documentElement.classList.toggle("motion-on", animations);
    if (!animTouched.current) return;
    try {
      localStorage.setItem("anim", animations ? "1" : "0");
    } catch {}
    // Notify mounted components so the change applies without a reload.
    window.dispatchEvent(new Event("animchange"));
  }, [animations]);
  useEffect(() => {
    try {
      localStorage.setItem("scanlines", scanlines ? "1" : "0");
    } catch {}
  }, [scanlines]);
  useEffect(() => {
    try {
      localStorage.setItem("glitch", glitch ? "1" : "0");
    } catch {}
  }, [glitch]);

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const s = Math.floor((Date.now() - start) / 1000);
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = s % 60;
      setUptime(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`,
      );
      setNow(new Date().toLocaleTimeString());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const schedule = () => {
      const delay = 6000 + Math.random() * 6000;
      const t = setTimeout(() => {
        if (cancelled) return;
        setDataError(true);
        setTimeout(() => setDataError(false), 150);
        schedule();
      }, delay);
      return t;
    };
    const t = schedule();
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (Math.random() < 0.02) {
      setSignal("SCANNING");
      const t = setTimeout(() => setSignal("STABLE"), 800);
      return () => clearTimeout(t);
    }
  }, [uptime]);

  useEffect(() => {
    let cancelled = false;
    const schedule = () => {
      const delay = 20000 + Math.random() * 20000;
      const t = setTimeout(() => {
        if (cancelled) return;
        setStorm(true);
        setDataError(true);
        window.dispatchEvent(new Event("glitch-storm"));
        setTimeout(() => {
          setStorm(false);
          setDataError(false);
        }, 350);
        schedule();
      }, delay);
      return t;
    };
    const t = schedule();
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-red-deep/60">
        <span className="text-cyan text-lg font-display tracking-widest">
          武士
        </span>
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <span className="text-red text-[10px] mr-1">▼</span>
            <Ruler />
          </div>
          <span className="text-[9px] text-text-dim tracking-widest ml-2">
            {sectionName[pathname] ?? "HOME"}
          </span>
        </div>
        <button
          onClick={() => setSettingsOpen((v) => !v)}
          className="h-8 w-8 border border-cyan bg-panel flex items-center justify-center text-cyan hover:bg-cyan hover:text-bg-bottom transition-colors"
          aria-label="Settings"
        >
          <Settings size={14} />
        </button>
      </div>

      {/* settings panel */}
      {settingsOpen && (
        <div className="absolute right-4 top-12 z-[70] border border-red bg-panel p-3 text-xs space-y-2 chamfer-sm">
          <label className="flex items-center gap-2 text-text-dim">
            <input
              type="checkbox"
              checked={scanlines}
              onChange={(e) => setScanlines(e.target.checked)}
            />
            SCANLINES
          </label>
          <label className="flex items-center gap-2 text-text-dim">
            <input
              type="checkbox"
              checked={glitch}
              onChange={(e) => setGlitch(e.target.checked)}
            />
            GLITCH FX
          </label>
          <label className="flex items-center gap-2 text-text-dim">
            <input
              type="checkbox"
              checked={animations}
              onChange={(e) => {
                animTouched.current = true;
                setAnimations(e.target.checked);
              }}
            />
            ANIMATIONS
          </label>
          <label className="flex items-center gap-2 text-text-dim">
            <input type="checkbox" checked={sound} readOnly />
            SOUND: OFF
          </label>
        </div>
      )}

      {/* header panel */}
      <div className="px-4 py-3">
        <div className="border border-red bg-panel/40 chamfer p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 border border-red bg-panel flex items-center justify-center text-cyan font-bold">
              H
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="text-cyan font-display font-bold tracking-widest text-lg">
                  HUGO_LEONARDO // SOFTWARE ENGINEER
                </div>
                <span
                  className={`text-[9px] text-red ${dataError ? "glitch rgb-split" : ""}`}
                >
                  [DATA ERROR]
                </span>
              </div>
              <div className="text-[9px] text-text-dim tracking-widest">
                CYBERDECK V 552 322 : 3876 383 // ADMIN ACCESS GRANTED
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Barcode className="opacity-80" />
            <ProgressStrip label="SCANNING" duration={2000} />
            <div className="text-[9px] text-text-dim">624 / 1440 FILES</div>
          </div>
        </div>
      </div>

      {/* mobile menu button */}
      <div className="lg:hidden px-4 pb-2">
        <button
          onClick={() => setMobileOpen(true)}
          className="border border-red text-red px-3 py-1.5 text-xs tracking-widest chamfer-sm"
        >
          [ MENU ]
        </button>
      </div>

      {/* main grid */}
      <div className="flex-1 flex gap-4 px-4 pb-4">
        <main className="flex-1 min-w-0">
          {/* section strip: shown on every page */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border border-red-deep/40 bg-panel/20 px-3 py-1.5 text-[10px] tracking-widest text-text-dim">
            <span className="flex items-center gap-2">
              <span className="text-red" aria-hidden>
                ■
              </span>
              <ScrambleText
                key={pathname}
                text={`SYS://${sectionName[pathname] ?? "HOME"} // NODE_07 // CLEAN_FEED`}
                trigger="mount"
              />
            </span>
            <Clock />
          </div>
          {children}
        </main>
        <aside className="hidden lg:flex flex-col gap-2 w-56 shrink-0">
          {menuItems.map((m) => (
            <MenuItem
              key={m.href}
              href={m.href}
              icon={m.icon}
              label={m.label}
              subtitle={m.subtitle}
              active={active(m.href)}
            />
          ))}
          <div className="mt-auto pt-4">
            <StatusTag color="dim">BUILD 52 / REV 22</StatusTag>
          </div>
        </aside>
      </div>

      {/* footer */}
      <footer className="border-t border-red-deep/60 px-4 py-2 text-[10px] text-text-dim tracking-widest flex flex-wrap gap-3 justify-between">
        <span>
          UPTIME: <span className="text-text">{uptime}</span>
        </span>
        <span>
          LOCAL_TIME: <span className="text-text">{now}</span>
        </span>
        <span>
          SIGNAL:{" "}
          <span className={signal === "STABLE" ? "text-cyan" : "text-red"}>
            {signal}
          </span>
        </span>
        <span>© HUGO_LEONARDO</span>
      </footer>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[75] bg-bg-bottom/95 backdrop-blur-md p-4 flex flex-col gap-2">
          <div className="flex justify-end">
            <button
              onClick={() => setMobileOpen(false)}
              className="text-red text-xs tracking-widest"
            >
              [ X ]
            </button>
          </div>
          {menuItems.map((m) => (
            <MenuItem
              key={m.href}
              href={m.href}
              icon={m.icon}
              label={m.label}
              subtitle={m.subtitle}
              active={active(m.href)}
            />
          ))}
        </div>
      )}

      {/* scanlines toggle (disabled on home to keep the screen clean) */}
      {scanlines && !isHome && <div className="scanlines" aria-hidden />}
      {!isHome && <div className="scan-sweep" aria-hidden />}
      {glitch && null}
    </div>
  );
}
