"use client";
import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const anim = (() => { try { return localStorage.getItem("anim"); } catch { return null; } })();
    setReduced(mq.matches || anim === "0");
    const handler = (e: MediaQueryListEvent) => {
      const a = (() => { try { return localStorage.getItem("anim"); } catch { return null; } })();
      setReduced(e.matches || a === "0");
    };
    mq.addEventListener("change", handler);
    const onStorage = () => {
      const a = (() => { try { return localStorage.getItem("anim"); } catch { return null; } })();
      setReduced(mq.matches || a === "0");
    };
    window.addEventListener("storage", onStorage);
    return () => {
      mq.removeEventListener("change", handler);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return reduced;
}