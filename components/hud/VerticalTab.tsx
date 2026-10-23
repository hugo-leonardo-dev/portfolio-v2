export function VerticalTab({ text }: { text: string }) {
  return (
    <div className="fixed left-0 top-1/3 z-20">
      <div
        className="bg-red-deep/80 text-text-dim text-[9px] tracking-[0.3em] px-1 py-6 border border-red"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        {text}
      </div>
    </div>
  );
}