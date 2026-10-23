"use client";
import { systemSpecs, languages } from "@/lib/data";
import { HudFrame } from "@/components/hud/HudFrame";
import { StatusTag } from "@/components/hud/StatusTag";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const groups: { key: keyof typeof systemSpecs; label: string }[] = [
  { key: "languages", label: "LANGUAGES" },
  { key: "frameworks", label: "FRAMEWORKS" },
  { key: "dataCloud", label: "DATA / CLOUD" },
  { key: "practices", label: "PRACTICES" },
];

export function SystemSpecs() {
  const reduced = useReducedMotion();
  let chipIndex = 0;
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <HudFrame>
        <div className="space-y-4">
          {groups.map((g) => (
            <div key={g.key}>
              <div className="text-[10px] tracking-widest text-cyan mb-2">{g.label}</div>
              <div className="flex flex-wrap gap-2">
                {systemSpecs[g.key].map((s) => {
                  const i = chipIndex++;
                  return (
                    <StatusTag key={s} color="dim">
                      <ScrambleText text={s} trigger="inView" delay={i * 50} />
                    </StatusTag>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </HudFrame>
      <HudFrame>
        <div className="space-y-3">
          {languages.map((l, idx) => (
            <div key={l.name} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text">{l.name.toUpperCase()}</span>
                <span className="text-cyan tracking-widest">{l.level.toUpperCase()}</span>
              </div>
              <div className="h-1 bg-red-deep/40 overflow-hidden">
                <motion.div
                  initial={reduced ? { width: "100%" } : { width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: idx * 0.2, ease: "easeOut" }}
                  className="h-full bg-cyan"
                />
              </div>
            </div>
          ))}
          <div className="text-[10px] text-text-dim mt-4">
            &gt; All communication channels open.
          </div>
        </div>
      </HudFrame>
    </section>
  );
}