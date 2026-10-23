"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Intro = dynamic(() => import("@/components/intro/Intro"), { ssr: false });

export function IntroGate() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (document.documentElement.classList.contains("intro-pending")) setShow(true);
    } catch {}
    // If the intro chunk fails to load (stale deploy, cache, network), never
    // leave the site hidden or waiting for an intro:done event that never comes.
    const failsafe = setTimeout(() => {
      document.documentElement.classList.remove("intro-pending");
      document.body.style.overflow = "";
      setShow(false);
      window.dispatchEvent(new Event("intro:done"));
    }, 6000);
    return () => clearTimeout(failsafe);
  }, []);
  if (!show) return null;
  return <Intro onDone={() => setShow(false)} />;
}