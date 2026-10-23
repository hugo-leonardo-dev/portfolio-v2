"use client";
import { useState } from "react";
import { site } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { HudFrame } from "@/components/hud/HudFrame";
import { StatusTag } from "@/components/hud/StatusTag";
import { SegmentedBar } from "@/components/hud/SegmentedBar";
import { TypeWriter } from "@/components/fx/TypeWriter";
import { ScrambleText } from "@/components/fx/ScrambleText";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[PORTFOLIO] ${name}`);
    const body = encodeURIComponent(`${message}\n\n-- ${name} <${email}>`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setStatus("> TRANSMITTING... > PACKET SENT [OK]");
  };

  const inputCls =
    "mt-1 w-full bg-[rgba(20,38,44,0.9)] border border-cyan-dim px-3 py-2 text-text outline-none focus:border-cyan focus:shadow-[0_0_8px_rgba(95,233,238,0.35)] placeholder:text-text-dim caret-cyan [caret-shape:block]";

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <HudFrame>
          <form onSubmit={onSubmit} className="space-y-4 font-mono text-sm">
            <label className="block">
              <span className="text-cyan tracking-widest text-xs">
                <TypeWriter
                  text="> NAME_"
                  speed={10}
                  trigger="inView"
                  keepCursor={false}
                />
              </span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="text-cyan tracking-widest text-xs">
                <TypeWriter
                  text="> EMAIL_"
                  speed={10}
                  trigger="inView"
                  keepCursor={false}
                />
              </span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="text-cyan tracking-widest text-xs">
                <TypeWriter
                  text="> MESSAGE_"
                  speed={10}
                  trigger="inView"
                  keepCursor={false}
                />
              </span>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={inputCls + " resize-none"}
              />
            </label>
            <Button type="submit">[ TRANSMIT ]</Button>
            {status && (
              <div className="text-cyan text-xs tracking-widest">
                <TypeWriter
                  key={status}
                  text={status}
                  speed={10}
                  trigger="mount"
                  keepCursor={false}
                />
              </div>
            )}
          </form>
        </HudFrame>
        <HudFrame>
          <div className="space-y-3 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="block break-all text-text hover:text-cyan"
            >
              EMAIL: {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="block break-all text-text hover:text-cyan"
            >
              LINKEDIN: {site.linkedin}
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="block break-all text-text hover:text-cyan"
            >
              GITHUB: {site.github}
            </a>
            <div className="pt-3">
              <StatusTag color="cyan">SECURE COMM CHANNEL</StatusTag>
            </div>
          </div>
        </HudFrame>
      </div>
      <HudFrame>
        <div className="flex items-center justify-between gap-4">
          <span className="text-cyan text-xs tracking-widest">
            CHANNEL STATUS: OPEN
          </span>
          <SegmentedBar value={100} />
        </div>
      </HudFrame>
    </section>
  );
}
