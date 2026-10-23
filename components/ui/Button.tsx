import Link from "next/link";
import { cn } from "@/lib/utils";
import { Glitch } from "@/components/fx/Glitch";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
};

export function Button({ children, href, onClick, variant = "primary", className, type }: Props) {
  const base =
    "inline-flex items-center gap-2 px-4 py-2 text-xs tracking-widest border chamfer-sm transition-all hover:glitch";
  const styles =
    variant === "primary"
      ? "border-accent text-accent hover:bg-accent hover:text-bg neon"
      : "border-secondary text-secondary hover:bg-secondary hover:text-bg neon-cyan";
  const cls = cn(base, styles, className);
  const content = <Glitch intensity="medium">{children}</Glitch>;
  if (href) return <Link href={href} className={cls}>{content}</Link>;
  return <button type={type ?? "button"} onClick={onClick} className={cls}>{content}</button>;
}