export function SegmentedBar({
  value = 64,
  ticks = 40,
  className,
}: {
  value?: number;
  ticks?: number;
  className?: string;
}) {
  const filled = Math.round((value / 100) * ticks);
  return (
    <div className={`flex items-end gap-[2px] ${className ?? ""}`}>
      {Array.from({ length: ticks }).map((_, i) => (
        <span
          key={i}
          className={`w-[3px] ${i < filled ? "bg-cyan h-4 seg-fill" : "bg-red-deep/60 h-2"}`}
        />
      ))}
    </div>
  );
}