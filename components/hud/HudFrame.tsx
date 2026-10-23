import { cn } from "@/lib/utils";

export function HudFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("corner-brackets relative border border-red-deep bg-[rgba(10,17,24,0.55)] p-6", className)}>
      {children}
    </div>
  );
}
