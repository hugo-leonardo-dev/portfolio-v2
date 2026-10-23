import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("border border-border bg-panel/60 backdrop-blur-sm p-5 chamfer", className)}>
      {children}
    </div>
  );
}