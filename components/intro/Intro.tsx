"use client";

import { useEffect, useRef, useState } from "react";

/* ================= CONFIG ================= */
const INTRO = {
  total: 4500,
  failsafe: 6000,
  reduced: false,
  steps: [
    // PHASE 1 BOOT
    { type: "print", text: "[ 0.000] NETWATCH-OS 4.2.1 BOOTING", delay: 0 },
    { type: "print", text: "[ 0.112] MOUNTING ENCRYPTED VOLUME ........ OK", delay: 70 },
    { type: "print", text: "[ 0.241] LOADING NEURAL INTERFACE ......... OK", delay: 70 },
    { type: "print", text: "[ 0.380] ESTABLISHING UPLINK 10.13.37.7 ... OK", delay: 70 },
    { type: "pause", ms: 200 },
    // PHASE 2 LOGIN
    { type: "print", text: "NETWATCH SECURE TERMINAL // AUTHORIZED ACCESS ONLY", delay: 0, cls: "head" },
    { type: "type", text: "login: hugo_leonardo", speed: [28, 42], mask: false },
    { type: "type", text: "password: ************", speed: [28, 42], mask: true },
    { type: "pause", ms: 250 },
    { type: "print", text: "> VERIFYING CREDENTIALS ......... [ OK ]", delay: 60, status: "ok" },
    { type: "print", text: "> BIOMETRIC TOKEN ............... [ OK ]", delay: 80, status: "ok" },
    { type: "print", text: "> BYPASSING ICE ................. [ WARN ]", delay: 80, status: "warn", trace: 64, ice: true },
    { type: "print", text: "> TRACE ROUTE SPOOFED ........... [ OK ]", delay: 90, status: "ok", trace: 12, ice: false },
    { type: "print", text: "> ACCESS LEVEL: ROOT", delay: 80, status: "ok" },
    { type: "print", text: "> WELCOME BACK, HUGO_LEONARDO", delay: 90, status: "ok" },
    { type: "pause", ms: 300 },
    // PHASE 3 SHELL
    { type: "prompt", text: "root@hugo:~# " },
    { type: "type", text: "ls -la /portfolio", speed: [28, 42] },
    { type: "pause", ms: 200 },
    { type: "print", text: "drwxr-xr-x  hugo  root  4096  about/", delay: 60 },
    { type: "print", text: "drwxr-xr-x  hugo  root  4096  experience/", delay: 40 },
    { type: "print", text: "drwxr-xr-x  hugo  root  4096  projects/", delay: 40 },
    { type: "print", text: "drwxr-xr-x  hugo  root  4096  connection/", delay: 40 },
    { type: "print", text: "-rw-r--r--  hugo  root   512  profile.dat", delay: 40 },
    { type: "pause", ms: 250 },
    { type: "prompt", text: "root@hugo:~# " },
    { type: "type", text: "cat profile.dat", speed: [28, 42] },
    { type: "pause", ms: 200 },
    { type: "print", text: "NAME ........ HUGO LEONARDO", delay: 60 },
    { type: "print", text: "ROLE ........ FULL-STACK SOFTWARE ENGINEER", delay: 40 },
    { type: "print", text: "STACK ....... TYPESCRIPT / NODE / REACT / .NET / AWS", delay: 40 },
    { type: "print", text: "STATUS ...... AVAILABLE FOR NEW MISSIONS", delay: 40 },
    { type: "pause", ms: 250 },
    { type: "prompt", text: "root@hugo:~# " },
    { type: "type", text: "./scan_skills.sh", speed: [28, 42] },
    { type: "pause", ms: 200 },
    { type: "progress", label: "SCANNING", duration: 800 },
    { type: "print", text: "SKILLS INDEXED: 24 / 24 [ OK ]", delay: 60, status: "ok" },
    { type: "pause", ms: 250 },
    { type: "prompt", text: "root@hugo:~# " },
    { type: "type", text: "sudo ./launch_portfolio.sh", speed: [28, 42] },
    { type: "pause", ms: 200 },
    { type: "print", text: "> ELEVATING PRIVILEGES ........ [ OK ]", delay: 60, status: "ok" },
    { type: "print", text: "> DECRYPTING INTERFACE ........ [██████████] 100%", delay: 80, status: "ok" },
    { type: "print", text: "> RENDERING NODE_07 ........... [ OK ]", delay: 80, status: "ok" },
    { type: "print", text: "> ACCESS GRANTED", delay: 90, status: "ok" },
    { type: "pause", ms: 400 },
    // PHASE 4 HANDOFF
    { type: "handoff" },
  ],
};

