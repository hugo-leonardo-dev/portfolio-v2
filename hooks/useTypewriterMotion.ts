"use client";
import { useEffect, useState } from "react";

/**
 * Text effects (typewriter, scramble) follow the site's explicit ANIMATIONS
 * setting only. They intentionally do not inherit the OS "reduce motion" flag:
 * many browsers/OSes ship with it enabled and it silently killed every text
 * effect. Visitors can still disable them from Settings (anim=0).
 */
export function useTypewriterMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const sync = () => {
      let pref: string | null = null;
      try {
        pref = localStorage.getItem("anim");
      } catch {}
      setReduced(pref === "0");
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("animchange", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("animchange", sync);
    };
  }, []);

  return reduced;
}
