"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { projects, type Project, type ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";
import { TypeWriter } from "@/components/fx/TypeWriter";
import { ScrambleText } from "@/components/fx/ScrambleText";

const FILTERS: Array<"ALL" | ProjectStatus> = ["ALL", "DEPLOYED", "OPEN_SOURCE", "ARCHIVED"];

const statusColor: Record<ProjectStatus, string> = {
  DEPLOYED: "text-cyan border-cyan/60",
  OPEN_SOURCE: "text-red border-red/60",
  ARCHIVED: "text-text-dim border-red-deep/60",
};

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [name, setName] = useState(project.name);
  const [imgFailed, setImgFailed] = useState(false);
  const hasImage = !!project.image && !imgFailed;

  useEffect(() => {
    if (reduced || !inView) return;
    let cancelled = false;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&";
    const target = project.name;
    const steps = Math.ceil(400 / 40);
    let step = 0;
    const id = setInterval(() => {
      if (cancelled) return;
      step++;
      const progress = step / steps;
      const out = target
        .split("")
        .map((c, i) => {
          if (c === " ") return " ";
          if (i / target.length < progress) return c;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      setName(out);
      if (step >= steps) {
        clearInterval(id);
        setName(target);
      }
    }, 40);
    return () => {
      cancelled = true;
      clearInterval(id);
      setName(target);
    };
  }, [inView, reduced, project.name]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(project);
    }
  };

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      tabIndex={0}
      role="button"
      aria-label={`Open dossier for ${project.name}`}
      onClick={() => onOpen(project)}
      onKeyDown={onKeyDown}
      className="group relative border border-red-deep bg-panel/60 backdrop-blur-sm chamfer p-0 cursor-pointer focus:outline focus:outline-2 focus:outline-cyan hover:border-cyan hover:-translate-y-1 transition-all rgb-split"
    >
      {/* image / placeholder */}
      <div className="relative h-40 overflow-hidden border-b border-border bg-bg-2">
        {hasImage ? (
          <>
            <Image
              src={project.image!}
              alt={`${project.name} screenshot`}
              width={800}
              height={450}
              className="h-full w-full object-cover"
              style={{ filter: "grayscale(0.6) sepia(0.4) hue-rotate(150deg) saturate(1.6) brightness(0.9)" }}
              onError={() => setImgFailed(true)}
            />
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_2px,rgba(0,0,0,0.35)_2px,rgba(0,0,0,0.35)_3px)]" />
            <div className="pointer-events-none absolute inset-0 bg-secondary/10 mix-blend-screen" />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]">
            <span className="text-2xl font-bold tracking-widest text-muted/40">{project.id}</span>
            <span className="text-xs tracking-widest text-danger neon-red data-error">[ NO_SIGNAL ]</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs tracking-widest text-muted">{project.id}</span>
          <span className={cn("text-[10px] tracking-widest border px-2 py-0.5", statusColor[project.status])}>
            {project.status}
          </span>
        </div>
        <h3 className="mt-3 text-lg tracking-widest text-cyan neon-cyan uppercase">{name}</h3>
        <p className="mt-2 text-sm text-text-dim leading-relaxed min-h-[3rem]">
          <TypeWriter text={project.description} speed={12} trigger="hover" keepCursor={false} />
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.2 }}
              className="text-[10px] tracking-widest text-text-dim border border-red-deep px-2 py-0.5"
            >
              [ {t.toUpperCase()} ]
            </motion.span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs tracking-widest border border-cyan text-cyan chamfer-sm hover:bg-cyan hover:text-bg-bottom neon-cyan transition-all"
            >
              [ LIVE_DEMO ]
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs tracking-widest border border-red text-red chamfer-sm hover:bg-red hover:text-bg-bottom neon-red transition-all"
            >
              [ SOURCE_CODE ]
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<"ALL" | ProjectStatus>("ALL");
  const [dossier, setDossier] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const filtered = filter === "ALL" ? projects : projects.filter((p) => p.status === filter);

  useEffect(() => {
    if (!dossier) return;
    lastFocus.current = document.activeElement as HTMLElement;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDossier(null);
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocus.current?.focus();
    };
  }, [dossier]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-xs text-text-dim tracking-widest mb-2">
        <ScrambleText text="NODE_03 // ARCHIVE" trigger="mount" />
      </div>
      <div className="text-sm text-muted mb-6">&gt; LOADING PROJECT_DATA... [{filtered.length} ENTRIES FOUND]</div>

      {/* filter bar */}
      <div className="mb-8 flex flex-wrap items-center gap-2 text-xs tracking-widest">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 border chamfer-sm transition-all",
              filter === f
                ? "border-red text-red bg-red/10 neon-red"
                : "border-red-deep text-text-dim hover:text-text hover:border-cyan/40"
            )}
          >
            [ {f} ]
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={setDossier} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* dossier modal */}
      <AnimatePresence>
        {dossier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/80 backdrop-blur-md p-4"
            onClick={() => setDossier(null)}
          >
            <motion.div
              ref={modalRef}
              initial={reduced ? false : { scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="dossier-title"
              className="relative w-full max-w-2xl border border-red bg-panel chamfer p-6"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Escape") setDossier(null);
              }}
            >
              <div className="flex items-center justify-between gap-2 border-b border-border pb-3">
                <span className="text-xs tracking-widest text-muted">{dossier.id} // DOSSIER</span>
                <button
                  ref={closeBtnRef}
                  onClick={() => setDossier(null)}
                  className="text-red text-xs tracking-widest hover:neon-red"
                >
                  [ X ]
                </button>
              </div>
              <h2 id="dossier-title" className="mt-4 text-xl tracking-widest text-cyan neon-cyan uppercase">
                {dossier.name}
              </h2>
              <p className="mt-1 text-[10px] tracking-widest text-muted">{dossier.status}</p>
              <p className="mt-4 text-sm text-fg leading-relaxed">{dossier.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {dossier.tags.map((t) => (
                  <span key={t} className="text-[10px] tracking-widest text-text-dim border border-red-deep px-2 py-0.5">
                    [ {t.toUpperCase()} ]
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {dossier.liveUrl && (
                  <a
                    href={dossier.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs tracking-widest border border-cyan text-cyan chamfer-sm hover:bg-cyan hover:text-bg-bottom neon-cyan transition-all"
                  >
                    [ LIVE_DEMO ]
                  </a>
                )}
                {dossier.repoUrl && (
                  <a
                    href={dossier.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs tracking-widest border border-red text-red chamfer-sm hover:bg-red hover:text-bg-bottom neon-red transition-all"
                  >
                    [ SOURCE_CODE ]
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}