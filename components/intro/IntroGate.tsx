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
    const failsafe = setTimeout(() => {
      document.documentElement.classList.remove("intro-pending");
    }, 10000);
    return () => clearTimeout(failsafe);
  }, []);
  if (!show) return null;
  return <Intro onDone={() => setShow(false)} />;
}