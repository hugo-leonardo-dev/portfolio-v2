import { japaneseTexture } from "@/lib/data";

export function BackgroundTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      style={{ opacity: 0.1 }}
    >
      <div
        className="absolute top-0 left-4 h-full text-[10px] tracking-[0.6em] text-secondary whitespace-nowrap"
        style={{ writingMode: "vertical-rl" }}
      >
        {japaneseTexture}
      </div>
      <div
        className="absolute top-0 right-4 h-full text-[10px] tracking-[0.6em] text-secondary whitespace-nowrap"
        style={{ writingMode: "vertical-rl" }}
      >
        {japaneseTexture}
      </div>
    </div>
  );
}