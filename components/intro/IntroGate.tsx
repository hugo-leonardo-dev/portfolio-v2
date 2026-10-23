"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { releaseIntroUi } from "@/lib/intro";

const Intro = dynamic(() => import("@/components/intro/Intro"), { ssr: false });

export function IntroGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (document.documentElement.classList.contains("intro-pending")) setShow(true);
    } catch {}

    // If the intro chunk never loads (stale deploy, cache, network), never
    // leave the site hidden forever. Once the overlay is mounted, the Intro
    // component owns the exit path: unmounting it here would skip its cleanup
    // and leave main/nav marked as inert.
    const failsafe = setTimeout(() => {
      if (document.querySelector(".intro-overlay")) return;
      releaseIntroUi();
      setShow(false);
      window.dispatchEvent(new Event("intro:done"));
    }, 9000);

    return () => clearTimeout(failsafe);
  }, []);

  if (!show) return null;
  return <Intro onDone={() => setShow(false)} />;
}
