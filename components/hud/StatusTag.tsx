import { cn } from "@/lib/utils";

export function StatusTag({
  children,
  color = "cyan",
}: {
  children: React.ReactNode;
  color?: "cyan" | "red" | "dim";
}) {
  return (
    <span
      className={cn(
        "inline-block border px-2 py-0.5 text-[9px] tracking-widest",
        color === "cyan" && "border-cyan text-cyan",
        color === "red" && "border-red text-red",
        color === "dim" && "border-red-deep text-text-dim"
      )}
    >
      {children}
    </span>
  );
}