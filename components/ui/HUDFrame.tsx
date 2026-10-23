import { cn } from "@/lib/utils";

export function HUDFrame({ label, children, className }: { label?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative border border-border bg-panel/40 p-4", className)}>
      {label && (
        <div className="absolute -top-3 left-4 bg-bg px-2 text-[10px] tracking-widest text-accent">
          {label}
        </div>
      )}
      <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-accent" />
      <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-accent" />
      <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-accent" />
      <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-accent" />
      {children}
    </div>
  );
}