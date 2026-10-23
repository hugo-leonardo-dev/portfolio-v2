"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/lib/data";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { HudFrame } from "@/components/hud/HudFrame";
import { StatusTag } from "@/components/hud/StatusTag";
import { TypeWriter } from "@/components/fx/TypeWriter";
import { TypeLines } from "@/components/fx/TypeLines";
import { ScrambleText } from "@/components/fx/ScrambleText";

export function Logs() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<string | null>(experiences[0]?.id ?? null);

  return (
    <section className="space-y-6">
      <div className="space-y-4">
        {experiences.map((e) => {
          const isOpen = open === e.id;
          return (
            <HudFrame key={e.id}>
              <button
                onClick={() => setOpen(isOpen ? null : e.id)}
                className="w-full flex flex-wrap items-center justify-between gap-2 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-cyan tracking-widest text-sm">
                  <TypeWriter
                    text={`${e.id} // ${e.company.toUpperCase()} // ${e.period}`}
                    speed={10}
                    keepCursor={false}
                  />
                </span>
                <StatusTag color={isOpen ? "cyan" : "dim"}>
                  {isOpen ? "OPEN" : "CLOSED"}
                </StatusTag>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 border-t border-red-deep/40 mt-3">
                      <div className="text-[10px] text-red tracking-widest mb-2">
                        {e.role.toUpperCase()} @ {e.location.toUpperCase()}
                      </div>
                      <div className="text-sm text-text">
                        <TypeLines
                          lines={e.bullets}
                          prompt="> "
                          speed={7}
                          lineDelay={60}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </HudFrame>
          );
        })}
      </div>
    </section>
  );
}
