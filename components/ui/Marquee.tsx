import { site } from "@/lib/data";

export function Marquee() {
  const text = `>PROJECT_DATA: [${site.handle}]   `;
  return (
    <div className="overflow-hidden border-y border-border bg-bg-2/60 py-2">
      <div className="marquee-track flex w-max whitespace-nowrap text-xs tracking-widest text-muted">
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
      </div>
    </div>
  );
}