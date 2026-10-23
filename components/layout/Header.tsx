"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-accent neon">
          <span className="text-sm tracking-widest">HUGO_LEONARDO</span>
          <span className="data-error text-danger text-xs">[DATA ERROR]</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "px-3 py-1 text-xs tracking-widest transition-colors",
                  active ? "text-accent" : "text-muted hover:text-fg"
                )}
              >
                {n.label}
                {active && <span className="cursor-blink ml-1 inline-block">_</span>}
              </Link>
            );
          })}
        </nav>
        <button
          className="md:hidden text-accent text-xs tracking-widest"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          [ MENU ]
        </button>
      </div>
      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </header>
  );
}