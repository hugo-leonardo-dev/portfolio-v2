"use client";
import { useEffect, useRef, useState } from "react";
import { commands } from "@/lib/data";

const ALL = ["help", "about", "skills", "projects", "experience", "contact", "clear", "whoami", "sudo", "matrix", "ls", "cat"];

/**
 * Inline terminal used by the home prompt line.
 * Keeps the command set, history (↑/↓) and Tab completion from the old
 * floating terminal, but renders directly on the page.
 */
export function Terminal() {
  const [lines, setLines] = useState<string[]>([
    "HUGO_OS v1.0.0 // type 'help' for commands",
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

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
      inputRef.current?.blur();
    }
  };

  return (
    <section
      className="border border-red-deep/60 bg-[rgba(10,17,24,0.55)] chamfer-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollRef}
        className="max-h-48 overflow-y-auto px-3 py-2 font-mono text-[11px] leading-relaxed space-y-0.5"
      >
        {lines.map((l, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap break-words ${l.startsWith(">") ? "text-cyan" : "text-text"}`}
          >
            {l}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-red-deep/40 px-3 py-2 font-mono text-[11px]">
        <span className="whitespace-nowrap text-red">ROOT@HUGO : ~ #</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 bg-transparent text-base text-cyan outline-none caret-cyan placeholder:text-text-dim md:text-[11px]"
          placeholder="type a command..."
          aria-label="Terminal input"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          enterKeyHint="send"
          spellCheck={false}
        />
        <span className="cursor-blink text-cyan" aria-hidden>█</span>
      </div>
    </section>
  );
}
