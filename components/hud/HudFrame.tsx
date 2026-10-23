import { cn } from "@/lib/utils";

export function HudFrame({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("corner-brackets relative border border-red-deep bg-[rgba(10,17,24,0.55)] p-6", className)}>
      <span className="cb-bl" />
      <span className="cb-br" />
      {label && (
        <div className="absolute -top-2 left-3 bg-bg-bottom px-2 text-[9px] tracking-widest text-text-dim">
          {label}
        </div>
      )}
      {children}
    </div>
  );
}