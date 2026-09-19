import { Reveal } from "./Reveal";

export function SectionHead({
  eyebrow,
  title,
  sub,
  light = false,
  center = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-12`}>
      <span className={`eyebrow ${light ? "!bg-white/15 !text-white" : ""}`}>{eyebrow}</span>
      <h2
        className={`mt-4 font-display font-bold text-[clamp(1.8rem,4vw,2.8rem)] leading-tight ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {sub ? (
        <p className={`mt-4 text-lg font-semibold ${light ? "text-white/90" : "text-ink-soft"}`}>{sub}</p>
      ) : null}
    </Reveal>
  );
}
