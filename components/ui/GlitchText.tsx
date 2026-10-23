export function GlitchText({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={`glitch rgb-split ${className ?? ""}`}>{children}</span>;
}