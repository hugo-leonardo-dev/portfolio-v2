"use client";
import { projects } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { ScrambleText } from "@/components/fx/ScrambleText";

export function Archive() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-xs text-muted tracking-widest mb-6">
        <ScrambleText text="NODE_07 // ARCHIVE" trigger="mount" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.title} className="hover:glitch transition-all">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-accent tracking-widest text-lg neon">{p.title.toUpperCase()}</h3>
              <span className="text-[10px] tracking-widest text-secondary border border-secondary/40 px-2 py-0.5">
                {p.status}
              </span>
            </div>
            <p className="mt-3 text-sm text-fg">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
            <div className="mt-5 flex gap-2">
              {p.github && <Button href={p.github} variant="secondary">[ GITHUB ]</Button>}
              {p.live && <Button href={p.live}>[ LIVE ]</Button>}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}