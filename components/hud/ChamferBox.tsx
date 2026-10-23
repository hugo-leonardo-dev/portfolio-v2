import { cn } from "@/lib/utils";

export function ChamferBox({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "active";
}) {
  return (
    <div
      className={cn(
        "chamfer border p-3",
        variant === "active"
          ? "border-red bg-red text-bg-bottom"
          : "border-red-deep bg-panel text-text",
        className
      )}
    >
      {children}
    </div>
  );
}