"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/data";
import { cn } from "@/lib/utils";

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  return (
    <div className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-md flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="text-accent text-sm tracking-widest">SYS://MENU</span>
        <button onClick={onClose} className="text-danger text-xs tracking-widest">[ CLOSE ]</button>
      </div>
      <nav className="flex flex-col gap-2 p-6" aria-label="Mobile">
        {nav.map((n) => {
          const active = pathname === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={onClose}
              className={cn(
                "text-lg tracking-widest py-2 border-b border-border/40",
                active ? "text-accent" : "text-muted"
              )}
            >
              {n.label} {n.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}