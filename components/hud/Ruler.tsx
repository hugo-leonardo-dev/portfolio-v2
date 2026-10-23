export function Ruler({
  orientation = "horizontal",
  label = "S",
}: {
  orientation?: "horizontal" | "vertical";
  label?: string;
}) {
  const ticks = Array.from({ length: 40 });
  if (orientation === "vertical") {
    return (
      <div aria-hidden="true" className="flex flex-col items-center gap-[3px]">
        {ticks.map((_, i) => (
          <span key={i} className={`w-2 h-px ${i % 5 === 0 ? "bg-red" : "bg-red-deep/60"}`} />
        ))}
      </div>
    );
  }
  return (
    <div aria-hidden="true" className="flex items-end gap-[3px]">
      {ticks.map((_, i) => (
        <span
          key={i}
          className={`${i % 5 === 0 ? "h-3 bg-red" : "h-1.5 bg-red-deep/60"} w-px`}
        />
      ))}
      <span className="ml-2 text-[9px] text-red tracking-widest">{label}</span>
    </div>
  );
}