import { Reveal } from "./Reveal";

export function SectionHead({
  eyebrow,
  title,
  sub,
  light = false,
  center = false,
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  light?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={`max-w-2xl mb-12 sm:mb-14 ${center ? "mx-auto text-center" : ""} ${className}`}>
      <span className={`eyebrow ${light ? "!text-white/70" : ""} ${center ? "justify-center" : ""}`}>{eyebrow}</span>
      <h2 className={`h-display mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {sub ? (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/75" : "text-ink-soft"}`}>{sub}</p>
      ) : null}
    </Reveal>
  );
}