export default function Intro({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const traceRef = useRef<HTMLDivElement>(null);
  const tracePctRef = useRef<HTMLSpanElement>(null);
  const iceRef = useRef<HTMLDivElement>(null);
  const procsRef = useRef<HTMLDivElement>(null);
  const packetsTxRef = useRef<HTMLSpanElement>(null);
  const packetsRxRef = useRef<HTMLSpanElement>(null);
  const hexRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);

  const cancelled = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const q = (fn: () => void, ms: number) => {
    const t = setTimeout(() => { if (!cancelled.current) fn(); }, ms);
    timers.current.push(t);
    return t;
  };

  const [exiting, setExiting] = useState(false);

  const lite =
    typeof navigator !== "undefined" &&
    ((navigator.hardwareConcurrency ?? 8) <= 4 || ((navigator as any).deviceMemory ?? 8) <= 4);

  const mobile = typeof window !== "undefined" && window.innerWidth < 1024;

  const appendLine = (html: string, cls?: string) => {
    if (!termRef.current) return;
    const div = document.createElement("div");
    div.className = "intro-line " + (cls ?? "");
    div.innerHTML = html;
    termRef.current.appendChild(div);
    // trim
    while (termRef.current.children.length > 40) {
      termRef.current.removeChild(termRef.current.firstChild!);
    }
    termRef.current.scrollTop = termRef.current.scrollHeight;
  };

  const typeLine = (text: string, cb?: () => void) => {
    if (!termRef.current) return;
    const div = document.createElement("div");
    div.className = "intro-line";
    const cursor = document.createElement("span");
    cursor.className = "intro-cursor";
    cursor.textContent = "█";
    div.appendChild(cursor);
    termRef.current.appendChild(div);
    while (termRef.current.children.length > 40) termRef.current.removeChild(termRef.current.firstChild!);

    let i = 0;
    const step = () => {
      if (cancelled.current) return;
      if (i >= text.length) {
        cursor.remove();
        cb?.();
        return;
      }
      i++;
      // rebuild text + cursor
      div.textContent = text.slice(0, i);
      div.appendChild(cursor);
      termRef.current!.scrollTop = termRef.current!.scrollHeight;
      const ch = text[i - 1];
      let wait = 12 + Math.random() * 8;
      if (" .,!?;:".includes(ch)) wait += 60;
      if (ch === ">") wait += 40;
      q(step, wait);
    };
    step();
  };

  const runScript = (steps: any[]) => {
    let delay = 0;
    const runStep = (idx: number) => {
      if (cancelled.current || idx >= steps.length) return;
      const s = steps[idx];
      const d = (s.delay ?? 0) * 0.3;
      q(() => {
        if (cancelled.current) return;
        switch (s.type) {
          case "print":
            appendLine(s.text, s.cls);
            if (s.status) {
              // flash status already in text
            }
            if (s.trace !== undefined && traceRef.current) {
              traceRef.current.style.width = s.trace + "%";
              if (tracePctRef.current) tracePctRef.current.textContent = `TRACE: ${s.trace}%`;
            }
            if (s.ice !== undefined && iceRef.current) {
              iceRef.current.style.opacity = s.ice ? "1" : "0";
            }
            runStep(idx + 1);
            break;
          case "type":
            typeLine(s.text, () => runStep(idx + 1));
            break;
          case "prompt":
            // print prompt in red then type handled by next type step? We'll print prompt as part of line
            appendLine(`<span class="intro-prompt">${s.text}</span>`, "prompt-line");
            // store prompt element for typing? Instead, next type step appends to a new line. Simpler: prompt printed, type on same line not implemented; accept prompt on its own line.
            runStep(idx + 1);
            break;
          case "pause":
            q(() => runStep(idx + 1), s.ms * 0.3);
            break;
          case "progress":
            appendLine("SCANNING [░░░░░░░░░░] 0%");
            q(() => {
              const last = termRef.current?.lastChild as HTMLElement | null;
              if (last) last.textContent = "SCANNING [██████████] 100%";
              runStep(idx + 1);
            }, s.duration * 0.3);
            break;
          case "handoff":
            runExit();
            break;
          default:
            runStep(idx + 1);
        }
      }, d);
      // advance delay accumulator not needed; delays are per-step
      // But we need schedule next step after this step's own duration. For print/type, runStep called in callback.
      // For print, we call runStep(idx+1) immediately after (synchronous delay already applied via q). Good.
    };
    runStep(0);
  };

  const runExit = (dur = 250) => {
    if (exiting) return;
    setExiting(true);
    // Reveal the page under the fading overlay so it doesn't pop in (and jump)
    // when the intro unmounts.
    document.documentElement.classList.remove("intro-pending");
    window.dispatchEvent(new Event("intro:done"));
    if (rootRef.current) {
      rootRef.current.style.transition = "opacity 0.25s ease";
      rootRef.current.style.opacity = "0";
    }
    q(() => finish(), dur);
  };

  const skip = () => runExit(250);

  const finish = () => {
    cancelled.current = true;
    timers.current.forEach(clearTimeout);
    document.documentElement.classList.remove("intro-pending");
    document.body.style.overflow = "";
    document.querySelectorAll("[inert]").forEach((el) => el.removeAttribute("inert"));
    window.dispatchEvent(new Event("intro:done"));
    onDone();
  };

  useEffect(() => {
    cancelled.current = false;
    document.body.style.overflow = "hidden";
    document.querySelectorAll("main, header, footer, nav, aside").forEach((el) => el.setAttribute("inert", ""));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        skip();
      }
    };
    window.addEventListener("keydown", onKey);
    const onClick = () => skip();
    rootRef.current?.addEventListener("click", onClick);

    const failsafe = setTimeout(() => {
      if (!cancelled.current) runExit(250);
    }, INTRO.failsafe);

    // side panel: processes update
    let procTimer: ReturnType<typeof setInterval> | undefined;
    if (!lite && !mobile) {
      procTimer = setInterval(() => {
        if (cancelled.current) return;
        if (!procsRef.current) return;
        const bars = procsRef.current.querySelectorAll(".proc-bar");
        bars.forEach((b) => {
          (b as HTMLElement).style.width = (20 + Math.random() * 70) + "%";
        });
      }, 750);
    }

    // packets counter
    let pkt = 0;
    const pktTimer = setInterval(() => {
      if (cancelled.current) return;
      pkt += Math.floor(Math.random() * 8 + 2);
      if (packetsTxRef.current) packetsTxRef.current.textContent = String(pkt);
      if (packetsRxRef.current) packetsRxRef.current.textContent = String(pkt + Math.floor(Math.random() * 20));
    }, 900);

    // hex stream is CSS animated; no JS.

    // run script
    const steps = lite
      ? INTRO.steps.filter((s) => !["print"].includes(s.type) || true).slice(0, 12)
      : INTRO.steps;
    runScript(steps);

    return () => {
      cancelled.current = true;
      timers.current.forEach(clearTimeout);
      if (procTimer) clearInterval(procTimer);
      clearInterval(pktTimer);
      window.removeEventListener("keydown", onKey);
      rootRef.current?.removeEventListener("click", onClick);
      clearTimeout(failsafe);
    };
  }, []);

  const processes = ["kernel", "netwatch", "ice_scan", "neurald", "portfoliod", "syslog"];

  return (
    <div ref={rootRef} className="intro-overlay" aria-hidden="true">
      <div ref={noiseRef} className="intro-noise" />
      {/* top panel (exit) */}
      <div ref={topPanelRef} className="intro-panel-top" />
      <div ref={bottomPanelRef} className="intro-panel-bottom" />

      {/* main layout */}
      <div className="intro-layout">
        {/* terminal window */}
        <div className="intro-terminal">
          <div className="intro-titlebar">
            <span className="intro-kanji">武士</span>
            <span>NETWATCH SECURE TERMINAL // NODE_07</span>
            <span className="intro-skip">SKIP [ESC]</span>
          </div>
          <div ref={termRef} className="intro-term-body" />
        </div>

        {/* side panels (desktop) */}
        {!mobile && (
          <div ref={hudRef} className="intro-hud">
            <div className="intro-hud-panel">
              <div className="intro-hud-label">NET TRACE</div>
              <div className="intro-trace-bar"><div ref={traceRef} className="intro-trace-fill" style={{ width: "12%" }} /></div>
              <div ref={iceRef} className="intro-ice" style={{ opacity: 0 }}>ICE DETECTED</div>
              <span ref={tracePctRef} className="intro-trace-pct">TRACE: 12%</span>
            </div>
            <div className="intro-hud-panel">
              <div className="intro-hud-label">PROCESSES</div>
              <div ref={procsRef} className="intro-procs">
                {processes.map((p, i) => (
                  <div key={p} className="intro-proc">
                    <span className="intro-proc-name">{p}</span>
                    <span className="intro-proc-pid">{1000 + i * 37}</span>
                    <div className="intro-proc-barwrap"><div className="proc-bar intro-proc-bar" style={{ width: (20 + Math.random() * 60) + "%" }} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="intro-hud-panel">
              <div className="intro-hud-label">HEX STREAM</div>
              <div className="intro-hex">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="intro-hex-row">{Array.from({ length: 8 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0")).join(" ")}</div>
                ))}
              </div>
            </div>
            <div className="intro-hud-panel">
              <div className="intro-hud-label">PACKETS</div>
              <div className="intro-pkt">TX <span ref={packetsTxRef}>0</span>  RX <span ref={packetsRxRef}>0</span></div>
            </div>
            <div className="intro-hud-panel intro-hud-bottom">
              <svg viewBox="0 0 120 24" className="intro-barcode-svg" aria-hidden>
                {Array.from({ length: 24 }).map((_, i) => (
                  <rect key={i} x={i * 5} y="2" width="2" height="20" fill="var(--cyan)" opacity={Math.random() > 0.3 ? 1 : 0.3} />
                ))}
              </svg>
              <div className="intro-node">NODE_07 // 10.13.37.7</div>
            </div>
          </div>
        )}
        <span className="sr-only" role="status" aria-live="polite">Loading portfolio</span>
      </div>
    </div>
  );
}
