"use client";
import { manifesto, education, mentoring } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HudFrame } from "@/components/hud/HudFrame";
import { BinaryText } from "@/components/hud/BinaryText";
import { TypeLines } from "@/components/fx/TypeLines";
import { ScrambleText } from "@/components/fx/ScrambleText";

export function Manifesto() {
  const reduced = useReducedMotion();
  return (
    <section className="space-y-6">
      <HudFrame>
        <div className="space-y-1 text-sm">
          <TypeLines lines={manifesto} prompt="" speed={6} lineDelay={60} />
        </div>
        <div className="mt-4 border-t border-red-deep/40 pt-3 text-[10px] text-text-dim space-y-1">
          <div>
            EDUCATION: {education.degree} // {education.school} //{" "}
            {education.period}
          </div>
          <div>
            GPA: {education.gpa} // {education.award}
          </div>
          <div>MENTORING: {mentoring}</div>
        </div>
        <div className="mt-3">
          <BinaryText rows={2} cols={36} />
        </div>
      </HudFrame>
    </section>
  );
}
