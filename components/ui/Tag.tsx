import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-block border border-border px-2 py-0.5 text-[10px] tracking-widest text-muted", className)}>
      {children}
    </span>
  );
}