"use client";
import { useEffect, useState } from "react";

/**
 * Resolves motion preference with this priority:
 * 1. site setting "anim=0"  -> reduced
 * 2. site setting "anim=1"  -> full motion (explicit opt-in, even if the OS asks for reduced)
 * 3. OS prefers-reduced-motion
 */
function resolveReduced(mq: MediaQueryList): boolean {
  let pref: string | null = null;
  try {
    pref = localStorage.getItem("anim");
  } catch {}
  if (pref === "0") return true;
  if (pref === "1") return false;
  return mq.matches;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(resolveReduced(mq));

    sync();
    mq.addEventListener("change", sync);
    window.addEventListener("storage", sync);
    // Same-tab updates from the ANIMATIONS toggle in AppShell.
    window.addEventListener("animchange", sync);

    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("storage", sync);
      window.removeEventListener("animchange", sync);
    };
  }, []);

  return reduced;
}
