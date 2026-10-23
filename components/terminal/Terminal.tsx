"use client";
import { useEffect, useRef, useState } from "react";
import { commands } from "@/lib/data";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const ALL = ["help", "about", "skills", "projects", "experience", "contact", "clear", "whoami", "sudo", "matrix", "ls", "cat"];

export function Terminal() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>([
    "HUGO_OS v1.0.0 // type 'help' for commands",
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines, open]);

  const run = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setLines((l) => [...l, `> ${cmd}`]);
    if (trimmed === "") return;
    setHistory((h) => [cmd, ...h]);
    setHIndex(-1);
    if (trimmed === "clear") {
      setLines([]);
      return;
    }
    if (trimmed === "matrix") {
      setLines((l) => [...l, "WAKE UP, NETRUNNER... [DATA ERROR]", "01001000 01010101 01000111 01001111"]);
      return;
    }
    if (trimmed === "theme") {
      setLines((l) => [...l, "THEME: CYBERDECK (locked). NO ALTERNATIVES, NETRUNNER."]);
      return;
    }
    if (trimmed === "ls") {
      setLines((l) => [...l, "manifesto/  logs/  archive/  connection/"]);
      return;
    }
    if (trimmed.startsWith("cat ")) {
      setLines((l) => [...l, `cat: ${trimmed.slice(4)}: permission denied [DATA ERROR]`]);
      return;
    }
    const out = (commands as Record<string, string>)[trimmed];
    if (out) {
      setLines((l) => [...l, out]);
    } else {
      setLines((l) => [...l, `command not found: ${trimmed}. Type 'help'.`]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = Math.min(hIndex + 1, history.length - 1);
      setHIndex(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIndex <= 0) {
        setHIndex(-1);
        setInput("");
        return;
      }
      const next = hIndex - 1;
      setHIndex(next);
      setInput(history[next] ?? "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = ALL.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-40 border border-accent text-accent px-3 py-2 text-xs tracking-widest bg-bg/80 backdrop-blur-md chamfer-sm hover:bg-accent hover:text-bg"
        aria-label="Toggle terminal"
      >
        [ TERMINAL ]
      </button>
      {open && (
        <div className="fixed bottom-16 right-4 z-40 w-[92vw] max-w-md border border-border bg-bg/95 backdrop-blur-md chamfer">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <span className="text-accent text-xs tracking-widest">HUGO_OS // TERMINAL</span>
            <button onClick={() => setOpen(false)} className="text-danger text-xs">[X]</button>
          </div>
          <div ref={scrollRef} className="h-64 overflow-y-auto px-3 py-2 text-xs space-y-1">
            {lines.map((l, i) => (
              <div key={i} className={l.startsWith(">") ? "text-accent" : "text-fg"}>{l}</div>
            ))}
          </div>
          <div className="border-t border-border px-3 py-2 flex items-center gap-2">
            <span className="text-accent">&gt;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent text-fg text-xs outline-none"
              placeholder="type a command..."
              aria-label="Terminal input"
            />
          </div>
        </div>
      )}
    </>
  );
}