import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Glitch } from "@/components/fx/Glitch";

export function MenuItem({
  href,
  icon: Icon,
  label,
  subtitle,
  active = false,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  subtitle?: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center gap-3 chamfer-sm border px-3 py-2 text-xs tracking-widest transition-all",
        active
          ? "bg-red text-[#1A0A0C] border-red"
          : "bg-[#14262C] text-cyan border-cyan-dim hover:border-cyan hover:text-cyan"
      )}
    >
      {/* notch */}
      <span
        className={cn(
          "absolute top-0 right-0 h-0 w-0 border-t-[8px] border-l-[8px] border-t-transparent",
          active ? "border-l-bg-bottom" : "border-l-cyan/60"
        )}
      />
      <Icon size={16} className={active ? "text-bg-bottom" : "text-cyan"} />
      <div className="flex flex-col leading-tight">
        <span className="font-bold"><Glitch intensity="medium">{label}</Glitch></span>
        {subtitle && (
          <span className={cn("text-[8px]", active ? "text-bg-bottom/80" : "text-text-dim")}>
            {subtitle}
          </span>
        )}
      </div>
    </Link>
  );
}