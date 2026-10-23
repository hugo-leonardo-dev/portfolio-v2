"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const [noise, setNoise] = useState(false);

  useEffect(() => {
    if (reduced) return;
    setNoise(true);
    const t = setTimeout(() => setNoise(false), 250);
    return () => clearTimeout(t);
  }, [pathname, reduced]);

  return (
    <>
      {noise && <div className="noise-bar" aria-hidden />}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: reduced ? 0 : 0.12, ease: "easeOut" }}
        className={reduced ? "" : "glitch-in"}
      >
        {children}
      </motion.div>
    </>
  );
}